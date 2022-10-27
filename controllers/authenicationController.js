const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const error = require('./../utils/errors.js')

const createToken = (id,name) => {
    return jwt.sign(
        {
            id,
            name,
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

        const user = await User.findOne({
            email,
        });
        console.log(user)
        if(!user || password != user.password){
            console.log('Invalid email or password')
            error.Error(req,res,next,'Invalid email or password')

        }
        else{
            res.send(createToken(user._id,user.name))
        }
    }
}