const Controller = require("../../../controllers/utils/createCRUD/index.js");

const { build, getRouter } = Controller("Answer", {
  defaultCrud: false
})

require("./operations/getAnswerById.js")(build);
require("./operations/getAnswerOfUser.js")(build);
require("./operations/getSurveyAnswers.js")(build);
require("./operations/submitAnswer.js")(build);
require("./operations/modifyAuthenticity.js")(build);

module.exports = getRouter();

