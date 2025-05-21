const { weekdays, dayOfTheWeek, isLeap } = require('../Day of the Week/helpers');
const prompt = require('prompt-sync')();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const input = prompt('Date: ').split('.').map(e => parseInt(e));

let str = '';
let start = dayOfTheWeek(1, input[0], input[1]);
start = start === 0 ? 7 : start;

let daysCount = days[input[0] - 1];
if(input[0] == 2 && isLeap(input[1])){
    daysCount++;
}

const today = new Date().getDate();

let started = 0;
for(i = 0; i < 6; i++){
    for(j = 0; j < 7; j++){
        let n = '';
        if((started === 0 && j === start - 1) || (started > 0 && started < daysCount)){
            n = ++started;
            if(n === today){
                n = '\x1b[32m' + n + '\x1b[0m';
            }
        }
        str += '[ ' + n.toString().padStart(2, ' ') + ' ]';
    }
    str += '\n';
}

console.log(months[input[0] - 1].padStart(22, ' '));
console.log(weekdays.map(e => '  ' + e.substring(0, 2) + '  ').join(''));
console.log(str);