const sieveOfEratosthenes = (n) => {
    const list = new Map();
    let p = 2;

    const populateList = () => {
        let i = p;
        while(i <= n){
            list.set(i, 0);
            i++;
        }
    };

    const markP = () => {
        let i = 2;
        while((i * p) <= n){
            if(typeof list.get(i * p) !== 'undefined'){
                list.set(i * p, 1);
                i++;
            }
        }
    };

    const findP = () => {
        let stop = true;
        for(const [number, mark] of list){
            if(number > p && mark === 0){
                p = number;
                stop = false;
                break;
            }
        }
        return stop;
    };

    populateList();
    markP();
    while(!findP()){
        markP();
    }

    const primes = new Set();
    for(const [number, mark] of list){
        if(mark === 0){
            primes.add(number);
        }
    }
    return primes;
};

console.log(sieveOfEratosthenes(20));