
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Answer = require("../../../../models/answer");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { getBadgeByPoint } = require("../../../../utils/getBadgeByPoint");
const { verifyObjectId } = require("../../../../utils/schema/verifyObjectId");


const getAnswerById = async(req, res) => {
    const { verifiedUser } = req;
    const answerId = verifyObjectId(req?.params?.answerId);

   const answer = await Answer.findById(answerId).populate([
  { path: "survey", model: "Survey", select: '-respondents' },
  { path: "user", model: "User", select: 'username nickname avatar core' }
]).lean();




    if(!answer){
        return res.status(404).json({
            success: false, 
            message: 'Answer not found.'
        })
    }

 if (
  !answer.survey.user.equals(verifiedUser._id) &&
  !answer.user.equals(verifiedUser._id) && 
  !answer.survey.authorizedViewers.includes(String(verifiedUser._id))
) {
  return res.status(401).json({
    success: false,
    message: "You're not authorized to view this survey.",
  });
}
answer.user.badge = getBadgeByPoint(answer.user.core.current);


    return res.status(200).json({
        success: true, 
        answer
    })

}

module.exports = build => build({
    path: '/answer-by-id/:answerId', 
    method: 'get', 
    fn: catchError(getAnswerById), 
    name: 'getAnswerById', 
    middlewares: [verifySession]
})