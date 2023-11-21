# rollup-plugin-file-resolve

Rollup plugin to resolve files with custom loaders at build time.

## Installation

npm:

```console
npm i rollup-plugin-file-resolve -D
```

yarn:

```console
yarn add rollup-plugin-file-resolve -D
```

pnpm:

```console
pnpm add rollup-plugin-file-resolve -D
```

## Usage

Checkout the [Example](https://github.com/AngeloCore/rollup-plugin-file-resolve/tree/main/test)

## Options

### `[alias]`

Type: `text | object` <br>

Determines from where to resolve the specific file.

Available built-in loaders: `text`

For example:

```js
{
  // Resolve `lmao` from `library.js`
  lmao: "project/library.js",

  // Resolve `myo` from `file.txt` and import it as a string
  myo: {
    path: "project/file.txt",
    loader: "text"
  }
}
```

Example output:

```js
var lmao = "Random ahh file";

function myo(text) {
  console.log(text);
}
```

## Custom loaders

Using your own custom loader is very simple, just replace the `loader` prop with a function.

Here is an example:

```js
myo: {
  path: "project/file.txt",
  loader: async (code) => await transform(code)
}
```

The loader function can be both sync or async.

## Exports

### `loaders`

Returns: Object of default loaders:

```js
{
  text: (code) => code;
}
```

## Information

### Resources

- [Github](https://github.com/AngeloCore/rollup-plugin-file-resolve)
- [Rollup](https://rollupjs.org/)

Made by [Angelo II](https://github.com/AngeloCore)

Copyright © (C) Angelo II, MIT license.
