// function sum(a,b){
//     return a+b;
// }
// console.log(sum(1,6));


// npm -> node package manager!
// const chalk = require("chalk");

//✅How to run the chalk files!
//chalk will work upon some updated js that's why we have created the index.mjs file
// and to run the code on the .mjs file we have to run the command like this =>`node --experimental-modules index.mjs` 

// // console.log(chalk);

// console.log(chalk.blue('Hello, world!'));
// console.log(chalk.red.bold('This is an error message.'));
// console.log(chalk.green.underline('This is a success message.'));


// internal modules!
const fs = require('fs');
fs.readFile('a.txt','utf-8',(err,data)=>{
    console.log(data);
})

const path = require("path");
console.log(__dirname); // prints the directory in which we are working!
console.log(path.join(__dirname,"index.js")); // it will joins the index.js to the path!

