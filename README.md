# native-toast [![NPM version](https://img.shields.io/npm/v/native-toast.svg)](https://npmjs.com/package/native-toast) [![NPM downloads](https://img.shields.io/npm/dm/native-toast.svg)](https://npmjs.com/package/native-toast)

> Native-like toast notification but for the web. (JS + CSS ≈ 4KB)

## Install

```bash
$ npm install --save native-toast
```

NPMCDN: https://unpkg.com/native-toast/dist/

## Usage

First import `native-toast/dist/native-toast.css`, then:

```js
import nativeToast from 'native-toast'

nativeToast({
  message: 'wait wait!',
  position: 'north-east',
  // Self destroy in 5 seconds
  timeout: 5000,
  type: 'warning'
})
// or nativeToast.warning(options)
```

Four types: `success` `warning` `info` `error`

## API

### nativeToast(options)

#### options

##### message

Type: `string`<br>
Default: `''`

Toast message.

##### position

Type: `string`<br>
Default: `south-east`<br>
Values: `center` `west` `east` `south` `south-west` `south-east` `north` `north-west` `north-east`

Toast position.

##### rounded

Type: `boolean`<br>
Default: `false`

Set `border-radius` to `33px` instead of `3px`. Has no effect when `edge === false`.

##### timeout

Type: `number`<br>
Default: `3000`

Self destroy in specfic timeout. If given `0` or `false then toast will never self destroy.

##### type

Type: `string`<br>
Default: `undefined`

One of `success` `warning` `info` `error`.

A short-hand usage: `nativeToast.success(opts)` `nativeToast.error(opts)` and such.

##### icon

Type: `boolean`<br>
Default: `true`

Set to `false` to disable icon.

##### edge

Type: `boolean`<br>
Default: `false`

Show toast on the edge.

##### closeOnClick

Type: `boolean`<br>
Default: `false`

Close the toast when clicked.

##### elements

Type: `HTMLElement[]`

Optionally provide an array of HTML elements to insert after the `message`.

## License

MIT © [EGOIST](https://github.com/egoist)
