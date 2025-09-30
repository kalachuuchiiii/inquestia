const { default: z } = require("zod");
const { use } = require("../../../../config/nodemailer");
const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId")
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const User = require("../../../../models/user");
const { catchError, catchErrorWithSession } = require("../../../../utils/errorHandlers/catchError");
const { sendEmail } = require("../../../../utils/email/sendEmail");
const Report = require("../../../../models/report");


const banDurationSchema = z.number({ required_error: 'Ban Duration is required.'});
const banUser = async (req, res, _, commit) => {
    const { verifiedId, verifiedUser, session } = req;
    const { reportId } = req.body;
    if(verifiedUser.role !== 'admin'){
        return res.status(401).json({
            success: false, 
            message: 'You are not authorized for this request.'
        })
    }

    const report = await Report.findById(reportId).lean();

    if(!report){
        return res.status(400).json({
            success: false, 
            message: `Report ${reportId} not found.`
        })
    }

    const banDuration = banDurationSchema.parse(parseInt(req.body.banDuration))
    
    const userToBan = await User.findById(verifiedId);
    if(!userToBan){
        return res.status(404).json({
            success: false, 
            message: 'User not found'
        })
    }

    if(userToBan.role === 'admin'){
        return res.status(400).json({
            success: false, 
            message: 'You cannot ban an admin.'
        })
    }
    
   
    const { isBanned, remainingBanDurationInDays, remainingBanDurationInHour, remainingBanDurationInMinutes } = isStillBanned(userToBan?.bannedAt, userToBan?.banDuration);

    if(isBanned){     
        const format = `${userToBan.username} is already banned. Remaining time: ${remainingBanDurationInDays} day(s) or ${remainingBanDurationInHour} hour(s) or ${remainingBanDurationInMinutes} minute(s)`;
           return res.status(400).json({
             success: false,
             message: format,
           });
    }

    userToBan.banDuration = banDuration;
    userToBan.bannedAt = new Date();

    report.isResolved = true;
    report.resolveAction = 'Banned';


    await userToBan.save({session});
    await report.save({session})
    await commit();


const banDurationInDays = Math.floor(banDuration / (1000 * 60 * 60 * 24));
const banDurationInHour = Math.floor(banDuration / (1000 * 60 * 60));
const banDurationInMinutes = Math.floor(banDuration / (1000 * 60 ));
 sendEmail({
  to: userToBan.email, 
  subject: "Your Account Has Been Banned",
  html: `
    <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px;">
      <div style="max-width:600px; margin:auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
        <div style="background-color:#ef4444; padding:16px; text-align:center; color:white;">
          <h2 style="margin:0;">Account Ban Notice</h2>
        </div>
        <div style="padding:24px; color:#111827;">
          <p>Hi <strong>${userToBan.username}</strong>,</p>
          <p>
            Your account has been <strong>banned</strong> for 
            <strong>${banDurationInDays} day(s) or ${banDurationInHour} hour(s) or ${banDurationInMinutes} Minute(s)</strong> due to:
          </p>
          <blockquote style="border-left:4px solid #ef4444; padding-left:12px; margin:16px 0; color:#374151;">
            ${report.generalReason}
          </blockquote>
    
        </div>
        <div style="background-color:#f3f4f6; padding:16px; text-align:center; font-size:12px; color:#6b7280;">
          <p>If you believe this was a mistake, contact our support team.</p>
          <p>&copy; ${new Date().getFullYear()} Inquestia.ask. All rights reserved.</p>
        </div>
      </div>
    </div>
  `,
});


    return res.status(200).json({
        success: true, 
        message: 'Banned successfully'
    }
    )
    
}

module.exports = (build) => build({
    name: 'BanUser',
    fn: catchErrorWithSession(banUser),
    path: '/admin/ban/:resourceId', 
    middlewares: [verifyObjectId, verifySession],
    method: 'patch'
})