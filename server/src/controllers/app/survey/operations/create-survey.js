const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchErrorWithSession } = require('../../../../utils/errorHandlers/catchError.js');
const { validateSurveyFields } = require('../../../../middlewares/validation/survey/validateSurveyFields.js')
const { monitorStreak } = require("../../../utils/survey/monitorStreak.js");


const Survey = require("../../../../models/survey.js");

const createSurvey = async (req, res, _, commit) => {
  const { verifiedSurvey: survey } = req;
  const { session } = req;
  const { isDraft = false, _id = null } = req.body;

  if (typeof isDraft !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Invalid boolean."
    })
  }

  const { verifiedUser } = req;

  const surv = await Survey.findById(_id).lean();
  
  
  if(!isDraft && !surv){
     monitorStreak({ user: verifiedUser })
  }
  const boosterPoint = verifiedUser?.boosterPoint || 0;
  if(survey.booster > boosterPoint){
    return res.status(400).json({
      success: false, 
      message: "You do not have enough boost points."
    })
  }

  verifiedUser.boosterPoint -= survey.booster;
  verifiedUser.core.current += 30;
  verifiedUser.core.highest = Math.max(verifiedUser.core.highest, verifiedUser.core.current);
  
  const userData = await verifiedUser.save({ session });  
  const user = userData.toObject();
  delete user.password

  
  
  
  if (!surv) {
    const data = await new Survey({
      ...survey,
      user: verifiedUser._id,
      isDraft,
      respondents: [],
    }).save({ session });
    await commit();
    return res.status(200).json({
      success: true,
      data,
      user,
    });
  }

  if (surv.isDraft) {
    const data = await Survey.findByIdAndUpdate(_id, {
      ...survey, 
      respondents: [], 
      isDraft
    }, { new: true, session }).lean();
    await commit();
    return res.status(200).json({
      success: true,
      data,
      user
    })
  }else{
    return res.status(400).json({
      success: false, 
      message: "Survey error."
    })
  }




}


module.exports = (build) => build({
  name: 'create',
  method: 'post',
  path: '/survey/create',
  middlewares: [verifySession, validateSurveyFields],
  fn: catchErrorWithSession(createSurvey)
})