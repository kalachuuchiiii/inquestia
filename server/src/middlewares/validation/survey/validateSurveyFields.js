const { catchError } = require("../../../utils/errorHandlers/catchError.js");
const { bodyValidator } = require("../../../utils/schema/bodyValidator.js");
const { getValidInterestTags } = require('../../../utils/schema/getValidInterestTags.js');
exports.validateSurveyFields = catchError(async(req, res, next) => {
  const { survey = {} } = req.body; 
  console.log('raw',survey.tags)
  if(!survey){
    return res.status(400).json({
      success: false, 
      message: 'Survey is undefined.'
    })
  }
  const fields = {
    title: survey?.title || '', 
    description: survey?.description || '', 
    targetRespondents: survey?.targetRespondents || 3, 
    tags: survey?.tags || [], 
    questions: survey?.questions || []
  }
  const tagMinMsg = 'You must select at least 1 tag.';
  const tagMaxMsg = 'You can select up to 5 tags.';
  
  const options = {
    title: {
      min: [6, "Survey title must be at least 6 characters long."], 
      max: [80, "Survey title cannot exceed 80 characters."], 
    }, 
    description: {
    min: [10, "Survey description must be at least 10 characters long."], 
    max: [150, "Survey description cannot exceed 150 characters."], 
    }, 
    targetRespondents: {
      type: 'number', 
      min: [3, "Target respondents must be at least 3."], 
      max: [1000, "Target respondents cannot exceed 1000."]
    }, 
    tags: {
      type: 'array', 
      min: [1, tagMinMsg], 
      max: [5, tagMaxMsg]
    }, 
    questions: {
      type: 'array', 
      min: [1, 'A survey must contain at least 1 question'], 
      max: [8, 'A survey can only contain 8 questions at most.']
    }
  }
  
  
  const { error, title, description, tags, targetRespondents, questions } = bodyValidator(fields, options);
  
  if(error){
    return res.status(400).json({
      success: false, 
      message: error
    })
  }
  

  const { error: tagError, validTags } = bodyValidator({
    validTags: getValidInterestTags(tags)
  }, {
    validTags: {
      type: 'array', 
      min: [1, tagMinMsg], 
      max: [5, tagMaxMsg]
    }
  });
  
  if(tagError){
    return res.status(400).json({
      success: false, 
      message: tagError
    })
  }
  
  

const validQuestions = [];
for(const q of questions){
  if(typeof q?.type !== 'string' || !q?.type){
    return res.status(400).json({
      success: false, 
      message: 'Invalid type'
    })
  }
  const invalTypeMsg = `${q?.type || ''} is an invalid type`
  const type = q?.type?.trim()?.toLowerCase();
  let { error: questionError, question } = bodyValidator({
    question: q?.question || '',
  }, {
    question: {
      min: [6, 'Question must be at least 6 characters long.'], 
      max: [100, 'Question cannot exceed 100 characters.'],
    }
  })
  if(questionError){
    return res.status(400).json({
      success: false, 
      message: questionError
    })
  }
  
  let { isRequired = false } = q;
  if(typeof isRequired !== 'boolean'){
    return res.status(400).json({
      success: false, 
      message: 'isRequired must be a boolean.'
    })
  }
  const validTypes = ['select', 'text'];
  
  if(!validTypes.includes(type)){
    return res.status(400).json({
      success: false, 
      message: 'Invalid type'
    })
  } 
  
  if(type === 'text'){
    validQuestions.push({ ...q, type, isRequired });
    continue;
  };
  
  const { choices, error:choicesError } = bodyValidator({
    choices: q?.choices || []
  }, {
    choices: {
      type: 'array',
      min: [2, 'You must at least 2 choices.'], 
      max: [8, 'You can only add up to 8 choices.']
    }
  })
  
  if(choicesError){
    return res.status(400).json({
      success: false, 
      message: choicesError
    })
  }
  
  for(const c of choices){
    const { choice, error: choiceError } = bodyValidator({
      choice: c || ''
    }, {
      choice: {
        min: [1, 'Each choice must contain at least 1 character.'],
      max: [30, 'Each choice cannot exceed 30 characters.']
      }
    });
    
    if(choiceError){
      return res.status(400).json({
      success: false, 
      message: choiceError
    })
    }
  }
  
  
  
  const { multipleChoice = false } = q;
  
  validQuestions.push({ question, type, multipleChoice, choices, isRequired });
  continue;
};
  
  req.verifiedSurvey = {
    title, 
    description, 
    targetRespondents, 
    tags: validTags, 
    questions: validQuestions
  }

next();
})