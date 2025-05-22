const prompt = require('prompt-sync')();

const blockReverse = (array, size) => {
    if(size < 1){
        return array;
    }

    const blocks = [];
    for(i = 0; i < array.length; i += size){
        blocks.push(array.slice(i, i + size).toReversed());
    }
    return blocks.flat();
};

const array = prompt('List: ').split(',').map(e => parseInt(e));
const k = parseInt(prompt('Block size: '));

console.log(blockReverse(array, k));