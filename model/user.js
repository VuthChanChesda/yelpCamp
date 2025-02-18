const mongoose = require('mongoose');
const { use } = require('passport');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    
    email: {
        type: String,
        unique: true,
        required: true },
    name: {
        type: String,
        required: false
    },

    agreeToTerms: {
        type: Boolean,
        required: true
    },
    username: {
        type: String,
        required: false
    }

});

UserSchema.plugin(passportLocalMongoose);//auto create username and password fild for us

module.exports = mongoose.model('User', UserSchema);

