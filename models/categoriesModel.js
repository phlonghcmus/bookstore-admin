const {db}=require('../database/database');
const ObjectId= require('mongodb').ObjectId;
let categories;
exports.list = async () => {
    const categoryCollection=db().collection('categories');
    categories=await categoryCollection.find().toArray();
    return categories;
};