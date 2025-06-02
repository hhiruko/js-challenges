const net = require('node:net');
const prompt = require('prompt-sync')();

const echo = prompt('> ');
const client = net.connect({port: 51294}, () => {
    console.log('connected to server');
    client.write(echo);
});

client.on('data', (data) => {
  console.log('received:', data.toString());
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});