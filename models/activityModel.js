var mongoose = require ('mongoose');
const Double = require('@mongoosejs/double');
//define user schema with createAt and updateAt timestamps
var activitySchema = new mongoose.Schema({
    activity_type: {
        type: String,
    },
    image: {
        type: String,
    },
    title: {
        type: String,
    },
    related_id: {
        type: String,
    },

},{timestamps: true});

//compiles the schema into a model.
// const TestsModel = mongoose.model('TestsModel', testSchema);

module.exports = activitySchema;
