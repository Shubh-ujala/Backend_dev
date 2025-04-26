//file system
const fs = require('fs');
// we can see we haven't used the ./fs because we are not importing the things from the current directory! 

// How to create a file ✅ (writeFileSync)
// fs.writeFileSync("01_sample.txt","hi i have created using fs module");
//whenever we will run this file using node a file named "01_sample.txt" is going to be created which is having the content "hi i have created using fs module";
