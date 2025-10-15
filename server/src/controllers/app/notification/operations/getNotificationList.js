const { getPageParam } = require("../../../../middlewares/pagination/getPageParam");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Notification = require("../../../../models/notification");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { getPathAndMessage } = require("../../../utils/notification/getPathAndMessage");


const getNotificationList = async (req, res) => {
    const { verifiedUser } = req;
    const { skip } = req.paginationParams;
    let [notifications, totalNotifications, totalUnreadNotifications] = await Promise.all([
      Notification.find({
        receiver: verifiedUser._id,
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(10).populate('sender', ' avatar username nickname ').lean(),
      Notification.countDocuments({
        receiver: verifiedUser._id,
      }), 
      Notification.countDocuments({ 
        receiver: verifiedUser._id, 
        isRead: false
      })
    ]);

   const nextPage = req.getNextPage(totalNotifications);
   notifications = notifications.map((notif) => {
     const { path, message } = getPathAndMessage(notif);

     return {
       ...notif,
       path,
       message
     };
   });
  



   return res.status(200).json({
    success: false, 
    notifications, 
    totalNotifications, 
    nextPage, 
    totalUnreadNotifications
   })

}


module.exports = (build) => build({
    name: 'getNotificationList', 
    method: 'get', 
    fn: catchError(getNotificationList), 
    middlewares: [verifySession, getPageParam], 
    path: '/notification/list'
})