# deferred-cache
![Node.js Test Runner](https://github.com/markwylde/deferred-cache/workflows/Node.js%20Test%20Runner/badge.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/deferred-cache)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/deferred-cache)](https://github.com/markwylde/deferred-cache/releases)
[![GitHub](https://img.shields.io/github/license/markwylde/deferred-cache)](https://github.com/markwylde/deferred-cache/blob/master/LICENSE)

A library for NodeJS that allows you to accumulate a load of changes, then run a function
after a set amount of time with those changes.

## Installation
```bash
npm install --save deferred-cache
```

## Usage
The `deferred-cache` module returns an function that can be called to mutate the cache.

## Example
```javascript
const createDeferredCache = require('deferred-cache');

const setCache = createDeferredCache(
  function (cache) {
    console.log('cache:', cache); // 'cache: 40'
  },
  {
    debounceTime: 100,
    maximumFlushTime: 2000
  }
)

setTimeout(function () {
  setCache(cache => {
    cache = (cache || 0) + 1;
    return cache;
  })
}, 50);
```
