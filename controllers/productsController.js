const productsModel = require('../models/productsModel');
exports.list = async (req, res, next) => {
    const products = await productsModel.list();
    res.render('products/list', {products});
};