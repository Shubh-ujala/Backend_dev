/*
✅Request methods ->
1. GET => Going for a consultation to get a check up
2. POST => Going to get a new kidney inserted
3. PUT => Going to get a kideny replaced
4. DELETE => Going to get a kidney removed

✅Status Codes->
200 - Everything went fine
404 - Doctor is not in the hospital
500 - Mid surgery light wnet away
411 - Input were incorrect, wring person come to surgery
403 - You were not allowed in the hospital

-------------------------------------------------------------------------------------------
Creating in memory hospital (in memory means without dataBase)
You need to create 4 routes (4 things that hospital can do)
1. GET => user can check how many kidney they have and their health
2. POST => user can add a new kidney
3. PUT => User can replace a kidney , make it healthy
4. DELETE => User can remove a kidney
*/
const express = require('express');
const app = express();
var users= [{
    name :"John",
    kidney: [{
        healthy : false
    },{
        healthy : true
    }]
}]
app.get("/",function(req,res){
    //write the logic which return the number of kidneys the user have and how many are healthy
    const johnKidney = users[0].kidney;
    res.send(johnKidney)
    
})

console.log(users[0]);
app.listen(3000)




