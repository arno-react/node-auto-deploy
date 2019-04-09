
var express = require('express');
var router = express.Router();
var setting = require('../controllers/settingController');


router.post('/checkGitInfo.json', setting.checkGitInfo);
router.post('/taskDetail.json', setting.taskDetail);
router.post('/addTask.json', setting.addTask);
router.post('/startTask.json', setting.startTask);
router.post('/stopTask.json', setting.stopTask);

module.exports = router;

