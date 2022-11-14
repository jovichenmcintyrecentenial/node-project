var mongoose = require ('mongoose');
const activitySchema = require('./activityModel');

//define user schema with createAt and updateAt timestamps
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required'],
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        lowercase: true,
    }, 
    activities: {
        type:[activitySchema],
        select:false
    },
    password: {
        type: String,
        required: [true, 'password required'],
        minLength: 8,
        select: false,
    }, 
},{timestamps: true});

//compiles the schema into a model.
const User = mongoose.model('User', userSchema);

module.exports = User;
