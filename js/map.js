'use strict';
(function () {

  window.widthMap = window.elements.mapPinList.offsetWidth;
  const inputAddress = window.elements.mapForm.querySelector(`#address`);

  window.elements.mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const leftPin = window.constants.PIN_WIDTH / 2 + window.elements.mainPin.offsetLeft;
      const topPin = window.constants.PIN_HEIGHT + window.constants.PIN_ARROW_HEIGHT + window.elements.mainPin.offsetTop;

      if (window.elements.mainPin.offsetLeft - shift.x < 0) {
        window.elements.mainPin.style.left = `${0}px`;
      } else if (window.elements.mainPin.offsetLeft - shift.x > window.widthMap - window.constants.PIN_WIDTH) {
        window.elements.mainPin.style.left = `${window.widthMap - window.constants.PIN_WIDTH}px`;
      } else {
        window.elements.mainPin.style.left = `${window.elements.mainPin.offsetLeft - shift.x}px`;
      }

      if (window.elements.mainPin.offsetTop - shift.y > window.constants.MAX_LOCATION_Y) {
        window.elements.mainPin.style.top = `${window.constants.MAX_LOCATION_Y}px`;
      } else if (window.elements.mainPin.offsetTop - shift.y < window.constants.MIN_LOCATION_Y) {
        window.elements.mainPin.style.top = `${window.constants.MIN_LOCATION_Y}px`;
      } else {
        window.elements.mainPin.style.top = `${window.elements.mainPin.offsetTop - shift.y}px`;
      }

      if (!window.elements.mapSection.classList.contains(`map--faded`)) {
        inputAddress.setAttribute(`value`, `${Math.floor(leftPin)}, ${Math.floor(topPin)}`);
      }
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

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
