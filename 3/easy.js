const prompt = require("prompt-sync")();

const options = () => {
    return `
        1. Cipher
        2. Decypher
        3. Exit
    `;
}

const cipher = () => {
    let input = prompt("Enter your message: ");
    let shift = parseInt(prompt("Enter your shift: "));
    let output = [];
    for (i = 0; i < input.length; i++) {
        output[i] = input.charCodeAt(i) + (shift % 26);
    }
    console.log("Your cipher is: " + String.fromCharCode(...output));
};

const decipher = () => {
    let input = prompt("Enter your cipher: ");
    let shift = parseInt(prompt("Enter your shift: "));
    let output = [];
    for (i = 0; i < input.length; i++) {
        output[i] = input.charCodeAt(i) - (shift % 26);
    }
    console.log("Your message is: " + String.fromCharCode(...output));
};

let loop = true;
while(loop) {
    console.log(options());
    let option = parseInt(prompt("Select an option: "));
    switch(option){
        case 1: cipher(); break;
        case 2: decipher(); break;
        case 3: loop = false; break;
        default: console.log("Choose appropriate option. ");
    }
}