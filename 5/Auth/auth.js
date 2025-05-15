const prompt = require("prompt-sync")({sigint: true});
const fs = require("node:fs");
const args = process.argv.slice(2);

const params = {};

args.forEach(arg => {
  const [key, value] = arg.split('=');
  if(value){
    params[key] = value;
  }
});

const login = params['login'];
if(typeof login !== 'undefined'){
    const list = fs.readFileSync('auth', 'utf-8').trim().split(/\r?\n/).reduce((acc, line) => {
        const [key, value] = line.split(',');
        acc[key] = value;
        return acc;
    }, {});
    if(typeof list[login] !== 'undefined'){
        const password = prompt("Password: ", {echo: ''});
        if(password === list[login]) {
            console.log('Hello world!');
            process.exit();
        }
    }
}

console.log('The programm is protected.');