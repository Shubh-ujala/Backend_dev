const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const {z} = require('zod');
const { userModel , todoModel} = require("./db");
const {auth,JWT_SECRET} = require('./auth')
const { fa } = require("zod/v4/locales");
// const {auth} = require("./auth");
// const JWT_SECRET = "THISISTHESECURITYKEY"
const app = express();
mongoose.connect("");
app.use(express.json());


app.post("/signup",async (req,res)=>{
    //this is how we can use zod!(to ensure that the input given by the user is valid!)
    const requiredBody = z.object({
        name:z.string().min(3).max(20),
        email:z.string().email(),
        password:z.string().min(3).max(30)
    })
    const parsedData = requiredBody.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            msg:parsedData.error
        })
    }else{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        //bcrypt.hash return the promise so we have to await it!
        try{

            const hashedPassword = await bcrypt.hash(password,5)
            // console.log(hashedPassword);
            const data = await userModel.create({
                name:name,
                email:email,
                password:hashedPassword
            })
            if(data){
                res.json({
                    msg:"signed up!"
                })
            }
        }catch(err){
            // console.log("email already exist!");
            res.status(403).json({
                msg:"email already exist!"
            })
            
        }
    }
})
app.post("/signin",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const response = await userModel.findOne({
        email,
    })
    try{
        const comparePass = await bcrypt.compare(password,response.password);
        if(comparePass){
            const token = jwt.sign({
                id: response._id
            },JWT_SECRET)
            res.json({
                msg:"Successfully logged in!",
                token:token
            })
        }else{
            res.status(403).json({
                msg:"Provide the correct password!"
            })
        }
    }catch(err){
        res.status(403).json({
            msg:"Signup first!"
        })
    }
})
// function auth(req,res,next){
//     const token = req.headers.token;
//     const decodedData = jwt.verify(token,JWT_SECRET);
//     if(decodedData){
//         req.id = decodedData.id
//         next();
//     }else{
//         res.status(403).json({
//             msg:"Invalid credentials!"
//         })
//     }
// }

app.post("/todo",auth,async (req,res)=>{
    //add todo
    const title = req.body.title; 
    try{
        const todo = await todoModel.create({
            title:title,
            timeStamp:Date.now(),
            completed:false,
            userId : req.id
        })
        res.json({
            msg:"todo created!"
        })
    }catch(err){
        console.log(err);
        
    }

    
})
app.put("/todo",auth,async (req,res)=>{
    //update todo 
    //here we are going to use findByIdAndUpdate()
    const title = req.body.title;
    const id = req.body._id;
    
    // this id we will be getting as a request from the frontend!
    try{
        
        const updatedTodo = await todoModel.findOneAndUpdate(
            {_id:id},
            {title:title,completed:true},
            
            {new:true}
        ) 
        
        res.json({
            msg:"Status updated"
        })
    }catch(err){
        res.status(404).json({
            msg:"Failed to update the status"
        })
    }

})
app.delete("/todo",auth,async (req,res)=>{
    //delete todo
    const title = req.body.title;
    const id = req.body._id
    try{
        await todoModel.findByIdAndDelete(id,{
            title:title
        });
        res.json({
            msg:"done!"
        })
    }catch(err){
        res.status(404).json({
            msg:"Oops! something wents wrong!"
        })
    }

})
app.get("/todos",auth,async (req,res)=>{
    //get the todos
    const todos = await todoModel.find({
        userId : req.id
    })
    res.json({
        todos:todos
    })
})

app.listen(3000);
