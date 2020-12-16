const ordersModel = require('../models/ordersModel');
exports.list =async (req, res) => {
    orders=await ordersModel.list();
    res.render('orders/list', {admin : "Admin,",logout: "Logout",orders});
};