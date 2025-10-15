const { default: z } = require("zod");
const { getPageParam } = require("../../../../middlewares/pagination/getPageParam");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Feedback = require("../../../../models/feedback");
const { catchError } = require("../../../../utils/errorHandlers/catchError");

const feedbackTypeSchema = z.enum( ['suggestion', 'all', 'concern', 'help', 'bug', 'account', 'other'])


const getAllFeedback = async(req, res) => {
    const { verifiedUser } = req;
    const { skip, limit } = req.paginationParams;
    const feedbackType = feedbackTypeSchema.parse(req.query?.feedbackType);
    if(verifiedUser.role !== 'admin'){ 
        return res.status(401).json({ 
            success: false,
             message: "You're not authorized for this request."
        })
    }

    const filter = feedbackType === 'all' ? null : { feedbackType };

    const [feedbacks, totalFeedbacks] = await Promise.all([
        Feedback.find(filter).sort({ createdAt: -1, _id: -1}).skip(skip).limit(limit).populate('from', 'username'), 
        Feedback.countDocuments(filter)
    ])

    const nextPage = req.getNextPage(totalFeedbacks);

    return res.status(200).json({
        success: true, 
        nextPage, 
        totalFeedbacks, 
        feedbacks
    })


}

module.exports = build => build({ 
    name:'Get all feedback', 
    fn: catchError(getAllFeedback), 
    middlewares: [verifySession, getPageParam], 
    path: '/admin/feedback/list'
})