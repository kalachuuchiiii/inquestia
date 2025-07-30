const Controller = require("../../utils/createCRUD/index.js");
const { fileReader } = require("../../../utils/directoryReader.js");


const UserController = Controller("user");

const { build } = UserController;

const builders = fileReader([__dirname]);

Object.entries(builders?.results || {}).forEach(([key, routeBuilder]) => routeBuilder(build))


const userRouter = UserController.getRouter();

module.exports = userRouter;