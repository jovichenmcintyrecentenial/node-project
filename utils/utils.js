/* eslint-disable no-undef */
var restify = require('restify');

export function _showArgsError(next,errorMessage){
    console.log('POST /images: error '+errorMessage);
    return next(new restify.InvalidArgumentError(errorMessage));
}