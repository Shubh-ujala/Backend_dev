const express = require('express');
const app = express();

//function that returns the boolean if a age of a person is more than 14

// function isOldEnough(age){  ugly approach
//     if(age>=14){
//         return true;
//     }else{
//         return false;
//     } 
// }

// defining the middleware (middleware function )
function isOldEnoughMiddleware(req,res,next){
    const age = req.query.age;
    if(age>= 14){
        next();// passing the argument to the next middleware  
    }else{
        res.json({
            msg:"Sorry you are not of age yet!"
        })
    }
}

// app.get('/ride1',function(req,res){
//     if(isOldEnough(req.query.age)){// ?age=10 in the query!
//         res.json({
//             msg:"You have successfully riden the ride 1"
//         })
//     }else{
//         res.status(411).json({
//             msg:"Sorry! you are not of age yet!"
//         })
//     }
// })
// app.get('/ride2',function(req,res){
//     if(isOldEnough(req.query.age)){// ?age=10 in the query!
//         res.json({
//             msg:"You have successfully riden the ride 2"
//         })
//     }else{
//         res.status(411).json({
//             msg:"Sorry! you are not of age yet!"
//         })
//     }
// })

// since we have created the middleware this is how we will use it (since express is a series of middleware hence we have to define it like this )
app.get('/ride1',isOldEnoughMiddleware,function(req,res){
    res.json({
        msg:"You have successfully riden the ride 1"
    })
})
app.get('/ride2',isOldEnoughMiddleware,function(req,res){
    res.json({
       msg:"You have successfully riden the ride 2"
    })
})

app.listen(3000)

// now when you run the `localhost:3000/ride1?n=14` then you will be able to see that it(isOldEnoughmiddleware) is providing the same response as earlier(with the help of isOldEnough function that we are getting)

/*
Things to keep in mind middlewares is nothing but in express , express itself is the series of middleware and also middlweare is accepting three parameters `req,res,next` whenever our criteria is satisfied we just have to call next() like we have done inside the if part otherwise we can send any response in the else part! 

whenever we are hiting the route either ride1 or ride2 since both of these routes are having the middleware hence the controll first reaches to the middleware then it will  continue to process the things are in the route(with the help of next())

🚀and another one interesting point is 
if we know that we are going to use the same middleware inside all the routes then instead of writing the middleware in the parameter we can use also use app.use like this 

app.use(isOldEnoughmiddleware);
app.get("/ride1"...)
app.get("/ride2"...)

but this approach will only works for all the routes below app.use()

💀 one of the biggest usecase of middleware is authentication!
*/