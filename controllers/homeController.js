exports.login = async(req, res, next) => 
{
    if (!req.user)
        res.render('index/login', {});
    else
        res.redirect('/orders');
};
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};