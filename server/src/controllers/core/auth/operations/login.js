const User = require("../../../../models/user.js");
const bcrypt = require("bcryptjs");
const { signToken } = require("../../../../utils/auth/jwt.methods.js");
const { storeCookie } = require("../../../../utils/auth/cookies.methods.js");

const comparePasswords = async(candidatePass, pass) => {
  return await bcrypt.compare(candidatePass, pass); 
}

exports.login = async(req, res, commit) => {
  
  const { password: candidatePass = ''} = req.user;
 const user = req.user;
 
  const isPasswordCorrect = await comparePasswords(candidatePass, user.password);
  if(!isPasswordCorrect){
    return res.status(400).json({
      success: false, 
      message: "Incorrect username or password."
    })
  }
  
 const token = signToken({ user: user._id }); storeCookie(res, {
   key: "token", 
   value: token, 
 })
 
 const userData = user.toObject(); 
 delete userData.password;
 
 return res.status(200).json({
   success: true, 
   message: "Logged in successfully", 
   user: userData
 })
}