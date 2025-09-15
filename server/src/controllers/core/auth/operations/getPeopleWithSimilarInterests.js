const { allowedUserFields } = require("../../../../data/allowedFields/user");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const User = require("../../../../models/user");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { getBadgeByPoint } = require("../../../../utils/getBadgeByPoint");


const getPeopleWithSimilarInterests = async (req, res) => {
    const { verifiedUser } = req;
    const users = await User.aggregate([
        { $match: { _id: { $ne: verifiedUser._id } } },
        { $addFields: {
            commonInterests: { $setIntersection: ["$interests", verifiedUser.interests] }
        }}, {
            $match: { commonInterests: { $ne: [] } }
        }, 
        {
            $limit: 10
        },  {
            $project: {
             ...allowedUserFields, commonInterests: 1   }

        }])
        const usersWithBadges = users.map((user) => {
            return {
                ...user, 
                badge: getBadgeByPoint(user.point.current)
            }
        })

    return res.status(200).json({ success: true, users: usersWithBadges } );
}


module.exports = build => build({
    name: 'getPeopleWithSimilarInterests',
    method: 'get',
    fn: catchError(getPeopleWithSimilarInterests),
    path: '/user/similar-interests',
    middlewares: [verifySession]
})