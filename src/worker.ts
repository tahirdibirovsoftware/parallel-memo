import { parentPort } from 'worker_threads';

parentPort?.on('message', ({ type, fn, args, result }) => {
    if (type === 'cached') {
        parentPort?.postMessage({ type, result });
    } else {
        const func = new Function('return ' + fn)();
        const result = func(...args);
        parentPort?.postMessage({ args, result });
    }
});
