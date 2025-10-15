const Controller = require("../../utils/createCRUD/index.js");

const surveyController = Controller('Survey', {
  defaultCRUD: true
});
const { build, getRouter} = surveyController;

require("./operations/create-survey.js")(build);
require("./operations/deleteSurvey.js")(build);
require("./operations/getNearlyCompleteSurveys.js")(build);
require("./operations/getStatistics.js")(build);
require("./operations/getSurveyById.js")(build);
require("./operations/getSurveyList.js")(build);
require("./operations/getSurveyListOfOtherUser.js")(build);
require("./operations/getSurveyListOfUser.js")(build);
require("./operations/searchSurvey.js")(build);
require("./operations/statusController.js")(build);
require("./operations/summarizeAnswers.js")(build);
require("./operations/addViewer.js")(build);
require("./operations/getAuthorizedViewers.js")(build);
require('./operations/removeViewer.js')(build);
require('./operations/getSharedSurvey.js')(build);

module.exports = getRouter();