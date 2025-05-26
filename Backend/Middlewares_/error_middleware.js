const express = require('express');
const app = express();


/*
You have been given with an express server which has a few endpoints 
Your Task is to 
1.Ensure that is there is ever an exception, then edn user sees a status code of 404
2.Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

---> Here we have to use a special type of middleware that is a exception handling middleware(which is defined after all the routes!)
*/
let errorCount = 0;
app.get('/user',function(req,res){
    throw new Error("User not found!");
    res.status(200).json({name:"John"});
});

app.post('/user',function(req,res){
    res.status(200).json({msg:"Created dummy User!"});
})

app.get("/errorCount",function(req,res){
    res.status(200).json({errorCount});
})
 
//Here we have to defined error middleware! (it takes 4 parameters!) and defined like this
app.use(function (err,req,res,next){
    res.status(404).send({});
    errorCount++;
})
app.listen(3001);