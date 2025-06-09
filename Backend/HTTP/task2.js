// Create a middleware that counts total number of requests sent to a server. Also create an endpoint that exposes it

const express = require('express');
const app = express();
let totalReq = 0;
function getCount(req,res,next){
    ++totalReq;
    next();
}
app.use(getCount);
app.get("/",(req,res)=>{
    res.send("hi");

})
app.get("/getCount",function(req,res){
    res.json({
        msg:`Number of requests are ${totalReq}`
    })
})
app.listen(3000)
