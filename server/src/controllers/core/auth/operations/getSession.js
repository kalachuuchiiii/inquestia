exports.getSession = async(req, res) => {
  
  const user = req.verifiedUser;
  user.password = null;
 return res.status(200).json({
   success: true, 
   user,
   authenticated: true,
   message: "Logged in"
 })
}