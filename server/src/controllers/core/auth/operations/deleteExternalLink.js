const User = require('../../../../models/user.js');
const { bodyValidator } = require("../../../../utils/schema/bodyValidator.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");

const deleteExternalLink = async (req, res) => {
  let { externalLink } = req.query;
  externalLink = externalLink.trim().toLowerCase();
  const { verifiedUser } = req;

  const remainingLinks = verifiedUser.externalLinks.filter(link => link !== externalLink);

  verifiedUser.externalLinks = remainingLinks;

  const data = await verifiedUser.save();
  const user = data.toObject();
  delete user.password;
  
  return res.status(200).json({
    success: true,
    user
  })
}

module.exports = (build) => build({
  name: 'delete_external_link', 
  method: 'delete', 
  path: '/user/link',
  middlewares: [verifySession], 
  fn: catchError(deleteExternalLink)
})