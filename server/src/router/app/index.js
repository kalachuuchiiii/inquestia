const appRouter = require("express").Router();
const surveyRouter = require("../../controllers/app/survey/index.js");
const reportRouter = require("../../controllers/app/report/index.js");
const notificationRouter = require("../../controllers/app/notification/index.js");
const answerRouter = require("../../controllers/app/answer/index.js");

appRouter.use(surveyRouter);
appRouter.use(reportRouter);
appRouter.use(notificationRouter);
appRouter.use(answerRouter);

module.exports = appRouter;

  
  
  



  


