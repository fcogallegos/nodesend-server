const Links = require('../models/Link');
const shortid = require('shortid')

exports.newLink = async (req, res, next) => {
    
    //verify if there are errors

    //create a link object
    const { original_name, password } = req.body;
    
    const link = new Links();
    link.url = shortid.generate();
    link.name = shortid.generate();
    link.original_name = original_name;
    link.password = password;

    //save in the database
    try {
        await link.save();
        return res.json({ msg: `${link.url}` });
        next();
    } catch (error) {
        console.log(error);
    }
}