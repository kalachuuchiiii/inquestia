const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const {  catchErrorWithSession } = require("../../../../utils/errorHandlers/catchError");
const { modifyTransaction } = require("../utils/modifyTransaction");



const builder = (build) =>
  build({
    name: "Reject_Transaction",
    fn: catchErrorWithSession(modifyTransaction("rejected")),
    method: "patch",
    path: '/transaction/reject/:resourceId',
    middlewares: [verifySession, verifyObjectId],
  });

  module.exports = builder;