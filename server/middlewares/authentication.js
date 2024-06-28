const { validateToken } = require("../services/authentication");


function checkForAuthenticationAndCookie(cookieName) {
    return (req, res, next) =>{
        const token = req.cookie[cookieName];
        if(!token){
            return next();
        }
        try {
            const userPayload = validateToken(token);
            req.user = userPayload
        } catch (error) {
            console.log(error);
        }
        next();
    }
}

module.exports = {
    checkForAuthenticationAndCookie
}