const redis = require("../../../../config/redis");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchError } = require("../../../../utils/errorHandlers/catchError");


const getConversation = async(req, res) => {
    const { verifiedUser } = req;

    const conversation = JSON.parse((await redis.get(`conversation:${String(verifiedUser._id)}`)))
    
    return res.status(200).json({
        success: true,
        conversation: conversation || []
    })
}

module.exports = build => build({
    name: 'Get conversation',
    path: '/user/conversation',
    method: 'get',
    middlewares: [verifySession],
    fn: catchError(getConversation)
})