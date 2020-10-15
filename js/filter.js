'use strict';

(function () {

  const type = window.elements.filterForm.querySelector(`#housing-type`);

  const removeMapArea = function () {

    window.pin.visible.forEach(function (pin) {
      pin.remove();
    });

    window.pin.visible = [];

    window.showCard.closeOpenedAdvert(window.showCard.currentAdvert);


  };

  const chooseTypes = function (selectType) {
    return type.value === `any` || selectType.offer.type === type.value;
  };

  const onMapFormChange = function () {

    removeMapArea();
    window.shufledPins = window.util.shuffleArray(window.adverts);
    window.filteredPins = window.shufledPins.filter(function (filtredData) {
      const adType = chooseTypes(filtredData);

      return adType;
    });

    window.pin.createPins(window.filteredPins.slice(0, window.constants.MAX_QUANTITY_PINS));

    if (window.filteredPins.length === 0) {
      document.removeEventListener(`keydown`, window.showCard.onEscRemoveAdvert);
      window.elements.mapSection.removeEventListener(`click`, window.showCard.onPinClick);
    } else {
      document.addEventListener(`keydown`, window.showCard.onEscRemoveAdvert);
      window.elements.mapSection.addEventListener(`click`, window.showCard.onPinClick);
    }

  };

  window.filter = {
    onMapFormChange: window.debounce(onMapFormChange)
  };

})();
