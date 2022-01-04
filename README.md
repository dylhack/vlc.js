![Banner](./docs/GitHub%20Banner2.png)

```sh
npm i vlc.js
```

# Example Usage

```javascript
import Client from 'vlc.js';

const client = new Client(
  'http://127.0.0.1:8080',
  'rosebud',
);
const status = await client.getStatus();
console.log(`${status.meta.title} is playing.`);
```
