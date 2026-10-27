const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

server.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log("new user connected")

    socket.on('message', (msg) => {
        io.emit('message',msg);
    })

    socket.on('disconnect', () => {
        console.log("user disconnected")
    })
});