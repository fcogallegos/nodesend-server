const multer = require('multer');
const shortid = require('shortid');

const configurationMulter = {
    limits: { fileSize: 1000000 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'/../uploads')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    })    
}

const upload = multer(configurationMulter).single('file');

exports.uploadFile = async (req, res, next) => {

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

}