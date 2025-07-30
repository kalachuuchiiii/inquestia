const mongoose = require("mongoose");

exports.verifyObjectId = (id = null) => {
  if(!id)throw new Error("No Object ID is found");
  const isValid = mongoose.Types.ObjectId.isValid(id); 
  if(!isValid){
    throw new Error(`${id} is not a valid object id`);
  }
  return id;
}

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