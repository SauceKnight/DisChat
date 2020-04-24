const express = require("express");
require('dotenv').config();
const morgan = require("morgan");
const cors = require('cors');
const { environment } = require('./config');
const socketio = require('socket.io');
const app = express();

const port = require('./config');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const serversRouter = require('./routes/servers');
const messagesRouter = require('./routes/messages');
const channelsRouter = require('./routes/channels');
const userServersRouter = require('./routes/userservers');

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:4000" }));

//Routers are last middleware passed in ALWAYS
app.use(indexRouter);
app.use(usersRouter);
app.use(serversRouter);
app.use(messagesRouter);
app.use(channelsRouter);
app.use(userServersRouter);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    stack: isProduction ? null : err.stack,
    errors: err.errors
  });
});

// const server = app.listen(port, () => `Listening on port: ${port}`);

// const io = socketio(server);

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });


module.exports = app;
