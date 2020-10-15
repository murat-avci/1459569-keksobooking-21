'use strict';

(function () {

  let currentPin = null;

  window.showCard = {
    activeCardId: null,
    currentCard: null
  };

  const removeCard = function () {
    if (window.showCard.currentAdvert) {
      window.elements.mapSection.removeChild(window.showCard.currentAdvert);

      window.showCard.currentAdvert = null;
    }
  };

  const onPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      removeCard();
      document.removeEventListener(`keydown`, onPopupEscPress);
      currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      window.showCard.activeCardId = null;
      currentPin.blur();
    }
  };

  const removeActiveCard = function () {
    removeCard();

    if (currentPin) {
      currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      window.showCard.activeCardId = null;
    }
  };

  const createCard = function (id) {
    window.showCard.activeCardId = id;
    window.showCard.currentAdvert = window.elements.mapSection.appendChild(window.getCardData(window.adverts[id]));
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const showCard = function (evt) {
    const target = evt.target;
    const pinButton = target.closest(`.map__pin:not(.map__pin--main)`);
    const buttonClose = target.className === `popup__close`;

    if (buttonClose) {
      removeActiveCard();
      document.removeEventListener(`keydown`, onPopupEscPress);
    }

    if (!pinButton || (window.showCard.activeCardId === pinButton.dataset.id)) {
      return;
    }

    removeActiveCard();
    currentPin = pinButton;
    createCard(pinButton.dataset.id);
    pinButton.classList.add(window.constants.MAP_PIN_ACTIVE_CLASS);
  };

  window.elements.mapSection.addEventListener(`click`, showCard);

})();
