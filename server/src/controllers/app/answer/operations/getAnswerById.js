
const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Answer = require("../../../../models/answer");
const Survey = require("../../../../models/survey");
const { catchError } = require("../../../../utils/errorHandlers/catchError");


const getAnswerById = async(req, res) => {
    const { verifiedId, verifiedUser } = req;
   const answer = await Answer.findById(verifiedId).populate([
  { path: "survey", model: "Survey" },
  { path: "user", model: "User" }
]);


    if(!answer){
        return res.status(404).json({
            success: false, 
            message: 'Answer not found.'
        })
    }

 if (
  !answer.survey.user.equals(verifiedUser._id) &&
  !answer.user.equals(verifiedUser._id)
) {
  return res.status(401).json({
    success: false,
    message: "You're not authorized to view this survey.",
  });
}


    return res.status(200).json({
        success: true, 
        answer
    })

}

module.exports = build => build({
    path: '/answer-by-id/:resourceId', 
    method: 'get', 
    fn: catchError(getAnswerById), 
    name: 'getAnswerById', 
    middlewares: [verifySession, verifyObjectId]
})