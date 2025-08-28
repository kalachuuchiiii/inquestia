const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId.js");

const { catchErrorWithSession } = require("../../../../utils/errorHandlers/catchError.js");
const Survey = require("../../../../models/survey.js");
const Answer = require("../../../../models/answer.js");


const deleteSurvey = async(req, res, _, commit) => {
  const { verifiedUser, verifiedId, session } = req;
  const survey = await Survey.findById(verifiedId)
  
  if(!survey){
    return res.status(400).json({
     success: false, 
     message: "Survey not found."
    })
  }
  
  if(verifiedUser._id.toString() !== survey.user.toString()){
    return res.status(400).json({
     success: false, 
     message: "You aren't permitted for this request."
    })
  }
  
  const deletedSurvey = await Survey.findByIdAndDelete(verifiedId, { session })
  const deletedResponses = await Answer.deleteMany({ 
    survey: survey._id
  }, { session })
  
  await commit();
  
  return res.status(200).json({
   success: true, 
   deletedSurvey
  })
  
}

module.exports = build => build({
  name: "delete_survey", 
  method: "delete", 
  path: "/survey/:resourceId", 
  middlewares: [verifySession, verifyObjectId], 
  fn: catchErrorWithSession(deleteSurvey)
})