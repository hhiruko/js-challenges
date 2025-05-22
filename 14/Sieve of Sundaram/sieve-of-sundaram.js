const N = 10000;
const n = Math.floor((N - 2) / 2);

const numbers = new Set();
for(i = 1; i <= n; i++){
    numbers.add(i);
}

for(i = 1; i <= n; i++){
    for(j = i; j <= n; j++){
        const remove = i + j + 2 * i * j;
        if(remove <= n){
            numbers.delete(remove);
        } else {
            break;
        }
    }
}

const primes = [2];
numbers.forEach(e => {
    primes.push(e * 2 + 1);
});

console.log(primes);