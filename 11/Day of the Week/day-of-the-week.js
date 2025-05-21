const prompt = require('prompt-sync')();
const { dayOfTheWeek, weekdays } = require('./helpers');

const date = prompt('Date: ').split('.').map(e => parseInt(e));
console.log(weekdays[dayOfTheWeek(date[0], date[1], date[2]) - 1]);