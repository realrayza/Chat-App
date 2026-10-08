const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { mongoose } = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const { verifyToken } = require("./middleware/requireAuth");
const messageRoutes = require("./routes/messageRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
app.use(cors());
const server = http.createServer(app);
app.use(express.json());

const io = new Server(server, {
  cors: { origin: process.env.frontEnd, methods: ["GET", "POST"] },
});
console.log(process.env.frontEnd)
io.use(async (socket, next) => {
  try {
    const payload = await verifyToken(socket.handshake.auth.token);
    socket.userUid = payload.nkataId;
    next();
  } catch (error) {
    next(new Error("Not Authenticated"));
  }
});

io.on("connection", async (socket) => {
  console.log(`${socket.userUid} connected`)
  socket.on("disconnect", (reason) => {
    console.log("DISCONNECTED:");
  });
  await socket.join(socket.userUid);
});

app.get("/",(req, res) => res.send("listening for requests"));

app.use((req, res, next) => {
  next();
});

app.use("/api/users/", userRoutes);
app.use("/api/messages/", messageRoutes(io));
app.use("/api/contacts/", contactRoutes);

mongoose.connect(process.env.dbURL).then(() => {
  server.listen(4000,"0.0.0.0", console.log("DB connected and Server listening"));
});

module.exports = app;
