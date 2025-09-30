const redis = require("../../config/redis");


exports.requestTracker = async(req, res, next) => {
    const methodName = req?.method || 'GET'; 
    if(methodName !== 'POST'){
        next()
        return;
    }
    const url = (req?.baseUrl + req?.route?.path) || '/';

    res.on('finish', async() => {
     await redis.incr(`analytics:${url}`);
    })
 
    next();
  
}