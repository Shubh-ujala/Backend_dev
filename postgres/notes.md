we have to use the package 'pg' to use postgres (like mongoose in mongoDB)
- one main thing about the pg is that it is the package which is purely written in the javaScript so while installing we have to use this command 
- npm install pg @types/pg


Here are the steps of the project
- npm init -y
- npm install typescript
- npx tsc --init
  -> then in tsconfig.jsdon change the rootDir and outDir

## NOTE : for the DB we are using Neon.tech and we will create the DB there

now if we want to see how to use this database then look at the index.ts file

### SQL Injection 
- suppose you have created an endpoint for signup which looks like this 
  ```
  app.post("/signup" ,async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try{
        const insertQuery = `INSERT into users (username,email,password) VALUES ('${username}', '${password}', '${email}') `
        const response = await pgClient.query(insertQuery)
        res.json({
            message:"You have successfully signed up!"
        })
    }catch(e){
            res.status(404).json({
            message:"Error while signing up!"
        })
    }
  })
  
this is the endpoint that we have created for the user to signup and the it looks fine tho. but the main issue with this type of code is the 'sql injection' suppose we went to the postman and send the data from there and the data looks like this 
          {
            "username":"harry",
            "email":"harry@gmail.com",
            "password":"''); DELETE FROM users;"
          }

here clearly you can see that inside the password key we have passed the thing to delete all the users from the database and it is fully valid syntax in the database
which results into the deletion of all the users from our database
So to avoid there types of SQL injection we will use the inserQuery like this 

    *CODE 

      const insertQuery = `INSERT into users (username,email,password) VALUES ($1, $2, $3) `

      here you can see that we are not inserting the things as it is in the Database infact here we are using random variables and then when we are talking with the database then we will give the value array as a second argument like this ->

      const response = await pgClient.query(insertQuery,[username,password,email])
    
So this is what the SQL Injection is and the way to solve this injection :)