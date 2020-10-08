'use strict';

(function () {

  window.showCard = {
    activeCardId: null,
    currentPin: null,
    currentCard: null
  };

  const removeCard = function () {
    if (window.showCard.currentCard) {
      window.elements.mapSection.removeChild(window.showCard.currentCard);

      window.showCard.currentCard = null;
    }
  };

  const onPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      removeCard();
      document.removeEventListener(`keydown`, onPopupEscPress);
      window.showCard.currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      window.showCard.activeCardId = null;
      window.showCard.currentPin.blur();
    }
  };

  const removeActiveCard = function () {
    removeCard();

    if (window.showCard.currentPin) {
      window.showCard.currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      window.showCard.activeCardId = null;
    }
  };

  const createCard = function (id) {
    window.showCard.activeCardId = id;
    window.showCard.currentCard = window.elements.mapSection.appendChild(window.getCardData(window.adverts[id]));
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
    window.showCard.currentPin = pinButton;
    createCard(pinButton.dataset.id);
    pinButton.classList.add(window.constants.MAP_PIN_ACTIVE_CLASS);
  };

  window.elements.mapSection.addEventListener(`click`, function (evt) {
    showCard(evt);
  });
})();
