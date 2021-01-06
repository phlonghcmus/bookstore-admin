var express = require('express');
var router = express.Router();

const ordersController = require('../controllers/ordersController.js');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const passport =require ('../passport/index.js');

router.get('/',ensureLoggedIn("/login"),ordersController.list);
router.get('/orderDetail/:id',ensureLoggedIn("/login"),ordersController.detail);
router.post('/orderDetail/:id/cancel',ensureLoggedIn("/login"),ordersController.cancel);
router.post('/orderDetail/:id/next',ensureLoggedIn("/login"),ordersController.next);
module.exports = router;