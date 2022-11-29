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

//list to serve and display avaiblem methods
server.listen( process.env.PORT || process.env.MY_PORT, process.env.HOST, function (){
    console.log('Server %s listening at %s', server.name, process.env.SERVER_NAME)
    console.log('%s:%s/%s methods:[POST] ',process.env.HOST,process.env.MY_PORT,'users/login ')  
    console.log('%s:%s/%s methods:[GET, POST]',process.env.HOST,process.env.MY_PORT,'patients')  
    console.log('%s:%s/%s methods:[GET,DELETE,PUT] ',process.env.HOST,process.env.MY_PORT,'patients/{id}')  
    console.log('%s:%s/%s methods:[GET, POST] ',process.env.HOST,process.env.MY_PORT,'patients/{id}/tests')
    console.log('%s:%s/%s methods:[DELETE] ',process.env.HOST,process.env.MY_PORT,'patients/{id}/tests/{id}')  
    console.log('%s:%s/%s methods:[GET] ',process.env.HOST,process.env.MY_PORT,'users/me/activities')  
    console.log('%s:%s/%s methods:[GET] ',process.env.HOST,process.env.MY_PORT,'users/me') 
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