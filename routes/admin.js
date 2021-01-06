const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const multer  = require('multer')

const upload = multer({ dest: 'public/uploads/' ,fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }})

router.get('/', ensureLoggedIn("/login"), adminController.detail);
router.post('/update',ensureLoggedIn("/login"),upload.single('avatar'),adminController.update);

module.exports = router;