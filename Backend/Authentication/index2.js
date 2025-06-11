//this is the same authentication process using JWT 
// here is the detailesd slide link here we can see that why we have used jwt what is the need of it!
//basically it is reducing the triggers to the database!
//it uses these thing , install jsonwebtoken -> then require it -> create a JWT_SECRET variable -> during signin use jwt.sign({username},JWT_SECRET) it will encrypt(encode) the username inside the token itself then during the time of /me just send this token along with the username then there will be no need to look for the username inside the database it is encrypted inside the token and during authentication it dycrypts using jwt.verify(token,JWT_SECRET)
// https://projects.100xdevs.com/tracks/auth-mern/Authentication-1


const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();

const JWT_SECRET = "This_is_the_Secret_string!";
app.use(express.json());

let users = [];


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
    
    // console.log(token);
    let flag = null;
    users.find((u)=>{
       if( u.username === username){
            flag = true;
       }
    })
    if(flag){
        // console.log("found!");
        const jwtToken = jwt.sign({
            username:username
        },JWT_SECRET)
        flag.token = jwtToken
        res.json({
            msg:"Token generated and You have successfully signed in",
            token:jwtToken
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
    const userDetails = jwt.verify(token,JWT_SECRET)
    const username =  userDetails.username;
    let flag = null;
    users.find((u)=>{
        if(u.username === username){
            flag = u;            
        }
    })
    res.json({
        username:flag.username,
        password:flag.password
    })
})
app.listen(3000);