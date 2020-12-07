var express = require('express');
var router = express.Router();

const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const AuthMiddleWare = require('../middleware/check-auth.js')

router.get('/', homeController.login);
router.get('/dashboard',AuthMiddleWare,homeController.dashboard);
router.post('/login',authController.login);
router.get('/logout',AuthMiddleWare,homeController.logout);
module.exports = router;
