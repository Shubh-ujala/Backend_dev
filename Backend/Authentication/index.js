const express = require('express');
const app = express();
app.use(express.json());

let users = [];

function generateToken(){
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9']
    let token = "";
    for(let i = 0;i<32;i++){
        token += letters[Math.floor(Math.random()*letters.length)]
    }
    return token;
}
app.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username: username,
        password: password
    })
    res.json({
        msg:"You successfully signed up!"
    })
    // console.log(users);
    
})
app.post('/signin',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const token = generateToken();
    // console.log(token);
    let flag = null;
    users.find((u)=>{
       if( u.username === username){
            flag = true;
            u.token = token
       }
    })
    if(flag){
        // console.log("found!");
        res.json({
            msg:"Token generated and You have successfully signed in",
            token:token
        })
        // console.log(users);
        
    }else{
        res.json({
            msg:"unable to generate the token!"
        })
    }
    
})
app.get("/me",(req,res)=>{
    const token = req.headers['token']
    // console.log(token);
    
    let flag = null;
    users.find((u)=>{
        if(u.token === token){
            flag = u;            
        }
    })
    res.json({
        username:flag.username,
        password:flag.password
    })
})
app.listen(3000);