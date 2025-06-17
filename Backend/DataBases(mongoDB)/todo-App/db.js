const mongoose = require('mongoose');
const { date, boolean } = require('zod/v4');
const ObjectId = mongoose.ObjectId;

const Schema = mongoose.Schema;
const user = new Schema({
    name:String,
    email:{type: String,unique:true},
    password:String,
})
const todo = new Schema({
    title:String,
    timeStamp:{type:Date,default:Date.now()},
    completed:boolean,
    userId: ObjectId
})

const userModel = mongoose.model('users',user);
const todoModel = mongoose.model('todos',todo);

module.exports = {
    userModel,
    todoModel
}