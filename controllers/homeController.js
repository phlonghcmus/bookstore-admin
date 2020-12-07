const jwt = require('jsonwebtoken');
exports.login = async(req, res, next) => {
    try{
        const token = req.cookies['id'];
        const decoded = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.userData=decoded;
        console.log("alo");
        res.redirect('dashboard');
    } catch(error)
    {
        res.render('index/login', {});
    }
};
exports.dashboard = (req, res) => {
    res.render('index/body', {admin : "Admin,",logout: "Logout"});
};
exports.logout = (req, res) => {
    res.cookie('id',"");
    res.redirect('/');
};