const mongoose = require("mongoose");

exports.verifyModel = (modelName = null) => {
if(!modelName)throw new Error("No modelName is given is found");
  const Model = mongoose.model(modelName);
  if(!mongoose.modelNames().includes(modelName) || !Model){
    const warning = `${modelName} doesn't exist.`
    console.warn(warning);
    throw new Error(warning)
  }
  return Model;
}