const User = require("../../../models/user.js");

exports.checkUserPresence = async (req, res, next) => {
  const { username = null, email = ''} = req.user;

  const [isEmailAlreadyUsed, isUsernameAlreadyTaken] = await Promise.all([
    User.findOne({ email }),
    User.findOne({ username })
  ])
  
  req.isEmailAlreadyUsed = isEmailAlreadyUsed;
  req.isUsernameAlreadyTaken = isUsernameAlreadyTaken

  next();
}