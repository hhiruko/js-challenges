import { Worker } from 'node:worker_threads';

export const runWorker = (method, ...arg) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.mjs', {
        workerData: {
            method,
            args: arg
        }
    });

    worker.on('message', (result) => {
      resolve(result);
    });

    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};