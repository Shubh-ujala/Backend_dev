//file system
const { log } = require('console');
const fs = require('fs');
// we can see we haven't used the ./fs because we are not importing the things from the current directory! 

// How to create a file ✅ (writeFileSync) //Sync
// fs.writeFileSync("./01_sample.txt","hi i have created using fs module");//creating file inside the same directory !
//whenever we will run this file using node a file named "01_sample.txt" is going to be created which is having the content "hi i have created using fs module";

// fs.writeFileSync("../01_sample.txt","hi i have created using fs module"); //creating file outside the directory !

//Async way! ✅
// fs.writeFile("02_sample.txt","hey! i am asyncronous file",(err)=>{});

// Reading file 
const result  = fs.readFileSync("./contact.txt","utf-8");
console.log(result);


