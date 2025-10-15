const { default: mongoose } = require("mongoose");

const feedbackSchema = new mongoose.Schema({ 
    from: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },  
    feedbackType: { 
        type: String, 
        enum: ['suggestion', 'concern', 'help', 'bug', 'account', 'other']
    }, 
    response: {
        type: String
    },
    message: {
    type: String, 
    min: [10, 'Your feedback must contain at least 10 characters.'], 
    max: [1000, 'Feedback must not exceed 1000 characters.']
    }, 
    attachments: [{
        type: String,
        validate: {
            validator: function (v) {
                // Simple URL validation regex
                return /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    }]
}, { 
    timestamps: true
})



const Feedback = mongoose.model('Feedback', feedbackSchema);
const deleteFeed = async() => {
  await Feedback.deleteMany();
}


module.exports = Feedback;