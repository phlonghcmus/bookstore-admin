const adminModel = require('../models/adminModel');
const toQS = require('querystring').stringify;
const ObjectId= require('mongodb').ObjectId;
var fs = require('fs');
const cloudinary = require('cloudinary');
require('../handlers/cloudinary')

exports.detail= async(req, res, next) =>
{
    const user = req.user;
    let admin = await adminModel.get(user.user_name);
    if(!admin){
        await adminModel.add(user);
        admin = await adminModel.get(user.user_name);
        const id = admin._id;
        const fullName = admin.fullName;
        const user_name = admin.user_name;
        const email = admin.email;
        const phone = admin.phone;
        const cover = admin.cover;
        const address = admin.address;
        res.render('admin/adminDetail',{fullName,user_name,email,cover,phone,address,id,admin : "Admin,",logout: "Logout"});
    }
    else{
        const id = admin._id;
        const fullName = admin.fullName;
        const user_name = admin.user_name;
        const email = admin.email;
        const phone = admin.phone;
        const cover = admin.cover;
        const address = admin.address;
        res.render('admin/adminDetail',{fullName,user_name,email,cover,phone,address,id,admin : "Admin,",logout: "Logout"});
    }
};

exports.update=async(req, res, next) =>
{
    let coverPath;
    let data;
    const item = await adminModel.get(req.user.user_name);
    const id = item._id;
    console.log(item);
    if(req.file)
    {
        let cover = await cloudinary.v2.uploader.upload(req.file.path);
        let oldCoverId = item.cover_id;
        if(oldCoverId){
            let result = await cloudinary.v2.uploader.destroy(oldCoverId);
            console.log(result);
        }
        coverPath = req.file.destination + req.file.filename;
        if(fs.existsSync(coverPath))
        	fs.unlinkSync(coverPath);
        console.log(req.file);
        data={
            fullName: req.body.fullName,
            email: req.body.email,
            cover: cover.secure_url,
            cover_id: cover.public_id,
            user_name: req.body.user_name,
            phone: req.body.phone,
            address: req.body.address,
        }
    }
    else
    {
        data={
            fullName: req.body.fullName,
            email: req.body.email,
            user_name: req.body.user_name,
            phone: req.body.phone,
            address: req.body.address,
        }
    }    
    await adminModel.update(id,data);
    res.redirect('/admin/');
}