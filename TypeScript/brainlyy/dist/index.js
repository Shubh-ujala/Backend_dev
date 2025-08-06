"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const JWT_SECRET = "DJFHJOKFHKJSFDH";
//Could not find a declaration file for module 'express'. 
// this import will complain because we are using express module and in the express module we don't have any declaration file (.d.ts) we can check this in the npm webpage ! so there is a ugly way to fix it just write @ts-ignore comment on the top of the import like this {// @ts-ignore <- we should ignore using this } and the error goes away! or there is a good way to install npm install -D @types/express and then it will not going to complain at all :)
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.userModel.create({
            userName: userName,
            password: password
        });
        res.json({
            msg: "Signed up!"
        });
    }
    catch (e) {
        res.json({
            msg: "User already exist"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.userModel.findOne({
        userName: userName,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, JWT_SECRET);
        res.json({
            "token": token
        });
    }
    else {
        res.json({
            msg: "Signup First"
        });
    }
}));
app.post("/api/v1/content", middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.contentModel.create({
        title: req.body.title,
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        msg: "content added"
    });
}));
app.get("/api/v1/content", middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.contentModel.find({
        userId: userId
    }).populate("userId", "userName");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contenId;
    yield db_1.contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        msg: "deleted"
    });
}));
app.post("/api/v1/brain/share", middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                msg: "Updated sharable link",
                link: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            //@ts-ignore    
            userId: req.userId
        });
        res.json({
            msg: "removed sharable link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const Link = yield db_1.LinkModel.findOne({
        hash: hash
    });
    if (!Link) {
        res.status(411).json({
            msg: "sorry incorrect input!"
        });
        return;
    }
    const content = yield db_1.contentModel.find({
        userId: Link.userId
    });
    const user = yield db_1.userModel.findOne({
        _id: Link.userId
    });
    res.json({
        username: user === null || user === void 0 ? void 0 : user.userName, //is user not found then optional chaining is used! like this
        content: content
    });
}));
app.listen(3000);
