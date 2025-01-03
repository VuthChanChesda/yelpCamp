const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true },
});

UserSchema.plugin(passportLocalMongoose);//auto create username and password fild for us

module.exports = mongoose.model('User', UserSchema);
