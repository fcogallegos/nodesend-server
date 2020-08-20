const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.authenticateUser = async (req, res, next) => {

    //check if there are errors

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
        
    } else {
        res.status(401).json({ msg: 'Password incorrect' });
        return next();
    }
}

exports.userAuthenticated = async (req, res) => {

} 
