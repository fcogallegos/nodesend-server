const User = require('../models/User');


exports.authenticateUser = async (req, res, next) => {

    //check if there are errors

    //search the user for see if is registered
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

    if(!user) {
        res.status(401).json({ msg: 'The User is not exist' });
        return next(); //stop the execution
    }

    //verify the password and authenticate the user
    console.log('The User if exists');
}

exports.userAuthenticated = async (req, res) => {

} 
