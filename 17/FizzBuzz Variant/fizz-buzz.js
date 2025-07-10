const fizz = 'Fizz'
const buzz = 'Buzz';
const prime = 'Prime';
for(let i = 1; i <= 50; i++) {
    let isPrime = true;
    let message = i + ' ';

    for(let j = i - 1; j > 1; j--) {
        if(i % j === 0) {
            isPrime = false;
            break;
        }
    }

    if(isPrime) {
        message += prime;
    } else if(i % 3 === 0 && i % 5 === 0) {
        message += fizz + buzz;
    } else if(i % 3 === 0) {
        message += fizz;
    } else if (i % 5 === 0) {
        message += buzz;
    }
    console.log(message);
}