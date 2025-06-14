const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const { json } = require('zod/v4');
const app = express();
const JWT_SECRET ="THISSTRINGNEEDSTOBEVERYSECURE";
const usernameSchema = zod.string();
const passwordSchema = zod.string().min(6);
const users = [];
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/signup.html")
})
app.get("/signinpage",(req,res)=>{
    res.sendFile(__dirname+"/public/signin.html")
})
app.get("/homepage",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

function checkValidity(req,res,next){
    const usernameResponse = usernameSchema.safeParse(req.body.username);
    const passwordResposne = passwordSchema.safeParse(req.body.password);
    if(!usernameResponse.success || !passwordResposne.success){
        res.status(404).json({
            msg:"Please provide the valid username and password"
        })
    }else{
        next();
    }
}
function findUser(username,password){
    let flag = false;
    users.find((u)=>{
        if(u.username === username && u.password=== password){
            flag = true;
        }
    })
    return flag;
}

app.post("/signup",checkValidity,(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    let found = findUser(username,password);
    if(!found){
        users.push({
            username,
            password
        })
        console.log(users);
        let user = null
        users.find((u)=>{
            if(u.username ===  username){
                user = u;
            }
        });
        user.todos = [];
        res.status(200).json({
            msg:"Successfully signed up!"
        })
    }else{
        res.status(404).json({
            msg:"User Already exist!"
        })
    }
})
app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    let found = findUser(username,password);
    if(found){
        const token = jwt.sign({
            username,
            password
        },JWT_SECRET);
        res.status(200).json({
            msg:"Successfully signed in!",
            token:token
        })
    }else{
        res.status(404).json({
            msg:"SignUp first!"
        })
    }
})
function auth(req,res,next){
    const token = req.headers.token;
    try{
        const decodedData = jwt.verify(token,JWT_SECRET);
        req.username = decodedData.username
        next()
    }catch(err){
        res.json({
            msg:err
        })
    }
}
app.get("/me",auth,(req,res)=>{
    res.status(200).json({
        username: req.username
    })
    
})

//create todo
app.put("/todos",auth,(req,res)=>{
    const title = req.body.title;
    let user = null
    users.find((u)=>{
        if(u.username ===  req.username){
            user = u;
        }
    });
    const todo = {
        id: Date.now(),
        title:title,
        completed:false
    }
    user.todos.push(todo)
    res.json({
        users:users
    })
})
app.get("/mytodos",auth,(req,res)=>{
    let user = null
    users.find((u)=>{
        if(u.username ===  req.username){
            user = u;
        }
    });
    // console.log(user.todos.title);
        if(user.todos.length != 0){
            res.json({
                todo:user.todos
            })
        }
    
})
app.delete("/deleteme",auth,(req,res)=>{
    const item = req.body.item;
    const username = req.username;
    let foundUser = null;
    users.find((u)=>{
        if(u.username === username){
            foundUser = u;
        }
    })
    if(foundUser){
        foundUser.todos.find((u)=>{
            if(u.title === item){
                u.completed = true;
            }
        })
        res.json({
            msg:"User found and task marked completed!",
            "todo": foundUser.todos
        })
    }

})

app.listen(8080);