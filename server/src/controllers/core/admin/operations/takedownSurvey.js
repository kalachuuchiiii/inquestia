const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Notification = require("../../../../models/notification");
const Report = require("../../../../models/report");
const Survey = require("../../../../models/survey");
const { catchErrorWithSession } = require("../../../../utils/errorHandlers/catchError");
const { verifyObjectId } = require("../../../../utils/schema/verifyObjectId");


const takedownSurvey = async(req, res, next, commit) => {
    const { verifiedUser, session} = req;
    const reportId = verifyObjectId(req?.params?.reportId);

    if(verifiedUser.role !== 'admin'){
      return res
        .status(401)
        .json({
          success: false,
          message: "You're not authorized for this request.",
        });
    }

    const report= await Report.findById(reportId).populate({
        path: 'reportedEntity.entityId',
        model: 'Survey'
    });

     if(!report){
        return res.status(400).json({
            success: false,
            message: 'Report not found'
        })
    }

    if(!(report?.reportedEntity?.entityId instanceof Survey)){
        return res.status(400).json({
            success: false,
            message: 'Invalid survey.'
        })
    }

    const { description = null, title = null } = report.reportedEntity.entityId;

     report.reportedEntity.title = title;
    report.reportedEntity.description = description;
    report.resolveAction = 'Survey taken down';
    report.isResolved = true;

    await report.save({ session });
    await Notification.deleteMany({
        resourceId: report?.reportedEntity?.entityId?._id
    }, { session })
    await Survey.findByIdAndUpdate(report?.reportedEntity?.entityId?._id, { isTakendown: true }, { session });
    await new Notification({
      sender: verifiedUser._id,
      receiver: report?.entityOwner,
      action: "survey-takendown",
      resourceId: report?.reportedEntity?.entityId?._id,
    }).save({ session });
    await commit();

   


    return res.status(200).json({
        success: true,
        message: 'Taken down successfully'
    })
}

module.exports = build => build({
    name: 'Take down survey',
    method: 'delete',
    fn: catchErrorWithSession(takedownSurvey), 
    middlewares: [verifySession],
    path: '/admin/takedown-survey/:reportId'
})