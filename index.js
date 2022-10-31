//define imports
const errorMiddleware = require('./controllers/errorController.js')
const {userRoutes} = require('./routes/userRoutes.js')
const {patientRoutes} = require('./routes/patientRoutes.js')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
var dotenv = require('dotenv')

//load environmental varibles from env file
//this contains SERVER_NAME, PORT, HOST, JWT_KEY, JWT_EXPIRY and DB_CONNECTION_STRING
dotenv.config({
    path: './local.config.env'
});


//create server
var server = express();

//list to serve and display avaiblem methods
server.listen(process.env.MY_PORT, process.env.HOST, function (){
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

// const User = require('./models/userModel');

// // Creating new patient.
// var newUser = new User({
//     name: 'jovi',
//     password: '123456789',
//     email: 'jm@gmail.com'
// });

// // Create the patient and saving to db
// newUser.save(function (error, result) {
//     console.log(result)
// })

// server.post('/login', authController.login)
server.use(userRoutes)
server.use(patientRoutes)

server.use(errorMiddleware)