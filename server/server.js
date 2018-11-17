const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

//create routes, middleware, startup the server
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//configure express middleware to serve up the public folder
app.use(express.static(publicPath));

//callback function to listen on a built in "connection" event for when client is connected to the server,
//then fire function when it's connected
io.on('connection',(socket)=>{
  console.log('new user connected');

  //emit creates new event, send custom data in object (tosend multiple pieces of data) in second argument
  // socket.emit('newEmail',{
  //   from: 'mike@example.com',
  //   text: 'hey what is going on',
  //   createdAt: 123
  // });

//prints message created from client in cmd/server
  socket.on('createMessage',(message) =>{
    console.log('create Message',message);
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect',()=>{
    console.log('user was disconnected');
  });
});

//listen on port 3000
server.listen(port,()=>{
  console.log(`server is up on port ${port}`);
});
