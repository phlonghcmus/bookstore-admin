const { JsonWebTokenError } = require("jsonwebtoken");

let tokenList ={}
const jwt = require('jsonwebtoken');
exports.login = (req, res) => {
    const user = {name: req.body.username,password: req.body.password};
    if (user.name === "admin@student.hcmus.edu.vn" && user.password === "admin")
    {
        accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"})
        refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:"1h"})
        tokenList[refreshToken] = {accessToken, refreshToken};
        res.cookie('id',accessToken,{maxAge: 1000 * 60 * 60});
        res.redirect('dashboard');
    }
}