# batch-request-manager

## Install

```bash
npm install batch-request-manager
```

## Usage

```javascript
import { BatchRequestManager } from 'batch-request-manager';

const brm = new BatchRequestManager(
  args => {
    return fetch('https://api.example.com', {
      method: 'POST',
      body: JSON.stringify(args),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  args => args.flat(),
  200,
);
```

## API

### `BatchRequestManager`

#### `constructor`

```typescript
const brm = new BatchRequestManager<T1, T2, R>(
  /**
   * Function that makes the request
   */
  requestFunction: (args: T1) => Promise<R>,
  /**
   * Function that merges the arguments
   */
  mergeArgsFunction: (args: T2[]) => T1,
  /**
   * Delay in milliseconds
   */
  delay: number,
)
```

#### `request`

```typescript
const args: T2 = { /* ... */ };
const response: R = await brm.request(args);
```
