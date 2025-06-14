const express  = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const zod = require('zod')
const usernameSchema = zod.string();
const passwordSchema = zod.string().min(6);
const JWT_SECRET="thisisthesecretstringthisneedstobesecure"

app.use(express.json());
const users = [];

app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/public/index.html");
    ///d/Backend!(Daily)/Backend/Authentication/practic+ /public/index.html
})

function findUser(username,password){
    let flag = false;
    users.find((u)=>{
        if(u.username === username && u.password == password){
            flag = true;
        } 
    })
    return flag;
}
//this middleware uses zod and checks the format of the username and password
function checkUsersDetails(req,res,next){
    const usernameResponse = usernameSchema.safeParse(req.body.username);
    const passwordResponse = passwordSchema.safeParse(req.body.password);
    if(! usernameResponse.success || !passwordResponse.success){
        res.json({
            msg:"Please provide a valid username / password"
        })
    }else{
        next();
    }
    
}

//signup
app.post("/signup",checkUsersDetails,(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    let flag = findUser(username,password)
    if(flag){
        res.status(404).json({
            msg:"User already exist"
        })
    }else{
        users.push({
            username,
            password
        })
        console.log(users);
        res.status(200).json({
            msg:"Successfully signed up!"
        })
    }
    
})

//signin
app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    let found = findUser(username,password);
    if(found){
        const token = jwt.sign({
            username,
            password
        },JWT_SECRET)
        res.status(200).json({
            msg:"Successfully signed in",
            token:token
        })
    }else{
        res.status(404).json({
            msg:"User not found!"
        })
    }
})

// me
function auth(req,res,next){
    const token = req.headers.token
    try{
        const decodedData = jwt.verify(token,JWT_SECRET);
        // console.log(decodedData); // { username: 'shubh', password: 'shubh111', iat: 1749728968 }
        let found = findUser(decodedData.username,decodedData.password);
        if(found){
            req.username = decodedData.username;
            req.password  = decodedData.password;
            next();
        }
    }catch(err){
        res.status(404).json({
            msg:"Login first"
        })
    }
}
app.get("/me",auth,(req,res)=>{
    res.json({
        username:req.username,
        password:req.password
    })
})
app.listen(5050);


//so here i have writtern the backend logic of out webpage!