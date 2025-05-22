import { runWorker } from "./run.mjs";

const binarySearch = (x, T, p, r) => {
    let low = p;
    let high = Math.max(p, r + 1);
    while(low < high){
        const mid = Math.floor((low + high) / 2);
        if(x <= T[mid]){
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return high;
};

export const parallelMerge = async (threads, bufferT, p1, r1, p2, r2, bufferA, p3) => {
    if(threads > 0 && threads % 2 !== 0){
        threads--;
    }

    const A = new Int32Array(bufferA);
    const T = new Int32Array(bufferT);

    let n1 = r1 - p1 + 1;
    let n2 = r2 - p2 + 1;

    if(n1 < n2){
        let temp = p1;
        p1 = p2;
        p2 = temp;

        temp = r1;
        r1 = r2;
        r2 = temp;

        temp = n1;
        n1 = n2;
        n2 = temp;
    }

    if(n1 === 0){
        return;
    } else {
        const q1 = Math.floor((p1 + r1) / 2);
        const q2 = binarySearch(T[q1], T, p2, r2);
        const q3 = p3 + (q1 - p1) + (q2 - p2);
        A[q3] = T[q1];

        let f, s;
        if(threads > 0){
            f = runWorker('parallelMerge', threads/2, bufferT, p1, q1 - 1, p2, q2 - 1, bufferA, p3);
            s = runWorker('parallelMerge', threads/2, bufferT, q1 + 1, r1, q2, r2, bufferA, q3 + 1);
        } else {
            f = parallelMerge(0, bufferT, p1, q1 - 1, p2, q2 - 1, bufferA, p3);
            s = parallelMerge(0, bufferT, q1 + 1, r1, q2, r2, bufferA, q3 + 1);
        }

        await Promise.all([f, s]);
    }
};

export const parallelMergesort = async (threads, bufferA, lo, hi, bufferB, off) => {
    if(threads > 0 && threads % 2 !== 0){
        threads--;
    }

    const mergeThreads = threads/2;
    threads = threads/2;

    const A = new Int32Array(bufferA);
    const B = new Int32Array(bufferB);
    const length = hi - lo + 1;
    if(length === 1){
        B[off] = A[lo];
    } else {
        const bufferT = new SharedArrayBuffer(4 * length);

        const mid = Math.floor((lo + hi) / 2);
        const mid_ = mid - lo + 1;

        let f, s;
        if(threads > 0){
            f = runWorker('parallelMergesort', threads/2, bufferA, lo, mid, bufferT, 0);
            s = runWorker('parallelMergesort', threads/2, bufferA, mid + 1, hi, bufferT, mid_);
        } else {
            f = parallelMergesort(0, bufferA, lo, mid, bufferT, 0);
            s = parallelMergesort(0, bufferA, mid + 1, hi, bufferT, mid_);
        }
        
        await Promise.all([f, s]);
        await parallelMerge(mergeThreads, bufferT, 0, mid_ - 1, mid_, length - 1, bufferB, off);
    }
};