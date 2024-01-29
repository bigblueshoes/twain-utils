const net = require('net');

const tcpServer = (
    port,
    bufferHander=()=>()=>{},
    closeHandler=()=>()=>{},
) => {
    const server = net.createServer((socket) => {
        socket.on('data', bufferHander(socket));
        socket.on("close", closeHandler(socket));
        socket.on('end', () => console.log("socket end"));
        socket.on('drain', () => console.log("socket drain"));
    });
    server.listen(port);
    return server;
}

exports.tcpServer = tcpServer;