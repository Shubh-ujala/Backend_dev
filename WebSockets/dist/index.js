"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws"); // importing a websocket server!
//defining the port fot the sserver
const wss = new ws_1.WebSocketServer({ port: 8080 });
//event handler
//connection has been stablished!
wss.on("connection", (socket) => {
    console.log("user connected");
    setInterval(() => {
        socket.send("Current price of Stock is : " + Math.floor(Math.random() * 1000));
    }, 3000);
    socket.on("message", (e) => {
        console.log(e.toString());
    });
});
