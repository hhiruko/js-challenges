const Decimal = require('decimal.js');
Decimal.set({precision: 100});

const pi = '3.141592653589793238462643383279';

const binarySplit = (a, b) => {
    if (b === a + 1) {
        const A = new Decimal(a);
        const pab = A.times(6).minus(1)
                     .times(A.times(2).minus(1))
                     .times(A.times(6).minus(5))
                     .negated();

        const qab = new Decimal(10939058860032000).times(A.pow(3));
        const rab = pab.times(new Decimal(545140134).times(A).plus(13591409));

        return [pab, qab, rab];
    }

    const m = Math.floor((a + b) / 2);
    const [pam, qam, ram] = binarySplit(a, m);
    const [pmb, qmb, rmb] = binarySplit(m, b);

    const pab = pam.times(pmb);
    const qab = qam.times(qmb);
    const rab = qmb.times(ram).plus(pam.times(rmb));

    return [pab, qab, rab];
};

const chudnovsky = (n) => {
    const [_, q1n, r1n] = binarySplit(1, n);

    const C = new Decimal(426880);
    const sqrt10005 = new Decimal(10005).sqrt();
    const numerator = C.times(sqrt10005).times(q1n);
    const denominator = new Decimal(13591409).times(q1n).plus(r1n);

    return numerator.div(denominator);
};

const piImplementation = chudnovsky(4).toString().substr(0, 32);

console.log(`Pi: ${pi}`);
console.log(`Pi implementation: ${piImplementation}`);
console.log(`Equals: ` + (pi === piImplementation));