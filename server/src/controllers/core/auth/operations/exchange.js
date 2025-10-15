const { default: z } = require("zod");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchError } = require("../../../../utils/errorHandlers/catchError");


const boosterSchema = z.number().min(1, 'Invalid booster amount.').max(10, 'Invalid booster amount.');

const exchangeCores = async (req, res) => {
    const { verifiedUser } = req;
    const boosterAmount = boosterSchema.parse(req?.body?.boosterAmount || 1);
    const coreCost = boosterAmount * 10000;

    if(verifiedUser.core.current < coreCost){
        const neededCores = coreCost - verifiedUser.core.current;
        return res.status(400).json({
          success: false,
          message: `You do not have enough cores. You need ${neededCores} more cores to exchange for ${boosterAmount} booster point(s).`,
        });
    }

    verifiedUser.core.current -= coreCost;
    verifiedUser.boosterPoint += boosterAmount;
    const userData = (await verifiedUser.save()).toObject();
    delete userData.password;

    return res.status(200).json({
        success: true, 
        user: userData,
        message: `Successfully exchanged ${coreCost} cores for ${boosterAmount} boost points.`,
    })
}

module.exports = build => build({
    name: 'exchange_cores', 
    path: '/user/exchange', 
    method: 'post', 
    fn: catchError(exchangeCores), 
    middlewares: [verifySession]
})