const { decodeToken } = require("../../utils/auth/jwt.methods.js")
const User = require("../../models/user.js");
const { catchError } = require("../../utils/errorHandlers/catchError.js");
const { calculateAge } = require("../../utils/calculateAge.js");
const { getBadgeByPoint } = require("../../utils/getBadgeByPoint.js");

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

  
  
  req.verifiedUser = await User.findById(decoded.user).select('-password').populate("streak");
  if(!req.verifiedUser){
    return res.status(400).json({
      success: false, 
      message: "User not found.", 
      authenticated: false
    })
  }

  req.userAge = calculateAge(req.verifiedUser.birthdate);
  req.userBadge =  getBadgeByPoint(req.verifiedUser.point.current)
  next();
});