const express = require('express');

//create the server
const app = express();


console.log('Starting Node Send');

// port of the app
const port = process.env.PORT || 4000;


// run the app
app.listen(port, '0.0.0.0', () => {
    console.log(`The server is running on the port ${port}`);
})