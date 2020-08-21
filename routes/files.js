const express = require('express');
const router = express.Router();
const filesController = require('../controllers/filesController');
const auth = require('../middleware/auth');

//uploads of files
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

router.post('/',
    upload.single('file'),
    filesController.uploadFile
);

router.delete('/:id',
    filesController.deleteFile
);


module.exports = router;