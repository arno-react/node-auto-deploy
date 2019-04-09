
var express = require('express');
var router = express.Router();
var home = require('../controllers/homeController');


router.post('/list.json', home.list);
router.post('/delTask.json', home.delTask);
module.exports = router;

