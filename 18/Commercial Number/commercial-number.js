const prompt = require('prompt-sync')();

const numpad = {
    abc: 2,
    def: 3,
    ghi: 4,
    jkl: 5,
    mno: 6,
    pqrs: 7,
    tuv: 8,
    wxyz: 9
};
const numpadMap = Object.entries(numpad).reduce((acc, [k, v]) => (k.split('').forEach(c => acc[c] = v), acc), {});

const commercialNumber = prompt('Commercial Phone Number: ');
console.log(commercialNumber.split('').map(c => numpadMap[c.toLowerCase()] ?? c).join(''));
