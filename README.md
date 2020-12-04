# debarrel
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/debarrel?style=flat-square)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/debarrel?style=flat-square)](https://github.com/markwylde/debarrel/blob/master/package.json)
[![GitHub](https://img.shields.io/github/license/markwylde/debarrel?style=flat-square)](https://github.com/markwylde/debarrel/blob/master/LICENSE)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard)

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
  minimumFlushTime: 100,
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
