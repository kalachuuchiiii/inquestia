const { verifySession } = require("../../../../middlewares/verification/verifySession")
const { catchError } = require("../../../../utils/errorHandlers/catchError")
const multer = require('multer')
const storage = multer.memoryStorage();

const upload = multer({
    storage
})


const Feedback = require('../../../../models/feedback');
const { uploadImage } = require('../../../../config/cloudinary/utils');

const submitFeedback = async(req, res) => {
    const { feedbackType, message } = req.body;
    const { verifiedUser } = req;
    let attachments = [];

    if (req.files && Array.isArray(req.files)) {
        for (const file of req.files) {
             const base64DataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            const uploaded = await uploadImage(base64DataUrl, 'feedback-attachments', []);
            attachments.push(uploaded.url);
        }
    } else if (req.file) {
        const baseUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        const uploaded = await uploadImage(baseUrl, 'feedback-attachments', []);
        attachments.push(uploaded.url);
    }

    const feedback = (await new Feedback({
        from: verifiedUser._id,
        feedbackType,
        attachments,
        message
    }).save()
    ).toObject(); 
    feedback.from = { 
        ...feedback.from, 
        username: verifiedUser.username
    }

    return res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully!',
        feedback
    });
}



module.exports = build => build({ 
    name: 'Submit feedback', 
    path: '/feedback', 
    method: 'post', 
    fn: catchError(submitFeedback), 
    middlewares: [verifySession, upload.array('attachments', 3)]
})