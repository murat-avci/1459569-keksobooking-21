'use strict';
(function () {

  const createPins = function (icons) {
    for (let i = 0; i < icons.length; i++) {
      const pinElem = window.elements.pinTemplate.cloneNode(true);
      pinElem.children[0].src = icons[i].author.avatar;
      pinElem.dataset.id = i;
      pinElem.style.left = `${icons[i].location.x}px`;
      pinElem.style.top = `${icons[i].location.y}px`;
      pinElem.children[0].alt = icons[i].offer.title;
      window.elements.fragmentPins.appendChild(pinElem);
    }
    window.elements.mapPinList.appendChild(window.elements.fragmentPins);
  };

  const onButtonMouseUp = function () {
    window.elements.mapSection.classList.remove(`map--faded`);
    window.elements.advertForm.classList.remove(`ad-form--disabled`);
    createPins(window.dates);
    window.toggleDisabled(false, window.elements.fieldsets);
    window.toggleDisabled(false, window.elements.filterSelects);
    removeOnButtonMouseUp();
    window.setAddress();
  };

  window.addEventListener(`load`, function () {
    window.toggleDisabled(true, window.elements.fieldsets);
    window.toggleDisabled(true, window.elements.filterSelects);
    window.elements.mainPin.addEventListener(`mouseup`, onButtonMouseUp);
    window.setAddress();
  });

  const removeOnButtonMouseUp = function () {
    window.elements.mainPin.removeEventListener(`mouseup`, onButtonMouseUp);
  };

})();
