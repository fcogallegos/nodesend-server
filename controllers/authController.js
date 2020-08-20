const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const { validationResult } = require('express-validator');

exports.authenticateUser = async (req, res, next) => {

    //check if there are errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //search the user for see if is registered
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //console.log(user);

    if(!user) {
        res.status(401).json({ msg: 'The User is not exist' });
        return next(); //stop the execution
    }

    //verify the password and authenticate the user
    
    if(bcrypt.compareSync(password, user.password)) {
        //create JSON Web Token
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.SECRET, {
            expiresIn: '8h'
        });

        res.json({token});

    } else {
        res.status(401).json({ msg: 'Password incorrect' });
        return next();
    }
}

exports.userAuthenticated = async (req, res, next) => {
    
    res.json({ user: req.user });

} 
