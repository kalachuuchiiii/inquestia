const { default: z } = require("zod");
const Answer = require("../../../../models/answer");
const { verifyObjectId } = require("../../../../utils/schema/verifyObjectId");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { verifySession } = require("../../../../middlewares/verification/verifySession");

const modifyAuthenticity = async(req, res) => {
    const { verifiedUser } = req;
    const answerId = verifyObjectId(req?.params?.answerId);

    

    const answer = await Answer.findById(answerId).populate('survey');
    if(!answer || !answer?.survey){
        return res.status(404).json({
            success: false,
            message: 'Answer not found.'
        })
    }

    if(String(verifiedUser._id) !== String(answer.survey.user)){
        return res.status(401).json({
            success: false,
            message: "You're not authorized for this request."
        })
    }

    answer.isAuthentic = !answer?.isAuthentic
     await answer.save();
    let msg = answer.isAuthentic ? 'Marked as authentic!' : 'Marked as unauthentic!';


    return res.status(200).json({
      success: true,
      message: msg,
      authenticity: answer.isAuthentic,
    });

    
}


module.exports = build => build({
    name: 'Modify authenticity',
    method: 'patch',
    fn: catchError(modifyAuthenticity),
    middlewares: [verifySession],
    path: '/answer/modify-authenticity/:answerId'
})