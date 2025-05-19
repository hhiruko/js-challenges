const prompt = require("prompt-sync")();

const sort = (array) => {
    if(!isNaN(array[0])){
        array = array.map(v => parseInt(v)).sort((a,b) => a - b);
    } else {
        array = array.map(v => v.trim()).sort();
    }

    console.log(array.join(', '));
};

sort(prompt('Enter values: ').split(','));