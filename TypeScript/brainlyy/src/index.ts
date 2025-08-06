import express from 'express';
import mongoose from 'mongoose';

import jwt from "jsonwebtoken";
import { contentModel, LinkModel, userModel } from './db';
import { auth } from './middleware';
import { random } from './utils';
import cors from 'cors';
const JWT_SECRET =  "DJFHJOKFHKJSFDH"
//Could not find a declaration file for module 'express'. 

// this import will complain because we are using express module and in the express module we don't have any declaration file (.d.ts) we can check this in the npm webpage ! so there is a ugly way to fix it just write @ts-ignore comment on the top of the import like this {// @ts-ignore <- we should ignore using this } and the error goes away! or there is a good way to install npm install -D @types/express and then it will not going to complain at all :)

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup",async (req,res)=>{
    const userName = req.body.username;
    const password = req.body.password
    try{
        await userModel.create({
            userName : userName,
            password :password
        })
        res.json({
            msg:"Signed up!"
        })
    }catch(e){
        res.json({
            msg:"User already exist"
        })
    }
})

app.post("/api/v1/signin",async (req,res)=>{
    const userName = req.body.username;
    const password = req.body.password
    const existingUser = await userModel.findOne({
        userName:userName,
        password
    })
    if(existingUser){
       const token =  jwt.sign(
        {id:existingUser._id}
        ,JWT_SECRET)
       res.json({
         "token" : token
       })
    }else{
        res.json({
            msg:"Signup First"
        })
    }
})

app.post("/api/v1/content",auth ,async (req,res)=>{
    const link = req.body.link;
    const type = req.body.type
    await contentModel.create({
        title:req.body.title,
        link,
        type,
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })
    res.json({
        msg:"content added"
    })
})

app.get("/api/v1/content",auth,async (req,res)=>{
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId:userId
    }).populate("userId","userName");
    res.json({
        content
    })
})

app.delete("/api/v1/content",auth,async (req,res)=>{
    const contentId = req.body.contenId;
    await contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId:req.userId
    })
    res.json({
        msg:"deleted"
    })
})

app.post("/api/v1/brain/share",auth,async (req,res)=>{
    const {share} = req.body
    if(share){
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId:req.userId
        })
        if(existingLink){
            res.json({
                msg:"Updated sharable link",
                link:existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            //@ts-ignore
            userId : req.userId,
            hash:hash
        })
        res.json({
            hash
        })
        
    }else{
        await LinkModel.deleteOne({
            //@ts-ignore    
            userId:req.userId
        })
        res.json({
            msg:"removed sharable link"
        })
    }
    
})

app.get("/api/v1/brain/:shareLink",async (req,res)=>{
    const hash = req.params.shareLink
    const Link = await LinkModel.findOne({
        hash:hash
    })
    if(!Link){
        res.status(411).json({
            msg:"sorry incorrect input!"
        })
        return;
    }
    const content = await contentModel.find({
        userId:Link.userId
    })
    const user = await userModel.findOne({
        _id: Link.userId
    })
    res.json({
        username: user?.userName,//is user not found then optional chaining is used! like this
        content:content
    })
})



app.listen(3000) 