
const utils = require('./utils/utils.js');
const error = require('./utils/errors.js')
const bodyParser = require('body-parser')

var dotenv = require('dotenv')
dotenv.config()

const express = require('express');

//create server
var server = express();

//list to serve and display avaiblem methods
server.listen(process.env.PORT, process.env.HOST, function (){
    console.log('Server %s listening at %s', server.name, process.env.SERVER_NAME);
});

server.use(bodyParser.json())
server.post('/images', function(req, res, next){
    const { imageId, name } = req.body;
    //valid request
    if(imageId === undefined){
        error.InvalidArgument(res,'image')
    }
    else if(name === undefined){
        error.InvalidArgument(res,'image')
    }
    res.send()
});
