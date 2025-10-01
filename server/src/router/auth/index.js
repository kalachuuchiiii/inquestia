
const coreRouter = require("express").Router();

const userRouter = require("../../controllers/core/auth/index.js");
const adminRouter = require("../../controllers/core/admin/index.js");

coreRouter.use(userRouter);
coreRouter.use(adminRouter);

module.exports = coreRouter;





