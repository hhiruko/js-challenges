const Sherlock = require('../sherlock.mjs');

let text = Sherlock.getText().toLowerCase().split('\n');

const pages = [];

let lineCount = 0;
let page = '';
text.forEach(line => {
    if(lineCount === 40) {
        pages.push(page);
        lineCount = 0;
        page = '';
    }

    page += line.replace(/[^a-zA-Z0-9]/g, ' ');
    lineCount++;
});

if(page.length > 0) {
    pages.push(page);
}

const frequencyMap = new Map();

pages.forEach((page, index) => {
    const words = page.split(' ');
    words.forEach(word => {
        let mapWord = frequencyMap.get(word) ?? {};
        mapWord.count = (mapWord.count ?? 0) + 1;
        if (!Array.isArray(mapWord.pages)) {
            mapWord.pages = [];
        }
        if (mapWord.pages.indexOf(index + 1) === -1) {
            mapWord.pages.push(index + 1);
        }
        frequencyMap.set(word, mapWord);
    });
});

frequencyMap.forEach((pages, word) => {
    if(pages.count <= 100) {
        console.log(word + ': ' + pages.pages.join(', '));
    }
});