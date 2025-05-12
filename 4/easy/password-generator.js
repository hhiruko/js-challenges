const prompt = require("prompt-sync")();

const generatePassword = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

const amount = parseInt(prompt('How many passwords do you want to generate? '));
let length = parseInt(prompt('Specify the length of your passwords: '));
if(Number.isNaN(length) || length < 7){
    length = 7;
}

for(i = 0; i < amount; i++){
    console.log(generatePassword(length));
}