const {db}=require('../database/database');
const ObjectId= require('mongodb').ObjectId;
let orders;
const Handlebars=require('handlebars');
exports.list = async () => {
    const orderCollection=db().collection('orders');
    orders=await orderCollection.find().toArray();
    return orders;
};