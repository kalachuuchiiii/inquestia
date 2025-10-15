const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const multer = require("multer");
const { uploadImage, deleteImage } = require("../../../../config/cloudinary/utils/index.js");
const storage = multer.memoryStorage();

const upload = multer({
  storage
});



const changeAvatar = async (req, res) => {
  const { verifiedUser } = req;
  const { avatar_public_id = null } = verifiedUser;

  const avatar = req?.file?.buffer;

  if(!avatar){
    return res.status(400).json({
      success: false,
      message: 'Please provide a photo'
    })
  }

  const base64String = `data:${req.file.mimetype};base64,${avatar.toString('base64')}`;

  const {url, public_id} = await uploadImage(base64String || null);

    if(avatar_public_id){
      deleteImage(avatar_public_id);
    } 
  
  verifiedUser.avatar = url;
  verifiedUser.avatar_public_id = public_id;

  const data = await verifiedUser.save();
  const user = data.toObject();
  delete user.password;

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