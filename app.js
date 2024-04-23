"use strict";
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};

const express = require("express");
// const { createServer } = require("http");
// const { Server } = require("socket.io");


const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, { 
//   cors : {
//     origin : "http://localhost:5173/"
//   }
// });

const port = 3000;
const cors = require('cors');

const routes = require('./routes/routes.js');
const errorHandler = require('./middlewares/errorHandler.js')

// io.on("connection", (socket) => {
//   // ...
//   console.log(socket);
//   console.log("user connected")
// });


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.use(errorHandler);

// httpServer.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});