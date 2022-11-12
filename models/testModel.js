var mongoose = require ('mongoose');
const Double = require('@mongoosejs/double');
//define user schema with createAt and updateAt timestamps
var testSchema = new mongoose.Schema({
    systolic_pressure: {
        type: Double ,
        // required: [true, 'systolic_pressure required'],
    },
    diastolic_pressure: {
        type: Double ,
        // required: [true, 'diastolic_pressure required'],
    },
    heartbeat: {
        type: Double ,
        // required: [true, 'heartbeat required'],
    },
    respiratory_rate: {
        type: Double ,
        // required: [true, 'respiratory_rate required'],
    },
    blood_oxygen: {
        type: Double ,
        // required: [true, 'blood_oxygen required'],
    },
    notes: {
        type: String,
        // required: [true, 'notes required'],
    },
},{timestamps: true});

//compiles the schema into a model.
// const TestsModel = mongoose.model('TestsModel', testSchema);

module.exports = testSchema;
