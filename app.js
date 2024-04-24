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
    origin : "http://localhost:5173/"
  }
});

io.on("connection", (socket) => {
  // ...
  console.log(socket);
  console.log("user connected");

  
});


httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

