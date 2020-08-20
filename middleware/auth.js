const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(authHeader) {
        //get token
        const token = authHeader.split(' ')[1];

        //check the JWT
        try {
            const user = jwt.verify(token, process.env.SECRET);
            req.user = user;
        } catch (error) {
            console.log(error);
            console.log('JWT is not valid');
        }
    }

    return next();
}