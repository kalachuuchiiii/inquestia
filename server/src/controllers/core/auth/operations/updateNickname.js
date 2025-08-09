const User = require("../../../../models/user.js");
const { bodyValidator } = require("../../../../utils/schema/bodyValidator.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");


const updateNickname = async (req, res) => {
  const { verifiedUser } = req;

  const { nickname, error } = bodyValidator({
    nickname: req.body?.nickname || ''
  }, {
    nickname: {
      min: [0],
      max: [26, "Nickname must not exceed 26 characters."]
    }
  })
  
  if(error){
    return res.status(400).json({
      success: false, 
      message: error
    })
  }

  verifiedUser.nickname = nickname;
  const data = await verifiedUser.save();
  const user = data.toObject();
  delete user.password;

  return res.status(200).json({
    success: true,
    user,
    message: 'Nickname successfully changed.'
  })
}




module.exports = (build) => {
  build({
    name: 'update_nickname', 
    method: 'patch', 
    path: '/user/nickname',
    middlewares: [verifySession],
    fn: catchError(updateNickname)
  })
};