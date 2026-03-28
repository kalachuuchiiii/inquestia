const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchErrorWithSession, catchError } = require("../../../../utils/errorHandlers/catchError");
const { modifyTransaction } = require("../utils/modifyTransaction");

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
    storage
})


const builder = build => build({
    name: 'Fulfill transaction', 
    fn: catchErrorWithSession(modifyTransaction('fulfilled')),
    method: 'patch', 
    path: '/transaction/fulfill/:resourceId',
    middlewares: [verifySession, verifyObjectId, upload.single('proof') ]
})

module.exports = builder;