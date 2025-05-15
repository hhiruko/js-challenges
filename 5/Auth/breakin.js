const prompt = require("prompt-sync")();
const fs = require("node:fs");

const script = prompt().split(' ').find(s => s.includes('.js'));
const readMethod = 'readFileSync';
const authFile = fs.readFileSync(script, 'utf-8').split('.').find(l => l.includes(readMethod)).substring(readMethod.length + 1).split(',')[0].slice(1, -1);

const list = fs.readFileSync(authFile, 'utf-8');
console.log(list);