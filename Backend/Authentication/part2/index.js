//this is the updated version of code of the part 1 , in this updated part we have used the middleware like auth(here we are having the authentication logics) and logger(which logs the method of the request came)

const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secure_String'
const app = express();
app.use(express.json()); //this middleware will let us extract the json body request

let users = [];
//try creating the middlweare called auth that verifies if a user is logged in and ends the request early if the user isn't logged in
function logger(req,res,next){
    console.log(`${req.method} request came`);
    next();
}
function auth(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_SECRET);
    if(decodedData.username){
        req.username = decodedData.username; //updates the req little bit so that wherever in any endpoint if we are using this middleware will able to get the username 
        next()
    }else{
        res.json({
            msg:"login first!"
        })
    }

}

app.post("/signup",logger,function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username:username,
        password:password
    })
    //we should check the user is already there or not
    res.json({
        msg:"You are signed up!"
    })
})

app.post("/signin",logger,function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    //here we have to generate the jwt 
    let foundUser = null;
    users.find((u)=>{
        if(u.username === username && u.password === password){
            foundUser = u;
        }
    })
    if(!foundUser){
        res.json({
            msg:"Credentials incorrect"
        })
        return;
    }else{
        const token = jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            token:token
        })
    }

})

app.get("/me",logger,auth,function(req,res){
    // all the authentication logic will be inside the auth middleware
        let foundUser = null;
        users.find((u)=>{
            if(u.username === req.username){
                foundUser = u;
            }
            res.json({
                username:foundUser.username,
                password:foundUser.password
            })
        })
    
})

app.listen(1010)