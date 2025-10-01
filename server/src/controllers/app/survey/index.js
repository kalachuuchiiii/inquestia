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

module.exports = getRouter();