const { readOneFile } = require("../../utils/directoryReader.js");
const coreRouter = require("express").Router();

const userRouter = readOneFile([__dirname, "../..", "controllers", "core", "auth", "index.js"]);  
const adminRouter = readOneFile([__dirname, "../..", "controllers", "core", "admin", "index.js"]);  

coreRouter.use(userRouter);
coreRouter.use(adminRouter);

module.exports = coreRouter;





