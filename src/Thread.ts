import { Worker } from 'worker_threads';
import path from 'path';

interface ThreadOptions {
    enableCaching?: boolean;
}

interface CacheEntry {
    args: any[];
    result: any;
}

export class Thread {
    private worker: Worker;
    private cache: CacheEntry[];
    private enableCaching: boolean;
    public inUse: boolean;

    constructor(options: ThreadOptions = { enableCaching: true }) {
        const workerPath = path.resolve(__dirname, 'worker.js');
        this.worker = new Worker(workerPath);
        this.cache = [];
        this.enableCaching = options.enableCaching ?? true;
        this.inUse = false;
    }

    exec(fn: (...args: any[]) => any, ...args: any[]): void {
        if (this.enableCaching) {
            const cachedEntry = this.cache.find(entry => this.areArgsEqual(entry.args, args));
            if (cachedEntry) {
                this.worker.postMessage({ type: 'cached', result: cachedEntry.result });
                return;
            }
        }

        this.worker.postMessage({ fn: fn.toString(), args });
    }

    getResult(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.worker.on('message', (message) => {
                if (message.type === 'cached') {
                    resolve(message.result);
                } else {
                    if (this.enableCaching) {
                        this.cache.push({ args: message.args, result: message.result });
                    }
                    resolve(message.result);
                }
            });
            this.worker.on('error', reject);
            this.worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
                this.inUse = false;
            });
        });
    }

    terminate(): void {
        this.worker.terminate();
        this.inUse = false;
    }

    private areArgsEqual(args1: any[], args2: any[]): boolean {
        return JSON.stringify(args1) === JSON.stringify(args2);
    }
}
