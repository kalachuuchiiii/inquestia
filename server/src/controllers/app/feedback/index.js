const Controller = require("../../utils/createCRUD");


const { build, getRouter } = Controller('Feedback'); 

require('./operations/submitFeedback')(build)

require('./operations/getFeedback')(build)
require('./operations/getFeedbackList')(build);



module.exports = getRouter();