const productsModel = require('../models/productsModel');
var moment = require('moment')
const ordersModel = require('../models/ordersModel');
exports.month =async (req, res) => {
    value=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    const orders= await ordersModel.list();
    console.log(orders);
    var year_system= new Date().getFullYear();
    (orders).forEach(element => {
        let new_time=moment(element.order_date,"DD/MM/YY - HH:mm");
        var date=new_time.toDate();
        month=date.getMonth()+1;
        year=date.getFullYear()
        if (year_system==year)
            value[month]=value[month]+element.total;

    });
    res.render('reports/month',{admin : "Admin,",logout: "Logout",value,year_system});
};
exports.precious =async (req, res) => {
    value=[0,0,0,0,0]
    const orders= await ordersModel.list();
    console.log(orders);
    var year_system= new Date().getFullYear();
    (orders).forEach(element => {
        let new_time=moment(element.order_date,"DD/MM/YY - HH:mm");
        var date=new_time.toDate();
        month=date.getMonth()+1;
        year=date.getFullYear()
        if (year_system==year)
        {
            if (month<=3)
                value[1]=value[1]+element.total;
            if (month>3 && month<=6)
                value[2]=value[2]+element.total;
            if (month>6 && month<=9)
                value[3]=value[3]+element.total;
                if (month>9 && month<=12)
                value[4]=value[4]+element.total;
        }
    });
    res.render('reports/precious',{admin : "Admin,",logout: "Logout",value,year_system});
};
exports.year =async (req, res) => {
    value=[0,0,0,0,0]
    const orders= await ordersModel.list();
    console.log(orders);
    var year_system= new Date().getFullYear();
    (orders).forEach(element => {
        let new_time=moment(element.order_date,"DD/MM/YY - HH:mm");
        var date=new_time.toDate();
        month=date.getMonth()+1;
        year=date.getFullYear()
        if (year_system==year)
        {
            value[4]=value[4]+element.total;
        }
        if (year_system-1==year)
        {
            value[3]=value[3]+element.total;
        }
        if (year_system-2==year)
        {
            value[2]=value[2]+element.total;
        }
        if (year_system-3==year)
        {
            value[1]=value[1]+element.total;
        }
        if (year_system-4==year)
        {
            value[0]=value[0]+element.total;
        }
    });
    res.render('reports/year',{admin : "Admin,",logout: "Logout",value,year_system});
};
exports.precious =async (req, res) => {
    value=[0,0,0,0,0]
    const orders= await ordersModel.list();
    console.log(orders);
    var year_system= new Date().getFullYear();
    (orders).forEach(element => {
        let new_time=moment(element.order_date,"DD/MM/YY - HH:mm");
        var date=new_time.toDate();
        month=date.getMonth()+1;
        year=date.getFullYear()
        if (year_system==year)
        {
            if (month<=3)
                value[1]=value[1]+element.total;
            if (month>3 && month<=6)
                value[2]=value[2]+element.total;
            if (month>6 && month<=9)
                value[3]=value[3]+element.total;
                if (month>9 && month<=12)
                value[4]=value[4]+element.total;
        }
    });
    res.render('reports/precious',{admin : "Admin,",logout: "Logout",value,year_system});
};
exports.top =async (req, res) => {
    const products= await productsModel.list();
    res.render('reports/top',{admin : "Admin,",logout: "Logout",products});
};