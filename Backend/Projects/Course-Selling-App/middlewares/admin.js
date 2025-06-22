require('dotenv').config();
const jwt = require('jsonwebtoken')

function adminMiddleware(req,res,next){
    const token = req.headers.token;

    const decoded = jwt.verify(token,process.env.JWT_SECRET_ADMIN);
    if(decoded){
        req.adminId = decoded.id;
        next();
    }else{
        res.status(403).json({
            msg:"You are not signed in"
        })
    }
}

module.exports = {
    adminMiddleware
}