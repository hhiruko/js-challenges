const prompt = require("prompt-sync")();

const input = prompt("Input your series, divided by comma (,): ").replace(/\s+/g, '');
const series = input.split(',').map(Number);

const add = (a, b, c) => {
    if(a + b === c){
        console.log(`${a} + ${b} = ${c}`);
    }
};

const subtract = (a, b, c) => {
    if(a - b === c) {
        console.log(`${a} - ${b} = ${c}`);
    }
};

const multiply = (a, b, c) => {
    if(a * b === c) {
        console.log(`${a} * ${b} = ${c}`);
    }
};

const divide = (a, b, c) => {
    if(a / b === c) {
        console.log(`${a} / ${b} = ${c}`);
    }
};

series.forEach((num1, index1) => {
    series.forEach((num2, index2) => {
        if (index1 !== index2) {
            series.filter((_, index) => index !== index1 && index !== index2).forEach(result => {
                add(num1, num2, result);
                subtract(num1, num2, result);
                multiply(num1, num2, result);
                divide(num1, num2, result);
            });
        }
    });
});