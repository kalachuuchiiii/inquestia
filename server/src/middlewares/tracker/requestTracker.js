const redis = require("../../config/redis");


exports.requestTracker = async(req, res, next) => {
    const methodName = req.method; 
    if(methodName !== 'POST'){
        next()
        return;
    }

    res.on('finish', async() => {
     await redis.incr(`analytics:${req.baseUrl + req.route.path}`);
    })
 
    next();
  
}