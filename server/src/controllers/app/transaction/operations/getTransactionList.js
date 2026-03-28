const { default: z } = require("zod");
const { getPageParam } = require("../../../../middlewares/pagination/getPageParam");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Transaction = require("../../../../models/transaction");
const { catchError } = require("../../../../utils/errorHandlers/catchError");

const statusSchema = z.enum(['rejected', 'fulfilled', 'pending']);

const getTransactionList = async(req, res) => {
    const { verifiedUser } = req; 
    const { skip, limit  } = req.paginationParams;
    const status = req?.query?.status || null;

    if(!status){
          const [totalTransactions, transactions] = await Promise.all([
            Transaction.countDocuments({ candidate: verifiedUser._id }),
            Transaction.find({ candidate: verifiedUser._id }).sort({createdAt: -1})
              .skip(skip)
              .limit(limit)
              .populate('candidate', 'username')
              .lean(),
          ]);
    
    const nextPage = req.getNextPage(totalTransactions);

    return res.status(200).json({ 
        success: true, 
        nextPage, 
        transactions,
        totalTransactions
    })
    }

    const parsedStatus = statusSchema.parse(status);

    const [totalTransactions, transactions] = await Promise.all([
        Transaction.countDocuments({ candidate: verifiedUser._id, status: parsedStatus}), 
        Transaction.find({ candidate: verifiedUser._id, status: parsedStatus }).skip(skip).limit(limit).lean()
    ])
    
    const nextPage = req.getNextPage(totalTransactions);

    return res.status(200).json({ 
        success: true, 
        nextPage, 
        transactions,
        totalTransactions
    })
}

module.exports = build => build({
    path: '/transaction/list', 
    method: 'get', 
    name: 'Get transaction list', 
    fn: catchError(getTransactionList),
    middlewares: [ verifySession, getPageParam]
})