const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
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
    const{email, password} = req.body;

    if(email === undefined){
        error.InvalidArgument(req,res,next,'email')
    }
    else if(password === undefined){
        error.InvalidArgument(req,res,next,'password')
    }
    else{
        res.send(createToken(email))
    }
}