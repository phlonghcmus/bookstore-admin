const {db}=require('../database/database');
//const ObjectId= require('mongodb').ObjectId;
let products;
exports.list = async () => {
    const productsCollection=db().collection('books');
    products=await productsCollection.find().toArray();
    return products;
};