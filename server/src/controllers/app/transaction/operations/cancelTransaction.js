const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Transaction = require("../../../../models/transaction");
const { catchError } = require("../../../../utils/errorHandlers/catchError");



const cancelTransaction = async(req, res) => {
     const { verifiedId, verifiedUser } = req;
     const transac = await Transaction.findById(verifiedId);

     if(!transac){
        return res.status(404).json({
            success: false, 
            message: 'Transaction not found.'
        })
     }

     if(transac.candidate.toString() !== verifiedUser._id.toString()){
        return res.status(400).json({
            success: false,
             message: "You're not authorized for this request."
        })
     }

     const deletedTransac = await Transaction.findByIdAndDelete(transac._id);

     return res.status(200).json({
        success: true,
        message: 'Cancelled successfully!.'
     })



}

module.exports = build => build({
    name: 'Cancel Transaction', 
    path: '/transaction/cancel/:resourceId',
    method: 'delete', 
    fn: catchError(cancelTransaction),
    middlewares: [verifySession, verifyObjectId]
})