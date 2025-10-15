const { default: z } = require("zod");
const { verifyObjectId } = require("../../../../utils/schema/verifyObjectId");
const Survey = require("../../../../models/survey");
const User = require("../../../../models/user");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { verifySession } = require("../../../../middlewares/verification/verifySession");

const usernameSchema = z.string().trim().toLowerCase();

const searchOneUser = async(req, res) => {
    const { verifiedUser } = req;
    const surveyId = verifyObjectId(req?.params?.surveyId);
    const username = usernameSchema.parse(req?.query?.username);

    if(!username){ 
        return res.status(400).json({
            success: false,
             message: 'Username field is empty.'
        })
    }

    const survey = await Survey.findById(surveyId);
    if(!survey ){
        return res.status(400).json({
            success: false,
            message: 'Survey not found.'
        })
    }

    if(survey?.user?.toString() !== verifiedUser._id.toString()){
        return res.status(401).json({
            success: false,
            message: "You're not authorized for this request."
        })
    }

    const user = await User.findOne({ username }).select('avatar username nickname');

    if(!user){
        return res.status(400).json({
            success: false,
            message: `User not found`
        })
    }

    return res.status(200).json({
        success: true, 
        result: user
    })

}

module.exports = build => build({
    name: 'Search one user', 
    fn: catchError(searchOneUser), 
    middlewares: [verifySession], 
    path: '/user/search-one/:surveyId/',
    method: 'get'
})