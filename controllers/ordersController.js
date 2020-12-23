const ordersModel = require('../models/ordersModel');
exports.list =async (req, res) => {
    orders=await ordersModel.list();
    res.render('orders/list', {admin : "Admin,",logout: "Logout",orders});
};
exports.detail= async(req, res, next) =>{
    total=0;
    const order= await ordersModel.getDetail(req.params.id);
    console.log(order);
    order.books_detail.forEach(element => {
        total=total + element.quantity * element.basePrice;
    });
    res.render('orders/detail', {admin : "Admin,",logout: "Logout",order,total});
}
exports.cancel =async(req, res, next) =>{
    const order= await ordersModel.getDetail(req.params.id);
    order.status=5;
    await ordersModel.update(req.params.id,order);
    res.redirect('/orders/orderDetail/'+req.params.id);
}
exports.next =async(req, res, next) =>{
    const order= await ordersModel.getDetail(req.params.id);
    order.status+=1;
    await ordersModel.update(req.params.id,order);
    res.redirect('/orders/orderDetail/'+req.params.id);
}