const Survey = require("../../../../models/survey.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { allowedSurveyFields } = require("../../../../data/allowedFields/survey.js");

const getNearlyCompleteSurveys = async (req, res) => {
  const { verifiedUser } = req;

  const surveys = await Survey.aggregate([
    {
      $match: {
        tags: { $in: verifiedUser.interests },
        hasReachedTargetRespondents: false,
        closed: false,
        respondents: { $nin: [verifiedUser._id] }, 
        isDraft: false
      }
    },
    {
      $addFields: {
        progress: {
          $subtract: ["$targetRespondents", "$totalRespondents"]
        }
      }
    },
    {
      $sort: {
        progress: 1
      }
    },
    {
      $limit: 10
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    }, {
      $unwind: '$user'
    },
    {
      $project: { ...allowedSurveyFields }
    }
  ])

  return res.status(200).json({
    success: true,
    surveys
  })
}



module.exports = build => build({
  name: 'survey_nearly_ckmplete',
  path: '/survey/nearly-complete',
  method: 'get',
  middlewares: [verifySession],
  fn: catchError(getNearlyCompleteSurveys)
})