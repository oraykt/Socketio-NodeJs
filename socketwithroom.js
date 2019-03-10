const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    res.end('hey!');
});
server.listen(3000);

const io = socketio.listen(server);

io.on('connection', (socket) => {
    socket.on('joinRoom', (data) => {
        socket.join(data.roomName, () => {
            io.to(data.roomName).emit('whoJoined', { userName: data.userName, message: 'giris yapti!' });
            io.to(data.roomName).emit('joined', { count: getOnlineCount(io, data.roomName) });
            socket.emit('log', {
                login: true,
                userName: data.userName,
                message: 'odaya giris yaptiniz!',
            });
        });
    });

    socket.on('leaveRoom', (data) => {
        socket.leave(data.roomName, () => {
            io.to(data.roomName).emit('leaved', { count: getOnlineCount(io, data.roomName) });
            socket.emit('log', {
                login: false,
                userName: data.userName,
                message: 'odadan cikis yaptiniz!'
            });
        });
    });
});

const getOnlineCount = (io, roomName) => {
    const room = io.sockets.adapter.rooms[roomName];
    return room ? room.length : 0;
};