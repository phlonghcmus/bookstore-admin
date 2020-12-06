const {db}=require('../database/database');
const ObjectId= require('mongodb').ObjectId;
let products;

// lấy 1 quyển sách theo id
exports.get=async(id)=>{
    const productCollection=db().collection('books');
    const product= await productCollection.findOne({_id:ObjectId(id)});
    return product;
}

// Xóa sách
exports.delete=async(id)=>{
    const productCollection=db().collection('books');
    await productCollection.deleteOne({ _id: ObjectId(id) }, function (err, results) {});

}

// Update sách
exports.update=async(id,data)=>{
    const productCollection=db().collection('books');
    await productCollection.updateOne({ _id: ObjectId(id) }, {$set: data}, function (err, results) {});
}

// Thêm sách
exports.add=async(item)=>{
    const productCollection=db().collection('books');
    await productCollection.insertOne(item, function (err, results) {
        console.log("Item added");
    });
}



// Lấy danh sách sách cho 1 trang hiển thị
exports.listPerPage = async (currentPage) => {
    const bookCollection= db().collection('books');
    bookCollection.createIndex({"remove":1,"categoryID":1,"title":1});
    bookCollection.createIndex({"remove":1,"categoryID":1,"nonAccentTitle":1});
    const books=await bookCollection.find({"remove":false}).limit(6).skip((currentPage-1)*6).toArray();
    return books;
};



//Lấy danh sách các quyển sách trong 1 trang thỏa điều kiện tìm kiếm
exports.searchPerPage=async(str,page)=>
{
    const bookCollection= db().collection('books');
    let  books=await bookCollection.find(
        {$and:[
                {"remove": false},
                {"title": {"$regex": str, "$options": "i"}}

            ]}).limit(6).skip((page-1)*6).toArray();

    if(books.length===0)
        books=await bookCollection.find(
            {$and:[
                    {"remove": false},
                    {"nonAccentTitle": {"$regex": str, "$options": "i"}}

                ]}).limit(6).skip((page-1)*6).toArray();
    return books;
}

// Đếm số cuốn sách trong 1 trang
exports.pageCountList= async()=>
{
    const bookCollection= db().collection('books');
    const count=await bookCollection.find({"remove":false}).count();
    return count/6;
}


// Đếm số cuốn sách thỏa điều kiện tìm kiếm
exports.pageCountSearch=async(str)=>
{
    const bookCollection= db().collection('books');
    let count=await bookCollection.find({
        $and:[
            {"remove": false},
            {"title": {"$regex": str, "$options": "i"}}

        ]}).count();

    if(count===0)
        count=await bookCollection.find({
            $and:[
                {"remove": false},
                {"nonAccentTitle": {"$regex": str, "$options": "i"}}

            ]}).count();
    return count/6;
}

// Đếm số cuốn trách thỏa điều kiện filter
exports.pageCountCategory=async(id)=>{
    const bookCollection= db().collection('books');
    let count=await bookCollection.find({
        $and:[
            {"remove": false},
            {"categoryID": ObjectId(id)}

        ]}).count();
    return count/6;
}

//Lấy danh sách các quyển sách cho một trang thỏa filter
exports.categoryPerPage=async(id,page)=>
{
    const bookCollection= db().collection('books');
    let  books=await bookCollection.find(
        {$and:[{"remove": false},{"categoryID": ObjectId(id)}]}).limit(6).skip((page-1)*6).toArray();

    return books;
}

//Đếm danh sách các quyển sách tìm kiếm được thỏa điều kiện filter
exports.pageCountCategorySearch=async(id,str,page)=>
{
    const bookCollection= db().collection('books');
    let count=await bookCollection.find({
        $and:[
            {"remove": false},
            {"categoryID": ObjectId(id)},
            {"title": {"$regex": str, "$options": "i"}}


        ]}).count();

    if(count===0)
        count=await bookCollection.find(
            {$and:[
                    {"remove": false},
                    {"categoryID": ObjectId(id)},
                    {"nonAccentTitle": {"$regex": str, "$options": "i"}}
                ]}).count();
    return count/6;
}

// Lấy danh sách các quyển sách tìm kiếm được thỏa điều kiện filter
exports.categorySearchPerPage=async(id,str,page)=>
{
    const bookCollection= db().collection('books');
    let books=await bookCollection.find({
        $and:[
            {"remove": false},
            {"categoryID": ObjectId(id)},
            {"title": {"$regex": str, "$options": "i"}}

        ]}).limit(6).skip((page-1)*6).toArray();

    if(books.length===0)
        books=await bookCollection.find(
            {$and:[
                    {"remove": false},
                    {"categoryID": ObjectId(id)},
                    {"nonAccentTitle": {"$regex": str, "$options": "i"}}

                ]}).limit(6).skip((page-1)*6).toArray();
    return books;
}
// Lấy danh sách các quyển sách trong thùng rác
exports.binListPerPage = async (currentPage) => {
    const bookCollection= db().collection('books');
    bookCollection.createIndex({"remove":1,"categoryID":1,"title":1});

    const books=await bookCollection.find({"remove":true}).limit(6).skip((currentPage-1)*6).toArray();
    return books;
};


// Đếm danh sách các quyển sách trong thùng rác
exports.binPageCountList= async()=>
{
    const bookCollection= db().collection('books');
    const count=await bookCollection.find({"remove":true}).count();
    return count/6;
}


// Đếm danh sách các quyển sách tìm kiếm được trong thùng rác
exports.pageCountBinSearch=async(id,str,page)=>
{
    const bookCollection= db().collection('books');
    let count=await bookCollection.find({
        $and:[
            {"remove": true},
            {"title": {"$regex": str, "$options": "i"}}


        ]}).count();

    if(count===0)
        count=await bookCollection.find(
            {$and:[
                    {"remove": true},
                    {"nonAccentTitle": {"$regex": str, "$options": "i"}}
                ]}).count();
    return count/6;
}

// Lấy danh sách các quyển sách tìm kiếm trong thùng rác được
exports.binSearchPerPage=async(id,str,page)=>
{
    const bookCollection= db().collection('books');
    let books=await bookCollection.find({
        $and:[
            {"remove": true},
            {"title": {"$regex": str, "$options": "i"}}

        ]}).limit(6).skip((page-1)*6).toArray();

    if(books.length===0)
        books=await bookCollection.find(
            {$and:[
                    {"remove": true},
                    {"nonAccentTitle": {"$regex": str, "$options": "i"}}

                ]}).limit(6).skip((page-1)*6).toArray();
    return books;
}
