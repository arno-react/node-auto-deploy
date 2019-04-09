
var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController');

router.post('/login.json', Auth.login);
router.post('/checkUserName.json', Auth.checkUserName);
router.post('/register.json', Auth.register);
router.post('/logout.json', Auth.logout);
module.exports = router;

