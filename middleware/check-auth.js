const jwt = require('jsonwebtoken');
module.exports= async (req,res,next) =>
{
    try{
        const token = req.cookies['id'];
        console.log(token)
        const decoded = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.userData=decoded;
        next();
    } catch(error)
    {
        res.redirect('/');
    }
};