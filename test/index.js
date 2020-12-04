const test = require('basictap');

const debarrel = require('../');

test('flushes after maximum flush time', t => {
  t.plan(1);

  let timer = null;
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

test('does not flush until minimum flush time', t => {
  t.plan(3);

  const timer = null;
  let total = 0;

  const watch = debarrel(function () {
    const timeTaken = Date.now() - startTime;
    t.ok(timeTaken >= 90, `flushed after 50ms (${timeTaken})`);
    t.ok(timeTaken < 200, `flushed before 100ms (${timeTaken})`);
    clearInterval(timer);
    t.equal(total, 1);
  }, {
    minimumFlushTime: 100,
    maximumFlushTime: 500
  });

  const startTime = Date.now();
  const increment = watch(function (increment) {
    total = total + increment;
  });

  increment(1);
});
