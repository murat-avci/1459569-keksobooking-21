'use strict';


let currentPin = null;

const removeCard = function () {
  if (window.showCard.currentAdvert) {
    window.elements.mapSection.removeChild(window.showCard.currentAdvert);
    window.showCard.currentAdvert = null;
  }
};

const onEscRemoveAdvert = function (evt) {
  if (evt.keyCode === window.constants.ESC_KEYCODE) {
    removeCard();
    document.removeEventListener(`keydown`, onEscRemoveAdvert);
    currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
    window.showCard.activeAdvert = null;
    currentPin.blur();
  }
};

const removeActiveCard = function () {
  removeCard();

  if (currentPin) {
    currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
    window.showCard.activeAdvert = null;
  }
};

const createCard = function (id) {
  window.showCard.activeAdvert = id;
  window.showCard.currentAdvert = window.elements.mapSection.appendChild(window.getCardData(window.filteredPins[id]));
  document.addEventListener(`keydown`, onEscRemoveAdvert);
};

const onPinClick = function (evt) {
  const target = evt.target;
  const pinButton = target.closest(`.map__pin:not(.map__pin--main)`);
  const buttonClose = target.className === `popup__close`;

  if (buttonClose) {
    removeActiveCard();
    document.removeEventListener(`keydown`, onEscRemoveAdvert);
  }

  if (!pinButton || (window.showCard.activeAdvert === pinButton.dataset.id)) {
    return;
  }

  removeActiveCard();
  currentPin = pinButton;
  createCard(pinButton.dataset.id);
  pinButton.classList.add(window.constants.MAP_PIN_ACTIVE_CLASS);
};

window.showCard = {
  closeOpenedAdvert(card) {
    if (card) {
      window.showCard.activeAdvert = null;
      window.showCard.currentAdvert = null;
      window.elements.mapSection.removeChild(card);
    }
  },
  activeAdvert: null,
  onPinClick,
  onEscRemoveAdvert
};
