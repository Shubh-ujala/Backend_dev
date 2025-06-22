const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const {adminRouter} = require("./routes/admin");

const app = express();
app.use(express.json())
//instead of defining all the routes inside the same file we will rather define them in the different file and to make this happens with proper manner we are going to use the concept of `routing`

app.use("/api/v1/user",userRouter);
//now this router will be able to handle the request on all the routes which starts from /user/....

app.use("/api/v1/course",courseRouter); // similarly this also
app.use("/api/v1/admin",adminRouter)

async function main(){
    await mongoose.connect(process.env.Connection_String);
    app.listen(3000);
    console.log("databse connected!");
    
}
main();

//main function will ensures that after connection with the database the server will starts running!