
// // returns the object of the promise class!
// function setTimeoutPromisified(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// function callback() {
// 	console.log("3 seconds have passed");
// }

// setTimeoutPromisified(3000).then(callback)

// function waitFor3S(resolve){
//     setTimeout(resolve,3000);
// }
// function main(){
//     console.log("main called!");
    
// }

// waitFor3S(main);

//CALLBACK HELL!!

// setTimeout(function(){
//     console.log("hi!");
//     setTimeout(function(){
//         console.log("hello");
//         setTimeout(function(){
//             console.log("hello there!");
//         },5000)
//     },3000)
// },1000)


// function random(resolve){//resolve is also a function
//     // resolve();//immediately resolve!
//     setTimeout(resolve,4000);
// }
// let p = new Promise(random);
// // console.log(p);


// //using the eventual vaue returned by the promise
// function callback(){
//     console.log("done! promise");
// }
// p.then(callback);


const fs = require('fs');



// fs.readFile('./a.txt','utf-8',function(err,data){
//     if(err){
//         console.log("can't read file!");
//     }else{
//         console.log(data.trim());
//     }
// })
// const fs = require("fs");
function cleanFile(filePath, cb) {
  return new Promise(function (resolve) {
    fs.readFile(filePath, "utf-8", function (err, data) {
      data = data.trim();
      fs.writeFile(filePath, data, function () {
        resolve();
      });
    });
  });
}
function main() {
    console.log("Done cleaning file");
}
const p = cleanFile("a.txt");
p.then(main)
// main();  


// create the promisified version of setTimeOut 
//promise takes function as argument!

function setTimeoutPromisified(tm){
  return new Promise(function(res){
    setTimeout(res,tm);
  })
}
function callback(){
  console.log("5 seconds passed!");
  
}
setTimeoutPromisified(5000).then(callback);