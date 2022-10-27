class BaseError extends Error {

    constructor( message,statusCode) {
        super(message)
        this.error = message
        this.statusCode = statusCode
    } 
}

function returnError(req,res,next,baseError){
    next(baseError,req,res,next)
}
module.exports.InvalidArgument = (req,res,next,message) => returnError(req,res,next,(new BaseError(message+' is not speificed',400)))

