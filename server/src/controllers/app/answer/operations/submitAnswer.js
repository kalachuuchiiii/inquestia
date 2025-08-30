
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchErrorWithSession } = require("../../../../utils/errorHandlers/catchError.js");
const mongoose = require("mongoose");
const Survey = require("../../../../models/survey.js");
const Answer = require("../../../../models/answer.js");
const { monitorStreak } = require("../../../utils/survey/monitorStreak.js");

const submitAnswer = async(req, res, _, commit) => {
  const { verifiedUser } = req;
  const { answers, survey } = req.body;
  const surveyData = await Survey.findById(survey._id); 
  
  if(!surveyData){
    return res.status(400).json({
        success: false,
        message: "Survey not found."
      })
  }
  
  if(surveyData.closed || surveyData.hasReachedTargetRespondents || surveyData.respondents.length >= surveyData.targetRespondents){
    return res.status(400).json({
      success: false, 
      message: "Survey is already closed and/or over."
    })
  }
  
  const plainRespondentIds = surveyData.respondents.map(r => r.toString());
  
  if(plainRespondentIds.includes(verifiedUser._id.toString())){
    return res.status(400).json({
      success: false, 
      message: "You already submitted a response."
    })
  }
  
  const questionIds = surveyData.questions.map(({_id}) => _id.toString());
  
  for(const { type, answer, questionId } of answers){
    if(!questionIds.includes(questionId)){
      return res.status(400).json({
       success: false, 
       message: 'Invalid survey questions.'
      })
    }
    
    const qst = surveyData.questions.find(q => q._id.toString() === questionId);

    if(!qst){
      return res.status(400).json({
        success: false, 
        message: "Invalid survey questions."
      })
    }
    
    if(type === "text" && qst.type === "text"){
      if(typeof answer !== "string"){
        return res.status(400).json({
          success: false, 
          message: "Invalid answer format"
        })
      }
      if(qst.isRequired && answer.length === 0){
        return res.status(400).json({
          success: false, 
          message: "Oops! You missed a required question.4444444"
        })
      }
      
      if(answer.length > 500){
        return res.status(400).json({
          success: false, 
          message: "A text answer can only contain up to 500 characters!."
        })
      }
      
    }
     .2  
      if(type === "select" && qst.type === "select"){
       if(!Array.isArray(answer)){
         return res.status(400).json({
          success: false, 
          message: "Invalid answer format."
        }) 
       }
        if(qst.isRequired && answer.length === 0){
          return res.status(400).json({
          success: false, 
          message: "Oops! You missed a required question."
        })
        }
        
        if(!answer.every(ans => qst.choices.includes(ans))){
          return res.status(400).json({
          success: false, 
          message: "Invalid answer/s."
        })
        }
        
        if(!qst.multipleChoice && answer.length > 1){
          return res.status(400).json({
          success: false, 
          message: "You can only select multiple answers if the questions allows multiple choice."
        })
        }
        
        if(answer.length > 6 && qst.multipleChoice){
          return res.status(400).json({
            success: false, 
            message: "You can only select 6 choices as an answer."
          })
        }

      }
  }
  
  const properFormat = {
    survey: surveyData._id,
    answers: [], 
    user: verifiedUser
  };
  
  for(const qst of surveyData.questions){
    const ans = answers.find(an => an.questionId.toString() === qst._id.toString());
    properFormat.answers.push({ question: qst._id, type: qst.type.trim().toLowerCase(), answer: ans.answer });
  }
  
  const { targetRespondents } = surveyData;
  
  surveyData.respondents.push(new mongoose.Types.ObjectId(verifiedUser._id));
  surveyData.totalRespondents += 1;
  surveyData.hasReachedTargetRespondents = surveyData.totalRespondents >= targetRespondents;
  
  const newAns = new Answer(properFormat);
  const { session } = req;
  
   const { modified } = monitorStreak({ user: verifiedUser });
  if(modified){
    await verifiedUser.save({session});
  }
  await surveyData.save({session});
  const data = await newAns.save({session});
  await commit();
  
  
  
  return res.status(200).json({
   success: true, 
   answerData: data, 
  })
  }
  

module.exports = build => build({
  name: "submit_answer", 
  path: "/answer", 
  method: "post", 
  middlewares: [verifySession],
  fn: catchErrorWithSession(submitAnswer)
})