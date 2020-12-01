const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
var multer  = require('multer')


var upload = multer({ dest: 'public/uploads/' ,fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }})


router.get('/', productsController.list);

router.get('/:id',productsController.detail);
router.get('/:id/delete',productsController.delete);
router.get('/add/add-product',productsController.addPage);
router.post('/:id/update',upload.single('avatar'),productsController.update);
router.post('/', upload.single('avatar') ,productsController.add);

module.exports = router;