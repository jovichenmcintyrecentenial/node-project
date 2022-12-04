var mongoose = require ('mongoose');
const Double = require('@mongoosejs/double');
const userSchema = require('./schemas/userSchema');
//define user schema with createAt and updateAt timestamps
var TestSchema = new mongoose.Schema({
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
    health_worker: {
        type: Object,
        // required: [true, 'notes required'],
    },
},{timestamps: true});

//compiles the schema into a model.
// const TestsModel = mongoose.model('TestsModel', testSchema);

const Evaluation = {
    NeedsMonitoring: 'NEEDS_MONITORING',
    Emergency: 'EMERGENCY',
    Normal: 'NORMAL'
}

class Tests {

    static evalBloodOxygenCondition(blood_oxygen_level){

        if(blood_oxygen_level < 0){
            return null
        }
        
        if(blood_oxygen_level >= 95){
            return Evaluation.Normal
        }
        else if(blood_oxygen_level >= 92){
            return Evaluation.NeedsMonitoring
        }
        
        return Evaluation.Emergency
    }

    static evalRespirtoryRate(breaths_per_min){

        if(breaths_per_min < 0){
            return null
        }
        
        if(breaths_per_min >= 30) {
            return Evaluation.Emergency
        }
        if(breaths_per_min >= 25) {
            return Evaluation.NeedsMonitoring
        }
        else if(breaths_per_min >= 12){
            return Evaluation.Normal
        }
            
        return Evaluation.NeedsMonitoring
    }

    static evalHeartRate(bpm) {

        if(bpm < 0){
            return null
        }

        if(bpm >= 110){
            return Evaluation.Emergency
        }
        else if(bpm >= 100) {
            return Evaluation.NeedsMonitoring
        }
        else if(bpm >= 60) {
            return Evaluation.Normal
        }
        else if(bpm <= 30) {
            return Evaluation.Emergency
        }
        
        return Evaluation.NeedsMonitoring
    }

    static evalBloodPressure(systolic_pressure, diastolic_pressure) {

        if(systolic_pressure >= 180 && diastolic_pressure >= 120) {
            return Evaluation.Emergency
        }
        else if(systolic_pressure >= 130 && diastolic_pressure >= 80) {
            return Evaluation.NeedsMonitoring
        }
        else if(systolic_pressure <= 90 && diastolic_pressure <= 80) {
            return Evaluation.NeedsMonitoring
        }        
        else if(systolic_pressure <= 129 && diastolic_pressure <= 80) {
            return Evaluation.Normal
        }


        return null
    }
}

module.exports = TestSchema;
module.exports.Tests = Tests;
module.exports.Evaluation = Evaluation;




