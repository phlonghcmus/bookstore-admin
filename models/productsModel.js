const {db}=require('../database/database');
const ObjectId= require('mongodb').ObjectId;
let products;
exports.list = async () => {
    const productCollection=db().collection('books');
    products=await productCollection.find().toArray();
    return products;
};
exports.get=async(id)=>{
    const productCollection=db().collection('books');
    const product= await productCollection.findOne({_id:ObjectId(id)});
    return product;
}
exports.delete=async(id)=>{
    const productCollection=db().collection('books');
    await productCollection.deleteOne({ _id: ObjectId(id) }, function (err, results) {});

}

exports.update=async(id,data)=>{
    const productCollection=db().collection('books');
    await productCollection.updateOne({ _id: ObjectId(id) }, {$set: data}, function (err, results) {});
}

exports.add=async(item)=>{
    const productCollection=db().collection('books');
    await productCollection.insertOne(item, function (err, results) {
        console.log("Item added");
    });
}