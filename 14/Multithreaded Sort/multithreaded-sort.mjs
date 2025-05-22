import { parallelMergesort } from "./parallel.mjs";

const mergeSort = async (array, threads) => {
    const length = array.length;
    const sharedA = new SharedArrayBuffer(4 * length);
    const sharedB = new SharedArrayBuffer(4 * length);
    const A = new Int32Array(sharedA);

    array.forEach((val, i) => A[i] = val);

    await parallelMergesort(threads, sharedA, 0, length - 1, sharedB, 0);

    return new Int32Array(sharedB);
};


const array = [];
const size = 1_000_000;
for(let i = 0; i < size; i++){
    array[i] = Math.floor(Math.random() * 100);
}

// 8 threads were best for 1 000 000 elements on Intel(R) Core(TM) i5-10400 CPU @ 2.90GHz 6 cores. For lower, e.g. 1 000 elements, 1 thread was best.
const threads = 8;

console.log(array);
console.log(`Threads: ${threads}`);

console.time("mergeSort");
const results = await mergeSort(array, threads);
console.log(results);
console.timeEnd("mergeSort");