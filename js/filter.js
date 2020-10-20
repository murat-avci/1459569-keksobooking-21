'use strict';


const type = window.elements.filterForm.querySelector(`#housing-type`);
const price = window.elements.filterForm.querySelector(`#housing-price`);
const rooms = window.elements.filterForm.querySelector(`#housing-rooms`);
const guests = window.elements.filterForm.querySelector(`#housing-guests`);
const features = window.elements.filterForm.querySelector(`#housing-features`);

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

const choosePrices = function (selectPrice) {
  if (price.value === `low`) {
    return selectPrice.offer.price < window.constants.MIN_OFFER_PRICE;
  } else if (price.value === `middle`) {
    return selectPrice.offer.price >= window.constants.MIN_OFFER_PRICE && selectPrice.offer.price <= window.constants.MAX_OFFER_PRICE;
  } else if (price.value === `high`) {
    return selectPrice.offer.price > window.constants.MAX_OFFER_PRICE;
  } else {
    return true;
  }
};

const chooseRooms = function (roomQuantity) {
  return rooms.value === `any` || roomQuantity.offer.rooms.toString() === rooms.value;
};

const chooseGuests = function (selectGuests) {
  return guests.value === `any` || selectGuests.offer.guests.toString() === guests.value;
};

const chooseFeatures = function (selectFeatures) {
  const checkedElem = features.querySelectorAll(`input[type=checkbox]:checked`);

  const checkedFeatures = [].map.call(checkedElem, function (input) {
    return input.value;
  });

  return checkedFeatures.every(function (currentFeature) {
    return selectFeatures.offer.features.includes(currentFeature);
  });
};

const onMapFormChange = function () {

  removeMapArea();
  window.shufledPins = window.util.shuffleArray(window.adverts);
  window.filteredPins = window.shufledPins.filter(function (filteredData) {
    const adType = chooseTypes(filteredData);
    const adRooms = choosePrices(filteredData);
    const adPrice = chooseRooms(filteredData);
    const adGuests = chooseGuests(filteredData);
    const adFeatures = chooseFeatures(filteredData);

    return adType && adRooms && adPrice && adGuests && adFeatures;
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

