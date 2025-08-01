const { decodeToken } = require("../../utils/auth/jwt.methods.js")
const User = require("../../models/user.js");

exports.verifySession = async(req, res, next) => {
  const token = req.cookies.token;
  const decoded = await decodeToken(token);
  if(!decoded?.user){
    return res.status(401).json({
      success: false, 
      message: "You're not logged in", 
      authenticated: false
    })
  }
  
  req.verifiedUser = await User.findById(decoded.user);
  if(!req.verifiedUser){
    return res.status(400).json({
      success: false, 
      message: "User not found.", 
      authenticated: false
    })
  }
  next();
}