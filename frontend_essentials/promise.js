
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
// function callback(){
//   console.log("5 seconds passed!");
  
// }
// setTimeoutPromisified(5000).then(callback);


// // promisified version of readfile!
function readFilePromisified(loc,enc){
  return new Promise(function (resolve,reject){
    fs.readFile(loc,enc,(err,data)=>{
        if(err){reject("error reading file!");}
        else{
          // res(data);
          resolve(data);
          // console.log(data);
          
        }
    })
  })
}
function callback1(data){
  console.log("done!");
  console.log(data);
}
readFilePromisified('./b.txt','utf-8')
    .then(callback1)
    .catch(function(e){
      console.log(e);
      
    });



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

// fixing callback hell(promise chaining)
// setTimeoutPromisified(1000).then(function(){
//   console.log('hi');
//   return setTimeoutPromisified(3000)
// }).then(function(){
//   console.log('hello');
//   return setTimeoutPromisified(5000);  
// }).then(function(){
//   console.log("hello there!");
// })

//using async await !

async function solve(){
  await setTimeoutPromisified(1000);
  console.log('hi');
  await setTimeoutPromisified(3000);
  console.log('hello');
  await setTimeoutPromisified(5000);
  console.log('hello there!'); 
}
solve();
console.log("hey!!!!!");
