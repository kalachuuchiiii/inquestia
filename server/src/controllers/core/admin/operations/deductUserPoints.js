const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Notification = require("../../../../models/notification");
const Report = require("../../../../models/report");
const User = require("../../../../models/user");
const { catchErrorWithSession } = require("../../../../utils/errorHandlers/catchError");


const deductUserPoints = async(req, res, _, commit) => {

    const { verifiedId, verifiedUser, session } = req;
    if(verifiedUser.role !== 'admin'){
        return res.status(401).json({
          success: false,
          message: "You are not authorized for this request.",
        });
    }
    const reportId = req?.body?.reportId;
    const pointsToDeduct = Math.floor(parseInt(req?.body?.pointsToDeduct || 0));

    const [report, user] = await Promise.all([
        Report.findById(reportId), 
        User.findById(verifiedId)
    ])



    if(!report){
      return res.status(400).json({
        success: false,
        message: `Report ${reportId} not found.`,
      });
    }

    if(!user){
        return res.status(400).json({
            success: false,
            message: 'User not found.'
        })
    }

    if(user.core.current < pointsToDeduct){
        return res.status(400).json({
            success: false,
            message: `${user.username} doesn't have enough cores.` 
        })
    }

    user.core.current -= pointsToDeduct;
    report.isResolved = true;
    report.resolveAction = 'Core Deduction';
    await user.save({ session})
    await report.save({ session });
    await new Notification({
      sender: verifiedUser._id,
      receiver: user._id,
      action: "point-deduction",
      resourceId: user._id,
    }).save({
      session,
    });
    await commit();

    return res.status(200).json({
        success: true, 
        message: 'Deducted successfully, remaining core: ' + user.core.current
    })
    



}

module.exports = build => build({
    name: 'DeductUserPoints', 
    fn: catchErrorWithSession(deductUserPoints), 
    middlewares: [verifySession, verifyObjectId],
    path: '/admin/deduct/:resourceId', 
    method: 'patch'
})