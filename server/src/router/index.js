const mainRouter = require("express").Router();
const appRouter = require("./app/index.js");
const coreRouter = require("./auth/index.js");

mainRouter.use(appRouter); 
mainRouter.use(coreRouter);


module.exports = mainRouter;