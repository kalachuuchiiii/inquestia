const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { textValidator } = require("../../../../utils/string.validators.js");
const { bodyValidator } = require("../../../../utils/schema/bodyValidator.js");
const { executeAfterCooldown } = require("../../../../utils/executeAfterCooldown.js");

const updateUsername = async (req, res) => {

    const { error, username } = bodyValidator({
    username: req?.body?.username,
  }, {
    username: {
      type: 'string',
      min: [6, "Username must be at least 6 characters long."],
      max: [20, "Username must not exceed 20 characters."]
    }
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error
    });
  }

  if (!textValidator(username)) {
    return res.status(400).json({
      success: false,
      message: "Username can only contain letters, numbers, underscores, and dots."
    });
  }


  const { verifiedUser } = req;
  const oneDay = 1000 * 60 * 60 * 24;
  const fourteenDays = oneDay * 14;

  const { remainingTime, executed } = executeAfterCooldown(() => {
    verifiedUser.username = username;
    verifiedUser.lastUsernameUpdate = new Date();
  }, {
    lastChange: verifiedUser.lastUsernameUpdate, 
    cooldownInMs: fourteenDays
  })

  if (!executed) {
    const remainingDays = Math.ceil((remainingTime) / oneDay);
    return res.status(400).json({
      success: false,
      message: `You can change your username again in ${remainingDays} day(s).`
    });
  }

  const savedUser = await verifiedUser.save();
  const userData = savedUser.toObject();
  delete userData.password;

  return res.status(200).json({
    success: true,
    user: userData
  });
}

module.exports = build => build({
  name: 'update_username',
  path: '/user/username',
  method: 'patch',
  middlewares: [verifySession],
  fn: catchError(updateUsername)
});