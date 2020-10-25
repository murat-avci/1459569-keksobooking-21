'use strict';

window.util = {

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
  },

  toggleDisabled(isDisabled, nodes) {
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].disabled = isDisabled;
    }
  },

  setAddress() {
    window.elements.inputAddress.setAttribute(`value`, `${parseInt(window.elements.mainPin.style.left, 10)}, ${parseInt(window.elements.mainPin.style.top, 10)}`);
  }

};
