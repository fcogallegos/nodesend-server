const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Links = require('../models/Link');


exports.uploadFile = async (req, res, next) => {

    const configurationMulter = {
        limits: { fileSize: req.user ? 1024 * 1024 *10 : 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`);
            }
        })    
    }
    
    const upload = multer(configurationMulter).single('file');

    upload( req, res, async (error) => {
        console.log(req.file);

        if(!error) {
            res.json({ file: req.file.filename });
        } else {
            console.log(error);
            return next();
        }
    });
}

exports.deleteFile = async (req, res) => {
    console.log(req.file);

    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
        console.log('File deleted');
    } catch (error) {
        console.log(error);
    }
}

// download a file
exports.downloadFile = async (req, res, next) => {

    // Get the link
    const { file } = req.params;
    const link = await Links.findOne({ name: file });

    //console.log(link);

    const downloadFile = __dirname + '/../uploads/' + file;
    res.download(downloadFile);

    // Delete the "File" and the "Input" of Database
    //if the downloads are equals to 1 - remove the input and remove the file
    const { downloads, name } = link;

    if(downloads === 1) {
        console.log('Yes, just there is one');

        //delete the file
        req.file = name;

        //delete the input of database
        await Links.findOneAndRemove(link.id);

        next();
    } else {
        //if the downloads are > to 1 - rest 1
        link.downloads--;
        await link.save();
    }
}