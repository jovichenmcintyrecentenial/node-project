
class BaseError {

    constructor( message,statusCode) {
        this.error = message
        this.statusCode = statusCode
    } 
}

function returnError(res,baseError){
    res.status(baseError.statusCode).send(baseError)
}

module.exports.InvalidArgument = (res,message) => returnError(res,(new BaseError(message,400)))

