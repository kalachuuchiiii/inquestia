const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");

const logout = async(req, res) => {
  const { verifiedUser } = req;
  res.clearCookie(`token`);
  
  return res.status(200).json({
   success: true, 
   message: "Logged out successfully"
  })
}
module.exports = build => build({
  name: "logout", 
  path: "/user/logout", 
  fn: catchError(logout), 
  middlewares: [verifySession], 
  method: "post"
})