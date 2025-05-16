const prompt = require('prompt-sync')();

const morseCode = {
  A: '.-',     B: '-...',   C: '-.-.',   D: '-..',    E: '.',
  F: '..-.',   G: '--.',    H: '....',   I: '..',     J: '.---',
  K: '-.-',    L: '.-..',   M: '--',     N: '-.',     O: '---',
  P: '.--.',   Q: '--.-',   R: '.-.',    S: '...',    T: '-',
  U: '..-',    V: '...-',   W: '.--',    X: '-..-',   Y: '-.--',
  Z: '--..',

  0: '-----',  1: '.----',  2: '..---',  3: '...--',  4: '....-',
  5: '.....',  6: '-....',  7: '--...',  8: '---..',  9: '----.'
};

const morseToString = (morse) => {
    let string = '';
    morse.split(' /').forEach(word => {
        word.split(' ').forEach(char => {
            string += Object.entries(morseCode).find(([_, v]) => v === char)?.[0] ?? '';
        });

        string += ' ';
    });
    return string;
};

const stringToMorse = (string) => {
    let morse = '';
    string = string.toUpperCase();
    string.split(' ').forEach(word => {
        word.split('').forEach(char => {
            morse += (morseCode?.[char] ?? '') + ' ';
        });

        morse += ' /';
    });
    return morse;
};

console.log(`
    1 - Morse Code to String
    2 - String to Morse Code    
`);

const command = parseInt(prompt('Command: '));
switch(command){
    case 1: console.log(morseToString(prompt('Morse code: '))); break;
    case 2: console.log(stringToMorse(prompt('String: '))); break;
    default: console.log('Invalid input.');
}