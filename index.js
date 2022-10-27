const utils = require('./utils/utils.js')
const error = require('./utils/errors.js')
const errorMiddleware = require('./controllers/errorController.js')
const authController = require('./controllers/authenicationController.js')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

var dotenv = require('dotenv')
dotenv.config()

const express = require('express')

//create server
var server = express();

//list to serve and display avaiblem methods
server.listen(process.env.PORT, process.env.HOST, function (){
    console.log('Server %s listening at %s', server.name, process.env.SERVER_NAME)
})

server.use(bodyParser.json())
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('!!!! Connected to db: ' + process.env.DB_CONNECTION_STRING)
});



server.post('/login', authController.login)
server.use(errorMiddleware)