
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
            author: '6778c605727281c3a37a1d7b',
            location : `${city[random1000].city}, ${city[random1000].state}`
            ,
            title : `${sample(descriptors)} ${sample(places)}`
            ,
            imgs: [
                {
                    url: 'https://res.cloudinary.com/dt6kuwk1c/image/upload/v1736127124/YelpCamp/vmckqa7lmvbuyeqctpbx.jpg',
                    filename: 'YelpCamp/vmckqa7lmvbuyeqctpbx'
                },
                {
                    url: 'https://res.cloudinary.com/dt6kuwk1c/image/upload/v1736127127/YelpCamp/ucowydheesxpsr7miabb.jpg',
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