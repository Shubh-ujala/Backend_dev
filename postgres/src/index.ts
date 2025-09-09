import { Client } from "pg"
import express from "express";
const app = express();
app.use(express.json());

const pgClient = new Client("postgresql://neondb_owner:npg_6hAPzGg3oyTq@ep-quiet-grass-adl86769-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")

const selectUser = `SELECT * FROM users`
const updateUser = `UPDATE users SET username = 'shubhujala' WHERE id = '1'`
const createTable = `CREATE TABLE todos(
                        id SERIAL PRIMARY KEY,
                        title VARCHAR(50),
                        description VARCHAR(100),
                        done BOOLEAN
                    );`
const insertDate = `INSERT INTO todos  (title,description,done) VALUES ('GYM','Go to gym','false')`
async function main() {

    await pgClient.connect();
    // const response = await pgClient.query(insertDate)
    // console.log(response.rows);
    
}

app.post("/signup" ,async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try{
        const insertQuery = `INSERT into users (username,email,password) VALUES ($1, $2, $3) `
        const response = await pgClient.query(insertQuery,[username,password,email])
        res.json({
            message:"You have successfully signed up!"
        })
    }catch(e){
        // console.log(e);
        
        res.status(404).json({
            message:"Error while signing up!"
        })
    }
})
main()
app.listen(3000)