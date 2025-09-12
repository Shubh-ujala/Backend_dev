
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// import { PrismaClient } from './generated/prisma'
// const prisma = new PrismaClient()

async function insertUser(email:string,password:string,firstName:string,lastName:string){
    const response = await prisma.user.create({
        data:{
           email,
           password,
           firstName,
           lastName
        }
    })
    console.log(response);
    
}
// insertUser("shubhujala@gmail.com","shubh@111","shubh","ujala")
interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser({
    firstName,
    lastName
}: UpdateParams) {
  const res = await prisma.user.update({
    where: {
        email:"shubhujala@gmail.com"
    },
    data :{
        firstName,
        lastName
    }
  })
  console.log(res);
  
}
// updateUser({
//     firstName:"shubhaaa",
//     lastName:"ujalaaa"
// })

async function deleteUser(email:string){
    const res = await prisma.user.delete({
        where :{
            email:email
        }
    })
    console.log(res);
    
}

//this is how we can find all the users! in a particular model in the prisma
async function allUsers(){
    const allusers = await prisma.user.findMany();
    console.log(allusers);
    
}

// allUsers();