
var errorMiddleware = (err, req, res, next) => {
    
    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message,
    });

};

module.exports = errorMiddleware