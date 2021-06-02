# @f0c1s/dev-env

## Development Environment

In node REPL

```javascript
let p;
import('./src/ssh.js').then(x => {
    console.log(x);
    p = x;
});
void async function () {
    console.log(await p.getSSHInfo())
}();

```
