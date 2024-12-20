const mongoose = require('mongoose');
const {string, number} = require("joi");
const {Schema} = mongoose.Schema;

const reviewSchema = new Schema({
    body: string,
    rating: number
});

module.exports = mongoose.model("Review" , reviewSchema);