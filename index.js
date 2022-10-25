/* eslint-disable no-undef */
// config settings

const SERVER_NAME = 'care-api';
const PORT = 5000;
const HOST = '127.0.0.1';

var restify = require('restify');

//create server
var server = restify.createServer({name: SERVER_NAME});

//list to serve and display avaiblem methods
server.listen(PORT, HOST, function (){
    console.log('Server %s listening at %s', server.name, server.url);
});


server.use(restify.fullResponse()).use(restify.bodyParser());


