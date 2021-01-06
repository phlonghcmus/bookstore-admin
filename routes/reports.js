var express = require('express');
var router = express.Router();

const reportsController = require('../controllers/reportsController.js');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const passport =require ('../passport/index.js');

router.get('/month',ensureLoggedIn("/login"), reportsController.month);
router.get('/precious',ensureLoggedIn("/login"), reportsController.precious);
router.get('/year',ensureLoggedIn("/login"), reportsController.year);
router.get('/top10',ensureLoggedIn("/login"), reportsController.top);
module.exports = router;