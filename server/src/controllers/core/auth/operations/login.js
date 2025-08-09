const User = require("../../../../models/user.js");
const bcrypt = require("bcryptjs");
const { signToken } = require("../../../../utils/auth/jwt.methods.js");
const { storeCookie } = require("../../../../utils/auth/cookies.methods.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { validateUserFields } = require("../../../../middlewares/validation/user/validateUserFields.js");
const { requireUserPresence } = require("../../../../middlewares/validation/user/requireUserPresence.js");
const { checkUserPresence } = require("../../../../middlewares/validation/user/checkUserPresence.js");

const comparePasswords = async(candidatePass, pass) => {
  return await bcrypt.compare(candidatePass, pass); 
}

const login = async(req, res) => {
  
  const { password: candidatePass = ''} = req.user;
 const user = req.verifiedUser
 console.log(user);
 
  const isPasswordCorrect = await comparePasswords(candidatePass, user.password);
  if(!isPasswordCorrect){
    return res.status(400).json({
      success: false, 
      message: "Incorrect username or password."
    })
  }
  
 const token = await signToken({ user: user._id });

 storeCookie(res, {
   key: "token", 
   value: token, 
 })
 
 const userData = user.toObject(); 
 delete userData.password;
 
 return res.status(200).json({
   success: true, 
   message: "Logged in successfully", 
   user: userData, 
   token
 })
}


module.exports = (build) => {
  build({
    name: "login",
    path: "/user/login", 
    method: "post", 
    middlewares: [validateUserFields, checkUserPresence, requireUserPresence], 
    fn: catchError(login)
  })
};