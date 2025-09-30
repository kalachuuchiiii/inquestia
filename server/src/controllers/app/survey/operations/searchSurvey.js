const Survey = require("../../../../models/survey.js");
const { getPageParam } = require("../../../../middlewares/pagination/getPageParam.js");
const { allowedSurveyFields } = require("../../../../data/allowedFields/survey.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");

const searchSurvey = async (req, res) => {
  const { q = '' } = req.params;
  const { limit, skip, page } = req.paginationParams;

  if (typeof q !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid query."
    })
  }

  const query = new RegExp(q, "i");

  const relevancyPip = {
    $addFields: {
      relevancy: {
        $add: [
          {
            $cond: [
              {
                $regexMatch: {
                  input: "$title",
                  regex: query
                }
              },
              6,
              0
            ]
          },
          {
            $cond: [
              {
                $regexMatch: {
                  input: "$description",
                  regex: query
                }
              },
              4,
              0
            ]
          },
          {
            $cond: [
              { $in: [query.source, "$tags"] },
              8,
              0
            ]
          }
        ]
      }
    }
  }

  const [surveys, totalSurveys] = await Promise.all([
    Survey.aggregate([
      {
        $match: {
          hasReachedTargetRespondents: false,
          closed: false,
          isDraft: false
        }
      },
      relevancyPip,

      {
        $match: {
          relevancy: {
            $gt: 0
          }
        }
      },
      { $sort: { relevancy: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      { $project: { ...allowedSurveyFields } }
    ]),
    Survey.aggregate([
      relevancyPip,
      {
        $match: {
          hasReachedTargetRespondents: false,
          closed: false,
          isDraft: false,
          relevancy: {
            $gt: 0
          }
        }
      }, 
      {
        $count: "totalSurveys"
      }
    ])
  ]);

  const nextPage = req.getNextPage(totalSurveys);

  return res.status(200).json({
    success: true,
    surveys,
    nextPage,
    totalSurveys: totalSurveys.length,
    isNoResultsFound: surveys.length === 0 && totalSurveys.length === 0
  })


}

module.exports = build => build({
  name: 'search_survey',
  path: '/survey/search/:q',
  method: 'get',
  fn: catchError(searchSurvey),
  middlewares: [catchError(getPageParam)]
})