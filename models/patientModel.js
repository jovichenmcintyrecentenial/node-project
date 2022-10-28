var mongoose = require ('mongoose');

//define patient schema with createAt and updateAt timestamps
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

//compiles the schema into a model.
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
