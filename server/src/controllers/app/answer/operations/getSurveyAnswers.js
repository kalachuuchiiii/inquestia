const Survey = require("../../../../models/survey.js");
const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { getPageParam } = require("../../../../middlewares/pagination/getPageParam.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const Answer = require("../../../../models/answer.js");
const User = require( '../../../../models/user.js')


const getSurveyAnswers = async(req, res) => {
  const { verifiedId, verifiedUser } = req;
  const { limit, skip, page } = req.paginationParams; 
  
  const [survey, answers, totalAnswers] = await Promise.all([
    Survey.findById(verifiedId).lean(), 
    Answer.find({ survey: verifiedId }).skip(skip).limit(limit).populate("user", "username avatar nickname -_id").lean(),
    Answer.countDocuments({ survey: verifiedId })])
    
    if(!survey){
      return res.status(400).json({
        success: false, 
        message: "Survey not found."
      })
    }
    
    if(survey.user.toString() !== verifiedUser._id.toString()){
      return res.status(400).json({
        success: false, 
        message: "You're not permitted to view answers from this survey."
      })
    }
    
    const answerList = answers.map((a) => ({...a, survey}))
    
    const nextPage = req.getNextPage(totalAnswers);
    
    return res.status(200).json({
     success: true, 
     nextPage, 
     answers: answerList,
     survey,
     totalAnswers
    })
}

module.exports = build => build({
  name: 'answer_list', 
  method: 'get', 
  path: '/answer/s/:resourceId',
  fn: catchError(getSurveyAnswers),
  middlewares: [verifySession, verifyObjectId, getPageParam]
})