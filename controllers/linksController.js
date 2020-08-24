const Links = require('../models/Link');
const shortid = require('shortid')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');


exports.newLink = async (req, res, next) => {
    
    //verify if there are errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //create a link object
    const { original_name } = req.body;
    
    const link = new Links();
    link.url = shortid.generate();
    link.name = shortid.generate();
    link.original_name = original_name;
    

    if(req.user) {
        const { password, downloads } = req.body;
        
        //assign to link the downloads number
        if(downloads) {
            link.downloads = downloads;
        }
        //assign a password 
        if(password) {
            const salt = await bcrypt.genSalt(10);
            link.password = await bcrypt.hash(password, salt);
        }

        //assign the author
        link.author = req.user.id;
    }

    //save in the database
    try {
        await link.save();
        return res.json({ msg: `${link.url}` });
        next();
    } catch (error) {
        console.log(error);
    }
}

//get the link
exports.getLink = async (req, res, next) => {

    //console.log(req.params.url);
    const { url } = req.params;

    //verify if exist the link
    const link = await Links.findOne({url});

    if(!link) {
        res.status(404).json({msg: 'That link does not exist'});
        return next();
    }

    //if the file exist
    res.json({file: link.name});

    //if the downloads are equals to 1 - remove the input and remove the file

    //if the downloads are > to 1 - rest 1

}