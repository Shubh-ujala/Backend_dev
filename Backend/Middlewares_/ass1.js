const express = require('express');
const app = express();
//create a middleware which logs the number of request on the /home and through which method it gets called route along with the timstamp and the url!

let numReq = 0;
function getInfo(req,res,next){//middleware
    console.log(`Request number -> ${++numReq}`);
    console.log(`Method name is -> ${req.method}`);//this is how we can get the method of the request!
    console.log(`Method url is -> ${req.url}`);//this is how we can get the url of the request in this case `/home`
    const date = new Date();//getting the date!
    console.log(`Time -> ${date.toDateString()}`);
    next();
}

app.get("/home",getInfo,function(req,res){
    res.send('inside the home route!');    
})
app.listen(2020);

/*
in express if we want to send the JSON data, you need to first parse the json data 
for which we are using the inbuilt middleware express.json() in this way!

app.use(express.json());


CORS -> cross origin resource sharing : it is blocked by default in node.js if we want to make them unblock (because of our fe,be) then we will use cors middleware
*/