import express from 'express';
import mongoose from 'mongoose';

import jwt from "jsonwebtoken";
//Could not find a declaration file for module 'express'. 

// this import will complain because we are using express module and in the express module we don't have any declaration file (.d.ts) we can check this in the npm webpage ! so there is a ugly way to fix it just write @ts-ignore comment on the top of the import like this {// @ts-ignore <- we should ignore using this } and the error goes away! or there is a good way to install npm install -D @types/express and then it will not going to complain at all :)

const app = express();




