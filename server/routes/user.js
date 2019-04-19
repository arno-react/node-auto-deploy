
var express = require('express');
var router = express.Router();
var User = require('../controllers/userController');

router.post('/userList.json', User.list);
router.post('/userUpdate.json', User.update);
router.post('/userAdd.json', User.add);
router.post('/userDel.json', User.del);
router.post('/permissList.json', User.permissList);
module.exports = router;

