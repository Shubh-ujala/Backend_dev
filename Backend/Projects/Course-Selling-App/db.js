const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId

const userSchema = new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
})
const adminSchema = new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
})
const courseSchema = new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:{ type: ObjectId, ref: "admin" } 
})
const purchaseSchema = new Schema({
    userId: { type: ObjectId, ref: "user", required: true },   // Reference to user
    courseId: { type: ObjectId, ref: "course", required: true } // Reference to course
})

const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel  = mongoose.model("course",courseSchema);
const purchaseModel = mongoose.model("purchase",purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}