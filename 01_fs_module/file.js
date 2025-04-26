//file system
const fs = require('fs');
// we can see we haven't used the ./fs because we are not importing the things from the current directory! 

fs.writeFileSync("01_sample.txt","hi i have created using fs module");