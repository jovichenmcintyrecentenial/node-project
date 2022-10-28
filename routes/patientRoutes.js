const express = require('express');
const router = express.Router();
const {gaurd} = require('./../controllers/authenicationController');
const {addPatient,getAllPatients} = require('./../controllers/patientController');

router.use(gaurd);

router.post('/patients', addPatient);
router.get('/patients', getAllPatients);

module.exports.patientRoutes = router

