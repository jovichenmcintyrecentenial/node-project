//import express
const express = require('express');
//create router to append routes to
const router = express.Router();

//get handlers from controllers
const {gaurd} = require('./../controllers/authenicationController');
const {updatePatient,addPatient,getAllPatients, getPatient, deletePatient,addPatientsTestRecord, deletePatientTest, updatePatientTest, getPatientsTestRecord} = require('./../controllers/patientController');

//add token check handler
router.use(gaurd);
//anything route below this point request a token to function

//create add patient route
router.post('/patients', addPatient);
//create get all patient route
router.get('/patients', getAllPatients);
//create get patient based on there id route
router.get('/patients/:id', getPatient);
//update patient information
router.put('/patients/:id', updatePatient);
//delete patient
router.delete('/patients/:id', deletePatient);
//add patient test results
router.post('/patients/:id/tests', addPatientsTestRecord);
//add patient test results
router.get('/patients/:id/tests', getPatientsTestRecord);
//delete patient test results
router.delete('/patients/:patient_id/tests/:test_id', deletePatientTest);
//update patient test results
router.put('/patients/:patient_id/tests/:test_id', updatePatientTest);
module.exports.patientRoutes = router

