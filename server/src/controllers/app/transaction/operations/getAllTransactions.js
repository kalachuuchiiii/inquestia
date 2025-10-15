const { default: z } = require("zod");
const { getPageParam } = require("../../../../middlewares/pagination/getPageParam");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Transaction = require("../../../../models/transaction");
const { catchError } = require("../../../../utils/errorHandlers/catchError");

const statusSchema = z.enum(['rejected', 'fulfilled', 'pending' , '']);

const getAllTransactionList = async(req, res) => {
    const { verifiedUser } = req; 
    const { skip, limit  } = req.paginationParams;
 
    const status = req?.query?.status || null;

    if(verifiedUser.role !== 'admin'){ 
        return res.status(401).json({
            success: false, 
            message: "You're not authorized for this request."
        })
    }

    if(!status){
          const [totalTransactions, transactions] = await Promise.all([
            Transaction.countDocuments(),
            Transaction.find()
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
      Transaction.countDocuments({ status: parsedStatus }),
      Transaction.find({ status: parsedStatus })
        .skip(skip)
        .limit(limit)
        .populate("candidate", "username")
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

module.exports = build => build({
    path: '/transaction/list/admin', 
    method: 'get', 
    name: 'Get all transaction list', 
    fn: catchError(getAllTransactionList),
    middlewares: [ verifySession, getPageParam]
})