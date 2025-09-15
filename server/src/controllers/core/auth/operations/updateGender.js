const { default: z } = require("zod");
const { verifySession } = require("../../../../middlewares/verification/verifySession")
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { executeAfterCooldown } = require("../../../../utils/executeAfterCooldown");

const genderSchema = z.enum(['male', 'female', 'non-binary', 'transgender', 'other'], { message: 'Please select a valid gender'})
const updateGender = async (req, res) => {
    const { verifiedUser } = req; 
    const gender = genderSchema.parse(req.body.gender)

    if(verifiedUser.gender === gender){
        return res.status(400).json({
            success: false, 
            message: 'Please select a new option.'
        })
    }
    const { executed, remainingTime } = executeAfterCooldown(() => {
       verifiedUser.gender = gender;
    }, {
        lastChange: verifiedUser.lastGenderChange, 
        cooldownInMs: 1000 * 60 * 60 * 24 * 60
    })

    if(!executed && remainingTime){
        const remainingDays = Math.floor(remainingTime / (1000 * 60 *  60 * 24))
        return res.status(400).json({
           success: false, 
           message: `You can change your gender after ${remainingDays} day(s)`
        })
    }


    if(executed){
        await verifiedUser.save();
        return res.status(200).json({
            success: true, 
            message: 'Updated successfully'
        })
    }



}

module.exports = build => build({
    name: 'updateGender', 
    fn: catchError(updateGender), 
    middlewares: [verifySession], 
    path: '/user/update-gender',
    method: 'patch'
})