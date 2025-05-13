const prompt = require("prompt-sync")();
const fs = require('node:fs');

let name = prompt("What is your name? ");
let age = prompt("How old are you? ");
let username = prompt("What is your username? ");

const content = `your name is ${name}, you are ${age} years old, and your username is ${username}\n`;

fs.appendFile('simple-io.log', content, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(content);
  }
});