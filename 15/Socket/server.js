const net = require('node:net');

const server = net.createServer((socket) => {
    console.log('client connected');
    
    socket.on('data', (data) => {
        const string = data.toString();
        if(string.includes('reverse ')){
            data = string.replace('reverse ', '').split('').reverse().join('');
        }

        console.log('received:', string);
        socket.write(data);
    });

    socket.on('end', () => {
        console.log('client disconnected');
    });
}).on('error', (err) => {
    console.log('error: ' + err.message);
});


server.listen(51294, () => {
    console.log('server listening on port', server.address()['port']);
}); 