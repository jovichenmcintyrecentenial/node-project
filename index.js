
var utils = require('./utils/utils.js');
var dotenv = require('dotenv')
dotenv.config()
// config settings
const SERVER_NAME = 'care-api';
const PORT = 5000;
const HOST = '127.0.0.1';
 
var restify = require('restify');

//create server
var server = restify.createServer({name: SERVER_NAME});

//list to serve and display avaiblem methods
server.listen(PORT, HOST, function (){
    console.log('Server %s listening at %s', server.name, process.env.SERVER_NAME);
});


server.use(restify.fullResponse()).use(restify.bodyParser());

server.post('/images', function(req, res,next){

    //valid request
    if(req.params.imageId === undefined){
        return utils.argsError(next, 'imageId is not specified');
    }
    else if(req.params.name === undefined){
        return utils.argsError(next, 'name is not specified');
    }

  

});
