const jwt = require('jsonwebtoken');
const error = require('./../utils/errors.js')

const createToken = id => {
    return jwt.sign(
        {
            id,
        },
        process.env.JWT_KEY,
        {
            expiresIn: process.env.JWT_EXPIRY,
        },
    );
};

module.exports.login = async (req, res, next) => {
    const{user, email} = req.body;

    if(user === undefined){
        error.InvalidArgument(res,'user')
    }
    else{
        res.send(createToken(user))
    }
}