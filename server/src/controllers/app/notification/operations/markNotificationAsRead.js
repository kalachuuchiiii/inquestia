const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Notification = require("../../../../models/notification");
const { catchError } = require("../../../../utils/errorHandlers/catchError");


const markNotificationAsRead = async(req,res) => {
    const { verifiedUser, verifiedId } = req;
  
    const notif = await Notification.findOne({
      _id: verifiedId, 
      receiver: verifiedUser._id  
    })

    if(!notif){
        return res.status(400).json({
            success: false, 
            message: 'Notification not found.'
        })
    }

    notif.isRead = true;
    await notif.save();

    return res.status(200).json({
        success: true, 
        message: 'Marked as read successfully.'
    })
}

module.exports = build => build({
    path: '/notification/mark-as-read/:resourceId', 
    method: 'patch', 
    fn: catchError(markNotificationAsRead), 
    middlewares: [verifySession, verifyObjectId], 
    name: 'markNotificationAsRead'
})