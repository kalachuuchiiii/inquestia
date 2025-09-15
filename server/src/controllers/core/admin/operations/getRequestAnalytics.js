const redis = require("../../../../config/redis");
const { verifySession } = require("../../../../middlewares/verification/verifySession")
const { catchError } = require("../../../../utils/errorHandlers/catchError")


const getRequestAnalytics = async(req, res) => {
  const { verifiedUser } = req; 
   
  if(verifiedUser.role !== "admin"){
    return res.status(401).json({
        success: false, 
        message: "You are not authorized for this request."
    })
  }

  const dataKeys = await redis.keys('analytics:*');
  const requestAnalytics = {};
  const dataValues = await redis.mGet(dataKeys);
  
  dataKeys.forEach((key, i) => {
    requestAnalytics[key] = Number(dataValues[i])
  })

  return res.status(200).json({
    success: true, 
    requestAnalytics
  })


}

module.exports = build => build({
    name: 'getRequestAnalytics', 
    fn: catchError(getRequestAnalytics), 
    method: 'get', 
    middlewares: [verifySession], 
    path: '/admin/request-analytics'
})