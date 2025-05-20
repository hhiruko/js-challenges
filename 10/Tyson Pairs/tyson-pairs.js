const { numToWords } = require("./number-expresser");

const start = 0;
const end = 20;

const expression = '+';
const expressionString = 'plus';

const numWordsCache = {};
for(let n = start; n < end; n++){
    numWordsCache[n] = numToWords(n).replace(/,/g, ' ');
}


const found = new Set();

for(i = start; i < end; i++){
    for(j = start; j < end; j++){
        for(k = start; k < end; k++){
            for(l = start; l < end; l++){
                const tuple = [i, j, k, l].sort((a,b) => a - b).join(',');
                if(found.has(tuple)){
                    continue;
                }


                if((i === k && j === l) || (i === l && j === k)){
                    continue;
                }

                const left = eval(i + expression + j);
                const right = eval(k + expression + l);

                if(left === right){
                    const iString = numWordsCache[i];
                    const jString = numWordsCache[j];
                    const kString = numWordsCache[k];
                    const lString = numWordsCache[l];

                    const arr1 = (iString + ' ' + jString).split(' ').flatMap(word => {
                        if (word.endsWith('teen')) {
                            const numberPart = word.slice(0, -4);
                            return [numberPart, 'teen'];
                        } else {
                            return [word];
                        }
                    });
                    const arr2 = (kString + ' ' + lString).split(' ').flatMap(word => {
                        if (word.endsWith('teen')) {
                            const numberPart = word.slice(0, -4);
                            return [numberPart, 'teen'];
                        } else {
                            return [word];
                        }
                    });
                    if(arr1.length === arr2.length && arr1.slice().sort().join() === arr2.slice().sort().join()){
                        continue;
                    }

                    const leftString = (iString + jString).replace(/\s/g, '').split('').sort().join(''); 
                    const rightString = (kString + lString).replace(/\s/g, '').split('').sort().join('');

                    if(leftString === rightString){
                        found.add(tuple);
                        console.log(`${i} ${expression} ${j} = ${k} ${expression} ${l}`);
                        console.log(`${iString} ${expressionString} ${jString} = ${kString} ${expressionString} ${lString}`);
                    }
                }
            }
        }
    }
}