const fs = require('node:fs');

const text = fs.readFileSync('text', 'utf-8');

const right = (text) => {
    return text.split('\n').map(e => e.trimStart()).join('\n');
};

const left = (text) => {
    let len = 0;
    text.split('\n').forEach(line => {
        if(len < line.length){
            len = line.length;
        }
    });

    return text.split('\n').map(e => e.trim().padStart(len, ' ')).join('\n');
};

console.log(text);
console.log(right(text));
console.log(left(text));