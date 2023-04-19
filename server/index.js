require("dotenv").config();

const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: `${process.env.CLIENT_URL}`,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("sendChat", (payLoad) => {
    console.log("received: ", payLoad);
    socket.emit("getChat", payLoad);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(5000, () => {
  console.log("listening on port:5000");
});
