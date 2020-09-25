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

const mapPinList = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const mapCard = document.querySelector(`.map`);
const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

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
      avatar: `img/avatars/user0${getUnique(IMAGE_NUM_RANGES)}.png`
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

const createFragmentFeatures = function (facilities) {
  let fragmentFeatures = document.createDocumentFragment();
  for (let i = 0; i < facilities.length; i++) {
    let li = document.createElement(`li`);
    li.classList.add(`popup__feature`);
    let classAdded = `popup__feature--` + facilities[i];
    li.classList.add(classAdded);
    fragmentFeatures.appendChild(li);
  }
  return fragmentFeatures;
};

const createFragmentPhotos = function (pins) {
  let fragmentPhotos = document.createDocumentFragment();
  for (let i = 0; i < pins.length; i++) {
    let img = document.createElement(`img`);
    img.src = pins[i];
    img.width = 45;
    img.height = 40;
    img.classList.add(`popup__photo`);
    fragmentPhotos.appendChild(img);
  }
  return fragmentPhotos;
};

const createPins = function (icons) {
  for (let i = 0; i < icons.length; i++) {
    let fragmentPins = document.createDocumentFragment();
    let pinElem = pinTemplate.cloneNode(true);
    pinElem.children[0].src = icons[i].author.avatar;
    pinElem.style.left = icons[i].location.x + `px`;
    pinElem.style.top = icons[i].location.y + `px`;
    pinElem.children[0].alt = icons[i].offer.title;
    fragmentPins.appendChild(pinElem);
    mapPinList.appendChild(fragmentPins);
  }
};

const createCard = function (item) {
  let cardItem = cardTemplate.cloneNode(true);

  mapCard.insertBefore(cardItem, mapPinList);
  let fragmentCard = document.createDocumentFragment();
  let cardFeatures = cardItem.querySelector(`.popup__features`);
  cardFeatures.innerHTML = ``;
  cardFeatures.appendChild(createFragmentFeatures(item.offer.features));
  let cardPhotos = cardItem.querySelector(`.popup__photos`);
  cardPhotos.innerHTML = ``;
  cardPhotos.appendChild(createFragmentPhotos(item.offer.photos));


  fragmentCard.appendChild(cardItem);
  mapCard.appendChild(fragmentCard);
  return cardItem;
};

const createItems = function (card) {
  let items = [];
  for (let i = 0; i < CARDS_AMOUNTS; i++) {
    items.push(card);
  }
  return items;
};

const cardsArray = createData();

createPins(cardsArray);
const oneCard = createCard(cardsArray[0]);
createItems(oneCard);
