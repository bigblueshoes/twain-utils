const net = require('net');

const tcpServer = (
    port,
    bufferHander=()=>()=>{},
    closeHandler=()=>()=>{},
) => {
    const server = net.createServer((socket) => {
        socket.on('data', bufferHander(socket));
        socket.on("close", closeHandler(socket));
    });
    server.listen(port);
    return server;
}

exports.tcpServer = tcpServer;