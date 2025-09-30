const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Answer = require("../../../../models/answer");
const Survey = require("../../../../models/survey");
const { catchError } = require("../../../../utils/errorHandlers/catchError")


const getStatistics = async (req, res) => { 
   const { verifiedUser } = req; 
   const { surveyId } = req.params;
   const survey = await Survey.findOne({
     _id: surveyId,
     user: verifiedUser._id,
   }).lean();

   if (!survey) {
     return res.status(404).json({ 
        success:false, 
        message: "Survey not found" });
   }

   const questionsWithOptions = survey.questions
     .map((q, i) => ({ ...q, index: i }))
     .filter((q) => q.type === "select" && q?.choices && q?.choices?.length > 0);
     const userObject = verifiedUser.toObject();
     delete userObject.password;
     

   const statisticsPromise = questionsWithOptions.map(async(question) => {
    const choices = [];
     for (const choice of question.choices) {
          const count = await Answer.countDocuments({
            survey: survey._id,
            'answers.question': question._id,
            'answers.answer' : { $in: [choice] }
        });
        const percentage = survey.totalRespondents > 0 ? (count / survey.totalRespondents) * 100 : 0;
        choices.push({ choice, percentage });
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