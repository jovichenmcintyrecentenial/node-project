//define imports
const error = require('./../utils/errors.js')
const Patient = require('../models/patientModel.js');
const { isEmpty } = require('../utils/utils.js');
const { Activity } = require('../utils/constants.js');
const { default: mongoose } = require('mongoose');
const { createActivity } = require('./userController.js');


//handler for adding a patient
module.exports.addPatient = async (req, res, next) => {
    //extract arguements from request body
    const{firstname, lastname,gender,dob,allergies,conditions} = req.body;

    //check if firstname is define and return error if necessary
    if(firstname === undefined){
        return error.InvalidArgument(req,res,next,'firstname')
    }
    //check if lastname is define and return error if necessary
    if(lastname === undefined){
        return error.InvalidArgument(req,res,next,'lastname')
    }
    //check if gender is define and return error if necessary
    if(gender === undefined){
        return error.InvalidArgument(req,res,next,'gender')
    }
    //check if dob is define and return error if necessary
    if(dob === undefined){
        return error.InvalidArgument(req,res,next,'dob')
    }
    //check if allergies is define and return error if necessary
    if(allergies === undefined){
        return error.InvalidArgument(req,res,next,'allergies')
    }
    //check if conditions is define and return error if necessary
    if(conditions === undefined){
        return error.InvalidArgument(req,res,next,'conditions')
    }

    //create new Patient model base on requests information
    var newPatient = new Patient({
        first_name: firstname,
        last_name: lastname,
        gender: gender,
        dob: dob,
        allergies: allergies,
        conditions: conditions,
    });

    //save new patient data to database
    newPatient.save(function (error, result) {
        //if error return error
        if (error) return next(new Error(JSON.stringify(error.errors)))
        try {
            //log activity on user activity
            createActivity(
                req.userId,
                Activity.addPatient,
                null,
                newPatient.first_name+' '+newPatient.last_name,
                newPatient._id)
        } catch (error) {
            if (error) return next(new Error(JSON.stringify(error.errors)))
        }
        console.log(result)
        //return newly created patient if added successfully
        res.status(201).send( result)
    })
}

//handler for getting all patient in database
module.exports.getAllPatients = async (req, res, next) => {

    //search for all patient and return an array
    const {query} = req.query 
    //search for all patient and return an array
    Patient.find(query === undefined?{}:
        {$or:[
            {first_name: {$regex : query, $options : 'i'},},
            {last_name: {$regex : query, $options : 'i'},}]
        }).exec(function (error, result) {
        //if error return error
        if (error) return next(new Error(JSON.stringify(error.errors)))
        //return results
        console.log(result)
        res.send(result);
    });

}


//get a single patient information
module.exports.getPatient = async (req, res, next) => {
    //find patient in database based on user id
    Patient.findOne({ _id: req.params.id }).select('+tests').exec(function (error, patient) {
        
        //if error return the error response
        if (error) return next(new Error(JSON.stringify(error.errors)))

        //if patient found bring patient object
        if (patient) {
            console.log(patient)
            res.send(patient)
        } else 
        //if unable to find patient return 404
        {
            console.log('Not Founded')
            res.send(404)
        }
    })
}



//delete a single patient information
module.exports.deletePatient = async (req, res, next) => {

    //if id path no set then return an error
    if(req.params.id === undefined){
        return error.InvalidPath(req,res,next,'id')
    }

    //delete patient in database based on id
    Patient.findOneAndDelete({ _id: req.params.id }).exec(function (error, patient) {
        
        //if error return the error response
        if (error) return next(new Error(JSON.stringify(error.errors)))
        try {
            //log activity on user activity
            createActivity(
                req.userId,
                Activity.addTest,
                null,
                patient.first_name+' '+patient.last_name,
                patient._id)
        } catch (error) {
            if (error) return next(new Error(JSON.stringify(error.errors)))
        }
        //if patient found bring patient object
        if (patient) {
            console.log(patient)
            res.sendStatus(200)
        } else 
        //if unable to find patient return 404
        {
            console.log('Not Found')
            res.sendStatus(404)
        }
    })
}




//update a patient patient information
module.exports.updatePatient = async (req, res, next) => {
    
    //if id path no set then return an error
    if(req.params.id === undefined){
        return error.InvalidPath(req,res,next,'id')
    }
    console.log(req.body)
    if(req.body === undefined || isEmpty(req.body)){
        return error.Error(req,res,next,'no data in body')
    }

    //find and update a patient in database based on user id
    Patient.findOneAndUpdate({ _id: req.params.id },
        req.body,{returnOriginal: false}).exec(function (error, patient) {
        
        //if error return the error response
        if (error) return next(new Error(JSON.stringify(error.errors)))
        try {
            //log activity on user activity
            createActivity(
                req.userId,
                Activity.updatePatient,
                null,
                patient.first_name+' '+patient.last_name,
                patient._id)
        } catch (error) {
            if (error) return next(new Error(JSON.stringify(error.errors)))
        }
        //if patient found bring patient object
        if (patient) {
            console.log(patient)
            res.send(patient)
        } else 
        //if unable to find patient return 404
        {
            console.log('Not Founded')
            res.sendStatus(404)
        }
    })
}

//handler for adding a patient
module.exports.addPatientsTestRecord = async (req, res, next) => {
    //extract arguements from request body
    const{systolic_pressure, diastolic_pressure,heartbeat,respiratory_rate,blood_oxygen,notes} = req.body;

    //check if systolic_pressure is define and return error if necessary
    if(systolic_pressure === undefined){
        return error.InvalidArgument(req,res,next,'systolic_pressure')
    }
    //check if diastolic_pressure is define and return error if necessary
    if(diastolic_pressure === undefined){
        return error.InvalidArgument(req,res,next,'diastolic_pressure')
    }
    //check if heartbeat is define and return error if necessary
    if(heartbeat === undefined){
        return error.InvalidArgument(req,res,next,'heartbeat')
    }
    //check if respiratory_rate is define and return error if necessary
    if(respiratory_rate === undefined){
        return error.InvalidArgument(req,res,next,'respiratory_rate')
    }
    //check if blood_oxygen is define and return error if necessary
    if(blood_oxygen === undefined){
        return error.InvalidArgument(req,res,next,'blood_oxygen')
    }
    //check if notes is define and return error if necessary
    if(notes === undefined){
        return error.InvalidArgument(req,res,next,'notes')
    }


    var newTestsResults = {
        systolic_pressure: systolic_pressure,
        diastolic_pressure: diastolic_pressure,
        respiratory_rate:respiratory_rate,
        heartbeat: heartbeat,
        blood_oxygen: blood_oxygen,
        notes: notes,
    };
    
    await Patient.findOne({ _id: req.params.id }).select('+tests').exec(function (error, patient) {
        
        //if error return the error response
        if (error) return next(new Error(JSON.stringify(error.errors)))

        //if patient found bring patient object
        if (patient) {
            console.log(newTestsResults)
            patient.tests.push(newTestsResults)
        
            //save new patient data to database
            patient.save(function (error, result) {
                //if error return error
                if (error) return next(new Error(JSON.stringify(error.errors)))
                try {
                    //log activity on user activies
                    createActivity(
                        req.userId,
                        Activity.addTest,
                        null,
                        patient.first_name+' '+patient.last_name,
                        patient._id)
                } catch (error) {
                    if (error) return next(new Error(JSON.stringify(error.errors)))
                }
                console.log(result)
                //return newly created test results if added successfully
                res.status(201).send( patient.tests[patient.tests.length-1])
            })
        } else 
        //if unable to find patient return 404
        {
            console.log('Not Founded')
            res.send(404)
        }
    })

  

}