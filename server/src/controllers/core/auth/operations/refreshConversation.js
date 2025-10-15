const redis = require("../../../../config/redis");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchError } = require("../../../../utils/errorHandlers/catchError");


const refreshConversation = async(req, res) => {
    const { verifiedUser } = req;
    
    const response = await redis.set(`conversation:${String(verifiedUser._id)}`, JSON.stringify([]));
    console.log(response);

    return res.status(200).json({
        success: true,
        message: 'Refresh successful!'
    })
}

module.exports = build => build({
    name: 'refresh conversation',
    method: 'delete',
    path: '/user/conversation',
    fn: catchError(refreshConversation),
    middlewares: [verifySession]
})