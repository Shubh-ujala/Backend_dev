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

// const express = require('express')
// const app = express();
// // defining route handler
// app.get('/',function(req,res){
//     res.send("Hello world!");
// })

// //sending json data to the client
// app.get('/send',function(req,res){
//     res.json({
//         name:"shubh"
//     });
// })
// app.get('/html',function(req,res){
//     res.send("<b>hi there!</b>");
// })


// app.listen(3000);// which port you want to listen


const express = require('express');
function calculateSum(n){
    let ans = 0;
    for(let i = 1 ;  i < n ; i++){
        ans+= i;
    }
    return ans;
}

const app = express();
app.get("/",(req,res)=>{
    const n = req.query.n;
    const ans = calculateSum(n);
    res.send(ans.toString());
})

// app.listen(3000);

// we can also get this response on our phone because it is connected with the same wifi so this is how you can access in the phone .... first of all open terminal and wrrite ipconfig there ans there you can see the ipv4 address `192.168.20.11`(this is in my case) and then open the browser on the phone and then write this `192.168.20.11:3000` and then you will be able to see the response! 

// query parameters is what we are adding after the route using ? like this -> for the above code we will write this in the browser `https://localhost:3000/?n=10` if we have more than one parameter then we can do like this `https://localhost:3000/?n=10&m=20` ans so on 

