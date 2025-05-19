const prompt = require("prompt-sync")();
const fs = require('node:fs');

const file = 'replace-all';
const text = fs.readFileSync(file, 'utf-8');

const find = prompt('Find: ');
const regex = RegExp(find, 'g');
let found = 0;
while (regex.exec(text) !== null) {
    found++;
}

console.log('Matched: ' + found);

if(found > 0){
    const replace = prompt('Replace with: ');
    const proceed = prompt(`Do you want to replace all matches with ${replace}? (Y/N): `);
    if(proceed.toLowerCase() === 'y'){
        const replaced = text.replaceAll(regex, replace);
        fs.writeFileSync(file, replaced);
        console.log(replaced);
    }
}