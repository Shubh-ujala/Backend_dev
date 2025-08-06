"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "DJFHJOKFHKJSFDH";
const auth = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(403).json({
            msg: "No token provided!"
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (decoded) {
            //@ts-ignore
            req.userId = decoded.id;
            next();
        }
        else {
            res.status(403).json({
                msg: "Invalid token!"
            });
        }
    }
    catch (error) {
        res.status(403).json({
            msg: "You are not logged in!"
        });
    }
};
exports.auth = auth;
