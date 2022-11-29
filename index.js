//define imports
const errorMiddleware = require('./controllers/errorController.js')
const {userRoutes} = require('./routes/userRoutes.js')
const {patientRoutes} = require('./routes/patientRoutes.js')
const apiMonitor = require('./controllers/monitorController.js')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
var dotenv = require('dotenv')
const cors = require('cors');
//load environmental varibles from env file
//this contains SERVER_NAME, PORT, HOST, JWT_KEY, JWT_EXPIRY and DB_CONNECTION_STRING
dotenv.config({
    path: './local.config.env'
});


//create server
var server = express();
var port = (process.env.PORT || process.env.MY_PORT)
var host = (process.env.HOST || process.env.MY_HOST)

//list to serve and display avaiblem methods
server.listen( port, process.env.HOST, function (){
    console.log('Server %s listening at %s', server.name, process.env.SERVER_NAME)
    console.log('%s:%s/%s methods:[POST] ',host,port,'users/login ')  
    console.log('%s:%s/%s methods:[GET, POST]',host,port,'patients')  
    console.log('%s:%s/%s methods:[GET,DELETE,PUT] ',host,port,'patients/{id}')  
    console.log('%s:%s/%s methods:[GET, POST] ',host,port,'patients/{id}/tests')
    console.log('%s:%s/%s methods:[DELETE] ',host,port,'patients/{id}/tests/{id}')  
    console.log('%s:%s/%s methods:[GET] ',host,port,'users/me/activities')  
    console.log('%s:%s/%s methods:[GET] ',host,port,'users/me') 
})


server.use(bodyParser.json())
server.use(cors())
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('MongoDB Connection successful')
});

// const User = require('./models/userModel');

// // Creating new patient.
// var newUser = new User({
//     name: 'John Does',
//     job_title: 'Registered Nurse',
//     password: '123456789',
//     email: 'jd@gmail.com'
// });

// // Create the patient and saving to db
// newUser.save(function (error, result) {
//     console.log(error) 
//     console.log(result) 
// })


// server.use(apiMonitor)
server.use(userRoutes)
server.use(patientRoutes)


server.use(errorMiddleware)