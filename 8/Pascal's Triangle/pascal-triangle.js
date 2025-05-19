const prompt = require('prompt-sync')();

let pascalMatrix = [];

for(i = 0; i < 15; i++){
    if(i === 0){
        pascalMatrix[i] = [1];
    } else if(i === 1){
        pascalMatrix[i] = [1, 1];
    } else {
        pascalMatrix[i] = [];
        pascalMatrix[i - 1].forEach((value, index) => {
            if(index === 0) {
                pascalMatrix[i].push(value);
            } else{
                pascalMatrix[i].push(pascalMatrix[i - 1][index - 1] + value);
            }
        });
        pascalMatrix[i].push(1);
    }
}

pascalMatrix.forEach(e => {
    console.log(e.join(' '));
});

let lookup = prompt('Enter line, and number (E.g: 1,2): ').split(',');
console.log(pascalMatrix[parseInt(lookup[0]) - 1][parseInt(lookup[1]) - 1]);