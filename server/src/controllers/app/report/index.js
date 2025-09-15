const Controller = require("../../../controllers/utils/createCRUD/index.js");
const { fileReader } = require("../../../utils/directoryReader.js");

const { build, getRouter } = Controller("Report")
 
 const builders = fileReader([__dirname, "operations"]);

Object.entries(builders?.results || {}).forEach(([key, routeBuilder]) => routeBuilder(build))
 
 module.exports = getRouter();

