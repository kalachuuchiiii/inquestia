const Survey = require('../../../../models/survey.js');
const mongoose = require('mongoose');
const { getNextPage } = require('../../../../utils/getNextPage.js');
const { verifySession } = require('../../../../middlewares/verification/verifySession.js');
const { getPageParam } = require('../../../../middlewares/pagination/getPageParam.js');
const { catchError } = require('../../../../utils/errorHandlers/catchError.js');

const getSurveyList = async(req, res) => {
  const { skip, limit, page } = req.paginationParams;
  const { interests } = req.verifiedUser;
  const { seenSurveys = [] } = req.query;
  
  if(!Array.isArray(seenSurveys)){
    return res.status(400).json({
      success: false, 
      message: 'Seen surveys must be an array.'
    })
  }
  const alreadySeenSurveysIds = seenSurveys.map(({_id}) => mongoose.Types.ObjectId(_id));
  
  
  const [totalSurveys, surveys] = await Promise.all([
    Survey.countDocuments({
    hasReachedTargetRespondents: false,
        tags: {
          $in: interests
        },
        closed: false
  }), 
  Survey.aggregate([
  {
    $match: {
      hasReachedTargetRespondents: false,
      tags: { $in: interests },
      _id: { $nin: alreadySeenSurveysIds },
      closed: false
    }
  },
  {
    $addFields: {
      randomSeed: { $rand: {} }
    }
  },
  {
    $sort: {
      randomSeed: 1
    }
  },
  {
    $skip: skip
  },
  {
    $limit: limit
  },
  {
    $lookup: {
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'user'
    }
  },
  {
    $unwind: '$user'
  }, 
  {
    $project: {
      title: 1, 
      description: 1, 
      questions: 1, 
      tags: 1, 
      targetRespondents: 1, 
      createdAt: 1, 
      user: {
        username: 1, 
        nickname: 1, 
        avatar: 1
      }
    }
  }
])
    ])
    
    const nextPage = getNextPage(totalSurveys, page, limit);
    console.log(page, nextPage, totalSurveys);
  
    return res.status(200).json({
      success: true, 
      surveys,
      nextPage
    })
}

module.exports = build => build({
  name: 'get', 
  method: 'get', 
  path: '/survey', 
  middlewares: [verifySession, getPageParam],
  fn: catchError(getSurveyList)
})