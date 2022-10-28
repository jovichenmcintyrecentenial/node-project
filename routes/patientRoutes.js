//import express
const express = require('express');
//create router to append routes to
const router = express.Router();

//get handlers from controllers
const {gaurd} = require('./../controllers/authenicationController');
const {addPatient,getAllPatients, getPatient} = require('./../controllers/patientController');

//add token check handler
router.use(gaurd);
//anything route below this point request a token to function

router.post('/patients', addPatient);
router.get('/patients', getAllPatients);
router.get('/patients/:id', getPatient);

module.exports.patientRoutes = router

