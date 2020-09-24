'use strict';

const CARDS_AMOUNTS = 8;
const TITLES = [
  `Уютное гнездышко для молодоженов`,
  `Маленькая квартирка рядом с парком`,
  `Небольшая лавочка в парке`,
  `Императорский дворец в центре Токио`,
  `Милейший чердачок`,
  `Наркоманский притон`,
  `Чёткая хата`,
  `Стандартная квартира в центре`,
  `Тихая квартирка недалеко от метро`,
  `Милое гнездышко для фанатов Анимэ`
];
const DESCRIPTIONS = `Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.`;
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const OFFER_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
const MIN_PRICE = 1000;
const MAX_PRICE = 1000000;
const MIN_ROOM = 1;
const MAX_ROOM = 5;
const MIN_LOCATION_X = 100;
const MAX_LOCATION_X = 900;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;
const IMAGE_NUM_RANGES = [1, 2, 3, 4, 5, 6, 7, 8];

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const getUnique = function (titles) {
  let uniqueEl = titles[getRandom(0, titles.length)];
  titles.splice(titles.indexOf(uniqueEl), 1);
  return uniqueEl;
};

const getRandom = function (min, max) {
  return Math.floor(Math.random() * max + min);
};

const compareRandom = function () {
  return Math.random() - 0.5;
};

const getRandomFeatures = function (array) {
  array.length = getRandom(1, array.length);
  return array;
};

const customFeatures = getRandomFeatures(FEATURES);
const createObject = function () {

  let locationX = getRandom(MIN_LOCATION_X, MAX_LOCATION_X);
  let locationY = getRandom(MIN_LOCATION_Y, MAX_LOCATION_Y);
  return {
    author: {
      avatar: `img/avatars/user0` + getUnique(IMAGE_NUM_RANGES) + `.png`
    },

    offer: {
      title: getUnique(TITLES),
      address: locationX + `, ` + locationY,
      price: getRandom(MIN_PRICE, MAX_PRICE),
      type: OFFER_TYPES[getRandom(0, OFFER_TYPES.length)],
      rooms: getRandom(MIN_ROOM, MAX_ROOM),
      guests: getRandom(1, 5),
      checkin: CHECK_TIMES[getRandom(0, CHECK_TIMES.length)],
      checkout: CHECK_TIMES[getRandom(0, CHECK_TIMES.length)],
      features: customFeatures,
      description: DESCRIPTIONS,
      photos: PHOTOS.sort(compareRandom),
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

const createData = function () {
  let objects = [];
  for (let i = 0; i < CARDS_AMOUNTS; i++) {
    objects.push(createObject());
  }
  return objects;
};

createData();


