const promtp = require("prompt-sync")();

const expression = promtp("Input your expression: ").replace(/\s+/g, '');
const tokens = [...expression];

const isN = (char) => {
    return !isNaN(char);
};
const isOperator = (char) => {
    const operators = ['+', '-', '*', '/', '%', '**'];
    return operators.includes(char);
};
const isBrackets = (char) => {
    const brackets = ['(', ')'];
    return brackets.includes(char);
};

let normalized = '';
tokens.forEach((char, index) => {
    if(index > 0 && char === '(' && !isOperator(tokens[index - 1])){
        normalized += '*';
    }

    if(isN(char) || isOperator(char) || isBrackets(char)){
        normalized += char;
    }
});

try {
    if(normalized.length > 0){
        console.log(eval(normalized));
    }
} catch(err) {
    console.error("Please provide valid basic arithmetic expressions.");
}