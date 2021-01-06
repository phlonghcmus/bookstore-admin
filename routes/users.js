const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.get('/',ensureLoggedIn("/login"), usersController.list);
router.get('/userDetail/:id', ensureLoggedIn("/login"), usersController.detail);
router.get('/userDetail/:id/lock', ensureLoggedIn("/login"), usersController.lock);
router.get('/userDetail/:id/unlock', ensureLoggedIn("/login"), usersController.unlock);
router.get('/recycle-bin', ensureLoggedIn("/login"), usersController.bin);
router.get('/search', ensureLoggedIn("/login"), usersController.search);
router.get('/recycle-bin/search', ensureLoggedIn("/login"), usersController.binSearch);

module.exports = router;