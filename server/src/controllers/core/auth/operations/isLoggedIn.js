const { extractUserFromToken } = require("../../../../middlewares/authorization/extractUserFromToken");
const { catchError } = require("../../../../utils/errorHandlers/catchError")



const isLoggedIn = async(req, res) => {
    
    return res.status(200).json({
        success: true,
        isLoggedIn: true
    })
}

module.exports = build => build({
    path:'/user/is-logged-in',
    method: 'post',
    fn: catchError(isLoggedIn),
    name: 'isLoggedin',
    middlewares: [catchError(extractUserFromToken)]
})