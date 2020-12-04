const test = require('basictap');

const debarrel = require('../');

test('flushes after maximum flush time', t => {
  t.plan(1);

  let timer;
  let total = 0;
  const watch = debarrel(function () {
    clearInterval(timer);
    t.equal(total, 25);
  }, {
    minimumFlushTime: 50,
    maximumFlushTime: 500
  });

  const increment = watch(function (increment) {
    total = total + increment;
  });

  timer = setInterval(() => {
    increment(1);
  }, 20);
});
