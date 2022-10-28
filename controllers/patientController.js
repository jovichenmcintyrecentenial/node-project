const error = require('./../utils/errors.js')
const Patient = require('../models/patientModel.js');

module.exports.addPatient = async (req, res, next) => {
    const{firstname, lastname,gender,dob,allergies,conditions} = req.body;

    if(firstname === undefined){
        return error.InvalidArgument(req,res,next,'firstname')
    }
    if(lastname === undefined){
        return error.InvalidArgument(req,res,next,'lastname')
    }
    if(gender === undefined){
        return error.InvalidArgument(req,res,next,'gender')
    }
    if(dob === undefined){
        return error.InvalidArgument(req,res,next,'dob')
    }
    if(allergies === undefined){
        return error.InvalidArgument(req,res,next,'allergies')
    }
    if(conditions === undefined){
        return error.InvalidArgument(req,res,next,'conditions')
    }


    var newPatient = new Patient({
        first_name: firstname,
        last_name: lastname,
        gender: gender,
        dob: dob,
        allergies: allergies,
        conditions: conditions,
    });


    newPatient.save(function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))
        res.status(201).send( result)
    })
}

module.exports.getAllPatients = async (req, res, next) => {

    Patient.find({}).exec(function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))
        res.send(result);
    });

}