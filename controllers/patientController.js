//define imports
const error = require('./../utils/errors.js')
const Patient = require('../models/patientModel.js');
const { isEmpty } = require('../utils/utils.js');


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
    Patient.findOne({ _id: req.params.id }).exec(function (error, patient) {
        
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