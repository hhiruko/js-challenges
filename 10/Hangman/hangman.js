const prompt = require('prompt-sync')();

const images = [
`

|
|
|
|
|
`,
`

|/
|
|
|
|
`,
`
_____
|/
|
|
|
|
`,
`
_____
|/  |
|
|
|
|
`,
`
_____
|/  |
|   o
|
|
|
`,
`
_____
|/  |
|   o
|   |
|
|
`,
`
_____
|/  |
|   o
|  /|
|
|
`,
`
_____
|/  |
|   o
|  /|\\
|
|
`,
`
_____
|/  |
|   o
|  /|\\
|  /
|
`,
`
_____
|/  |
|   o
|  /|\\
|  / \\
|
`,
].reverse();

const word = 'hangman'.toUpperCase().split('');
const input = new Array(word.length).fill('_', 0, word.length);

let abc = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

let loop = true;
let image = '';
while(loop){
    console.log(abc.join(' '));
    console.log(image);
    console.log(input.join(' '));
    const char = prompt('Guess a character: ').toUpperCase();
    if(abc.includes(char)){
        let includes = false;
        for(i = 0; i < word.length; i++){
            if(word[i] === char){
                input[i] = char;
                includes = true;
            }
        }

        if(!includes){
            image = images.pop();
        }
    }
    abc = abc.filter(e => e !== char);

    if(images.length === 0){
        loop = false;
        console.log('You lose...');
    }
    
    if(word.join('') === input.join('')){
        loop = false;
        console.log(input.join(' '));
        console.log('You win!');
    }
}