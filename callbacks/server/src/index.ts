import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 3000;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.status(201).json({ message: "Hello World" });

  // const response = await axios.get("http://localhost:3000")
  // response.data === { message: "Hello World" }
  // response.status === 201
});

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("show_me_money", (callback) => {
    console.log("$$$");

    callback("$$$$$");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
