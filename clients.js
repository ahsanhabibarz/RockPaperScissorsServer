const io = require("socket.io-client");
const socket = io("ws://localhost:3000");

socket.on("name", (inputPrompt) => {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question(inputPrompt, (name) => {
    socket.emit("setName", name);
    readline.close();
  });
});
socket.on("welcome", (welcome) => {
  console.log(welcome);
});
socket.on("welcome-other", (welcome) => {
  console.log(welcome);
});
socket.on("full", (message) => {
  console.log(message);
});
socket.on("result", (message) => {
  console.log(message);
});

socket.on("gameOn", (inputPrompt) => {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.question(inputPrompt, (name) => {
    socket.emit("move", name);
    readline.close();
  });
});
