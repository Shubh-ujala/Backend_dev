// `ping` command is used to check the ip of the specific website
// postman is used to check the response of the api that we are sending! which responsed back with JSON

//Status code! => 3 digit numbers! returned by the server
/*
it is good practice to use the good status code! (as a good developer )
200 series (Success) -> 200 ok ==> the req was successful & server returned the requested resource , 204 no content ==> the req was successfull but there is no content to responed

300 series (Redirection)

400 series (Client Error)

500 series (Server Error)
*/

/*
Body => whenever we are senfing some data with the request then the data that we are sending is known as the body!
*/


// let's use express!!

const express = require('express')
const app = express();
// defining route handler
app.get('/',function(req,res){
    res.send("Hello world!");
})

//sending json data to the client
app.get('/send',function(req,res){
    res.json({
        name:"shubh"
    });
})
app.get('/html',function(req,res){
    res.send("<b>hi there!</b>");
})


app.listen(3000);// which port you want to listen