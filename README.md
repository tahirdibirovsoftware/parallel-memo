# Parallel-Memo

Parallel-Memo is a Node.js library for offloading heavy computations to worker threads, enabling parallel execution and improving application performance. It includes memoization by default, which can be turned off via the constructor.

## Installation

```bash
npm install parallel-memo
```

## Usage

### Basic Usage

```typescript
import { Thread } from 'parallel-memo';

const someHeavyComputation = (a: number, b: number) => {
    return a + b;
};

const thread = new Thread();
thread.exec(someHeavyComputation, 1, 2);

thread.getResult().then(result => {
    console.log('Computation result:', result);
}).catch(error => {
    console.error('Error in thread execution:', error);
});
```

### Using Thread Pool

```typescript
import { ThreadPool } from 'parallel-memo';

const pool = new ThreadPool({ size: 4 });
const thread = pool.getThread();

const someHeavyComputation = (a: number, b: number) => {
    return a + b;
};

thread.exec(someHeavyComputation, 1, 2);

thread.getResult().then(result => {
    console.log('Computation result:', result);
    pool.releaseThread(thread);
}).catch(error => {
    console.error('Error in thread execution:', error);
});
```

### Using with Caching

```typescript
import { Thread } from 'parallel-memo';

const someHeavyComputation = (a: number, b: number) => {
    return a + b;
};

const thread = new Thread({ enableCaching: true });
thread.exec(someHeavyComputation, 1, 2);

thread.getResult().then(result => {
    console.log('Computation result:', result);
}).catch(error => {
    console.error('Error in thread execution:', error);
});
```

## API

### `Thread`

- `new Thread(options?: { enableCaching?: boolean })`: Creates a new thread instance with optional caching.
- `exec(fn: (...args: any[]) => any, ...args: any[]): void`: Executes the provided function in the thread with the given arguments.
- `getResult(): Promise<any>`: Returns a promise that resolves with the result of the executed function.
- `terminate(): void`: Terminates the thread.

### `ThreadPool`

- `new ThreadPool(options: { size: number, enableCaching?: boolean })`: Creates a new thread pool with the specified size and optional caching.
- `getThread(): Thread`: Retrieves an available thread from the pool.
- `releaseThread(thread: Thread): void`: Releases the specified thread back to the pool.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
# parallel-memo
# parallel-memo
# parallel-memo
