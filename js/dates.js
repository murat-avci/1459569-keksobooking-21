'use strict';

(function () {
  const widthMap = window.elements.mapPinList.offsetWidth;
  const houseType = Object.keys(window.constants.TypesOfHouses);
  const checkTimes = window.constants.CHECK_TIMES;
  const randomize = window.util.getRandom;

  const createObject = function () {
    const locationX = randomize(0, (widthMap - window.constants.PIN_WIDTH / 2));
    const locationY = randomize(window.constants.MIN_LOCATION_Y, window.constants.MAX_LOCATION_Y);
    return {
      author: {
        avatar: `img/avatars/user0${window.util.getUnique(window.constants.IMAGE_NUM_RANGES)}.png`
      },

      offer: {
        title: window.util.getUnique(window.constants.TITLES),
        address: `${locationX}, ${locationY}`,
        price: randomize(window.constants.MIN_PRICE, window.constants.MAX_PRICE),
        type: houseType[randomize(0, houseType.length)],
        rooms: randomize(window.constants.MIN_ROOM, window.constants.MAX_ROOM + window.constants.MIN_ROOM),
        guests: randomize(window.constants.MIN_GUESTS, window.constants.MAX_GUESTS + 1),
        checkin: checkTimes[randomize(0, checkTimes.length)],
        checkout: checkTimes[randomize(0, checkTimes.length)],
        features: window.util.shuffleArray(window.constants.FEATURES.slice(0, randomize(0, window.constants.FEATURES.length + 1))),
        description: window.constants.DESCRIPTIONS,
        photos: window.util.shuffleArray(window.constants.PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  };

  const createData = function () {
    const objects = [];
    for (let i = 0; i < window.constants.CARDS_AMOUNT; i++) {
      objects.push(createObject());
    }
    return objects;
  };

  window.dates = createData();

})();
