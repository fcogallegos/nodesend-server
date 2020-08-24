const express = require('express');
const router = express.Router();
const linksController = require('../controllers/linksController');
const filesController = require('../controllers/filesController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');


router.post('/',
    [
        check('name', 'upload a file').not().isEmpty(),
        check('original_name', 'upload a file').not().isEmpty()
    ],
    auth,
    linksController.newLink
);

router.get('/:url',
    linksController.getLink,
    filesController.deleteFile
);

module.exports = router;