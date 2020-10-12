'use strict';

(function () {
  window.constants = {
    CARDS_AMOUNT: 8,
    TITLES: [
      `Уютное гнездышко для молодоженов`,
      `Маленькая квартирка рядом с парком`,
      `Небольшая лавочка в парке`,
      `Императорский дворец в центре Токио`,
      `Милейший чердачок`,
      `Наркоманский притон`,
      `Чёткая хата`,
      `Стандартная квартира в центре`,
      `Тихая квартирка недалеко от метро`,
      `Милое гнездышко для фанатов Анимэ`],
    DESCRIPTIONS: `Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.`,
    PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
    FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
    CHECK_TIMES: [`12:00`, `13:00`, `14:00`],
    MIN_PRICE: 1000,
    MAX_PRICE: 1000000,
    MIN_ROOM: 1,
    MAX_ROOM: 5,
    MIN_GUESTS: 1,
    MAX_GUESTS: 5,
    MIN_LOCATION_Y: 130,
    MAX_LOCATION_Y: 630,
    IMAGE_NUM_RANGES: [1, 2, 3, 4, 5, 6, 7, 8],
    PIN_HEIGHT: 65,
    PIN_WIDTH: 65,
    PIN_ARROW_HEIGHT: 22,
    MAP_PIN_ACTIVE_CLASS: `map__pin--active`,
    ESC_KEYCODE: 27,
    AVATAR_WIDTH: 45,
    AVATAR_HEIGHT: 40,
    TIMEOUT: 10000,
    PIN_TOP_COORD: 375,
    PIN_LEFT_COORD: 570,
    CAPACITY_SELECTED: 2,
    ROOM_SELECTED: 0,
    TypesOfHouses: {
      'bungalow': {
        min: 0,
        placeholder: `0`,
        translate: `Бунгало`
      },
      'flat': {
        min: 1000,
        placeholder: `1000`,
        translate: `Квартира`
      },
      'house': {
        min: 5000,
        placeholder: `5000`,
        translate: `Дом`
      },
      'palace': {
        min: 10000,
        placeholder: `10000`,
        translate: `Дворец`
      }
    },
    Rooms: {
      1: {
        enabled: [`1`],
        textError: `не более одного гостя`
      },
      2: {
        enabled: [`1`, `2`],
        textError: `не более одного или двух гостей`
      },
      3: {
        enabled: [`1`, `2`, `3`],
        textError: `не более одного, двух или трёх гостей`
      },
      100: {
        enabled: [`0`],
        textError: `не для гостей`
      }
    }
  };


})();
