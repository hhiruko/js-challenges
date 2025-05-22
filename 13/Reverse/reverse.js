const prompt = require('prompt-sync')();
const fs = require('node:fs');

const string = prompt('Your string: ');
fs.writeFileSync('reverse', string.split('').reverse().join(''));

console.log(fs.readFileSync('reverse', 'utf-8'));