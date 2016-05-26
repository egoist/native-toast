# native-toast [![NPM version](https://img.shields.io/npm/v/native-toast.svg)](https://npmjs.com/package/native-toast) [![NPM downloads](https://img.shields.io/npm/dm/native-toast.svg)](https://npmjs.com/package/native-toast)

> Native-like toast notification but for the web. (JS + CSS < 2KB)

## Install

```bash
$ npm install --save native-toast
```

NPMCDN: https://npmcdn.com/native-toast/dist/native-toast.umd.min.js

## Usage

First import `native-toast/dist/native-toast.css`, then:

```js
const nativeToast = require('native-toast')

nativeToast('hey yo!')

nativeToast('hey yo', 'top')

// specific a longer timeout
nativeToast({
  message: 'wait wait!',
  position: 'top',
  timeout: 5000
})
```

## API

### nativeToast(options)

#### options

##### message

Type: `string`<br>
Default: `''`

Toast message.

##### position

Type: `string`<br>
Default: `bottom`

Toast position, either `top` or `bottom`.

##### timeout

Type: `number`<br>
Default: `3000`

Toast timeout, hide toast in specific timeout.

## License

MIT © [EGOIST](https://github.com/egoist)
