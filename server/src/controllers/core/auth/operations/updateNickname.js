const User = require("../../../../models/user.js");
const { z } = require("zod");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");


const nicknameSchema = z
  .string()
  .max(26, "Nickname must not exceed 26 characters.");
const updateNickname = async (req, res) => {
  const { verifiedUser } = req;


  
  const parseResult = nicknameSchema.parse(req.body?.nickname || '');
  const nickname = parseResult;

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