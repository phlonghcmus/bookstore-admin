const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer  = require('multer')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


const upload = multer({ dest: 'public/uploads/' ,fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }})

router.get('/', ensureLoggedIn("/login"), productsController.list);
router.get('/detail/:id', ensureLoggedIn("/login"),productsController.detail);
router.post('/detail/:id/delete', ensureLoggedIn("/login"),productsController.delete);
router.post('/detail/:id/restore', ensureLoggedIn("/login"),productsController.restore);
router.get('/add', ensureLoggedIn("/login"),productsController.addPage);
router.post('/detail/:id/update', ensureLoggedIn("/login"),upload.single('avatar'),productsController.update);
router.post('/add', ensureLoggedIn("/login"),upload.single('avatar') ,productsController.add);
router.get('/category/:id', ensureLoggedIn("/login"),productsController.category);
router.get('/recycle-bin', ensureLoggedIn("/login"),productsController.bin);
router.get('/search', ensureLoggedIn("/login"),productsController.search);
router.get('/category/:id/search', ensureLoggedIn("/login"),productsController.categorySearch);
router.get('/recycle-bin/search', ensureLoggedIn("/login"),productsController.binSearch);
module.exports = router;