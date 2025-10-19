
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchErrorWithSession } = require("../../../../utils/errorHandlers/catchError.js");
const mongoose = require("mongoose");
const Survey = require("../../../../models/survey.js");
const Answer = require("../../../../models/answer.js");
const { monitorStreak } = require("../../../utils/survey/monitorStreak.js");
const User = require("../../../../models/user.js");
const Notification = require("../../../../models/notification.js");
const { validateSurveyFields } = require("../../../../middlewares/validation/survey/validateSurveyFields.js");

const submitAnswer = async(req, res, _, commit) => {
  const { verifiedUser } = req;
  const { answers, survey } = req.body;

  const surveyData = await Survey.findById(survey._id);

  if (!surveyData) {
    return res.status(400).json({
      success: false,
      message: "Survey not found.",
    });
  }

  const author = await User.findById(surveyData.user);
  if (author._id.toString() === verifiedUser._id.toString()) {
    return res.status(400).json({
      success: false,
      message: "You cannot answer your own survey.",
    });
  }

  if (
    surveyData.closed ||
    surveyData.hasReachedTargetRespondents ||
    surveyData.respondents.length >= surveyData.targetRespondents ||
    survey?.isTakendown
  ) {
    return res.status(400).json({
      success: false,
      message: "This survey is closed.",
    });
  }

  const plainRespondentIds = surveyData.respondents.map((r) => r.toString());

  if (plainRespondentIds.includes(verifiedUser._id.toString())) {
    return res.status(400).json({
      success: false,
      message: "You already submitted a response.",
    });
  }

  const questionIds = surveyData.questions.map(({ _id }) => _id.toString());

  for (const { type, answer, questionId } of answers) {
    if (!questionIds.includes(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid survey questions.",
      });
    }

    const qst = surveyData.questions.find(
      (q) => q._id.toString() === questionId
    );

    if (!qst) {
      return res.status(400).json({
        success: false,
        message: "Invalid survey questions.",
      });
    }

    if (type === "text" && qst.type === "text") {
      if (typeof answer !== "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid answer format",
        });
      }
      if (qst.isRequired && answer.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Oops! You missed a required question.",
        });
      }

      if (answer.length > 500) {
        return res.status(400).json({
          success: false,
          message: "A text answer can only contain up to 500 characters!.",
        });
      }
    }

    if (type === "select" && qst.type === "select") {
      if (!Array.isArray(answer)) {
        return res.status(400).json({
          success: false,
          message: "Invalid answer format.",
        });
      }
      if (qst.isRequired && answer.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Oops! You missed a required question.",
        });
      }

      if (!answer.every((ans) => qst.choices.includes(ans))) {
        return res.status(400).json({
          success: false,
          message: "Invalid answer/s.",
        });
      }

      if (!qst.multipleChoice && answer.length > 1) {
        return res.status(400).json({
          success: false,
          message:
            "You can only select multiple options if the questions allows it.",
        });
      }

      if (answer.length > 6 && qst.multipleChoice) {
        return res.status(400).json({
          success: false,
          message: "You can only select 6 choices as an answer.",
        });
      }
    }
  }

  const properFormat = {
    survey: surveyData._id,
    answers: [],
    user: verifiedUser,
  };

  for (const qst of surveyData.questions) {
    const ans = answers.find(
      (an) => an.questionId.toString() === qst._id.toString()
    );
    properFormat.answers.push({
      question: qst._id,
      type: qst.type.trim().toLowerCase(),
      answer: ans.answer,
    });
  }

  const { targetRespondents } = surveyData;

  surveyData.respondents.push(new mongoose.Types.ObjectId(verifiedUser._id));
  surveyData.totalRespondents += 1;
  surveyData.hasReachedTargetRespondents =
    surveyData.totalRespondents >= targetRespondents;

  author.core.current += 50;
  author.core.highest = Math.max(author.core.current, author.core.highest);
  verifiedUser.core.current += 50;
  verifiedUser.core.highest = Math.max(
    verifiedUser.core.highest,
    verifiedUser.core.current
  );
  const newAns = new Answer(properFormat);
  const { session } = req;
   monitorStreak({ user: verifiedUser, giveReward: true });

  await verifiedUser.save({ session });

  await author.save({ session });
  await surveyData.save({ session });
  const data = await newAns.save({ session });

  if (surveyData.hasReachedTargetRespondents) {
    await new Notification({
      sender: verifiedUser._id,
      receiver: author._id,
      action: "survey-completed",
      resourceId: surveyData._id,
    });
  } else {
    await new Notification({
      sender: verifiedUser._id,
      receiver: author._id,
      action: "answer",
      resourceId: data._id,
    }).save({ session });
  }

  await commit();

  return res.status(200).json({
    success: true,
    answerData: data,
  });
}
  

module.exports = build => build({
  name: "submit_answer", 
  path: "/answer", 
  method: "post", 
  middlewares: [verifySession, validateSurveyFields],
  fn: catchErrorWithSession(submitAnswer)
})