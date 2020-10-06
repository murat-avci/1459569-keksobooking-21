'use strict';

(function () {
  let activeCardId;
  let currentPin = null;
  let currentCard = null;

  const removeCard = function () {
    if (currentCard) {
      window.elements.mapSection.removeChild(currentCard);
      currentCard = null;
    }
  };

  const onPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      removeCard();
      document.removeEventListener(`keydown`, onPopupEscPress);
      currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      activeCardId = null;
      currentPin.blur();
    }
  };

  const removeActiveCard = function () {
    removeCard();

    if (currentPin) {
      currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      activeCardId = null;
    }
  };

  const createCard = function (id) {
    activeCardId = id;
    currentCard = window.elements.mapSection.appendChild(window.getCardData(window.dates[id]));
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

    if (!pinButton || (activeCardId === pinButton.dataset.id)) {
      return;
    }

    removeActiveCard();
    currentPin = pinButton;
    createCard(pinButton.dataset.id);
    pinButton.classList.add(window.constants.MAP_PIN_ACTIVE_CLASS);
  };

  window.elements.mapSection.addEventListener(`click`, function (evt) {
    showCard(evt);
  });
})();
