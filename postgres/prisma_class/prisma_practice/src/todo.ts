import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient();

interface todoParams{
    userId : number,
    title : string,
    description? : string,
    done : boolean
}
async function  createTodo({userId,title,description,done}:todoParams) {
    const res = await prisma.todo.create({
        data : {
            userId,
            title,
            description: description ?? null,
            done
        }
    })
    console.log(res); 
}
// createTodo({
//     userId:2,
//     title:"Go to park",
//     description:"walking is necessary now a days",
//     done:false
// })


async function getTodo (userId:number){
    const todos = await prisma.todo.findMany({
        where:{
            userId
        }
    })
    console.log(todos);
}
// getTodo(1)

async function getTodoAndUserDetails(userId:number){
    const todosAndUser = await prisma.todo.findMany({
        where:{
            userId
        },
        select:{
            user:true,
            title:true,
            description: true,
            done:true
        }
    })
    console.log(todosAndUser);
}
getTodoAndUserDetails(1)