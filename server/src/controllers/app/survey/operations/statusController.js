const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const Survey = require("../../../../models/survey.js");



const statusController = async (req, res) => {
  const { verifiedId, verifiedUser } = req;
  const { closed = false } = req.body;
  if (typeof closed !== "boolean") {
    return res.status(400).json({
      success: false,
      message: `${closed} is not a valid boolean!`
    })
  }
  const survey = await Survey.findById(verifiedId).lean();

  if (!survey) {
    return res.status(400).json({
      success: false,
      message: "Survey not found."
    })
  }

  if (survey.isDraft) {
    return res.status(400).json({
      success: false,
      message: "You cannot close a draft."
    })
  }


  if (verifiedUser._id.toString() !== survey.user.toString()) {
    return res.status(400).json({
      success: false,
      message: "You aren't permitted for this request."
    })
  }

  const updatedSurvey = await Survey.findByIdAndUpdate(verifiedId, { closed }, { new: true }).lean();

  return res.status(200).json({
    success: true,
    updatedSurvey
  })

}


module.exports = build => build({
  name: "close_survey",
  method: "patch",
  path: "/survey/:resourceId",
  middlewares: [verifySession, verifyObjectId],
  fn: catchError(statusController)
})