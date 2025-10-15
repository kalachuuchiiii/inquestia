const Controller = require("../../utils/createCRUD/index.js");

const UserController = Controller("user", {
  defaultCRUD: false
});
const { build, getRouter } = UserController;

// Manual imports for all operation files
require("./operations/addExternalLink.js")(build);
require("./operations/changeAvatar.js")(build);
require("./operations/deleteExternalLink.js")(build);
require("./operations/exchange.js")(build);
require("./operations/getLeaderboard.js")(build);
require("./operations/getPeopleWithSimilarInterests.js")(build);
require("./operations/getSession.js")(build);
require("./operations/getUserProfileByUsername.js")(build);
require("./operations/login.js")(build);
require("./operations/logout.js")(build);
require("./operations/register.js")(build);
require("./operations/searchUsers.js")(build);
require("./operations/sendChangePasswordRequestToken.js")(build);
require("./operations/sendForgotPasswordRequestToken.js")(build);
require("./operations/sendVerificationCode.js")(build);
require("./operations/updateBio.js")(build);
require("./operations/updateInterests.js")(build);
require("./operations/updateNickname.js")(build);
require("./operations/updatePassword.js")(build);
require("./operations/updateUsername.js")(build);
require("./operations/search-oneUser.js")(build);
require("./operations/getConversation.js")(build);
require("./operations/sendMessage.js")(build);
require("./operations/refreshConversation.js")(build);

const userRouter = getRouter();
module.exports = userRouter;