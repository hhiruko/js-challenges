const prompt = require('prompt-sync')();
const tone = require('tonegenerator');
const fs = require('node:fs');
const wav = require('wav');

const frequencies = {
    A: 440.00,
    B: 493.88,
    C: 261.63,
    D: 293.66,
    E: 329.63,
    F: 349.23,
    G: 392.00
};

const music = prompt('Notes: ').toUpperCase().split('').filter(e => Object.keys(frequencies).includes(e));
let tones = [];
music.forEach(e => {
    tones.push(tone({ freq: frequencies[e], lengthInSecs: 0.5, volume: 60 }));
});

const sample = tones[0].concat(...tones.slice(1));

const file = fs.createWriteStream('sample.wav');

const data = Buffer.from(sample.map(val => val + 128));

const writer = new wav.Writer({
  channels: 1,
  sampleRate: 44100,
  bitDepth: 8
});
writer.pipe(file);
writer.write(data);
writer.end();