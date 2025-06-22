const {Router} = require('express');
const { userMiddleware } = require('../middlewares/user');
const {purchaseModel, courseModel} = require("../db");
const courseRouter = Router();

courseRouter.post("/purchase",userMiddleware,async (req,res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId
    try{
        const response = await purchaseModel.create({
            userId:userId,
            courseId:courseId
        })
        if(response){
            res.json({
                msg:"Course purchased"
            })
        }
    }catch(err){
        res.json({
            msg:"Error occurred"
        })
    }
})
courseRouter.get("/preview",async (req,res)=>{
    const courses = await courseModel.find({})
    res.json({
        courses
    })
})

module.exports = {
    courseRouter
}