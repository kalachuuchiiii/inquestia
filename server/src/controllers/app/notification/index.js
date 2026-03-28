const Controller = require("../../../controllers/utils/createCRUD/index.js");

const { build, getRouter } = Controller("Notification")

require("./operations/getNotificationList.js")(build);
require("./operations/markNotificationAsRead.js")(build);

module.exports = getRouter();

