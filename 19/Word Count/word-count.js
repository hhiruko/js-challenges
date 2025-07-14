const Sherlock = require('../sherlock.mjs');

let text = Sherlock.getText();
const sections = Sherlock.getSections();

const sectionsText = {};

for (let i = 0; i < sections.length; i++) {
    sectionsText[sections[i]] = text.substring(text.indexOf(sections[i]) + sections[i].length, text.indexOf(sections[i + 1] ?? -1)).split(' ').length;
}

const sorted = Object.entries(sectionsText).sort((a, b) => b[1] - a[1]).reduce((acc, [key, value]) => {acc[key] = value; return acc;}, {});

console.log(sorted);