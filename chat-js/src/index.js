const express = require('express');
const path = require('path');

const app = express();

const server = require('http').Server(app);
const socketio = require('socket.io')(server);


app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
    console.log('Server listening on port 3000');
})

