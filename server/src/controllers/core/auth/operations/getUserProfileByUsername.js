const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const User = require("../../../../models/user.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");

const getUserProfileByUsername = async(req, res) => {
  const { username } = req.query; 
  const { verifiedUser } = req;
  if(typeof username !== "string"){
    return res.status(400).json({
      success: false, 
      message: "Invalid username."
    })
  }
  
  if(username.trim().toLowerCase() === verifiedUser.username){
    const user = verifiedUser.toObject();
    delete user.password;
    return res.status(200).json({
      success: true, 
      userProfile: user
    })
  }
  
  const userProfile = await User.findOne({ username: username.trim().toLowerCase() }).select("-password").lean();
  
  if(!userProfile){
    return res.status(400).json({
      success: false, 
      message: `User ${username} doesn't exist.`
    })
  }
  
  return res.status(200).json({
   success: true, 
   userProfile
  })
  
  
  
}

module.exports = build => build({
  name: 'user_profile', 
  path: '/user/profile', 
  method: 'get', 
  fn: catchError(getUserProfileByUsername), 
  middlewares: [verifySession]
})

