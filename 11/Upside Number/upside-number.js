const pairs = [[0,0],[1,1],[2,5],[5,2],[6,9],[9,6],[8,8]];
const numbers = new Map();
pairs.forEach(p => {
    numbers.set(p[0], p[1]);
});

const check = (number) => {
    const string = number.toString();
    let upside = '';
    string.split('').reverse().forEach(n => {
        upside += numbers.get(parseInt(n));
    });

    return string === upside;
};

let count = 0;
for(i = 0; i < 10000; i++){
    if(check(i)){
        count++;
        console.log(i);
    }
}

console.log('Count: ' + count);