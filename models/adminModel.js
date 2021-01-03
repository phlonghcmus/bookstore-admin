const {db}=require('../database/database');
const ObjectId= require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

exports.bcryptPassword=async(password)=>
{
    const salt = await bcrypt.genSalt(saltRounds);
    const newPassword = await bcrypt.hash(password, salt);
    return newPassword;
}

exports.add=async(user)=>{
    const adminCollection=db().collection('admin');
    user.password=await this.bcryptPassword(user.password);
    await adminCollection.insertOne(user, function (err, results) {});
}

exports.get=async(user_name)=>{
    const adminCollection=db().collection('admin');
    const admin= await adminCollection.findOne({user_name: user_name});
    return admin;
}

exports.update=async(id,data)=>{
    const adminCollection=db().collection('admin');
    await adminCollection.updateOne({ _id: ObjectId(id) }, {$set: data}, function (err, results) {});
}