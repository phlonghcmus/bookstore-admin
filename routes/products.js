const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.list);

router.get('/:id',productsController.detail);
router.get('/:id/delete',productsController.delete);
router.get('/add/add-product',productsController.add);
module.exports = router;