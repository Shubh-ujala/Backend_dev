import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
export async function POST(req:NextRequest){
    //extract the body
    const body = await req.json()
    //store the bosdy on the db
    // console.log(body);
    const users = await client.user.create({
        data : {
            username : body.username,
            password: body.password
        }
    })
    console.log(users.id);
    
    
    return Response.json({
        msg :" Yay! You have signed up"
    })
}

export async function GET() {
    const user = await client.user.findFirst({});
    return Response.json({ name: user?.username, password: user?.password })
}