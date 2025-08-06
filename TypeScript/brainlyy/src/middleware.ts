import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken"
const JWT_SECRET = "DJFHJOKFHKJSFDH"

export const auth = (req : Request,res : Response, next:NextFunction) => {
    const token = req.headers["authorization"];
    
    if (!token) {
        res.status(403).json({
            msg:"No token provided!"
        })
        return;
    }
    
    try {
        const decoded = jwt.verify(token as string, JWT_SECRET);
        if(decoded){
            //@ts-ignore
            req.userId = decoded.id 
            next()
        } else {
            res.status(403).json({
                msg:"Invalid token!"
            })
        }
    } catch (error) {
        res.status(403).json({
            msg:"You are not logged in!"
        })
    }

}