const mongoose = require("mongoose");

exports.verifyObjectId = (id = null) => {
  if(!id)throw new Error("No Object ID is found");
  const isValid = mongoose.Types.ObjectId.isValid(id); 
  if(!isValid){
    throw new Error(`${id} is not a valid object id`);
  }
  return id;
}
