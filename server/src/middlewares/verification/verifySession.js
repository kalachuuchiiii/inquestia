const { decodeToken } = require("../../utils/auth/jwt.methods.js")
const { getCookie } = require("../../utils/auth/cookies.methods.js");
const User = require("../../models/user.js");

exports.verifySession = async(req, res, next) => {
  const token = getCookie("token");
  const decoded = decodeToken(token);
  if(!decoded?._id){
    return res.status(401).json({
      success: false, 
      message: "Not logged in"
    })
  }
  
  req.user = await User.findById(decoded._id);
  next();
}