const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer  = require('multer')
const AuthMiddleWare = require('../middleware/check-auth.js')


const upload = multer({ dest: 'public/uploads/' ,fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }})

//router.use(AuthMiddleWare);
router.get('/',AuthMiddleWare, productsController.list);

router.get('/detail/:id',AuthMiddleWare,productsController.detail);
router.post('/detail/:id/delete',AuthMiddleWare,productsController.delete);
router.post('/detail/:id/restore',AuthMiddleWare,productsController.restore);
router.get('/add',AuthMiddleWare,productsController.addPage);
router.post('/detail/:id/update',AuthMiddleWare,upload.single('avatar'),productsController.update);
router.post('/add',AuthMiddleWare,upload.single('avatar') ,productsController.add);
router.get('/category/:id',productsController.category);
router.get('/recycle-bin',productsController.bin);
router.get('/search',productsController.search);
router.get('/category/:id/search',productsController.categorySearch);
router.get('/recycle-bin/search',productsController.binSearch);
module.exports = router;