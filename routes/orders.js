var express = require('express');
var router = express.Router();

const ordersController = require('../controllers/ordersController.js');
const checkAuth = require('../middleware/check-auth.js');
const passport =require ('../passport/index.js');

router.get('/',checkAuth,ordersController.list);
router.get('/orderDetail/:id',checkAuth,ordersController.detail);
router.post('/orderDetail/:id/cancel',checkAuth,ordersController.cancel);
router.post('/orderDetail/:id/next',checkAuth,ordersController.next);
module.exports = router;