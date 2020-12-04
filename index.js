function debarrel (processer, options) {
  let minimumFlushTimer;
  let maximumFlushTimer;

  function processQueue () {
    clearTimeout(minimumFlushTimer);
    clearTimeout(maximumFlushTimer);

    minimumFlushTimer = null;
    maximumFlushTimer = null;

    processer();
  }

  return function (fn) {
    return (...args) => {
      fn(...args);

      if (!maximumFlushTimer) {
        maximumFlushTimer = setTimeout(processQueue, options.maximumFlushTime);
      }

      clearTimeout(minimumFlushTimer);
      minimumFlushTimer = setTimeout(processQueue, options.minimumFlushTime);
    };
  };
}

module.exports = debarrel;
