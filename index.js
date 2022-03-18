const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 1338;
const io = require("socket.io")(port, {
  cors: {
    origin: process.env.CLIENT,
    methods: ["GET", "POST"],
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT }));
app.use(cookieParser());

io.on("connection", (socket) => {
  console.log("User Online");

  socket.on("canvas-data", (data) => {
    //console.log(data);
    socket.broadcast.emit("canvas-data", data);
  });
});
