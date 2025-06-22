const {Router} = require("express");
const adminRouter = Router();
const {adminModel, courseModel} = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { adminMiddleware } = require("../middlewares/admin");

adminRouter.post("/signup",async (req,res)=>{
    const {email,password,firstName,lastName} = req.body
    //here we can use the `zod` module to check the format of the requested body parameters 
    //we have to hash the password here then send the hashed password to the db
    const hashedPassword = await  bcrypt.hash(password,5)
    try{
        const response = await adminModel.create({
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

adminRouter.post("/signin",async (req,res)=>{
    const {email,password} = req.body;
    const admin = await adminModel.findOne({
        email
    })
    const comparedPass = await bcrypt.compare(password,admin.password);
    if(comparedPass){   
        //we are using the token based authentication

        //if we will do the cookie based authentication then here we have to apply the logic of the cookie based authentication
        const id = admin._id
        const token = jwt.sign({
            id
        },process.env.JWT_SECRET_ADMIN);
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
            msg:"Invalid credentials"
        })
    }     
})

adminRouter.post("/course",adminMiddleware,async (req,res)=>{
    const adminId = req.adminId;

    const {title,description,imageUrl,price} = req.body;
    const response = await courseModel.create({
        title,description,imageUrl,price,creatorId:adminId
    })
    res.json({
        msg:"Course created",
        courseId:response._id
    })
})  

adminRouter.put("/course",adminMiddleware,async (req,res)=>{
    const adminId = req.adminId;

    const {title,description,imageUrl,price,courseId} = req.body;
    try{
        const response = await courseModel.updateOne({
            _id:courseId,
            creatorId:adminId
        },{
            title,description,imageUrl,price
        })
        res.json({
            msg:"Course Updated",
            courseId:response._id
        })
    }catch(e){
        res.status(404).json({
            msg:"Can only updated your own course"
        })
    }
})

adminRouter.get("/course/bulk",adminMiddleware,async (req,res)=>{
    const adminId = req.adminId
    const courses = await courseModel.find({
        creatorId:adminId
    })
    res.json({
        courses:courses
    })
})

module.exports = {
    adminRouter
}