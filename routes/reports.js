var express = require('express');
var router = express.Router();

const reportsController = require('../controllers/reportsController.js');
const checkAuth = require('../middleware/check-auth.js');
const passport =require ('../passport/index.js');

router.get('/month',checkAuth, reportsController.month);
router.get('/precious',checkAuth, reportsController.precious);
router.get('/year',checkAuth, reportsController.year);
router.get('/top10',checkAuth, reportsController.top);
module.exports = router;