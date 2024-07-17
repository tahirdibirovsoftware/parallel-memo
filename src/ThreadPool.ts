import { Thread } from './Thread';

export class ThreadPool {
    private size: number;
    private threads: Thread[];

    constructor({ size }: { size: number }) {
        this.size = size;
        this.threads = Array.from({ length: size }, () => new Thread());
    }

    getThread(): Thread {
        const availableThread = this.threads.find(thread => !thread.inUse);
        if (availableThread) {
            availableThread.inUse = true;
            return availableThread;
        }
        throw new Error('No available threads in the pool');
    }

    releaseThread(thread: Thread): void {
        thread.inUse = false;
    }
}
