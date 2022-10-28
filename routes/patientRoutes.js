const express = require('express');
const router = express.Router();
const {gaurd} = require('./../controllers/authenicationController');
const {addPatient,getAllPatients, getPatient} = require('./../controllers/patientController');

router.use(gaurd);

router.post('/patients', addPatient);
router.get('/patients', getAllPatients);
router.get('/patients/:id', getPatient);

module.exports.patientRoutes = router

