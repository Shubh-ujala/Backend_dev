// const express = require('express');
// const Router = express.Router;

// const userRouter = Router();
const {Router} = require('express');
const express  = require('express')
const userRouter = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {userModel, purchaseModel, courseModel} = require("../db");
const {userMiddleware} = require("../middlewares/user")

userRouter.post("/signup",async (req,res)=>{
    const {email,password,firstName,lastName} = req.body
    //here we can use the `zod` module to check the format of the requested body parameters 
    //we have to hash the password here then send the hashed password to the db
    const hashedPassword = await  bcrypt.hash(password,5)
    try{
        const response = await userModel.create({
            email:email,
            password:hashedPassword,
            firstName:firstName,
            lastName:lastName
        })
        if(response){
            res.json({
                msg:"Signed up!"
            })
        }
    }catch(e){
          res.json({
            msg:"Some error occured while signup, Try again"
          })
    }
}) 

userRouter.post("/signin",async (req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({
        email
    })
    const comparedPass = await bcrypt.compare(password,user.password);
    if(comparedPass){   
        //we are using the token based authentication

        //if we will do the cookie based authentication then here we have to apply the logic of the cookie based authentication
        const id = user._id
        const token = jwt.sign({
            id
        },process.env.JWT_SECRET_USER);
        if(token){
            res.json({
                msg:"Signed in successfully!",
                token:token
            })
        }else{
            res.status(403).json({
                msg:"Error! try again later"
            })
        }
    }else{
        res.json({
            msg:"Sign up first"
        })
    }                                    
}) 
userRouter.get("/purchases",userMiddleware,async (req,res)=>{
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId
    })
    const courseData = await courseModel.find({
        _id:{$in: purchases.map(x => x.courseId)}
    })
    res.json({
        purchases,
        courseData
    })
})

module.exports = {
    userRouter
}
