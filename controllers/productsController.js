const productsModel = require('../models/productsModel');
exports.list = async (req, res, next) => {
    const products = await productsModel.list();
    res.render('products/list', {products});
};
exports.detail= async(req, res, next) =>
{
    const products = await productsModel.list();
    const tt= await productsModel.get(req.params.id);
    const title=tt.title;
    const basePrice=tt.basePrice;
    const detail=tt.detail;
    const cover=tt.cover;
    const stock=tt.stock;
    const sold=tt.sold;
    res.render('products/detail',{title,detail,basePrice,cover,stock});
};
