const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
var multer  = require('multer')
const AuthMiddleWare = require('../middleware/check-auth.js')


var upload = multer({ dest: 'public/uploads/' ,fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }})

//router.use(AuthMiddleWare);
router.get('/',AuthMiddleWare, productsController.list);

router.get('/:id',AuthMiddleWare,productsController.detail);
router.get('/:id/delete',AuthMiddleWare,productsController.delete);
router.get('/add/add-product',AuthMiddleWare,productsController.addPage);
router.post('/:id/update',AuthMiddleWare,upload.single('avatar'),productsController.update);
router.post('/',AuthMiddleWare,upload.single('avatar') ,productsController.add);

module.exports = router;