'use strict';

(function () {

  const roomNumber = window.elements.mapForm.querySelector(`#room_number`);
  const capacity = window.elements.mapForm.querySelector(`#capacity`);
  const houseType = window.elements.mapForm.querySelector(`#type`);
  const timeIn = window.elements.mapForm.querySelector(`#timein`);
  const timeOut = window.elements.mapForm.querySelector(`#timeout`);
  const housePrice = window.elements.mapForm.querySelector(`#price`);
  const inputAddress = window.elements.mapForm.querySelector(`#address`);
  const options = capacity.querySelectorAll(`option`);
  const successPopup = window.elements.successTemplate.cloneNode(true);
  const errorPopup = window.elements.errorTemplate.cloneNode(true);
  const errorButton = errorPopup.querySelector(`.error__button`);
  const resetButton = window.elements.mapForm.querySelector(`.ad-form__reset`);
  const featureCheckboxes = document.querySelectorAll(`input[type=checkbox]`);
  const formDescription = window.elements.mapForm.querySelector(`#description`);
  const titleAdvert = window.elements.mapForm.querySelector(`#title`);

  const rooms = Object.keys(window.constants.Rooms);
  const guests = window.constants.Guests;

  const syncGuestsWithRooms = function (guestField, guestValue) {
    guestField.value = guestValue;
    let currentValue = guestField.value;

    for (let i = 0; i < guestField.options.length; i++) {
      guestField.options[i].disabled = (currentValue === `0`) ?
        (guestField.options[i].value !== `0`) :
        (guestField.options[i].value > currentValue || guestField.options[i].value === `0`);
    }
  };

  window.synchronizeFields = function (firstField, secondField, firstValues, secondValues, syncCallback) {
    const currentIndex = firstValues.indexOf(firstField.value);
    syncCallback(secondField, secondValues[currentIndex]);
  };

  const getCapacitySync = function () {
    window.synchronizeFields(roomNumber, capacity, rooms, guests, syncGuestsWithRooms);
  };

  roomNumber.addEventListener(`change`, getCapacitySync);

  const onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  const onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener(`change`, onTimeInChange);
  timeOut.addEventListener(`change`, onTimeOutChange);

  houseType.addEventListener(`change`, function () {
    const select = window.constants.TypesOfHouses[houseType.value];
    housePrice.setAttribute(`min`, select.min);
    housePrice.setAttribute(`placeholder`, select.placeholder);
  });

  roomNumber.addEventListener(`change`, function () {
    const selectType = window.constants.Rooms[roomNumber.value];
    setOptions(selectType);
    setValidity(selectType);
  });

  const setOptions = function (selectType) {
    const checkValidity = function (value) {
      return selectType.enabled.indexOf(value) === -1;
    };

    options.forEach(function (option) {
      option.disabled = checkValidity(option.value);
    });
  };

  const setValidity = function (selectType) {
    const isValid = selectType.enabled.indexOf(capacity.value) !== -1;
    const customValidity = isValid ? `` : selectType.textError;
    capacity.setCustomValidity(customValidity);
  };

  capacity.addEventListener(`change`, function () {
    capacity.setCustomValidity(``);
  });

  const removeSuccessPopup = function () {
    if (successPopup) {
      window.elements.mapSection.removeChild(successPopup);
    }
    document.removeEventListener(`keydown`, onSuccessEscPress);
    document.removeEventListener(`click`, onSuccessButtonClick);
  };

  const onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      removeSuccessPopup();
    }
  };

  const onSuccessButtonClick = function () {
    removeSuccessPopup();
  };

  const onUploadSuccess = function () {
    window.elements.mapSection.appendChild(successPopup);
    onResetClick();
    document.addEventListener(`keyup`, onSuccessEscPress);
    document.addEventListener(`click`, onSuccessButtonClick);
  };

  const onEscErrorKeyup = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      removeErrorListeners();
    }
  };

  const onButtonErrorKeyup = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      removeErrorListeners();
    }
  };

  const onButtonErrorClick = function () {
    removeErrorListeners();
  };

  const removeErrorListeners = function () {
    window.elements.mapSection.removeChild(errorPopup);
    errorButton.removeEventListener(`keyup`, onButtonErrorKeyup);
    document.removeEventListener(`keyup`, onEscErrorKeyup);
    document.removeEventListener(`click`, onButtonErrorClick);
  };

  const onUploadError = function (errorMessage) {
    errorPopup.querySelector(`.error__message`).textContent = errorMessage;
    errorButton.focus();
    errorButton.setAttribute(`tabindex`, `0`);
    errorButton.style.border = `2px solid yellow`;
    window.elements.mapSection.appendChild(errorPopup);

    errorButton.addEventListener(`keyup`, onButtonErrorKeyup);
    document.addEventListener(`keyup`, onEscErrorKeyup);
    document.addEventListener(`click`, onButtonErrorClick);
  };

  window.elements.mapForm.addEventListener(`submit`, function (evt) {
    window.backend.upload(new FormData(window.elements.mapForm), onUploadSuccess, onUploadError);
    evt.preventDefault();
  });

  const resetMainPin = function () {
    window.elements.mainPin.style.left = `${window.constants.PIN_LEFT_COORD}px`;
    window.elements.mainPin.style.top = `${window.constants.PIN_TOP_COORD}px`;
  };

  const clearMap = function () {
    const pins = window.elements.mapPinList.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let i = 0; i < pins.length; i++) {
      pins[i].remove(pins[i]);
    }
  };

  const onResetClick = function () {
    const openedCard = window.elements.mapSection.querySelector(`.map__card`);

    featureCheckboxes.forEach(function (element) {
      if (element.checked) {
        element.checked = false;
      }
    });

    if (openedCard) {
      window.showCard.activeCardId = null;
      window.showCard.currentPin = null;
      window.showCard.currentCard = null;
      window.elements.mapSection.removeChild(openedCard);
    }

    titleAdvert.value = ``;
    formDescription.value = ``;
    housePrice.setAttribute(`placeholder`, window.constants.MIN_PRICE);
    housePrice.value = ``;

    window.elements.mapSection.classList.add(`map--faded`);
    window.elements.advertForm.classList.add(`ad-form--disabled`);
    window.util.toggleDisabled(true, window.elements.fieldsets);
    window.util.toggleDisabled(true, window.elements.filterSelects);
    capacity.selectedIndex = window.constants.CAPACITY_SELECTED;
    roomNumber.selectedIndex = window.constants.ROOM_SELECTED;

    clearMap();
    resetMainPin();
    window.util.setAddress();
    window.elements.mainPin.addEventListener(`mouseup`, window.map.onButtonMouseUp);
  };


  window.setAddress = function () {
    inputAddress.setAttribute(`value`, `${parseInt(window.elements.mainPin.style.left, 10)}, ${parseInt(window.elements.mainPin.style.top, 10)}`);
  };

  window.toggleDisabled = function (isDisabled, nodes) {
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].disabled = isDisabled;
    }
  };

  resetButton.addEventListener(`click`, onResetClick);

})();
