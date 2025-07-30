const { verifyObjectId } = require("../../../utils/schema/schema.methods.js");

exports.read = async(Model, req, res) => {
  const id = verifyObjectId(req?.params?.id);
  const data = await Model.findById(id).lean();
  if(!data){
    return res.status(200).json({
     success: true, 
     message: "The data you're looking for doesn't exist"
    })
  }
  const modelName = Model.modelName.trim().toLowerCase();
  return res.status(200).json({
   success: true,
   [modelName]: data
  })
}