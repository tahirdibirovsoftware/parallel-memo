# Parallel-Memo

Parallel-Memo is a Node.js library for offloading heavy computations to worker threads, enabling parallel execution and improving application performance. It includes memoization by default, which can be turned off via the configuration.

## Installation

```bash
npm install parallel-memo
```

## Usage

### Basic Usage

#### Using Promises

```typescript
import { Thread } from 'parallel-memo';

const someHeavyComputation = (a: number, b: number) => {
    return a + b;
};

Thread.exec(someHeavyComputation, 1, 2).then(result => {
    console.log('Computation result:', result);
}).catch(error => {
    console.error('Error in thread execution:', error);
});
```

#### Using Async/Await

```typescript
import { Thread } from 'parallel-memo';

const someHeavyComputation = (a: number, b: number) => {
    return a + b;
};

(async () => {
    try {
        const result = await Thread.exec(someHeavyComputation, 1, 2);
        console.log('Computation result:', result);
    } catch (error) {
        console.error('Error in thread execution:', error);
    }
})();
```

### Using Thread Pool

#### Using Promises

```typescript
import { ThreadPool } from 'parallel-memo';

const pool = new ThreadPool({ size: 4 });

const someHeavyComputation = (a: number, b: number) => {
    return a + b;
};

pool.exec(someHeavyComputation, 1, 2).then(result => {
    console.log('Computation result:', result);
}).catch(error => {
    console.error('Error in thread execution:', error);
});
```

#### Using Async/Await

```typescript
import { ThreadPool } from 'parallel-memo';

const pool = new ThreadPool({ size: 4 });

const someHeavyComputation = (a: number, b: number) => {
    return a + b;
};

(async () => {
    try {
        const result = await pool.exec(someHeavyComputation, 1, 2);
        console.log('Computation result:', result);
    } catch (error) {
        console.error('Error in thread execution:', error);
    }
})();
```

### Using with Caching

```typescript
import { Thread } from 'parallel-memo';

const someHeavyComputation = (a: number, b: number) => {
    return a + b;
};

// Configure to disable caching if needed
Thread.configure({ enableCaching: false });

(async () => {
    try {
        const result = await Thread.exec(someHeavyComputation, 1, 2);
        console.log('Computation result:', result);
    } catch (error) {
        console.error('Error in thread execution:', error);
    }
})();
```

## API

### `Thread`

- `static configure(options: { enableCaching?: boolean }): void`: Configures the caching behavior of the library.
- `static exec(fn: (...args: any[]) => any, ...args: any[]): Promise<any>`: Executes the provided function in a worker thread with the given arguments and returns a promise that resolves with the result.

### `ThreadPool`

- `constructor(options: { size: number, enableCaching?: boolean })`: Creates a new thread pool with the specified size and optional caching.
- `exec(fn: (...args: any[]) => any, ...args: any[]): Promise<any>`: Executes the provided function in a worker thread from the pool with the given arguments and returns a promise that resolves with the result.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
