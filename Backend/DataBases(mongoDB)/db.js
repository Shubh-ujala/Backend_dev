const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

//here we are creating the schema of the collections

//for user collection


const user = new Schema({
    name:String,
    // email:String,
    //in more strict manner it can be done like this
    email:{type:String,unique:true},
    password:String,
})

//for todos collection

const todo = new Schema({
    title:String,
    done:Boolean,
    userId :ObjectId
})

//here we are creating the model of the collections that we have created in our mongoDB database
const userModel = mongoose.model('users',user);
const todoModel = mongoose.model('todos',todo);

module.exports = {
    userModel,
    todoModel
}


//here are the steps that we have to follow wile creating the db.js!
/**
  first of all require the mongoose,then we need  to get the schema class 
  then we need to get the objectId

  after that you have to define the schema for the collections of your DB

  after defining the schema then we have to create the models for that so can we export it to the reuired file!

  and at last we have to export the module by using the 
  module.exports = {
        ..name of the models created!
  }
  
 */