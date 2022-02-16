const mongoose = require('mongoose');


const connectToMongo = () => {
    console.log('DB started');
    mongoose.connect(process.env.MONGODB_URL, {
        autoIndex: true
    })
}

module.exports = connectToMongo;