const Survey = require('../../../../models/survey.js');
const { verifyObjectId } = require('../../../../middlewares/verification/verifyObjectId.js');
const { catchError } = require('../../../../utils/errorHandlers/catchError.js');
const { getBadgeByPoint } = require('../../../../utils/getBadgeByPoint.js');

const getSurveyById = async(req, res) => {
  const { verifiedId } = req; 
  const survey = await Survey.findById(verifiedId).populate('user', "-password -_id").lean();
  
  if(!survey){
    return res.status(400).json({
      success: false, 
      message: 'Survey not found.'
    })
  }

  survey.user.badge = getBadgeByPoint(survey.user.core.current);
  
  return res.status(200).json({
   success: true, 
   survey
  })
}


module.exports = (build) => build({
  name: 'survey', 
  method: 'get', 
  path: '/survey/:resourceId', 
  middlewares: [catchError(verifyObjectId)], 
  fn: catchError(getSurveyById)
})