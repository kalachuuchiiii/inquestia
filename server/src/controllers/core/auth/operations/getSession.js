exports.getSession = async(req, res) => {
  
  const user = req?.user || {};
 return res.status(200).json({
   success: true, 
   user,
   message: "Logged in"
 })
}