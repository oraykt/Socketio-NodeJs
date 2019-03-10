const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    res.end('Hey!');
});

server.listen(3000);

// const mainSocket = socketio.listen(server);
const io = socketio.listen(server);
const myNameSpace = io.of('/mynamespace');

myNameSpace.on('connection', (socket) => {
    console.log('myNameSpace connected');
    socket.on('saysHiFromNSP', (data) => {
        console.log(data);
        myNameSpace.emit('recievedMessage', 'this message comes from backend namespace');
    });
});






// mainSocket.sockets.on('connection', (socket) => {
//     console.log('User connected');

//     // setTimeout(() => {
//     //     socket.emit('server says hi', { user: 'server', message: 'Hi!' });
//     // }, 1000);

//     // socket.on('saysHi', (data) => {
//     //     console.log(data);
//     // });

//     socket.on('disconnect', () => {
//         console.log('User out!');
//     });

//     socket.on('new-user', (data) => {
//         socket.broadcast.emit('userConnect', data);
//     })
// });