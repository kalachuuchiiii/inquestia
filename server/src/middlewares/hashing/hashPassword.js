const bcrypt = require("bcryptjs"); 
const { textValidator, lengthChecker } = require("../../utils/string.validators.js");

exports.hashPassword = async(req, res, next) => {
  const { password } = req.user;
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  req.user = {
    ...req.user,
      password: hashedPassword
  }
  next();
}