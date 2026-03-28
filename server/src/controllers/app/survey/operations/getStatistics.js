const { default: z } = require("zod");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Answer = require("../../../../models/answer");
const Survey = require("../../../../models/survey");
const { catchError } = require("../../../../utils/errorHandlers/catchError")


const isAuthenticSchema = z.enum(['all', 'false', 'true'])
const getStatistics = async (req, res) => { 
   const { verifiedUser } = req; 
   const { surveyId } = req.params;
   const isAuthentic = isAuthenticSchema.parse(req?.query?.isAuthentic || 'false')
   const survey = await Survey.findOne({
     _id: surveyId
   }).populate('user', 'avatar nickname username').lean();

   if (!survey) {
     return res.status(404).json({ 
        success:false, 
        message: "Survey not found" });
   }

   if (
     String(verifiedUser._id) !== String(survey.user._id) &&
     !survey.authorizedViewers.some(
       (viewer) => String(viewer) === String(verifiedUser._id)
     )
   ) {

    return res.status(401).json({
      success: false,
      message: "You're not permitted to view the answers of this survey.",
    });
   }

   const questionsWithOptions = survey.questions
     .map((q, i) => ({ ...q, index: i }))
     .filter((q) => q.type === "select" && q?.choices && q?.choices?.length > 0);
     const userObject = survey.user
     delete userObject.password;
     

   const statisticsPromise = questionsWithOptions.map(async(question) => {
    const choices = [];
     for (const choice of question.choices) {
        const filter = {
          survey: survey._id,
          "answers.question": question._id,
          "answers.answer": { $in: [choice] },
        };

        switch (isAuthentic) {
          case "true":
            filter.isAuthentic = true;
            break;
          case "false":
            filter.isAuthentic = false;
            break;
        }

          const count = await Answer.countDocuments( filter);
        const percentage = survey.totalRespondents > 0 ? (count / survey.totalRespondents) * 100 : 0;
        choices.push({ choice, percentage, count });
    }
        return {
            choices, 
            question: question.question, 
            createdAt: question.createdAt,
            user: userObject
        }
   })

   const statistics = await Promise.all(statisticsPromise);


   return res.status(200).json({ success: true, statistics, survey });
}

module.exports = build => {
    return build({
      fn: catchError(getStatistics),
      method: "get",
      path: "/survey/:surveyId/statistics",
      name: "getSurveyStatistics",
      middlewares: [verifySession],
    });
}