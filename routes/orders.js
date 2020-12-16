var express = require('express');
var router = express.Router();

const ordersController = require('../controllers/ordersController.js');
const checkAuth = require('../middleware/check-auth.js');
const passport =require ('../passport/index.js');

router.get('/',checkAuth,ordersController.list);
module.exports = router;