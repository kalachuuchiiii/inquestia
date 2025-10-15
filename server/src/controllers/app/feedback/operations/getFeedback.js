const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Feedback = require("../../../../models/feedback");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { verifyObjectId } = require("../../../../utils/schema/verifyObjectId");


const getFeedback = async(req, res) => {
    const { verifiedUser } = req;
    const feedbackId = verifyObjectId(req?.params?.feedbackId);

    const feedback = await Feedback.findById(feedbackId).populate('from', 'username');
    if(!feedback){
        return res.status(404).json({
        success: false,
        message: 'Feedback not found.'
        })
    }

    if(verifiedUser.role !== 'admin' && String(verifiedUser._id) !== String(feedback.from._id)){
        return res.status(401).json({
            success: false,
            message: "You're not authorized for this request."
        })
    }

    return res.status(200).json({
        success: true,
        feedback
    })


}

module.exports = build => build({
    name: 'Get feedback',
    method: 'get',
    path: '/feedback/:feedbackId',
    middlewares: [verifySession],
    fn: catchError(getFeedback)
})