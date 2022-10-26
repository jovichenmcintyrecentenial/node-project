/* eslint-disable no-undef */
var restify = require('restify');

function argsError(next,errorMessage){
    console.log('POST /images: error '+errorMessage);
    return next(new restify.InvalidArgumentError(errorMessage));
}

module.exports = {argsError}