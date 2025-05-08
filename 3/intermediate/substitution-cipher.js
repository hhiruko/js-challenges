const prompt = require("prompt-sync")();

const cipher = (message) => {
    const substitutionMap = {
        A: 'Q',
        B: 'W',
        C: 'E',
        D: 'R',
        E: 'T',
        F: 'Y',
        G: 'U',
        H: 'I',
        I: 'O',
        J: 'P',
        K: 'A',
        L: 'S',
        M: 'D',
        N: 'F',
        O: 'G',
        P: 'H',
        Q: 'J',
        R: 'K',
        S: 'L',
        T: 'Z',
        U: 'X',
        V: 'C',
        W: 'V',
        X: 'B',
        Y: 'N',
        Z: 'M'
    };
    
    let output = '';
    for (let i = 0; i < message.length; i++) {
        if(typeof substitutionMap[message[i]] === 'undefined' && typeof substitutionMap[message[i].toUpperCase()] === 'undefined'){
            output += message[i];
            continue;
        }
        
        let isUppercase = message[i] === message[i].toUpperCase();
        if(isUppercase){
            output += substitutionMap[message[i]];
        } else {
            output += substitutionMap[message[i].toUpperCase()].toLowerCase();
        }
    }
    return output;
};

const message = prompt("Your message: ");
console.log(cipher(message));