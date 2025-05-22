const prompt = require('prompt-sync')();
const { isLeap } = require('../../11/Day of the Week/helpers');

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const date = prompt('DD.MM.YYYY: ').split('.').map(e => parseInt(e));
if(isLeap(date[2])){
    monthDays[1] = 29;
}

let days = 0;
for(i = 0; i < date[1]; i++){
    if(i + 1 !== date[1]){
        days += monthDays[i];
    }
}
days += date[0];

console.log(days + ' days');