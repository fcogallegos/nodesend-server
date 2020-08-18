const express = require('express');
const conectDB = require('./config/db');

//create the server
const app = express();

//conect to DB
conectDB();

// port of the app
const port = process.env.PORT || 4000;

//routes of the app
app.use('/api/users', require('./routes/users'));

// run the app
app.listen(port, '0.0.0.0', () => {
    console.log(`The server is running on the port ${port}`);
})