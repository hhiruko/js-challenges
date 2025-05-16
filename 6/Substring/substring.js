// Because the original challenge description was too ambiguous, I asked ChatGPT to come up with a new one instead.

const prompt = require('prompt-sync')();

const longestSubstring = (string) => {
    let substr = [];
    let longestSubstr = [];
    string.split('').forEach(char => {
        if(longestSubstr.length < substr.length){
            longestSubstr = substr;
        }

        if(substr.includes(char)){
            substr = [];
        }

        substr.push(char);
    });

    return longestSubstr.join('');
};

const string = prompt('Input string: ');
const substr = longestSubstring(string);
console.log(`Longest substring is '${substr}' with the length of ${substr.length}.`);