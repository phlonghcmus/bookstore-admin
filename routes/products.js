const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer  = require('multer')
const checkAuth = require('../middleware/check-auth.js');


const upload = multer({ dest: 'public/uploads/' ,fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }})

router.get('/',checkAuth, productsController.list);
router.get('/detail/:id',checkAuth,productsController.detail);
router.post('/detail/:id/delete',checkAuth,productsController.delete);
router.post('/detail/:id/restore',checkAuth,productsController.restore);
router.get('/add',checkAuth,productsController.addPage);
router.post('/detail/:id/update',checkAuth,upload.single('avatar'),productsController.update);
router.post('/add',checkAuth,upload.single('avatar') ,productsController.add);
router.get('/category/:id',checkAuth,productsController.category);
router.get('/recycle-bin',checkAuth,productsController.bin);
router.get('/search',checkAuth,productsController.search);
router.get('/category/:id/search',checkAuth,productsController.categorySearch);
router.get('/recycle-bin/search',checkAuth,productsController.binSearch);
module.exports = router;