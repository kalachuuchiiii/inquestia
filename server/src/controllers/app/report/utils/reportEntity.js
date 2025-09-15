const { default: z } = require("zod");
const { generalReportReasons } = require("../../../../data/generalReportReasons");
const { default: mongoose } = require("mongoose");
const Report = require("../../../../models/report");

 const reportFormSchema = z.object({
  generalReason: z.enum(generalReportReasons, { message: "Please choose a valid general reason" }),
  specificReason: z
    .string({ required_error: "Specific reason is required" })
    .min(10, { message: "Your reason must be at least 10 characters long" })
    .max(250, {  message: "Please keep your explanation under 250 characters."}),
});

exports.reportEntity = (entity) => {

 return async (req, res) => {
    const Model = mongoose.model(entity);

    const reportForm = reportFormSchema.parse(req.body.reportForm);
    const { verifiedId, verifiedUser } = req;
    const entityToBeReported = await Model.findById(verifiedId).select('-password -email');
    if(!entityToBeReported){
        return res.status(404).json({
            success: false, 
            message: `${entity} not found.`
        });
    }

    const isAlreadyReported = await Report.exists({
      'reportedEntity.entityId': verifiedId,
      reportedBy: String(verifiedUser._id),
    });

    if(isAlreadyReported){
        return res.status(409).json({
            success: false, 
            message: 'You already submitted a report.'
        })
    }

    const entityOwner = {
        User: entityToBeReported?._id, 
        Survey: entityToBeReported?.user
    }


    const newReport = await new Report({
        ...reportForm, 
        reportedEntity: {
            entityId: verifiedId, 
            entity  
        },
        reportedBy: String(verifiedUser._id),
        entityOwner: entityOwner[entity]
    }).save();

    return res.status(200).json({
        success: true, 
        newReport,
        message: 'Successfully reported!'
    })
 }
}