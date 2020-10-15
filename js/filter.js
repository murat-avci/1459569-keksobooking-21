'use strict';

(function () {
  const filterForm = document.querySelector(`.map__filters`);
  const type = filterForm.querySelector(`#housing-type`);


  const removeMapArea = function () {
    const openedCard = window.elements.mapSection.querySelector(`.map__card`);
    const visiblePins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    visiblePins.forEach(function (it) {
      it.remove();
    });

    if (openedCard) {
      window.showCard.activeCardId = null;
      window.showCard.currentCard = null;
      window.elements.mapSection.removeChild(openedCard);
    }
  };

  const chooseTypes = function (selectType) {
    return type.value === `any` || selectType.offer.type === type.value;
  };

  const onFilterChange = function () {

    removeMapArea();

    const filteredPins = window.adverts.filter(function (filteredData) {
      const adType = chooseTypes(filteredData);

      return adType;
    });

    window.pin.createPins(filteredPins);

  };

  filterForm.addEventListener(`change`, window.debounce(onFilterChange));

})();
