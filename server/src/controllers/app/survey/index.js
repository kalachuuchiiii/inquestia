const Controller = require("../../utils/createCRUD/index.js");
const { fileReader } = require("../../../utils/directoryReader.js");

const surveyController = Controller('Survey');
 const { build, getRouter} = surveyController;
 
 const builders = fileReader([__dirname, "operations"]);

Object.entries(builders?.results || {}).forEach(([key, routeBuilder]) => routeBuilder(build))
 
 module.exports = getRouter();