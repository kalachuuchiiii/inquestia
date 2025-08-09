const User = require("../../../../models/user.js");
const { bodyValidator } = require("../../../../utils/schema/bodyValidator.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchError } = require('../../../../utils/errorHandlers/catchError.js');

 const updateBio = async(req, res) => {
  const { bio, error } = bodyValidator({
    bio: req?.body?.bio || '', 
  }, {
    bio: {
      min: [0],
      max: [100, 'Bio can only contain 100 characters'], 
    }
  })
  if(error){
    return res.status(400).json({
      success: false, 
      message: error
    })
  }
  const { verifiedUser } = req;
  
  verifiedUser.bio = bio.trim();
  const data = await verifiedUser.save();
  const user = data.toObject();
  delete user.password; 
  
  return res.status(200).json({
    success: true, 
    message: 'Bio successfully updated',
    user, 
  })
}


module.exports = (build) => {
  build({
    name: 'update_bio',
    method: 'patch',
    path: '/user/bio',
    middlewares: [verifySession],
    fn: catchError(updateBio)
  })
};