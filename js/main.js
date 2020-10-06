'use strict';

(function () {
  window.util = {

    getUnique(titles) {
      const uniqueEl = titles[this.getRandom(0, titles.length)];
      titles.splice(titles.indexOf(uniqueEl), 1);
      return uniqueEl;
    },

    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    shuffleArray(array) {
      const finalArr = array.slice();
      for (let i = 0; i < finalArr.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = finalArr[i];
        finalArr[i] = finalArr[j];
        finalArr[j] = tmp;
      }
      return finalArr;
    }

  };
})();
