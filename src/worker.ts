import { parentPort } from 'worker_threads';

parentPort?.on('message', ({ fn, args }) => {
    const func = new Function('return ' + fn)();
    const result = func(...args);
    parentPort?.postMessage(result);
});
