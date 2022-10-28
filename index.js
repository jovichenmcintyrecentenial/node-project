const errorMiddleware = require('./controllers/errorController.js')
const {userRoutes} = require('./routes/userRoutes.js')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/userModel');

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
server.use(errorMiddleware)