const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { executeAfterCooldown } = require("../../../../utils/executeAfterCooldown.js");
const { getValidInterestTags } = require('../../../../utils/schema/getValidInterestTags.js');


const updateInterests = async (req, res) => {
  const { verifiedUser } = req;
  const { selectedInterests = [] } = req.body;
  if (!Array.isArray(selectedInterests)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid interests'
    })
  }

  if (selectedInterests.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'You must have at least 1 interest'
    })
  }
  
  const validInterests = getValidInterestTags(selectedInterests);

  if (validInterests.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'You must have at least 1 interest'
    })
  }
  
  if(validInterests.length > 10){
    return res.status(400).json({
      success: false,
      message: 'Please select no more than 10 interests.'
    })
  }

  if(verifiedUser.lastInterestChange === null){
    verifiedUser.interests = validInterests;
    verifiedUser.isFinishedOnboarding = true;
    verifiedUser.lastInterestChange = new Date();

    const data = await verifiedUser.save();
    const user = data.toObject();
    delete user.password;

    return res.status(200).json({
      success: true,
      user,
    });
  }

  const { executed, remainingTime } = executeAfterCooldown(() => {
     verifiedUser.interests = validInterests;
     verifiedUser.isFinishedOnboarding = true;
     verifiedUser.lastInterestChange = new Date();
  }, {
    lastChange: verifiedUser.lastInterestChange, 
    cooldownInMs: 1000 * 60 * 60 * 24 * 30
  })

  if(!executed){
    return res.status(400).json({
      success: false, 
      message: `You can change your interests again after ${Math.floor(remainingTime / (1000 * 60 * 60 * 24
    ))} day(s)`
    })
  }

 
     const data = await verifiedUser.save();
    const user = data.toObject();
    delete user.password;

    return res.status(200).json({
      success: true,
      user,
    });


  

}

module.exports = (build) => build({
  name: 'update_interest',
  method: 'patch',
  path: '/user/interests',
  middlewares: [verifySession],
  fn: catchError(updateInterests)
})