
const Controller = require("../../utils/createCRUD/index.js");

const UserController = Controller("user", {
  defaultCRUD: false
});
const { build, getRouter } = UserController;

require("./operations/banUser.js")(build);
require("./operations/deductUserPoints.js")(build);
require("./operations/getRequestAnalytics.js")(build);
require("./operations/getResolvedSurvey.js")(build);
require("./operations/getResolvedUserReports.js")(build);
require("./operations/getSurveyReportList.js")(build);
require("./operations/getUserReportList.js")(build);

const adminRouter = getRouter();
module.exports = adminRouter;