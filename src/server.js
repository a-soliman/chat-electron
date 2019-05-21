const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const http = require("http").createServer(app);
const io = require("socket.io")(http);

http.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
