# debarrel
![Node.js Test Runner](https://github.com/markwylde/debarrel/workflows/Node.js%20Test%20Runner/badge.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/debarrel)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/debarrel)](https://github.com/markwylde/debarrel/releases)
[![GitHub](https://img.shields.io/github/license/markwylde/debarrel)](https://github.com/markwylde/debarrel/blob/master/LICENSE)

A library for NodeJS that allows you to accumulate a load of changes, then run a function
after a set amount of time with those changes.

## Installation
```bash
npm install --save debarrel
```

## Usage
The `debarrel` module returns an function that can be called to mutate the cache.

## Example
```javascript
const debarrel = require('debarrel');

let total = 0;
const watch = debarrel(function () {
  console.log('total:', total);
}, {
  debounceTime: 100,
  maximumFlushTime: 2000
})

const increment = watch(function (increment) {
  total = total + increment;
})

// call increment. debarrel will flush every 10
const interval = setInterval(function () {
  increment(1)
}, 10);

// stop after 20 increments
setTimeout(() => {
  clearInterval(interval)
, 200);
```
