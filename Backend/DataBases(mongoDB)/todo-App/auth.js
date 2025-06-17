const jwt = require('jsonwebtoken');
const JWT_SECRET = "THISISTHESECURITYKEY"

function auth (req,res,next){
    const token = req.headers.token;
    const response = jwt.verify(token,JWT_SECRET);
    if(response){
        req.id = response.id;
        next();
    }else{
        res.status(403).json({
            msg:"Credentials invalid!"
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}