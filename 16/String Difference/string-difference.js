const prompt = require('prompt-sync')();

const string = prompt('First string: ');
const diff = prompt('Second string: ');

let filtered = '';
string.split('').forEach(char => {
    if(!diff.includes(char)){
        filtered += char;
    }
});

console.log(filtered);