const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const secret = process.env.SECRET_KEY;

function createToken(user){
    const payload = {
        _id: user._id,
        fullName:user.fullName,
        email:user.email,
        role: user.role
    }
    const token = jwt.sign(payload, secret);
    return token;
}

function validateToken(token){
    const payload = jwt.verify(token, secret);
    return payload;
}


function validateToken1(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.log("error", err);
            return next();
        }
        req.user = user;
        next();
    });
    
}

module.exports = {
    createToken,
    validateToken,
    validateToken1
}
