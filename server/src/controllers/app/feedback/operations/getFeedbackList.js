const { getPageParam } = require("../../../../middlewares/pagination/getPageParam");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Feedback = require("../../../../models/feedback");
const { catchError } = require("../../../../utils/errorHandlers/catchError");


const getFeedback = async(req, res) => {
    const { verifiedUser } = req;
    const { skip, limit } = req.paginationParams;

    const [ feedbacks, totalFeedbacks ] = await Promise.all([
      Feedback.find({ from: verifiedUser._id }).sort({ createdAt: -1, _id: -1}).skip(skip).limit(limit).populate('from', 'username'), 
      Feedback.countDocuments({ from: verifiedUser._id})
    ])

    const nextPage = req.getNextPage(totalFeedbacks); 
    return res.status(200).json({
        success: true, 
        feedbacks, 
        nextPage,
        totalFeedbacks
    })
}


module.exports = build => build({
    name: 'Get feedback', 
    fn: catchError(getFeedback), 
    middlewares: [verifySession, getPageParam], 
    path: '/feedback-list', 
    method: 'get'
})