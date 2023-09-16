const jwt = require('jsonwebtoken');
require('dotenv').config();
function generateVerificationToken(Phonenumber) {
    return jwt.sign(Phonenumber, process.env.JWT_SECRET);
}

function verifyToken(token) {
    try{
        return jwt.verify(token, process.env.JWT_SECRET);// returns the user id
    }catch(err){
        throw err;
    }
}

module.exports = {
    generateVerificationToken,verifyToken
};
