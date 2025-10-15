const { verifyObjectId } = require("../.././../../middlewares/verification/verifyObjectId.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { getPageParam } = require('../../../../middlewares/pagination/getPageParam.js');
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const Survey = require("../../../../models/survey.js");

const getSurveyListOfOtherUser = async(req, res) => {
  const { verifiedId, verifiedUser } = req;
  const { page, skip, limit } = req.paginationParams;
  const [surveys, totalSurveys] = await Promise.all([
    Survey.find({
      user: verifiedId,
      isTakendown: false,
      isDraft: false,
      closed: false,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username nickname avatar"),
    Survey.countDocuments({
      isTakendown: false,
      user: verifiedId,
      isDraft: false,
      closed: false,
    }),
  ]);
    
    const nextPage = req.getNextPage(totalSurveys);
    
    return res.status(200).json({
     success: true, 
     surveys, 
     totalSurveys, 
     nextPage
    })
  
}

module.exports = build => build({
  name: 'survey_of_other_users', 
  path: '/user/:resourceId/survey-list', 
  fn: catchError(getSurveyListOfOtherUser),
  middlewares: [verifySession, verifyObjectId, getPageParam]
})