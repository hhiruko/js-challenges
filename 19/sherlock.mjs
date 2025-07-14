import fs from 'node:fs';

let text = fs.readFileSync('../sherlock.txt', 'utf-8');

const bookHeader = '*** START OF THE PROJECT GUTENBERG EBOOK THE ADVENTURES OF SHERLOCK HOLMES ***';
const bookFooter = '*** END OF THE PROJECT GUTENBERG EBOOK THE ADVENTURES OF SHERLOCK HOLMES ***';

const sections = [
    'I. A Scandal in Bohemia',
    'II. The Red-Headed League',
    'III. A Case of Identity',
    'IV. The Boscombe Valley Mystery',
    'V. The Five Orange Pips',
    'VI. The Man with the Twisted Lip',
    'VII. The Adventure of the Blue Carbuncle',
    'VIII. The Adventure of the Speckled Band',
    'IX. The Adventure of the Engineer’s Thumb',
    'X. The Adventure of the Noble Bachelor',
    'XI. The Adventure of the Beryl Coronet',
    'XII. The Adventure of the Copper Beeches'
].map(v => v.toUpperCase());

text = text.substring(text.indexOf(bookHeader) + bookHeader.length, text.indexOf(bookFooter));
text = text.substring(text.indexOf(sections[0]));

export const getText = () => {
    return text;
}

export const getSections = () => {
    return sections;
}