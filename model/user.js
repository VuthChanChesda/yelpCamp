const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const { flat } = require('../seeds/city');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true },
    googleId: {
        type: String,
        unique: true,
        required: false 
    },
    name: {
        type: String,
        required: false
    }

});

UserSchema.plugin(passportLocalMongoose);//auto create username and password fild for us

module.exports = mongoose.model('User', UserSchema);

