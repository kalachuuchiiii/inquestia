const { verifyObjectId } = require("../../../utils/schema/schema.methods.js");

exports.update = async (Model, req, res) => {
  const id = verifyObjectId(req.params.id);

  const updatedDoc = await Model.findByIdAndUpdate(id, { ...req.body }, { new: true });

  return res.status(200).json({
    success: true,
    message: "Updated Successfully",
    updatedDoc
  })
}