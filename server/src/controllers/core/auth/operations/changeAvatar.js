const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const multer = require("multer");
const { uploadImage, deleteImage } = require("../../../../config/cloudinary/utils/index.js");
const fs = require("fs");

const upload = multer({
  dest: "uploads/"
});

const User = require("../../../../models/user.js");

const changeAvatar = async (req, res) => {
  const { verifiedUser } = req;
  const { avatar_public_id = null } = verifiedUser;

  const [ {url, public_id } ] = await Promise.all([
     uploadImage(req.file.path), 
     avatar_public_id ? deleteImage(avatar_public_id) : null
  ])
  
  verifiedUser.avatar = url;
  verifiedUser.avatar_public_id = public_id;

  const data = await verifiedUser.save();
  const user = data.toObject();
  delete user.password;


  await fs.promises.unlink(req.file.path);
  return res.status(200).json({
    success: true,
    user
  })

}




module.exports = build => build({
  name: 'change_avatar',
  path: "/user/change-avatar",
  method: "post",
  fn: catchError(changeAvatar),
  middlewares: [verifySession, upload.single("avatar")]
})