const fs = require("node:fs");

const scrambles = ['mkeart', 'sleewa', 'edcudls', 'iragoge', 'usrlsle', 'nalraoci', 'nsdeuto', 'amrhat', 'inknsy', 'iferkna'];

const words = fs.readFileSync('word-list', 'utf-8').split(/\r?\n/);
const wordMap = new Map();
words.forEach(e => wordMap[e.split('').sort().join('')] = e);

scrambles.forEach(e => console.log(e + ' => ' + wordMap[e.split('').sort().join('')]));