//create a http server 

const express = require('express');
const app = express();

app.get("/multiply/:a/:b",function(req,res){
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        multiplication : a*b
    })
    
})
app.get("/sum",function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        "sum " : a+b
    })
    
})
app.get("/divide",function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        "divide" : a/b
    })
    
})
app.get("/sub",function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        "subtraction" : a-b
    })
    
})
app.listen(1010)