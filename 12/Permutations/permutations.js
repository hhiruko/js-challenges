const prompt = require('prompt-sync')();

const string = prompt('Your string: ');

const permutations = (string) => {
    const allPermutations = [];
    const chars = string.split('').sort();

    allPermutations.push(chars.join(''));

    // See https://en.wikipedia.org/wiki/Permutation#Generation_in_lexicographic_order
    const permutate = (chars) => {
        const len = chars.length;

        const permutation = [...chars];
        let k;
        for(i = len - 1; i > 0; i--){
            if(permutation[i] > permutation[i - 1]){
                k = i - 1;
                break;
            }
        }

        if(typeof k === 'undefined'){
            return;
        }

        let l;
        for(i = len - 1; i > 0; i--){
            if(permutation[i] > permutation[k]){
                l = i;
                break;
            }
        }
    
        let swap = permutation[l]
        permutation[l] = permutation[k];
        permutation[k] = swap;

        let start = k + 1;
        let end = len - 1;
        while (start < end) {
            [permutation[start], permutation[end]] = [permutation[end], permutation[start]];
            start++;
            end--;
        }

        allPermutations.push(permutation.join(''));
        permutate(permutation);
    }

    permutate(chars);
    return allPermutations;
};

console.log(permutations(string));