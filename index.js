const express = require('express');
const conectDB = require('./config/db');
const cors = require('cors');

//create the server
const app = express();

//conect to DB
conectDB();

// enable Cors
const optCors = {
    origin: process.env.FRONTEND_URL
}
app.use( cors(optCors) );

// port of the app
const port = process.env.PORT || 4000;

//enable to read the data of a body
app.use( express.json() );

// enable Public Folder
app.use( express.static('uploads') );

//routes of the app - endpoints
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));

// run the app
app.listen(port, '0.0.0.0', () => {
    console.log(`The server is running on the port ${port}`);
})