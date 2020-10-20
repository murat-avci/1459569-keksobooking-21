/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
'use strict';


window.debounce = function (fun) {
  let lastTimeout = null;

  return function () {
    let args = arguments;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      fun.apply(null, args);
    }, window.constants.DEBOUNCE_INTERVAL);
  };
};

