const { interests } = require("../../../../data/interests.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const Notification = require("../../../../models/notification.js");
const User = require("../../../../models/user.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { getBadgeByPoint } = require("../../../../utils/getBadgeByPoint.js");
const { monitorStreak } = require("../../../utils/survey/monitorStreak.js");

const getSession = async(req, res) => {
  const user = req.verifiedUser;
  const plainObj = user.toObject();

  const { action, modified } = monitorStreak({
    user: plainObj
  });

  if(modified && action === 'reset'){
    await user.save();
  }
  
  const verifiedUser = {
    ...plainObj,
    badge: getBadgeByPoint(plainObj.core.current)
  }

  const hasUnreadNotifications = await Notification.exists({ 
    receiver: verifiedUser._id, 
    isRead: false
  })

  const tagQuery = interests.map(async(interest) => {
    const count = await User.countDocuments({ interests: interest });
    return {
      interest,
      count
    }
  })

  const tags = await Promise.all(tagQuery)
  
  
 return res.status(200).json({
   success: true, 
   interests: tags,   
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