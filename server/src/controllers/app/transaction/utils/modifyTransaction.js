const { uploadImage } = require("../../../../config/cloudinary/utils");
const { corePerAmount } = require("../../../../data/limit");
const Notification = require("../../../../models/notification");
const Transaction = require("../../../../models/transaction");
const { sendEmail } = require("../../../../utils/email/sendEmail");

const fs = require('fs')




exports.modifyTransaction =  (newStatus = "rejected") => {
    return async (req, res, next, commit) => {
        const { verifiedId, verifiedUser } = req;
        const photoProof = req?.file?.buffer || null;
        const { session } = req;

        if (verifiedUser.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: "You're not authorized for this request.",
            });
        }

        const transac = await Transaction.findById(verifiedId).populate("candidate", 'username');
        if (!transac) {
            return res.status(400).json({
                success: false,
                message: "Transaction not found.",
            });
        }

        if (transac.status === newStatus) {
            return res.status(400).json({
                success: false,
                message: `Transaction is already ${newStatus}`,
            });
        }

      

        if (newStatus === "rejected") {
            transac.status = "rejected";
            await new Notification({
                action: 'transaction-rejected', 
                receiver: transac.candidate._id, 
                sender: verifiedUser._id.toString(), 
                resourceId: transac._id
            }).save({ session })
            await transac.save({ session });
            sendEmail({
                to: transac.candidate.email,
                subject: "Prepaid Load Conversion Request Rejected",
                html: `
                    <div style="font-family: Arial, sans-serif;">
                        <h2 style="color:#e11d48;">Your Prepaid Load Conversion Request Has Been Rejected</h2>
                        <p>Hi ${transac.candidate?.nickname || transac.candidate?.username},</p>
                        <p>We regret to inform you that your recent application for prepaid load conversion has been <b>rejected</b>.</p>
                        <p><b>Transaction ID:</b> <span style="color:#6366f1;">${transac._id}</span></p>
                        <p><b>Reason for rejection:</b></p>
                        <ul>
                            <li>Unethical behavior or violation of platform rules</li>
                            <li>Spamming or submitting multiple requests in a short period</li>
                            <li>Posting nonsensical or irrelevant topics</li>
                        </ul>
                        <p>Please review our guidelines and ensure future requests are made in good faith and with meaningful participation.</p>
                        <p>If you believe this was a mistake, you may contact support for further clarification.</p>
                        <br>
                        <p style="color:#555;">Thank you for understanding,<br>The Inquestia Team</p>
                    </div>
                `,
            });
            await commit();
            return res.status(200).json({
                success: true,
                message: 'Rejected successfully!'
            })
        }

       

        if (newStatus === "fulfilled") {
              if(!photoProof){
            return res.status(400).json({
                success: false, 
                message: 'A Proof is expected.'
            })
         }
            const totalCost = transac.amount * corePerAmount;
            const isAfford = transac.candidate.core.current >= totalCost;
            if (!isAfford) {
                return res.status(400).json({
                    success: false,
                    message: "Candidate's core is not enough.",
                });
            }
            const base64String = `data:${req.file.mimetype};base64,${photoProof.toString('base64')}`;
            transac.status = "fulfilled";
            transac.candidate.core.current -= totalCost;
            const { url: photoProofUrl} = await uploadImage(base64String, 'proofs', []);
            
        if(!photoProofUrl){
            return res.status(400).json({
              success: false,
              message: "A Proof is expected.",
            });
        }
            transac.photoProof = photoProofUrl;
            await transac.candidate.save({ session });
            await transac.save({ session });

                await new Notification({
                action: 'transaction-fulfilled', 
                receiver: transac.candidate._id, 
                sender: verifiedUser._id.toString(), 
                resourceId: transac._id
            }).save({ session })
           
            

            await sendEmail({
                to: transac.candidate.email,
                subject: "Prepaid Load Conversion Request Fulfilled",
                html: `
                    <div style="font-family: Arial, sans-serif;">
                        <h2 style="color:#22c55e;">Your Prepaid Load Conversion Request Has Been Fulfilled</h2>
                        <p>Hi ${transac.candidate?.nickname || transac.candidate?.username},</p>
                        <p>We are pleased to inform you that your request for prepaid load conversion has been <b>approved and fulfilled</b>.</p>
                        <img src = '${photoProofUrl}' />
                        <p><b>Transaction ID:</b> <span style="color:#6366f1;">${transac._id}</span></p>
                        <p>The amount of ₱${transac.amount} will be sent to your mobile number: <b>${transac.phoneNumber}</b>.</p>
                        <p>If you have any questions or concerns, feel free to contact support.</p>
                        <br> 
                        <p style="color:#555;">Thank you for using Inquestia,<br>The Inquestia Team</p>
                    </div>
                `
            });
             await commit();
            return res.status(200).json({
                success: true, 
                message: 'Fulfilled successfully!'
            })
        }

      
    };
};