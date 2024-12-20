const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campGroundSchema = new Schema({
    title: String,
    price: Number,
    img: String,
    description: String,
    location: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review' //model Review
    }]
});

module.exports = mongoose.model('CampGround', campGroundSchema);