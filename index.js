const express = require('express');
const path = require('path');

const app = express();

const server = require('http').Server(app);
const socketio = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);

require('./chat-js/src/sockets')(socketio);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
})

