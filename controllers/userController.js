const User = require('../models/User');

exports.newUser = async (req, res) => {


    //console.log(req.body);

    const user = await new User(req.body);
    user.save();

    res.json({msg: 'User created successfully'});
}