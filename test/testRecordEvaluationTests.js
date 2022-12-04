/* eslint-disable no-undef */
require('chai').should();
var expect = require('chai').expect;
const TestSchema = require('../models/testModel');
const {Tests,Evaluation} = require('../models/testModel');

describe('When evaluating blood oxygen condition', function(){

    it('should return NEEDS_MONITORING when blood_oxygen_level >= 92 and < 95', function() {
        expect(Tests.evalBloodOxygenCondition(92)).equal(Evaluation.NeedsMonitoring);
        expect(Tests.evalBloodOxygenCondition(93)).equal(Evaluation.NeedsMonitoring);
        expect(Tests.evalBloodOxygenCondition(94.999999999999)).equal(Evaluation.NeedsMonitoring);
    });

    it('should return EMERGENCY when blood_oxygen_level < 92', function() {
        expect(Tests.evalBloodOxygenCondition(91.9)).equal(Evaluation.Emergency);
        expect(Tests.evalBloodOxygenCondition(85)).equal(Evaluation.Emergency);
    });

    it('should return NORMAL when blood_oxygen_level >= 95', function() {
        expect(Tests.evalBloodOxygenCondition(95)).equal(Evaluation.Normal);
        expect(Tests.evalBloodOxygenCondition(100)).equal(Evaluation.Normal);
    });

    it('should return null when blood_oxygen_level below 0', function() {
        expect(Tests.evalBloodOxygenCondition(-1)).to.be.null;
    });
   
});


describe('When evaluating respirtory rate condition', function(){

    it('should return NEEDS_MONITORING when breaths_per_min >= 25 and <= 30', function() {
        expect(Tests.evalRespirtoryRate(25)).equal(Evaluation.NeedsMonitoring);
        expect(Tests.evalRespirtoryRate(26)).equal(Evaluation.NeedsMonitoring);
        expect(Tests.evalRespirtoryRate(29.9)).equal(Evaluation.NeedsMonitoring);
    });

    it('should return EMERGENCY when breaths_per_min >= 30', function() {
        expect(Tests.evalRespirtoryRate(30)).equal(Evaluation.Emergency);
        expect(Tests.evalRespirtoryRate(40)).equal(Evaluation.Emergency);
    });

    it('should return NORMAL when breaths_per_min >= 12 and <= 25', function() {
        expect(Tests.evalRespirtoryRate(12)).equal(Evaluation.Normal);
        expect(Tests.evalRespirtoryRate(24.9)).equal(Evaluation.Normal);
    });

    it('should return null when breaths_per_min < 0', function() {
        expect(Tests.evalRespirtoryRate(-1)).to.be.null;
    });

   
});


describe('When evaluating heart rate condition', function(){

    it('should return NEEDS_MONITORING when beats_per_minute >= 100 and < 110', function() {
        expect(Tests.evalHeartRate(100)).equal(Evaluation.NeedsMonitoring);
        expect(Tests.evalHeartRate(105)).equal(Evaluation.NeedsMonitoring);
        expect(Tests.evalHeartRate(109.9)).equal(Evaluation.NeedsMonitoring);
    });

    it('should return EMERGENCY when beats_per_minute <= 30', function() {
        expect(Tests.evalHeartRate(26)).equal(Evaluation.Emergency);
    });

    it('should return EMERGENCY when beats_per_minute >= 110', function() {
        expect(Tests.evalHeartRate(110)).equal(Evaluation.Emergency);
        expect(Tests.evalHeartRate(120)).equal(Evaluation.Emergency);
    });


    it('should return NORMAL when breaths_per_min >= 60 and < 110', function() {
        expect(Tests.evalHeartRate(60)).equal(Evaluation.Normal);
        expect(Tests.evalHeartRate(75)).equal(Evaluation.Normal);
        expect(Tests.evalHeartRate(99.)).equal(Evaluation.Normal);

    });

    it('should return null when breaths_per_min < 0', function() {
        expect(Tests.evalHeartRate(-1)).to.be.null;
    });

   
});


describe('When evaluating blood pressure condition', function(){

    it('should return NEEDS_MONITORING', function() {
        expect(Tests.evalBloodPressure(130,85)).equal(Evaluation.NeedsMonitoring);
        expect(Tests.evalBloodPressure(130,81)).equal(Evaluation.NeedsMonitoring);
    });

    it('should return NEEDS_MONITORING', function() {
        expect(Tests.evalBloodPressure(89,70)).equal(Evaluation.NeedsMonitoring);
    });

    it('should return EMERGENCY', function() {
        expect(Tests.evalBloodPressure(180,120)).equal(Evaluation.Emergency);
        expect(Tests.evalBloodPressure(190,125)).equal(Evaluation.Emergency);
    });

    it('should return NORMAL', function() {
        expect(Tests.evalBloodPressure(119,78)).equal(Evaluation.Normal);
        expect(Tests.evalBloodPressure(120,80)).equal(Evaluation.Normal);
    });

    it('should return null', function() {
        expect(Tests.evalBloodPressure(-1)).to.be.null;
    });

   
});

describe('When getting converting Evaluation to int', function(){
    
    it('should return 1', function() {
        expect(Tests.getInt(Evaluation.Normal)).equal(1);
    });

    it('should return 2', function() {
        expect(Tests.getInt(Evaluation.NeedsMonitoring)).equal(2);
    });

    it('should return 3', function() {
        expect(Tests.getInt(Evaluation.Emergency)).equal(3);
    });

    it('should return -1', function() {
        expect(Tests.getInt(null)).equal(-1);
    });


});

describe('When evaluating patient condition', function(){

    it('should return NORMAL', function() {
        var testModel = {
            systolic_pressure: 120,
            diastolic_pressure: 80,
            respiratory_rate:18,
            heartbeat: 61,
            blood_oxygen: 95,
            notes: null,
            health_worker:null
        };

        expect(Tests.getPatientStatus(testModel)).equal(Evaluation.Normal);
        
    });


    it('should return NEEDS_MONITORING', function() {
        
        var testModel = {
            systolic_pressure: 130,
            diastolic_pressure: 85,
            respiratory_rate:18,
            heartbeat: 61,
            blood_oxygen: 95,
            notes: null,
            health_worker:null
        };

        expect(Tests.getPatientStatus(testModel)).equal(Evaluation.NeedsMonitoring);

        testModel.systolic_pressure = 120
        testModel.diastolic_pressure = 80
        testModel.respiratory_rate = 26
        expect(Tests.getPatientStatus(testModel)).equal(Evaluation.NeedsMonitoring);

        testModel.respiratory_rate = 18
        testModel.heartbeat = 101
        expect(Tests.getPatientStatus(testModel)).equal(Evaluation.NeedsMonitoring);

        testModel.blood_oxygen = 93
        testModel.heartbeat = 61
        expect(Tests.getPatientStatus(testModel)).equal(Evaluation.NeedsMonitoring);

        
    });

    it('should return EMERGENCY', function() {
        var testModel = {
            systolic_pressure: 180,
            diastolic_pressure: 121,
            respiratory_rate:18,
            heartbeat: 61,
            blood_oxygen: 95,
            notes: null,
            health_worker:null
        };

        expect(Tests.getPatientStatus(testModel)).equal(Evaluation.Emergency);

        testModel.systolic_pressure = 130
        testModel.diastolic_pressure = 85
        testModel.respiratory_rate = 31
        expect(Tests.getPatientStatus(testModel)).equal(Evaluation.Emergency);

        testModel.respiratory_rate = 26
        testModel.heartbeat = 150
        expect(Tests.getPatientStatus(testModel)).equal(Evaluation.Emergency);

        testModel.blood_oxygen = 60
        testModel.heartbeat = 101
        expect(Tests.getPatientStatus(testModel)).equal(Evaluation.Emergency);
        
    });


});
