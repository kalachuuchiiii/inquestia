
const { catchError } = require('../../../../utils/errorHandlers/catchError.js');
const { getPageParam } = require('../../../../middlewares/pagination/getPageParam.js');
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const Survey = require("../../../../models/survey.js");

const getSurveyListOfUser = async(req, res) => {
  const { skip, limit } = req.paginationParams;
  const { verifiedUser } = req;
  const isDraft = JSON.parse(req?.query?.isDraft || "false")

  if(typeof isDraft !== "boolean"){
    return res.status(400).json({
      success: false, 
      message: "Invalid boolean."
    })
  }
  
  const [totalSurveys, surveys] = await Promise.all([  
    Survey.countDocuments({user: verifiedUser._id, isDraft, isTakendown: false }).lean(),
    Survey.find({ user: verifiedUser._id, isDraft, isTakendown: false }).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("user", "-password -email").lean()
    ])
    
    const nextPage = req.getNextPage(totalSurveys);
  
  return res.status(200).json({
   success: true, 
   surveys, 
   totalSurveys,
   nextPage
  })
}


module.exports = (build) => build({
  name: 'user_survey', 
  path: '/survey-list/user', 
  method: "get",
  middlewares: [verifySession, getPageParam], 
  fn: catchError(getSurveyListOfUser)
})