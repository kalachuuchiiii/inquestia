
const User = require("../../../../models/user.js");
const { urlValidator } = require("../../../../utils/schema/schema.methods.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { bodyValidator } = require("../../../../utils/schema/bodyValidator.js")

const addExternalLink = async(req, res) => {
  const { externalLink } = bodyValidator(res, {
    externalLink: req?.body?.externalLink || ''
  }, {
    externalLink: {
      min: [5, 'Link is too short to be an url.'], 
      max: [46, 'Link is too long.']
    }
  })
  
  const isValidUrl = urlValidator(externalLink);
  
  if(!isValidUrl){
    return res.status(400).json({
      success: false, 
      message: 'Invalid url format.'
    })
  }
  
  const { verifiedUser } = req;
  if(verifiedUser.externalLinks.length >= 6){
    return res.status(400).json({
      success: false, 
      message: 'You can only add upto 6 external links.'
    })
  }
  
  if(verifiedUser.externalLinks.includes(externalLink.trim().toLowerCase())){
    return res.status(400).json({
      success: false, 
      message: 'You cannot add already existing links.'
    })
  }
  
  verifiedUser.externalLinks.push(externalLink.trim().toLowerCase());
  const data = await verifiedUser.save();
  const user = data.toObject();
  delete user.password; 
  
  return res.status(200).json({
   success: true, 
   message: 'Successfully added external link',
   user
  })
}

module.exports = (build) => {
  build({
    name: 'add_external_link',
    method: 'patch', 
    path: '/user/link', 
    middlewares: [verifySession],
    fn: catchError(addExternalLink)
  })
};