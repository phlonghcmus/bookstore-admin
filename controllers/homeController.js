const ordersModel = require('../models/ordersModel');
exports.login = async(req, res, next) => 
{
        res.render('index/login', {});
};


exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.index=async(req,res,next)=>
{
    orders=await ordersModel.list();
    res.render("index/index",{admin : "Admin,",logout: "Logout",orders});
}