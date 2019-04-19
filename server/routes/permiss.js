
var express = require('express');
var router = express.Router();
var Permiss = require('../controllers/permissController');
router.post('/permissList.json', Permiss.list);
module.exports = router;

