const prompt = require('prompt-sync')();

const number = parseInt(prompt('Enter a number to factor: '));

const factor = (number) => {
    const factorArray = [];

    const divide = (number, by) => {
        if(number === by){
            factorArray.push(number);
            return;
        }

        if(number % by === 0){
            factorArray.push(by);
            number /= by;
        }

        if(number % by === 0){
            divide(number, by);
        } else {
            divide(number, by + 1);
        }
    };
    
    divide(number, 2);
    return factorArray.join(' * ');
};

console.log(factor(number));