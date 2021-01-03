const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const checkAuth = require('../middleware/check-auth.js');
const multer  = require('multer')

const upload = multer({ dest: 'public/uploads/' ,fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }})

router.get('/', checkAuth, adminController.detail);
router.post('/update',checkAuth,upload.single('avatar'),adminController.update);

module.exports = router;