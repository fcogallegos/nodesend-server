const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});


const conectDB = async () => {


    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB Conected');
    } catch (error) {
        console.log("There was an error");
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectDB;