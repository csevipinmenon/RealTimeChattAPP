const express = require("express");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket);
  socket.on("chat", (payload) => {
    console.log("message received", payload);
    io.emit("chat", payload);
  });
});

server.listen(5000, () => {
  console.log("server is running on port 5000");
});
