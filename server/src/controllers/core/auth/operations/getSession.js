const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");

const getSession = async(req, res) => {
  
  const user = req.verifiedUser.toObject();
  delete user.password;
  
 return res.status(200).json({
   success: true, 
   user,
   authenticated: true,
   message: "Logged in"
 })
}

module.exports = (build) => {
  build({
    name: 'session',
    path: '/user/session', 
    method: "post", 
    middlewares: [verifySession], 
    fn: catchError(getSession)
  })
}