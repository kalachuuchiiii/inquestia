exports.requireUserPresence = async(req, res, next) => {
  
  if(!req?.isEmailAlreadyUsed){
    return res.status(400).json({
      success: false, 
      message: "This user doesn't exist", 
      emailPresence: false
    })
  }
  
  if(req?.isUsernameAlreadyTaken){
    return res.status(400).json({
      success: false, 
      message: "This user doesn't exist", 
      usernamePresence: false
    })
  }
  
  next();
}