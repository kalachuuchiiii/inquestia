const { default: z } = require("zod");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { minAmount, maxAmount, corePerAmount } = require("../../../../data/limit");
const Transaction = require("../../../../models/transaction");


const amountSchema = z
  .number({ required_message: "Invalid amount. " })
  .min(minAmount, "Invalid amount.")
  .max(maxAmount, "Invalid amount.")

const phoneNumberSchema = z.preprocess((val) => {
  if (typeof val !== "string") return val;
  if (/^09\d{9}$/.test(val)) {
    return "+63" + val.slice(1);
  }

  return val;
}, 
z.string().regex(/^\+639\d{9}$/, {
  message: "Must be a valid Philippine mobile number (e.g., +639171234567)",
}));


const createTransaction = async(req, res) => {
    const { verifiedUser} = req;

    const amount = amountSchema.parse(parseInt(req?.body?.amount || 10));
    const phoneNumber = phoneNumberSchema.parse(req?.body?.phoneNumber);

    if(!amount){
        return res.status(400).json({
            success: false, 
            message: 'Please specify a valid amount to exchange.'
        })
    }

    if(!phoneNumber){
        return res.status(400).json({
            success: false, 
            message: 'Please provide a valid Philippine mobile number (e.g., 09XXXXXXXXX or +639XXXXXXXXX).' 
        })
    }
    const { current } = verifiedUser.core;

    const hasAlreadySubmittedRequest = await Transaction.exists({ 
        candidate: verifiedUser._id, 
        status: 'pending', 
        amount
    }) 

    if(hasAlreadySubmittedRequest){
        return res.status(409).json({
          success: false,
          message:
            "You already have a pending transaction request. Please wait for it to be processed before submitting another or cancel the transaction request in the transaction page.",
        });
    }
    
    const totalCoreCost = amount * corePerAmount;
    const isCoresEnough = current > totalCoreCost;

    if(!isCoresEnough){
        return res.status(400).json({
            success: false,
            message: `Insufficient cores. You need ${totalCoreCost} cores to exchange for ₱${amount}. Your current balance is ${current} cores.`
        })
    }

     await new Transaction({
        candidate: verifiedUser._id, 
        amount, 
        phoneNumber
    }).save()

    return res.status(200).json({
        success: true, 
        message: 'Request submitted successfully!'
    })
    
}

const builder = (build) => build({
    name: 'Create_Transaction', 
    path: '/transaction', 
    method: 'post', 
    fn: catchError(createTransaction), 
    middlewares: [verifySession]
})

module.exports = builder;