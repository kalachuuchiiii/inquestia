const User = require("../../../../models/user.js");
const redis = require("../../../../config/redis/index.js");
const Streak = require("../../../../models/streak.js");
const { signToken } = require("../../../../utils/auth/jwt.methods.js");

exports.register = async(req, res,_,commit) => {
  const user = req.user; 
  const { session } = req;
  

  const [newUser] = await User.create([{...user}], {session})
  const [newStreak] = await Streak.create([{
    user: newUser._id
  }], {session});
  newUser.streak = newStreak._id;
  await newUser.save({session});
  
  await commit();
  
  const userData = newUser.toObject(); 
  delete userData.password;
  
  return res.status(200).json({
   success: true, 
   user: userData
  })
  
}