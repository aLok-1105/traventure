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

module.exports = {
    createToken,
    validateToken
}
