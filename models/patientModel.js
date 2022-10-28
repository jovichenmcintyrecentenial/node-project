var mongoose = require ('mongoose');

var patientSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'first_name required'],
    },
    last_name: {
        type: String,
        required: [true, 'last_name required'],
    },
    gender: {
        type: String,
        required: [true, 'gender required'],
    },
    dob: {
        type: Date,
        required: [true, 'dob required'],
    },
    conditions: {
        type: String,
        required: [true, 'conditions required'],
    },
    allergies: {
        type: String,
        required: [true, 'allergies required'],
    },
},{timestamps: true});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
