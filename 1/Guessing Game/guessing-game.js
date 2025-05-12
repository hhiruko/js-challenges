const prompt = require("prompt-sync")();

// assume true inclusive rand
const getRand = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
  

let min = parseInt(prompt('Numbers from: '));
let max = parseInt(prompt('To: '));

if(max >= min){
    let guessing = true;
    let num = 0;
    const guess = (num) => {
        return prompt(`Is ${num} your number? `).toLowerCase();
    }
    while(guessing){
        num = getRand(min, max);
        switch(guess(num)){
            case 'yes': guessing = false; break;
            case 'lower': max = num - 1; break;
            case 'higher': min = num + 1; break;
            default: console.log("Couldn't understand you.")
        }
        if(min === max && min === num){
            console.log('Foul play.')
            guessing = false;
        }
    }

    if(!guessing){
        console.log('Yay!');
    }
}
