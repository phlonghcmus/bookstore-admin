const {db}=require('../database/database');
const ObjectId= require('mongodb').ObjectId;
let categories;
exports.list = async () => {
    const categoryCollection=db().collection('categories');
    categories=await categoryCollection.find().toArray();
    return categories;
};

//Lấy Category theo tên
exports.get=async(categoryName)=>{
    const categoryCollection=db().collection('categories');
    const category= await categoryCollection.findOne({category_name : categoryName});
    return category;
}