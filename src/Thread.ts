import { Worker } from 'worker_threads';
import path from 'path';

interface CacheEntry {
    args: any[];
    result: any;
}

interface ThreadOptions {
    enableCaching?: boolean;
}

export class Thread {
    private static cache: CacheEntry[] = [];
    private static enableCaching: boolean = true;

    static configure(options: ThreadOptions): void {
        Thread.enableCaching = options.enableCaching ?? true;
    }

    static exec(fn: (...args: any[]) => any, ...args: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            if (Thread.enableCaching) {
                const cachedEntry = Thread.cache.find(entry => Thread.areArgsEqual(entry.args, args));
                if (cachedEntry) {
                    resolve(cachedEntry.result);
                    return;
                }
            }

            const workerPath = path.resolve(__dirname, 'worker.js');
            const worker = new Worker(workerPath);

            worker.postMessage({ fn: fn.toString(), args });

            worker.on('message', (result) => {
                if (Thread.enableCaching) {
                    Thread.cache.push({ args, result });
                }
                resolve(result);
                worker.terminate();
            });

            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    }

    private static areArgsEqual(args1: any[], args2: any[]): boolean {
        return JSON.stringify(args1) === JSON.stringify(args2);
    }
}
