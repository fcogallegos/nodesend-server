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

    //console.log(req.body);

    //create a link object
    const { original_name, name } = req.body;
    
    const link = new Links();
    link.url = shortid.generate();
    link.name = name;
    link.original_name = original_name;
    
    //if the user is authenticated
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

//get a listed of all the links
exports.allLinks = async (req, res) => {
    try {
        const links = await Links.find({}).select('url -_id');
        res.json({links});
    } catch (error) {
        console.log(error);
    }
}

// return if the links has password or not
exports.hasPassword = async (req, res, next) => {
    //console.log(req.params.url);
    const { url } = req.params;

    //verify if exist the link
    const link = await Links.findOne({url});

    if(!link) {
        res.status(404).json({msg: 'That link does not exist'});
        return next();
    }

    if(link.password) {
        return res.json({ password: true, link: link.url });
    }

    next();
}

// Verify if the password is correct
exports.verifyPassword = async (req, res, next) => {
    
    const { url } = req.params;
    const { password } = req.body;

    
    // consult for the Link
    const link = await Links.findOne({url});

    // verify the password
    if(bcrypt.compareSync( password, link.password )) {
        // allow download the file
        next();
    } else {
        return res.status(401).json({msg: 'Incorrect Password'})
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
    res.json({file: link.name, password: false});

    next();
}