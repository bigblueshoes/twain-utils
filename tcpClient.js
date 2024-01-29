const net = require('net');

const isValidJSON = str => {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
}

const tcpClient = (host, port, opts= { keepConnection: true }) => {
    const client = new net.Socket()
    const connect = () => client.connect({ port, host });
    const end = () => client.end();
    const send = (data) => {
      return new Promise(resolve => {
        const buffer = Buffer.from(JSON.stringify(data));
        client.on("data", (returnedData) => {
          const response = JSON.parse(returnedData.toString("utf-8"));
          resolve(response);
        });
        client.write(buffer);
      });
    }
    const sendAndEnd = (data) => {
      return new Promise(resolve => {
        const buffer = Buffer.from(JSON.stringify(data));
        client.on("data", (returnedData) => {
          const response = JSON.parse(returnedData.toString("utf-8"));
          resolve(response);
        });
        client.write(buffer);
        end();
      });
    }
    const init = async (init_data) => {
      connect();
      if (opts.keepConnection) client.on('close', () => init(init_data));
      return await send(init_data);
    }
    return { init, send, connect, end, sendAndEnd, client }
}

exports.tcpClient = tcpClient;
