const { getPageParam } = require("../../../../middlewares/pagination/getPageParam");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Survey = require("../../../../models/survey");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { getBadgeByPoint } = require("../../../../utils/getBadgeByPoint");


const getSharedSurveys = async(req, res) => {
    const { verifiedUser } = req;
    const { skip, limit } = req.paginationParams;
    
    const filter = { authorizedViewers: String(verifiedUser._id) };
    let [sharedSurveys, totalSharedSurveys] = await Promise.all([
      Survey.find(filter)
        .skip(skip)
        .limit(limit)
        .populate("user", "avatar username nickname core").lean(),
      Survey.countDocuments(filter),
    ]);

    sharedSurveys = sharedSurveys.map((surv) => {
        return {
            ...surv,
            user: {
                ...surv.user,
                badge: getBadgeByPoint(surv?.user?.core?.current || 50)
            }
        }
    })

    const nextPage = req.getNextPage(totalSharedSurveys);

    return res.status(200).json({
        success: true,
        nextPage,
        sharedSurveys,
        totalSharedSurveys
    })
}

module.exports = build => build({
    name: 'get shared surveys',
    path: '/survey-shared',
    middlewares: [verifySession, getPageParam],
    fn: catchError(getSharedSurveys),
    method: 'get'
})