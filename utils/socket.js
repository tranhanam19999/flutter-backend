const { Server } = require('socket.io');

let io;

const handleSocketConnection = (server) => {
    if (server) {
        io = new Server(server, {
            path: '/chat',
            cors: {
                origin: '*',
            },
        });
    }
    return io;
};

module.exports = { handleSocketConnection };
