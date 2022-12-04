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