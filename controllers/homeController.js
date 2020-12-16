const jwt = require('jsonwebtoken');
exports.login = async(req, res, next) => 
{
    if (!req.user)
        res.render('index/login', {});
    else
        res.redirect('/orders');
};
exports.orders = (req, res) => {
        res.render('index/orders', {admin : "Admin,",logout: "Logout"});
};
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};