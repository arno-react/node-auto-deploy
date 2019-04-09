
var express = require('express');
var router = express.Router();
var setting = require('../controllers/settingController');


router.post('/checkGitInfo', setting.checkGitInfo);
router.post('/taskDetail', setting.taskDetail);
router.post('/addTask', setting.addTask);
router.post('/startTask', setting.startTask);
router.post('/stopTask', setting.stopTask);

module.exports = router;

