const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchErrorWithSession } = require('../../../../utils/errorHandlers/catchError.js');
const { validateSurveyFields } = require('../../../../middlewares/validation/survey/validateSurveyFields.js')
const { runWithSession } = require('../../../../utils/helpers/runWithSession.js');

const Survey = require("../../../../models/survey.js");

const createSurvey = async(req, res, _, commit) => {
  const { verifiedSurvey: survey } = req;
  const { session } = req;
  if(!survey){
    return res.status(400).json({
      success: false, 
      message: 'Missing survey.'
    })
  }
  const { verifiedUser } = req;
  verifiedUser.points += 25;

    const data = await new Survey({...survey, user: verifiedUser._id}).save({session})
    const userData = await verifiedUser.save({session})
  
    const user = userData.toObject();
    delete user.password
    
    await commit();
  
  return res.status(200).json({
    success: true, 
    data, 
    user
  })
}


module.exports = (build) => build({
  name: 'create', 
  method: 'post', 
  path: '/survey/create', 
  middlewares: [verifySession, validateSurveyFields], 
  fn: catchErrorWithSession(createSurvey)
})