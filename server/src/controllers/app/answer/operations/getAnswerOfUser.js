const Answer = require("../../../../models/answer.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { getPageParam } = require("../../../../middlewares/pagination/getPageParam.js");

const getAnswersOfUser = async(req, res) => {
  const { verifiedUser } = req; 
  const { skip, limit, page } = req.paginationParams; 
  
  const [answers, totalAnswers] = await Promise.all([
    Answer.find({ user: verifiedUser._id }).sort({createdAt: -1}).skip(skip).limit(limit).populate({
      path: "survey", 
      model: "Survey"
    }).lean(), 
    Answer.countDocuments({ user: verifiedUser._id})
    ])
    
    const nextPage = req.getNextPage(totalAnswers);
    const properUser = verifiedUser.toObject();
    delete properUser.password;
    
    const answerListWithUser = answers.map((ans) => ({...ans, user: properUser}));
    
    return res.status(200).json({
     success: true, 
     nextPage, 
     answers: answerListWithUser,
     totalAnswers
    })
}

module.exports = build => build({
  name: "user_answers", 
  path: "/answer/list", 
  method: "get", 
  middlewares: [verifySession, getPageParam],
  fn: catchError(getAnswersOfUser)
})