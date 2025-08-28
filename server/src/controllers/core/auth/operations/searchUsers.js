const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { getPageParam } = require("../../../../middlewares/pagination/getPageParam.js");
const User = require("../../../../models/user.js");
const { allowedUserFields } = require("../../../../data/allowedFields/user.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { getNextPage } = require("../../../../utils/getNextPage.js");

const searchUsers = async (req, res) => {
  const { q = null } = req.params;
  const { limit, skip, page } = req.paginationParams;
  const { verifiedUser } = req;

  if (typeof q !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid Query."
    })
  }

  const query = new RegExp(q, "i");

  const relevancyPipeline = {
    $add: [{
      $cond: [
        {
          $regexMatch: {
            input: "$username",
            regex: query
          }
        }, 10,
        0]
    }, {
      $cond: [
        {
          $regexMatch: {
            input: "$nickname",
            regex: query
          }
        }, 5,
        0]
    }]
  }

  const [users, totalUsers] = await Promise.all([
    User.aggregate([
      {
        $addFields: {
          relevancy: relevancyPipeline,
          hasSimilarInterest: {
            $gt: [
              {
                $size: {
                  $setIntersection: ["$interests", verifiedUser.interests
                  ]
                }
              }, 0
            ]
          }
        }
      },
      {
        $match: {
          relevancy: {
            $gt: 0
          }
        }
      },
      {
        $sort: {
          relevancy: -1
        }
      },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          ...allowedUserFields, 
          bio: 1, 
          hasSimilarInterest: 1, 
          interests: 1
        }
      }
    ]),
    User.aggregate([
      {
        $addFields: {
          relevancy: relevancyPipeline
        }
      },
      {
        $match: {
          relevancy: {
            $gt: 0
          }
        }
      },
      { $count: "totalUsers" }
    ])
  ])
  
  const nextPage = getNextPage(totalUsers.length, page, limit);
  
  return res.status(200).json({
   success: true, 
   users, 
   nextPage,
   totalUsers: totalUsers.length,
   isNoResultsFound: users.length === 0 && totalUsers.length === 0
  })



}


module.exports = build => build({
  name: 'search_users',
  path: '/user/search/:q',
  method: 'get',
  fn: catchError(searchUsers),
  middlewares: [verifySession, catchError(getPageParam)]
})