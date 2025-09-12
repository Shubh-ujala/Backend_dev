"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// import { PrismaClient } from './generated/prisma'
// const prisma = new PrismaClient()
async function insertUser(email, password, firstName, lastName) {
    const response = await prisma.user.create({
        data: {
            email,
            password,
            firstName,
            lastName
        }
    });
    console.log(response);
}
async function updateUser({ firstName, lastName }) {
    const res = await prisma.user.update({
        where: {
            email: "shubhujala@gmail.com"
        },
        data: {
            firstName,
            lastName
        }
    });
    console.log(res);
}
// updateUser({
//     firstName:"shubhaaa",
//     lastName:"ujalaaa"
// })
async function deleteUser(email) {
    const res = await prisma.user.delete({
        where: {
            email: email
        }
    });
    console.log(res);
}
async function allUsers() {
    const allusers = await prisma.user.findMany();
    console.log(allusers);
}
allUsers();
