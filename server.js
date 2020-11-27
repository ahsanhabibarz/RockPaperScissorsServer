const express = require("express");
const app = express();
const port = 3000;
const http = require("http").createServer(app);
const io = require("socket.io")(http);
let users = [];
io.on("connection", (socket) => {
  if (users.length < 2) {
    socket.emit("name", "Please insert your name to continue ...");
    socket.on("setName", (name) => {
      users.push({ id: socket.id, name: name });
      socket.broadcast.emit("welcome-other", `${name} is connected`);
      socket.emit("welcome", `Welcome to our game ${name}`);
      if (users.length === 2) {
        io.emit("gameOn", `Enter 1 for rock 2 for paper and 3 for scissors`);
      }
    });
  } else {
    socket.emit("full", "Game Room is full");
  }
  socket.on("move", (move) => {
    let index = users.findIndex((item) => item.id === socket.id);
    users[index].move = move;
    if (users[0].move !== null && users[1].move !== null) {
      console.log(users);
      if (users[0].move === users[1].move) {
        io.emit("result", "Match is draw");
        // Rock Paper
      } else if (users[0].move === "1" && users[1].move === "2") {
        io.emit("result", "Winner" + users[1].name);
      } else if (users[0].move === "2" && users[1].move === "1") {
        io.emit("result", "Winner" + users[0].name);
        // Rock Scissor
      } else if (users[0].move === "1" && users[1].move === "3") {
        io.emit("result", "Winner" + users[0].name);
      } else if (users[0].move === "3" && users[1].move === "1") {
        io.emit("result", "Winner" + users[1].name);
        // Scissor Paper
      } else if (users[0].move === "2" && users[1].move === "3") {
        io.emit("result", "Winner" + users[1].name);
      } else if (users[0].move === "3" && users[1].move === "2") {
        io.emit("result", "Winner" + users[0].name);
      }
    }
  });
});

http.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
