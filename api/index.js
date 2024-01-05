const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const rooms = ["general", "tech", "finance", "crypto"];

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

const server = require("http").createServer(app);
const PORT = 5001;
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.listen(PORT, () => {
  console.log("server started at port ", PORT);
});
