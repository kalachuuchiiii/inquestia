const { verifyObjectId } = require("../../../utils/schema/schema.methods.js");
exports.deleteDoc = async(Model, req, res) => {
  const id = verifyObjectId(req?.params?.id);
  const deletedDoc = await Model.findByIdAndDelete(id); 
  return res.status(200).json({
   success: true, 
   message: "Successfully deleted.",
   deletedDoc
  })
}