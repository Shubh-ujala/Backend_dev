"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createTodo({ userId, title, description, done }) {
    const res = await prisma.todo.create({
        data: {
            userId,
            title,
            description: description ?? null,
            done
        }
    });
    console.log(res);
}
// createTodo({
//     userId:2,
//     title:"Go to park",
//     description:"walking is necessary now a days",
//     done:false
// })
async function getTodo(userId) {
    const todos = await prisma.todo.findMany({
        where: {
            userId
        }
    });
    console.log(todos);
}
// getTodo(1)
async function getTodoAndUserDetails(userId) {
    const todosAndUser = await prisma.todo.findMany({
        where: {
            userId
        },
        select: {
            user: true,
            title: true,
            description: true,
            done: true
        }
    });
    console.log(todosAndUser);
}
getTodoAndUserDetails(1);
