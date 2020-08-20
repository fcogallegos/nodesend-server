const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');


router.post('/',
    [
        check('email', 'Add a valid Email').isEmail(),
        check('password', 'The password cannot be empty').not().isEmpty()
    ],
    authController.authenticateUser
);

router.get('/',
    auth,
    authController.userAuthenticated
);


module.exports = router;