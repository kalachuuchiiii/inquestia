const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Transaction = require("../../../../models/transaction");
const { catchError } = require("../../../../utils/errorHandlers/catchError");



const viewTransaction = async(req, res) =>{
    const { verifiedId, verifiedUser } = req;
   
    const transaction = await Transaction.findById(verifiedId.toString()).populate('candidate', 'username'); 

    if(!transaction){ 
        return res.status(400).json({
            success: false,
             message: 'Transaction not found.'
        })
    }

    if(transaction.candidate._id.toString() !== verifiedUser._id.toString() && verifiedUser.role !== 'admin'){ 
      return res.status(401).json({
        success: false,
        message: "You're not authorized for this request."
      })
    }

    return res.status(200).json({
        success: true, 
        transaction
    })

}

module.exports = build => build({ 
    name: 'View Transaction by Id', 
    method: 'get', 
    path: '/transaction/:resourceId',
    fn: catchError(viewTransaction), 
    middlewares: [verifySession, verifyObjectId]
})