const { decodeToken } = require("../../utils/auth/jwt.methods.js")
const User = require("../../models/user.js");
const { catchError } = require("../../utils/errorHandlers/catchError.js");
const { isStillBanned } = require("../../utils/isStillBanned.js");

exports.verifySession = catchError(async(req, res, next) => {
  const token = req?.cookies?.token || null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You're not logged in",
      authenticated: false,
    });
  };


  const decoded = await decodeToken(token);
  if(!decoded?.user){
    return res.status(401).json({
      success: false, 
      message: "You're not logged in", 
      authenticated: false
    })
  }

  
  
  const user = await User.findById(decoded.user).select('-password').populate();
  
  if(!user){
    return res.status(400).json({
      success: false, 
      message: "User not found.", 
      authenticated: false
    })
  }

   const { isBanned, remainingBanDurationInDays, remainingBanDurationInMinutes, remainingBanDurationInHour } = isStillBanned(user?.bannedAt, user?.banDuration);

     if(isBanned){

      const format = `Your account has been banned. Remaining time: ${remainingBanDurationInDays} day(s) or ${remainingBanDurationInHour} hour(s) or ${remainingBanDurationInMinutes} minute(s)`;

      return res.status(400).json({
        success: false,
        message: format,
      });
    }
    req.verifiedUser = user;
  
  return next();
});