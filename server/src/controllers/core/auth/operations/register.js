const User = require("../../../../models/user.js");
const redis = require("../../../../config/redis/index.js");
const Streak = require("../../../../models/streak.js");
const { signToken } = require("../../../../utils/auth/jwt.methods.js");
const { validateUserFields } = require("../../../../middlewares/validation/user/validateUserFields.js");
const { checkUserPresence } = require("../../../../middlewares/validation/user/checkUserPresence.js");
const { preventUserDuplication } = require("../../../../middlewares/validation/user/preventUserDuplication.js")
const { validateUsername } = require("../../../../middlewares/validation/user/validateUsername.js");
const { verifyOTP } = require("../../../../middlewares/verification/verifyOTP.js");
const { hashPassword } = require("../../../../middlewares/hashing/hashPassword.js");
const { catchErrorWithSession } = require("../../../../utils/errorHandlers/catchError.js");


const register = async(req, res) => {
  const user = req.user; 
  const { session } = req;
  const seed = Math.random().toString(36).substring(7);
const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;

  const [newUser] = await User.create([{...user, avatar: avatarUrl}], {session});
  const [newStreak] = await Streak.create([{
    user: newUser._id
  }], {session});
  newUser.streak = newStreak._id;
  await newUser.save({session});
  
  const userData = newUser.toObject(); 
  delete userData.password;
  
  return res.status(200).json({
   success: true, 
   user: userData
  })
  
}


module.exports = (build) => {
  build({
  name: "register",
  method: "post",
  path: "/user/register",
  middlewares: [validateUserFields, validateUsername, checkUserPresence, preventUserDuplication, verifyOTP, hashPassword],
  fn: catchErrorWithSession(register)
})
};