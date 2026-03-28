const { default: z } = require("zod");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchErrorWithSession } = require("../../../../utils/errorHandlers/catchError");
const Feedback = require("../../../../models/feedback");
const Notification = require("../../../../models/notification");
const { verifyObjectId } = require("../../../../utils/schema/verifyObjectId");

const responseSchema = z.string();


const respondToFeedback = async(req, res, next, commit) => {
  const { verifiedUser, session } = req;
  if(verifiedUser.role !== 'admin'){
    return res.status(401).json({
        success: false,
        message: "You're not authorized for this request."
    })
  }
  const feedbackId = verifyObjectId(req?.params?.feedbackId);
  const response = responseSchema.parse(req.body.response);
  const feedback = await Feedback.findById(feedbackId);

  if(!feedback){
    return res.status(404).json({
        success: false, 
        message: 'Feedback not found.'
    })
  }

  if(String(feedback.from) === String(verifiedUser._id)){
    return res.status(400).json({
      success: false,
      message: `You can't respond to yourself.`
    })
  }

  feedback.response = response;
  await feedback.save({ session });
  await new Notification({
    receiver: feedback.from, 
    sender: verifiedUser._id, 
    action: 'feedback-response', 
    resourceId: feedback._id
  }).save({ session });
  await commit();

  return res.status(200).json({
    success: true, 
    message: 'Response sent!'
  })

  



  


}

module.exports = build => build({
    name: 'Respond to feedback', 
    fn: catchErrorWithSession(respondToFeedback), 
    middlewares: [verifySession], 
    path: '/admin/feedback/:feedbackId', 
    method:'patch'
})