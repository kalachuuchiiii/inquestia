const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Notification = require("../../../../models/notification");
const Survey = require("../../../../models/survey");
const User = require("../../../../models/user");
const { catchErrorWithSession } = require("../../../../utils/errorHandlers/catchError");
const { verifyObjectId } = require("../../../../utils/schema/verifyObjectId");



const removeViewer = async(req, res, next, commit) => {
    const { verifiedUser, session } = req;
    const userId = verifyObjectId(req?.params?.userId);
    const surveyId = verifyObjectId(req?.params?.surveyId);
    
    const survey = await Survey.findById(surveyId);
    const doesUserExist = await User.exists({ _id: userId});

    if(!doesUserExist){
        return res.status(400).json({
            success: false,
            message: 'User not found'
        })
    }

    if(!survey){
        return res.status(400).json({
            success: false,
            message: 'Survey not found'
        })
    }

    if(String(survey.user) !== String(verifiedUser._id)){
        return res.status(401).json({
            success: false,
            message: "You're not authorized for this request"
        })
    }

    if(survey.authorizedViewers.every(viewer => String(viewer) !== String(userId))){
        return res.status(400).json({ 
            success: false,
            message: "This user is already removed as viewer."
        })
    }

    survey.authorizedViewers = survey.authorizedViewers.filter(viewer => String(viewer) !== String(userId))

    await survey.save({ session });
    await new Notification({
        sender: verifiedUser._id, 
        receiver: doesUserExist._id,
        action: 'removed-as-viewer',
        resourceId: survey._id

    }).save({ session });
    await commit();

    return res.status(200).json({
        success: true,
        message: 'Removed successfully!'
    })


}

module.exports = build => build({
    name: 'Remove viewer', 
    method: 'delete', 
    path: '/survey/authorized-viewers/:surveyId/:userId',
    fn: catchErrorWithSession(removeViewer),
    middlewares: [verifySession]
})

