const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const Notification = require("../../../../models/notification.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { monitorStreak } = require("../../../utils/survey/monitorStreak.js");

const getSession = async(req, res) => {
  const user = req.verifiedUser;

  const { action, modified } = monitorStreak({
    user
  });

  if(modified && action === 'reset'){
    await user.save()
  }
  
  const verifiedUser = {
    ...user.toObject(),
    age: req.userAge, 
    badge: req.userBadge
  }

  const hasUnreadNotifications = await Notification.exists({ 
    receiver: verifiedUser._id, 
    isRead: false
  })
  
 return res.status(200).json({
   success: true, 
   user: verifiedUser,
   authenticated: true,
   hasUnreadNotifications: !(!hasUnreadNotifications),
   message: "Logged in"
 })
}

module.exports = (build) => {
  build({
    name: 'session',
    path: '/user/session', 
    method: "post", 
    middlewares: [verifySession], 
    fn: catchError(getSession)
  })
}