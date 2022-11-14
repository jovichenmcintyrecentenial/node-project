//get imports
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const error = require('./../utils/errors.js')
//promisify used to make function that usually use a callback only become awaitable
const { promisify } = require('util');

module.exports.getUserMyActivities = async (req, res, next) => {
    
    //find user recent activty in database based on user id
    User.findOne({ _id: req.userId }).select('+activities').exec(function (error, user) {
        
        //if error return the error response
        if (error) return next(new Error(JSON.stringify(error.errors)))

        //if patient found bring patient object
        if (user) {
            console.log(user.activities)
            res.send(user.activities)
        } else 
        //if unable to find patient return 404
        {
            console.log('Not Founded')
            res.send(404)
        }
    })
}

module.exports.getMyUser = async (req, res, next) => {
    
    //find user recent activty in database based on user id
    User.findOne({ _id: req.userId }).select('+activities').exec(function (error, user) {
        
        //if error return the error response
        if (error) return next(new Error(JSON.stringify(error.errors)))

        //if patient found bring patient object
        if (user) {
            console.log(user)
            res.send(user)
        } else 
        //if unable to find patient return 404
        {
            console.log('Not Founded')
            res.send(404)
        }
    })
}

//handler for adding a patient
module.exports.createActivity = async (user_id,activity_type, image, title,related_id) => {
    //extract arguements from request body

    //check if activity_type is define and return error if necessary
    if(activity_type === undefined){
        throw new Error('undefined activity_type');
    }
    //check if title is define and return error if necessary
    if(title === undefined){
        throw new Error('undefined title');
    }
    //check if related_id is define and return error if necessary
    if(related_id === undefined){
        throw new Error('undefined related_id');
    }

    //create new Patient model base on requests information
    var newActivity = {
        activity_type: activity_type,
        image: image,
        title:title,
        related_id: related_id,
    };

    //find user based on email address
    const user = await User.findOne({
        _id: user_id,
    }).select('+activities');

    user.activities.push(newActivity)
    //save new patient data to database
    await user.save();

    return true;
}

