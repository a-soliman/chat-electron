const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  console.log("Connection Start");

  socket.on("newMessage", message => {
    console.log(`Got a new message:: `, message);
  });
});

http.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
