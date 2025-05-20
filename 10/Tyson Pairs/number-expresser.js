// From Challenge #8: Number Expresser
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

export const numToWords = (number) => {
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
    return numbers.join(' ');
};