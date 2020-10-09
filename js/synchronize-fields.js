'use strict';

(function () {

  window.synchronizeFields = function (firstField, secondField, firstValues, secondValues, syncCallback) {
    const currentIndex = firstValues.indexOf(firstField.value);
    syncCallback(secondField, secondValues[currentIndex]);

  };
})();
