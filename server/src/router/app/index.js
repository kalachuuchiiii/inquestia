const appRouter = require("express").Router();
const path = require("path");
const Controller = require("../../controllers/utils/createCRUD/index.js");
const { fileReader, folderReader } = require("../../utils/directoryReader.js");

  const { fileNames: entities } = fileReader([__dirname, "../..", "models"]);
const { folders: customAppRouters, directories } = folderReader([__dirname, "../..", "controllers", "app"]);
  
  try{
    entities.forEach((entity) => {
    if(!customAppRouters.includes(entity)){
      const entityRouter = Controller(entity).getRouter();
      appRouter.use(entityRouter);
      return;
    }
    console.log(directories[entity]);
    const customRouter = require(path.join(directories[entity], "index.js"))
    appRouter.use(customRouter);
  })
  }catch(e){
    console.error('Failed to load app routes', e);
    process.exit(1);
  }


module.exports = appRouter;

  
  
  



  


