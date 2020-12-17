const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const checkAuth = require('../middleware/check-auth.js');

router.get('/',checkAuth, usersController.list);
router.get('/userDetail/:id', checkAuth, usersController.detail);
router.get('/userDetail/:id/lock', checkAuth, usersController.lock);
router.get('/userDetail/:id/unlock', checkAuth, usersController.unlock);
router.get('/recycle-bin', checkAuth, usersController.bin);
router.get('/search', checkAuth, usersController.search);
router.get('/recycle-bin/search', checkAuth, usersController.binSearch);

module.exports = router;