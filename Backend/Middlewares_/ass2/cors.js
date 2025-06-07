//Assignment - 2
//1. Create a backend server in express in node.js that returns the sum endpoints
//2. Write an HTML file, that hits the backend server using the `fetch` api

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json()) //since we are sending the data inside the body and in the json format that's why we have to use this middleware!
app.use(cors())


app.post("/sum",function(req,res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({
        sum:a+b
    })
})
app.listen(3001);


//suppose if we want to host the frontend and the backend on the same route the we can simple do like this

/**
 app.get("/",function(req,res){
    res.sendFile(__dirname + "/public/cors/html")
 })

 in this code we are just doing this is whenever the request comes on the /3001 it will sends cors.html to the user in this way we can host the both frontend and backend on the same port that is /3001 

 in this way we don't require the cors ! 
 */