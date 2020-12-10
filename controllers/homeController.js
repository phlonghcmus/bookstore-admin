const jwt = require('jsonwebtoken');
exports.login = async(req, res, next) => 
{
    if (!req.user)
        res.render('index/login', {});
    else
        res.redirect('/dashboard');
};
exports.dashboard = (req, res) => {
        res.render('index/body', {admin : "Admin,",logout: "Logout"});
};
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};