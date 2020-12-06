const productsModel = require('../models/productsModel');
const categoriesModel = require('../models/categoriesModel');
const toQS = require('querystring').stringify;
exports.list = async (req, res, next) => {
    let currentPage=req.query.p || 1;
    let products;
    let pageCount;

    // Get books from model
    pageCount = await productsModel.pageCountList();
    console.log(pageCount);
    products=await productsModel.listPerPage(currentPage);

    if(currentPage>Math.ceil(pageCount))
    {
        req.query.p= 5 ||1;
    }

    const count=products.length;
    const categories=await categoriesModel.list();
    // Pass data to view to display list of books
    res.render('products/list', {products,count,categories,pagination:{page:currentPage,pageCount:Math.ceil(pageCount)}});
};

exports.detail= async(req, res, next) =>
{
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
    res.redirect('/products/detail/'+ req.params.id);
}

exports.add= async(req, res, next) =>
{
    let cover;
    let item;
    if(req.file) {
        cover = req.file.destination + req.file.filename;
        path = cover.split('/').slice(1).join('/');
        path2 = "https://bookstoremanage.herokuapp.com/";
        cover = path2.concat(path);
        console.log(req.file);
        item = {
            title: req.body.title,
            detail: req.body.detail,
            cover: cover,
            author: req.body.author,
            basePrice: req.body.price,
            gerne: req.body.gerne
        };
    }
    else
    {
        item={
            title: req.body.title,
            detail: req.body.detail,
            author: req.body.author,
            basePrice: req.body.price,
            gerne: req.body.gerne
        };
    }
    await productsModel.add(item);

    res.redirect('/products');
};


exports.category=async(req,res,next)=>
{
    let currentPage=req.query.p || 1;
    let id=req.params.id;
    let products;
    let pageCount;
    pageCount= await productsModel.pageCountCategory(id);
    products=await productsModel.categoryPerPage(id,currentPage);
    const count=products.length;
    // Pass data to view to display list of books
    const categories=await categoriesModel.list();
    res.render('products/list', {products,count,categories,pagination:{page:currentPage,pageCount:Math.ceil(pageCount)}});
}

exports.bin=async (req,res,next)=>
{
    let currentPage=req.query.p || 1;
    let products;
    let pageCount;

    // Get books from model
    pageCount = await productsModel.binPageCountList();
    console.log(pageCount);
    products=await productsModel.binListPerPage(currentPage);

    if(currentPage>Math.ceil(pageCount))
    {
        req.query.p= 5 ||1;
    }

    const count=products.length;
    const categories=await categoriesModel.list();
    // Pass data to view to display list of books
    res.render('products/list', {products,count,categories,pagination:{page:currentPage,pageCount:Math.ceil(pageCount)}});
}

exports.search=async(req,res,next)=>
{
    let currentPage=req.query.p || 1;
    let keyword=req.query.keyword;
    let products;
    let pageCount;
    let newQuery;
    pageCount= await productsModel.pageCountSearch(keyword);
    products=await productsModel.searchPerPage(keyword,currentPage);
    const query=req.query;
    newQuery=toQS(query);
    if(req.query.p)
    {
        newQuery=newQuery.split('&').shift();
    }
    newQuery+="&";
    if(currentPage>Math.ceil(pageCount))
    {
        req.query.p= 5 ||1;
    }
    const count=products.length;
    // Pass data to view to display list of products
    const categories=await categoriesModel.list();
    if(count===0)
        res.render('products/noList',{count,categories});
    else
        res.render('products/list', {products,count,categories,query:newQuery,pagination:{page:currentPage,pageCount:Math.ceil(pageCount)}});
}

exports.categorySearch=async (req,res,next)=>
{
    let currentPage=req.query.p || 1;
    let id=req.params.id;
    let keyword=req.query.keyword;
    let products;
    let pageCount;
    let newQuery;
    pageCount= await productsModel.pageCountCategorySearch(id,keyword,currentPage);
    products=await productsModel.categorySearchPerPage(id,keyword,currentPage);
    const query=req.query;
    newQuery=toQS(query);
    if(req.query.p)
    {
        newQuery=newQuery.split('&').shift();
    }
    newQuery+="&";
    if(currentPage>Math.ceil(pageCount))
    {
        req.query.p= 5 ||1;
    }
    const count=products.length;
    // Pass data to view to display list of products
    const categories=await categoriesModel.list();

    if(count===0)
        res.render('products/noList',{count,categories});
    else
        res.render('products/list', {products,count,categories,query:newQuery,pagination:{page:currentPage,pageCount:Math.ceil(pageCount)}});
}

exports.binSearch=async (req,res,next)=>
{
    let currentPage=req.query.p || 1;
    let id=req.params.id;
    let keyword=req.query.keyword;
    let products;
    let pageCount;
    let newQuery;
    pageCount= await productsModel.pageCountBinSearch(id,keyword,currentPage);
    products=await productsModel.binSearchPerPage(id,keyword,currentPage);
    const query=req.query;
    newQuery=toQS(query);
    if(req.query.p)
    {
        newQuery=newQuery.split('&').shift();
    }
    newQuery+="&";
    if(currentPage>Math.ceil(pageCount))
    {
        req.query.p= 5 ||1;
    }
    const count=products.length;
    // Pass data to view to display list of products
    const categories=await categoriesModel.list();

    if(count===0)
        res.render('products/noList',{count,categories});
    else
        res.render('products/list', {products,count,categories,query:newQuery,pagination:{page:currentPage,pageCount:Math.ceil(pageCount)}});
}