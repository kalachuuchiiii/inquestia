const User = require("../../../../models/user.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { getBadgeByPoint } = require("../../../../utils/getBadgeByPoint.js");


const getLeaderboard = async (req, res) => {
  const isAllTimeHigh = JSON.parse(req.query.isAllTimeHigh || "false");
  const { verifiedUser } = req;

  const project = {
    $project: {
      avatar: 1,
      core: 1,
      username: 1,
      nickname: 1,
      _id: 1,
      rank: 1,
    }
  };

  const sort = isAllTimeHigh ? { "core.highest": -1 } : { "core.current": -1 };



  const [leaderboard] = await User.aggregate([
    {
      $setWindowFields: {
        sortBy: sort,
        output: {
          rank: { $rank: {} }
        }
      }
    },
    {
      $facet: {
        hallOfFamers: [
          { $sort: { rank: 1 } },
          { $limit: 10 },
          project
        ],
        userRank: [
          { $match: { _id: verifiedUser._id } },
          {  $project: {
            rank: 1, 
            core: 1
          } }
        ]
      }
    }
  ])
   const hallOfFamersWithBadges = leaderboard.hallOfFamers.map((user) => {
    const badge = getBadgeByPoint(user.core.current);
    return {
      ...user, 
      badge
    }
   })

   leaderboard.hallOfFamers = hallOfFamersWithBadges;

  return res.status(200).json({
    success: true,
    leaderboard
  })
}

module.exports = build => build({
  name: "leaderboard",
  method: "get",
  path: '/user/leaderboard',
  fn: catchError(getLeaderboard),
  middlewares: [verifySession]
})