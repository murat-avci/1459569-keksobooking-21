'use strict';

(function () {

  let lastTimeout;

  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, window.constants.DEBOUNCE_INTERVAL);
  };

})();
