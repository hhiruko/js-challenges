const prompt = require('prompt-sync')();

const numberMap = {
  // Basic numbers
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",

  // Tens
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety",

  // Place values
  100: "hundred",
  1000: "thousand",
  1000000: "million",
  1000000000: "billion",
};

const placeValues = [1000000000, 1000000, 1000, 100];

const numToWords = (number) => {
    let numbers = [];

    placeValues.forEach(divider => {
        if(number >= divider){
            const n = Math.floor(number / divider);
            numbers.push(numberMap[n] + ' ' + numberMap[divider] + ',');

            number = number - n * divider;
        }
    });

    if(number >= 20){
        const n = Math.floor(number / 10);
        numbers.push(numberMap[n * 10]);

        number = number - n * 10;
    }

    if(number < 20){
        numbers.push(numberMap[number]);
    }
    console.log(numbers.join(' '));
};

const wordsToNum = (words) => {
    words = words.split(',');
    let number = 0;
    words.forEach(w => {
        let numbers = w.split(' ').filter(e => e !== '');
        let first = 0;
        let second = 0;
        let isPlaceValues = false;

        Object.keys(numberMap).forEach(key => {
            if(numberMap[key] === numbers[0]){
                first = parseInt(key);
            } else if(numberMap[key] === numbers[1]){
                second = parseInt(key);
            }

            if(placeValues.includes(first) || placeValues.includes(second)){
                isPlaceValues = true;
            }
        });

        if(isPlaceValues){
            number += first * second;
        } else {
            number += first + second;
        }
    });
    console.log(number);
};

console.log(`
    1. Number to English Expression
    2. English Expression to Number    
`);

const command = parseInt(prompt('Your command: '));
switch(command){
    case 1: numToWords(parseInt(prompt('Enter your number: '))); break;
    case 2: wordsToNum(prompt("Enter your expression: ")); break;
    default: console.log('Enter a valid command.');
}