const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Survey = require("../../../../models/survey");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { verifyObjectId } = require("../../../../utils/schema/verifyObjectId");


const getAuthorizedViewers = async(req, res) => {
  const { verifiedUser } = req;
  const surveyId = verifyObjectId(req?.params?.surveyId);

  const survey = await Survey.findById(surveyId)
    .populate({
      path: "authorizedViewers",
      model: "User",
      select: " username nickname avatar",
    })
    .lean();

  if (String(verifiedUser._id) !== String(survey.user)) {
    return res.status(401).json({
      success: false,
      message: "You're not authorized for this request.",
    });
  }

  return res.status(200).json({
    success: true, 
    authorizedViewers: survey?.authorizedViewers || []
  })




}

module.exports = (build) => build({
 name: 'Get authorized viewers', 
 path: '/survey/authorized-viewers/:surveyId', 
 method: 'get', 
 fn: catchError(getAuthorizedViewers), 
 middlewares: [verifySession]
})