
const Controller = require("../../utils/createCRUD/index.js");
const { fileReader } = require("../../../utils/directoryReader.js");

const UserController = Controller("user", {
  defaultCRUD: false
});

const { build, getRouter } = UserController;

const builders = fileReader([__dirname, "operations"]);

Object.entries(builders?.results || {}).forEach(([key, routeBuilder]) => routeBuilder(build))


const adminRouter = getRouter();

module.exports = adminRouter;