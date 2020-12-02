const productsModel = require('../models/productsModel');
const categoriesModel = require('../models/categoriesModel');

exports.list = async (req, res, next) => {
    const products = await productsModel.list();
    const categories = await categoriesModel.list();
    res.render('products/list', {products,categories});
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
    const author=tt.author;
    const id=tt._id;
    const categories = await categoriesModel.list();
    res.render('products/detail',{title,detail,basePrice,cover,stock,author,id,categories});
};
exports.delete= async(req, res, next) =>
{
    await productsModel.delete(req.params.id);
    const products = await productsModel.list();
    res.render('products/list', {products});
};
exports.addPage= async(req, res, next) =>
{
    res.render('products/add', {});
};

exports.update=async(req, res, next) =>
{
    let cover;
    let data;
    if(req.file)
    {
        cover=req.file.destination + req.file.filename;
        path=cover.split('/').slice(1).join('/');
        path2="https://bookstoremanage.herokuapp.com/";
        cover=path2.concat(path);
        console.log(req.file);
        data={
        title:req.body.name,
        basePrice: req.body.price,
        author: req.body.author,
        detail: req.body.detail,
        cover:cover
        }
    }
    else
    {
        data={
        title:req.body.name,
        basePrice: req.body.price,
        author: req.body.author,
        detail: req.body.detail,
        }
    }    
    await productsModel.update(req.params.id,data);
    const products = await productsModel.list();
    res.redirect('/products/'+ req.params.id);
}

exports.add= async(req, res, next) =>
{
    let cover;
    cover = req.file.destination + req.file.filename;
    path = cover.split('/').slice(1).join('/');
    path2="https://bookstoremanage.herokuapp.com/";
    cover = path2.concat(path);
    console.log(req.file);
    const item = {
        title:req.body.title,
        detail:req.body.detail,
        cover:cover,
        author:req.body.author,
        basePrice:req.body.price,
        gerne:req.body.gerne
    };
    await productsModel.add(item);
    const products = await productsModel.list();
    res.redirect('/products');
};
