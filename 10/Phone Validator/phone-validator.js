const prompt = require('prompt-sync')();

const cases = [/^(?:\d{3}([-.])\d{3}\1\d{4}|\d{10})$/g, /^\(\d{3}\)\s?\d{3}-\d{4}$/g];

const phone = prompt('Enter phone number: ').trim();
let isValid = false;

for(i = 0; i < cases.length; i++){
    if(cases[i].exec(phone) !== null) {
        isValid = true;
        break;
    }
}

console.log(isValid ? 'Valid' : 'Not valid');