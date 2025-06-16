const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = "THISISTOBEKEPTSECRET"
const {userModel,todoModel} = require('./db');
app.use(express.json());
mongoose.connect('')

app.post("/signup",async (req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    // this is the asyncronous call so we must have to await it!
    await userModel.create({
        email:email,
        name:name,
        password:password
    })
    res.json({
        msg:"Successfully signed up!"
    })
})

app.post("/login",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const response = await userModel.findOne({
        email:email,
        password:password
    })
    if(response){
        const token = jwt.sign({
            id:response._id
        },JWT_SECRET)

        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"Invaild credentials"
        })
    }
})

function auth(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_SECRET);

    if(decodedData){
        //since we have created the token on the basis of userID and hence now we can use that here! to link the collections by giving the decoded id to the req.id
        req.userID = decodedData.id;
        next();
    }else{
        res.status(403).json({
            msg:"Invalid credentials"
        })
    }
}
app.post("/todo",auth,async (req,res)=>{
    const title = req.body.title;
    const status = req.body.done;
    await todoModel.create({
        title:title,
        done:status,
        userId:req.userID
    })
    res.json({
        msg:"todo created"
    })
})

app.get("/todos",auth,async (req,res)=>{
    const response = await todoModel.find({
        userId: req.userID
    })
    if(response){
        res.json({
            todos:response
        })
    }
})

app.listen(3000)