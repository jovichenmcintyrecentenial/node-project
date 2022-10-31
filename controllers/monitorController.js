
//handler use to help monitor api request and response
var apiMonitor = async (req, res, next) => {
    //display method POST,DELETE,GET or PUT
    console.log('['+req.method+'] request received')
    //display serve and route information
    console.log(process.env.HOST+':'+process.env.MY_PORT+req.originalUrl)
    //display request body
    console.log(isEmpty(req.body)?'':req.body)

    console.log('RESPONSE SENT')

    next()
}
//check if object empty
function isEmpty(object) {  
    return Object.keys(object).length === 0
}

module.exports = apiMonitor