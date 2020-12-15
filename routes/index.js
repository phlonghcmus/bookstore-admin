var express = require('express');
var router = express.Router();

const homeController = require('../controllers/homeController.js');
const checkAuth = require('../middleware/check-auth.js');
const passport =require ('../passport/index.js');

router.get('/', homeController.login);
router.get('/orders',checkAuth,homeController.dashboard);
router.post('/login',passport.authenticate('local', { successRedirect: '/orders',failWithError: true}),
function(err, req, res, next) {
    return res.render('index/login', {thongbao: "Tài khoản hoặc mật khẩu không đúng"});
  });
router.get('/logout',checkAuth,homeController.logout);
module.exports = router;
