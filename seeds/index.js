
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
    for(let i =0 ; i<300 ; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random() * 2000)
        const camp = new CampGround({
            author: '677ba8d5eeca819e86bd58a6',
            location : `${city[random1000].city}, ${city[random1000].state}`
            ,
            title : `${sample(descriptors)} ${sample(places)}`
            ,
            geometry: {
                type: 'Point',
                coordinates: [
                    city[random1000].longitude,
                    city[random1000].latitude
                ] // Longitude, Latitude
            },

            imgs: [
                {
                    url: `https://picsum.photos/400?random=${Math.random()}`,
                    filename: 'YelpCamp/vmckqa7lmvbuyeqctpbx'
                },
                {
                    url: `https://picsum.photos/400?random=${Math.random()}`,
                    filename: 'YelpCamp/ucowydheesxpsr7miabb'
                }
            ],
            price: randomPrice,
            description: 'Camping is an outdoor activity where people stay in nature, enjoy activities like hiking or stargazing, and connect with the environment away from daily life.'
        });
        await camp.save();



    }


};

seedDB().then(() => {
    mongoose.connection.close();
});