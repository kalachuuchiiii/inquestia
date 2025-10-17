const { modelNames } = require("mongoose");
const Report = require("../../../../models/report");


exports.getReportList = (modelName, isResolved = false) => {
    return async (req, res) => {
        const { verifiedUser } = req;
        if(verifiedUser.role !== 'admin'){
            return res.status(401).json({
                success: false, 
                message: 'You are not authorized for this request'
            }
            )
        }
                const { skip } = req.paginationParams;
        const limit = 10;
        const [totalReports, documents] = await Promise.all([
          Report.countDocuments({ "reportedEntity.entity": modelName, isResolved }),
          Report.find({ "reportedEntity.entity": modelName, isResolved })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate([
              { path: "reportedBy", select: "nickname username avatar" },
              { path: "reportedEntity.entityId", model: modelName, select:'-password -email'},
              { path: 'entityOwner', select: 'username streak core nickname avatar '}
            ]),
        ]);

        const nextPage = req.getNextPage(totalReports);

        return res.status(200).json({
            success: true, 
            totalReports, 
            documents, 
            nextPage
        })

    }
}