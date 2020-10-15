'use strict';
(function () {

  const widthMap = window.elements.mapPinList.offsetWidth;
  const errorPopup = window.elements.errorTemplate.cloneNode(true);
  const errorButton = errorPopup.querySelector(`.error__button`);
  const messageContainer = errorPopup.querySelector(`.error__message`);

  window.elements.mainPin.addEventListener(`mousedown`, function (evt) {

    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const leftPin = window.constants.PIN_WIDTH / 2 + window.elements.mainPin.offsetLeft;
      const topPin = window.constants.PIN_HEIGHT + window.constants.PIN_ARROW_HEIGHT + window.elements.mainPin.offsetTop;
      const offsetX = window.elements.mainPin.offsetLeft - shift.x;
      const offsetY = window.elements.mainPin.offsetTop - shift.y;

      if (offsetX < 0) {
        window.elements.mainPin.style.left = `${0}px`;
      } else if (offsetX > widthMap - window.constants.PIN_WIDTH) {
        window.elements.mainPin.style.left = `${widthMap - window.constants.PIN_WIDTH}px`;
      } else {
        window.elements.mainPin.style.left = `${offsetX}px`;
      }

      if (offsetY > window.constants.MAX_LOCATION_Y) {
        window.elements.mainPin.style.top = `${window.constants.MAX_LOCATION_Y}px`;
      } else if (offsetY < window.constants.MIN_LOCATION_Y) {
        window.elements.mainPin.style.top = `${window.constants.MIN_LOCATION_Y}px`;
      } else {
        window.elements.mainPin.style.top = `${offsetY}px`;
      }

      if (!window.elements.mapSection.classList.contains(`map--faded`)) {
        window.elements.inputAddress.setAttribute(`value`, `${Math.floor(leftPin)}, ${Math.floor(topPin)}`);
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

  window.map = {
    onButtonMouseUp() {

      const onLoadSuccess = function (advert) {
        window.adverts = advert;
        window.filteredPins = window.util.shuffleArray(advert).splice(0, window.constants.MAX_QUANTITY_PINS);
        window.pin.createPins(window.filteredPins);
      };

      window.backend.load(onLoadSuccess, onLoadError);

      window.elements.mapSection.classList.remove(`map--faded`);
      window.elements.advertForm.classList.remove(`ad-form--disabled`);
      window.util.toggleDisabled(false, window.elements.fieldsets);
      window.util.toggleDisabled(false, window.elements.filterSelects);
      removeonButtonMouseUp();
      window.util.setAddress();
      window.elements.filterForm.addEventListener(`change`, window.filter.onMapFormChange);
      window.elements.mapSection.addEventListener(`click`, window.showCard.onPinClick);
      window.elements.filterForm.addEventListener(`change`, window.filter.onMapFormChange);
    }
  };

  const removeonButtonMouseUp = function () {
    window.elements.mainPin.removeEventListener(`mouseup`, window.map.onButtonMouseUp);
  };

  const onEscErrorPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      removeListeners();
    }
  };

  const onEnterErrorClick = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      removeListeners();
    }
  };

  const onButtonErrorClick = function () {
    removeListeners();
  };

  const removeListeners = function () {
    window.elements.mapSection.removeChild(errorPopup);
    errorButton.removeEventListener(`keyup`, onEnterErrorClick);
    document.removeEventListener(`keyup`, onEscErrorPress);
    document.removeEventListener(`click`, onButtonErrorClick);
  };

  const onLoadError = function (errorMessage) {
    messageContainer.textContent = errorMessage;
    errorButton.setAttribute(`tabindex`, `0`);

    errorButton.addEventListener(`keyup`, onEnterErrorClick);
    document.addEventListener(`keyup`, onEscErrorPress);
    document.addEventListener(`click`, onButtonErrorClick);

    window.elements.mapSection.appendChild(errorPopup);
  };


  window.util.toggleDisabled(true, window.elements.fieldsets);
  window.util.toggleDisabled(true, window.elements.filterSelects);
  window.util.setAddress();

  window.elements.mainPin.addEventListener(`mouseup`, window.map.onButtonMouseUp);

})();
