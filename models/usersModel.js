const {db}=require('../database/database');
const ObjectId= require('mongodb').ObjectId;

exports.get=async(id)=>{
    const userCollection=db().collection('user');
    const user= await userCollection.findOne({_id:ObjectId(id)});
    return user;
}

exports.lock=async(id,data)=>{
    const userCollection=db().collection('user');
    await userCollection.updateOne({ _id: ObjectId(id) }, {$set: data}, function (err, results) {});
}

exports.unlock=async(id,data)=>{
    const userCollection=db().collection('user');
    await userCollection.updateOne({ _id: ObjectId(id) }, {$set: data}, function (err, results) {});
}

exports.listPerPage = async (currentPage) => {
    const userCollection= db().collection('user');
    userCollection.createIndex({"active":1});
    const users=await userCollection.find({"active":true}).limit(6).skip((currentPage-1)*6).toArray();
    return users;
};

exports.pageCountList= async()=>
{
    const userCollection= db().collection('user');
    const count=await userCollection.find({"active":true}).count();
    return count/6;
}

exports.binListPerPage = async (currentPage) => {
    const userCollection= db().collection('user');
    userCollection.createIndex({"active":1});

    const users=await userCollection.find({"active":false}).limit(6).skip((currentPage-1)*6).toArray();
    return users;
};

exports.binPageCountList= async()=>
{
    const userCollection= db().collection('user');
    const count=await userCollection.find({"active":false}).count();
    return count/6;
}

exports.pageCountSearch=async(str)=>
{
    const userCollection= db().collection('user');
    let count=await userCollection.find({
        $and:[
            {"active": true},
            {"account": {"$regex": str, "$options": "i"}},

        ]}).count();
    
    if(count===0)
    count=await userCollection.find({
        $and:[
            {"active": true},
            {"firstName": {"$regex": str, "$options": "i"}}

        ]}).count();

    if(count===0)
    count=await userCollection.find({
        $and:[
            {"active": true},
            {"lastName": {"$regex": str, "$options": "i"}}
    
        ]}).count();

    return count/6;
}

exports.searchPerPage=async(str,page)=>
{
    const userCollection= db().collection('user');
    let  users=await userCollection.find(
        {$and:[
                {"active": true},
                {"account": {"$regex": str, "$options": "i"}}

            ]}).limit(6).skip((page-1)*6).toArray();

    if(users.length===0)
        users=await userCollection.find(
            {$and:[
                {"active": true},
                {"firstName": {"$regex": str, "$options": "i"}}
    
                ]}).limit(6).skip((page-1)*6).toArray();

    if(users.length===0)
        users=await userCollection.find(
            {$and:[
                {"active": true},
                {"lastName": {"$regex": str, "$options": "i"}}
            
                ]}).limit(6).skip((page-1)*6).toArray();

    return users;
}

exports.pageCountBinSearch=async(id,str,page)=>
{
    const userCollection= db().collection('user');
    let count=await userCollection.find({
        $and:[
            {"active": false},
            {"account": {"$regex": str, "$options": "i"}},

        ]}).count();
    
    if(count===0)
    count=await userCollection.find({
        $and:[
            {"active": false},
            {"firstName": {"$regex": str, "$options": "i"}}

        ]}).count();

    if(count===0)
    count=await userCollection.find({
        $and:[
            {"active": false},
            {"lastName": {"$regex": str, "$options": "i"}}
    
        ]}).count();

    return count/6;
}

exports.binSearchPerPage=async(id,str,page)=>
{
    const userCollection= db().collection('user');
    let  users=await userCollection.find(
        {$and:[
                {"active": false},
                {"account": {"$regex": str, "$options": "i"}}

            ]}).limit(6).skip((page-1)*6).toArray();

    if(users.length===0)
        users=await userCollection.find(
            {$and:[
                {"active": false},
                {"firstName": {"$regex": str, "$options": "i"}}
    
                ]}).limit(6).skip((page-1)*6).toArray();

    if(users.length===0)
        users=await userCollection.find(
            {$and:[
                {"active": false},
                {"lastName": {"$regex": str, "$options": "i"}}
            
                ]}).limit(6).skip((page-1)*6).toArray();

    return users;
}