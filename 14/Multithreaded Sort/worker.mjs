import { workerData, parentPort } from "node:worker_threads";
import { parallelMergesort, parallelMerge } from "./parallel.mjs";

const { method, args } = workerData;
try {
  if (method === 'parallelMergesort') {
    await parallelMergesort(...args);
  } else if (method === 'parallelMerge') {
    await parallelMerge(...args);
  }
  parentPort.postMessage('done');
} catch (err) {
  console.error('Worker error:', err);
  throw err;
}
