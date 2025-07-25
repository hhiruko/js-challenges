const Sherlock = require('../sherlock.mjs');

let text = Sherlock.getText().replaceAll(' ', '');
const sections = Sherlock.getSections().map(v => v.replaceAll(' ', ''));


sections.forEach(section => {
    text = text.replace(section, '');
});

text = text.split('').filter(c => /[a-zA-Z0-9]/.test(c)).join('');
console.log(text.length);