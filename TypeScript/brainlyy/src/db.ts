import mongoose, {model,Mongoose,Schema} from "mongoose";


mongoose.connect("mongodb+srv://shubhujala:shubh%40mongoDB@cluster0.inu9ksb.mongodb.net/2nd-Brain")
const UserSchema = new Schema({
    userName : {type: String , unique:true},
    password: String
})
export const userModel = model("User",UserSchema)
const contentSchema = new Schema({
    title : String,
    link :String,
    type:String,
    tags : [{type:mongoose.Types.ObjectId, ref : 'Tag'}],
    userId: {type:mongoose.Types.ObjectId, ref:'User',requied : true}
})
export const contentModel = model("Content",contentSchema)

const LinkSchema = new Schema({
    hash:String,
    userId : {type:mongoose.Types.ObjectId, ref:"User",required:true, unique: true}
})

export const LinkModel = model("Link",LinkSchema)