const { decodeToken } = require("../../utils/auth/jwt.methods");


exports.extractUserFromToken = async(req, res, next) => {
     const token = req?.cookies?.token || null;
    
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You're not logged in",
          authenticated: false,
        });
      };
    
    
      const decoded = await decodeToken(token);
      if(!decoded?.user){
        return res.status(401).json({
          success: false, 
          message: "You're not logged in", 
          authenticated: false
        })
      }
    
    req.sessionUser = decoded.user;
   return next();
}