const Survey = require('../../../../models/survey.js');
const mongoose = require('mongoose')
const { verifySession } = require('../../../../middlewares/verification/verifySession.js');
const { getPageParam } = require('../../../../middlewares/pagination/getPageParam.js');
const { catchError } = require('../../../../utils/errorHandlers/catchError.js');
const { allowedSurveyFields } = require("../../../../data/allowedFields/survey.js");
const { default: z } = require('zod');


const seenIdsSchema = z.array(z.string());
const getSurveyList = async (req, res) => {
  const { skip } = req.paginationParams;

  const { interests } = req.verifiedUser;
  const seenIds = seenIdsSchema.parse(
    JSON.parse(req?.query?.seenIds || "[]")
  );
  const { verifiedUser } = req;




  const [totalSurveys, surveys] = await Promise.all([
    Survey.countDocuments({
      hasReachedTargetRespondents: false,
      respondents: {
        $nin: [verifiedUser._id],
      },
      closed: false,
      isDraft: false,
    }),
    Survey.aggregate([
      {
        $match: {
          hasReachedTargetRespondents: false,
          _id: { $nin: seenIds.map((id) => new mongoose.Types.ObjectId(id)) },
          respondents: {
            $nin: [verifiedUser._id],
          },
          closed: false,
          isDraft: false,
        },
      },
      {
        $addFields: {
          algoScore: {
            $add: [
              { $multiply: [{ $rand: {} }, { $add: ["$booster", 1] }] },
              {
                $multiply: [
                  {
                    $rand: {},
                  },
                  {
                    $size: {
                      $setIntersection: ["$tags", verifiedUser.interests],
                    },
                  },
                ],
              },
            ],
          },
        },
      },
      {
        $sort: {
          algoScore: -1,
        },
      },
      {
        $limit: 4,
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: { ...allowedSurveyFields },
      },
    ]),
  ]);
  const nextPage = req.getNextPage(totalSurveys);

  return res.status(200).json({
    success: true,
    surveys,
    totalSurveys,
    nextPage
  })
}

module.exports = build => build({
  name: 'get',
  method: 'get',
  path: '/surveys',
  middlewares: [verifySession, getPageParam],
  fn: catchError(getSurveyList)
})