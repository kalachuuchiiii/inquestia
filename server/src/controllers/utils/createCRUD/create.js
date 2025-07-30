exports.create = async(Model, req, res) => {
  const createdDocument = await new Model({...req.body}).save(); 
  return res.status(200).json({
   success: true, 
   message: "Created Successfully",
   createdDocument
  })
}