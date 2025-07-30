const { readOneFile } = require("../../utils/directoryReader.js");
const authRouter = require("express").Router();

const userRouter = readOneFile([__dirname, "../..", "controllers", "core", "auth", "index.js"]);  

authRouter.use(userRouter);

module.exports = authRouter;





