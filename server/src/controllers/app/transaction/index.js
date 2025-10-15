

const Controller = require("../../utils/createCRUD/index.js");


const surveyController = Controller('Transaction');
const { build, getRouter } = surveyController;

require("./operations/createTransaction.js")(build);
require("./operations/rejectTransaction.js")(build);
require("./operations/fulfillTransaction.js")(build);
require("./operations/cancelTransaction.js")(build)
require("./operations/getTransactionList.js")(build)
require("./operations/getAllTransactions.js")(build)
require("./operations/viewTransaction.js")(build)

// Add more operations here as needed

module.exports = getRouter();