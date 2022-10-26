/* eslint-disable no-undef */
const express = require('express');

module.exports.argsError = (next,errorMessage)=>{
    console.log('POST /images: error '+errorMessage);
    return next(new express.InvalidArgumentError(errorMessage));
}
var router = express.Router()

router.post('/login', (req, res,next)=>{
    console.log(req+res+next)
});

module.exports.router = router
