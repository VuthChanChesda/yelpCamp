
const CampGround = require('../model/campGroundSchema');
const mongoose = require('mongoose');
const city = require('./city');
const {places , descriptors} = require('./seedHelper');
mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp');

const db = mongoose.connection;
db.on('error' , console.error.bind(console , 'connection error:'));
db.once('open' , () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {

    await CampGround.deleteMany({});
    for(let i =0 ; i<50 ; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random() * 2000)
        const camp = new CampGround({

            location : `${city[random1000].city}, ${city[random1000].state}`
            ,
            title : `${sample(descriptors)} ${sample(places)}`
            ,
            img:`https://picsum.photos/400?random=${Math.random()}`,
            price: randomPrice,
            description: 'not yest'
        });
        await camp.save();



    }


};

seedDB().then(() => {
    mongoose.connection.close();
});