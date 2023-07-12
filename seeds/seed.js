const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected!')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const price = Math.floor((Math.random() * 2000) + 1000) / 100
        const newCamp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${sample(cities).city}, ${sample(cities).state}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas soluta architecto tempore voluptatem quo quis, corrupti aliquid sapiente consequatur nam recusandae dolorem impedit, tempora assumenda perspiciatis iure labore rerum quia? Assumenda possimus obcaecati quos recusandae ex mollitia itaque debitis perspiciatis, ut deserunt ad iste commodi cupiditate! Molestias soluta, corporis saepe ex ab accusamus inventore, magni quisquam officia, dignissimos assumenda obcaecati.',
            price
        })
        await newCamp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})