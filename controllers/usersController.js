const usersModel = require('../models/usersModel');
const toQS = require('querystring').stringify;

exports.list = async (req, res, next) => {
    let currentPage=req.query.p || 1;
    let users;
    let pageCount;

    pageCount = await usersModel.pageCountList();
    console.log(pageCount);
    users=await usersModel.listPerPage(currentPage);

    if(currentPage>Math.ceil(pageCount))
    {
        req.query.p= 5 ||1;
    }

    const count=users.length;
    res.render('users/usersList', {users,count,pagination:{page:currentPage,pageCount:Math.ceil(pageCount)},admin : "Admin,",logout: "Logout"});
};

exports.detail= async(req, res, next) =>
{
    const tt= await usersModel.get(req.params.id);
    const account=tt.account;
    const firstName=tt.firstName;
    const lastName=tt.lastName;
    const email=tt.email;
    const mobile=tt.mobile;
    const gender=tt.gender;
    const cover=tt.cover;
    const location=tt.location;
    const phone=tt.phone;
    const id=tt._id;
    res.render('users/userDetail',{account,firstName,lastName,email,mobile,gender,cover,location,id,phone,admin : "Admin,",logout: "Logout"});
};

exports.lock= async(req, res, next) =>
{
    const tt= await usersModel.get(req.params.id);
    if(tt.active){
        const data = {
            active : false,
        }
    await usersModel.lock(req.params.id,data);
    }
    res.redirect("/users");
};

exports.unlock= async(req, res, next) =>
{
    const tt= await usersModel.get(req.params.id);
    if(!tt.active){
        const data = {
            active : true,
        }
    await usersModel.lock(req.params.id,data);
    }
    res.redirect("/users");
};

exports.bin=async (req,res,next)=>
{
    let currentPage=req.query.p || 1;
    let users;
    let pageCount;

    pageCount = await usersModel.binPageCountList();
    console.log(pageCount);
    users=await usersModel.binListPerPage(currentPage);

    if(currentPage>Math.ceil(pageCount))
    {
        req.query.p= 5 ||1;
    }

    const count=users.length;
    res.render('users/usersList', {users,count,pagination:{page:currentPage,pageCount:Math.ceil(pageCount)},admin : "Admin,",logout: "Logout"});
}

exports.search=async(req,res,next)=>
{
    let currentPage=req.query.p || 1;
    let keyword=req.query.keyword;
    let users;
    let pageCount;
    let newQuery;
    pageCount= await usersModel.pageCountSearch(keyword);
    users=await usersModel.searchPerPage(keyword,currentPage);
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
    const count=users.length;
    // Pass data to view to display list of products
    if(count===0)
        res.render('users/usersNoList',{count,admin : "Admin,",logout: "Logout"});
    else
        res.render('users/usersList', {users,count,query:newQuery,pagination:{page:currentPage,pageCount:Math.ceil(pageCount)},admin : "Admin,",logout: "Logout"});
}

exports.binSearch=async (req,res,next)=>
{
    let currentPage=req.query.p || 1;
    let id=req.params.id;
    let keyword=req.query.keyword;
    let users;
    let pageCount;
    let newQuery;
    pageCount= await usersModel.pageCountBinSearch(id,keyword,currentPage);
    users=await usersModel.binSearchPerPage(id,keyword,currentPage);
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
    const count=users.length;

    if(count===0)
        res.render('users/usersNoList',{count,admin : "Admin,",logout: "Logout"});
    else
        res.render('users/usersList', {users,count,query:newQuery,pagination:{page:currentPage,pageCount:Math.ceil(pageCount)},admin : "Admin,",logout: "Logout"});
}