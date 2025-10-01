const Controller = require("../../../controllers/utils/createCRUD/index.js");

const { build, getRouter } = Controller("Report")

require("./operations/reportSurvey.js")(build);
require("./operations/reportUser.js")(build);

module.exports = getRouter();

