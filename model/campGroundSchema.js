const mongoose = require('mongoose');
const Review = require('./reviews')
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url : String,
    filename: String
});
ImageSchema.virtual('thumbnail').get(function(){
   return this.url.replace('/upload', '/upload/w_200'); //resize image to 200px
})
const campGroundSchema = new Schema({
    title: String,
    price: Number,
    imgs: [ ImageSchema ] ,
    description: String,
    location: String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User' //model User
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review' //model Review
    }]
});

campGroundSchema.post('findOneAndDelete', async function (doc){
    if(doc){ // if something is deleted
        await Review.deleteMany({
            _id: { // get id from doc.review -> (camp)
                $in: doc.reviews //find review in camp then delete it
            }
        })
    }
}) // listen to findOneAndDelete on Campground after that delete all reviews (middleware that listen to findOneAndDelete = findByIdAndDelete)

module.exports = mongoose.model('CampGround', campGroundSchema);