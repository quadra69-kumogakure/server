"use strict";
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const port = 3000;
const routes = require('./routes/routes.js');
const errorHandler = require('./middlewares/errorHandler.js')


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.use(errorHandler);

const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors : {
    origin : "*"
  }
});

io.on("connection", (socket) => {
  // ...
  console.log(socket.id);
  console.log("user connected");

  

  socket.on("join-conversation", (conversationId) => {
    socket.join(`room-${conversationId}`)
    console.log(`user id ${socket.id} masuk ke room ${conversationId}`);
  });

  socket.on("sent-message", ({conversationId, message}) => {
    io.to(`room-${conversationId}`).emit("sent-message", conversationId, message);
    console.log(`message : ${message}, sent to room ${conversationId}`)

    
  })
});


httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

