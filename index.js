const express = require('express');
const conectDB = require('./config/db');

//create the server
const app = express();

//conect to DB
conectDB();

// port of the app
const port = process.env.PORT || 12000;

//enable to read the data of a body
app.use( express.json() );

//routes of the app - endpoints
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));

// run the app
app.listen(port, '0.0.0.0', () => {
    console.log(`The server is running on the port ${port}`);
})