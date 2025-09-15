const Survey = require('../../../../models/survey.js');
const mongoose = require('mongoose');
const { getNextPage } = require('../../../../utils/getNextPage.js');
const { verifySession } = require('../../../../middlewares/verification/verifySession.js');
const { getPageParam } = require('../../../../middlewares/pagination/getPageParam.js');
const { catchError } = require('../../../../utils/errorHandlers/catchError.js');
const { allowedSurveyFields } = require("../../../../data/allowedFields/survey.js");

const getSurveyList = async (req, res) => {
  const { skip, limit, page } = req.paginationParams;
  const { interests } = req.verifiedUser;
const { verifiedUser, userAge } = req;
  const seenSurveys = JSON.parse(req?.query?.seenSurveys || "[]");


  const alreadySeenSurveysIds = seenSurveys?.length > 0 ? seenSurveys.map(({ _id }) => mongoose.Types.ObjectId(_id)) : [];



  const [totalSurveys, surveys] = await Promise.all([
    Survey.countDocuments({
      hasReachedTargetRespondents: false,
      tags: {
        $in: interests,
      },
      respondents: {
        $nin: [verifiedUser._id],
      },
      closed: false,
      isDraft: false,
      "ageGroup.minAge": { $lte: userAge },
      "ageGroup.maxAge": { $gte: userAge },
    }),
    Survey.aggregate([
      {
        $match: {
          hasReachedTargetRespondents: false,
          tags: { $in: interests },
          _id: { $nin: alreadySeenSurveysIds },
          "ageGroup.minAge": { $lte: userAge },
          "ageGroup.maxAge": { $gte: userAge },
          respondents: {
            $nin: [verifiedUser._id],
          },
          closed: false,
          isDraft: false,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $addFields: {
          randomSeed: { $rand: {} },
        },
      },
      {
        $sort: {
          randomSeed: 1,
        },
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
  const nextPage = getNextPage(totalSurveys, page, limit);

  return res.status(200).json({
    success: true,
    surveys,
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