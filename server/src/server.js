const app = require('express')();
const http = require('http').createServer(app);
const port = 3333;

const server = require('socket.io')(http, {
   serveClient: false,
   pingInterval: 10000,
   pingTimeout: 5000,
   cookie: false,
});

server.listen(port, () => {
   console.log(`server running in port ${port}`);
});

let messages = []

server.on('connection', socket => {

   socket.emit('chat.messages', messages);
   server.emit('clients', server.engine.clientsCount);

   socket.on('send.message', data => {
      messages.push(data);
      server.emit('received.messages', messages);
   });

   socket.on('disconnect', () => {
      socket.broadcast.emit('disconnected', socket.id);
      server.emit('clients', server.engine.clientsCount);
   });
});
