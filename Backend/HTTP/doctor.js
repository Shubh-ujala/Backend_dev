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
    }]
}]
app.get("/",function(req,res){
    //write the logic which return the number of kidneys the user have and how many are healthy
    const johnKidney = users[0].kidney;
    let numberOfkidney = johnKidney.length;
    let numberOfHealthykidney = 0;
    let numberOfUnHealthyKidney = 0;
    for(let i = 0 ; i<numberOfkidney ; i++){
        if(johnKidney[i].healthy == true){
            numberOfHealthykidney++;
        }else{
            numberOfUnHealthyKidney++;
        }
    }
    res.json({
        user:users[0].name,
        numberOfkidneys:numberOfkidney,
        healthyKidney:numberOfHealthykidney,
        unhealthyKidney:numberOfUnHealthyKidney
    })
})
function checkForUnhealthyKidney(){
    let flag = false;
    let johnKidney = users[0].kidney;
    for(let i = 0 ; i<johnKidney.length ; i++){
        if(johnKidney[0].healthy == false){
            flag = true; // means user have unhealthy kidney!
        }
    }
    return flag;
}

app.post("/",function(req,res){
    let johnKidney = users[0].kidney;
    if(johnKidney.length<2){
        johnKidney.push({
            healthy:true
        })
        // console.log(johnKidney);
        res.json({
            msg:"New healty kidney added!"
        })
    }else{
        res.status(404).json({
            msg:"User is already having two kidneys! how many you want? bro!"
        })
    }
})

app.put("/",function(req,res){
    let johnKidney = users[0].kidney;
    let boolean = false;
    for(let i = 0 ; i<johnKidney.length; i++){
        if(johnKidney[i].healthy == false){
            boolean = true;
            johnKidney[i].healthy = true;
        }
    }
    if(boolean && johnKidney.length<=2){
        res.json({
            msg:"Kideny replaced Successfully!"
        })
    }else{
        res.status(403).json({
            msg:"No kideny! to be replaced!"
        })
    }  
})

app.delete('/',function(req,res){
    let johnKidney = users[0].kidney;
    if(johnKidney.length>0  && johnKidney.length<=2){
        johnKidney.pop();
        res.json({
            msg:"One kidney removed!"
        })
    }else{
        res.status(403).json({
            msg:"No kidney is there to remove!"
        })
    }
})

// console.log(users[0]);
app.listen(3000)

// it works !! it is a kind of backend i have handled! (check the response in the postman!) :)


