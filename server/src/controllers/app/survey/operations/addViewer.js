const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Notification = require("../../../../models/notification");
const Survey = require("../../../../models/survey");
const User = require("../../../../models/user");
const { catchError, catchErrorWithSession } = require("../../../../utils/errorHandlers/catchError");
const { verifyObjectId } = require("../../../../utils/schema/verifyObjectId");



const addViewer = async (req, res, next, commit) => {
        const surveyId = verifyObjectId(req?.params?.surveyId);
        const userId = verifyObjectId(req?.params?.userId);
        const { verifiedUser, session } = req;

        const survey = await Survey.findById(surveyId);
        if (!survey) {
            return res.status(404).json({
                success: false,
                message: 'Survey not found.'
            });
        }

        if (String(survey.user) !== String(verifiedUser._id)) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to add viewers to this survey.'
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        if (String(survey.user) === String(user._id)) {
            return res.status(400).json({
                success: false,
                message: 'Owner cannot be added as a viewer.'
            });
        }

        if (survey.authorizedViewers.some(v => String(v) === String(user._id))) {
            return res.status(400).json({
                success: false,
                message: 'User is already an authorized viewer.'
            });
        }

        survey.authorizedViewers.push(user._id);
        await survey.save({session});
        await new Notification({ 
            resourceId: survey._id,
            receiver: user._id, 
            sender: survey.user,
            action: 'added-as-viewer'
        }).save({ session });
        await commit();

        return res.status(200).json({
            success: true,
            message: 'Viewer added successfully.',
          
        });

};

module.exports = build => build({
    name: 'Add Viewer', 
    method: 'patch',
    middlewares: [verifySession], 
    fn: catchErrorWithSession(addViewer), 
    path: '/survey/add-viewer/:surveyId/:userId' 

})