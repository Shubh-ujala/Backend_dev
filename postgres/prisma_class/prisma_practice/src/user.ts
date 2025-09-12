import {PrismaClient} from "@prisma/client"
const prisma  = new PrismaClient();

interface UserParams{
    userName :string,
    email :string,
    password:string
}

async function insertUser({userName,email,password}:UserParams){
    const res = await prisma.user.create({
        data :{
            userName,
            email,
            password
        }
    })
    console.log(res);
}
// insertUser({
//     userName:"kishan",
//     email:"kishan@gmail.com",
//     password:"kishan111"
// })

//we are using the username to find the user because it is unique(as per our model)
async function findUser(userName:string) {
    const user = await prisma.user.findMany({
        where :{
            userName
        }
    })
    console.log(user);
}
// findUser("shubhujala")

async function  updateUser(userName:string) {
    const updatedUser = await prisma.user.update({
        data : {
            email :"shubhujala1234@google.com"
        },
        where :{
            userName
        }
    })
    console.log(updatedUser);
}
updateUser("shubhujala")