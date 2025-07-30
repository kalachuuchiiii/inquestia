exports.preventUserDuplication = async(req, res, next) => {
  const { isEmailAlreadyUsed, isUsernameAlreadyTaken } = req; 
  if(isEmailAlreadyUsed){
    return res.status(409).json({
      success: false, 
      message: "This email is already used."
    })
  }
  
  if(isUsernameAlreadyTaken){
    return res.status(409).json({
      success: false, 
      message: "This username is already taken."
    })
  }
  
  next();
}