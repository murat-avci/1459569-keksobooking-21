'use strict';


window.constants = {
  CHECK_TIMES: [`12:00`, `13:00`, `14:00`],
  MIN_PRICE: 1000,
  MAX_PRICE: 1000000,
  MIN_ROOM: 1,
  MAX_ROOM: 5,
  MIN_GUESTS: 1,
  MAX_GUESTS: 5,
  MIN_LOCATION_Y: 130,
  MAX_LOCATION_Y: 630,
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
  DEBOUNCE_INTERVAL: 500,
  SUCCESS_REQ: 200,
  FAILED_REQ: 400,
  BAD_REQ: 404,
  MIN_OFFER_PRICE: 1000,
  MAX_OFFER_PRICE: 50000,
  MAX_QUANTITY_PINS: 5,
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

