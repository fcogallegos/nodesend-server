const User = require('../models/User');

exports.newUser = async (req, res) => {


    //verify if the user already exist
    const { email } = req.body;

    let user = await User.findOne({ email });

    if(user) {
        return res.status(400).json({ msg: 'The user already exist' });
    }

    user = await new User(req.body);
    user.save();

    res.json({msg: 'User created successfully'});
}