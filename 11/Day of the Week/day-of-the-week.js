const prompt = require('prompt-sync')();
const { dayOfTheWeek } = require('./helpers');

const date = prompt('Date: ').split('.').map(e => parseInt(e));
console.log(dayOfTheWeek(date[0], date[1], date[2]));