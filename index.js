const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const path = require("path");

const server = http.createServer(app);

app.use(express.static(path.resolve("./public")));

const io = new Server(server);

io.on("connection", (socket) => {
    // console.log("new user connected", socket.id);
    socket.on("user-message", ({ username, message }) => {
        // console.log("Message received from", username, ":", message);
        io.emit('messagefrombackend', { username, message });
    });
});

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(3000, () => {
    console.log("server is running on port 3000");
});