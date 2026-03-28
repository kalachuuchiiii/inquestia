const { default: mongoose } = require("mongoose");

const statusEnum = [
    'pending', 
    'fulfilled', 
    'rejected'
]


const transactionSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }, 
  photoProof: { 
    type: String, 
    default: null
  }, 
  amount: { 
    type: Number, 
    required: true, 
    default: 0
  }, 
  status: { 
    type: String, 
    enum: statusEnum, 
    default: 'pending'
  }, 
  phoneNumber: {
  type: String,
  required: true,
  validate: {
    validator: function (value) {
      return /^(?:\+63|0)9\d{9}$/.test(value);
    },
    message: props => `${props.value} is not a valid PH mobile number!`
  }
}

})

const Transaction = mongoose.model('Transaction', transactionSchema)

const delTransac = async() => {

}

module.exports = Transaction;