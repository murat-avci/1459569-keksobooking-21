'use strict';

document.querySelector(`.map`).classList.remove(`map--faded`);

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

const TYPES = [`any`, `palace`, `flat`, `house`, `bungalow`];

const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomItem = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

const getRandomItemNoRepeat = function (arr) {
  let randomElement = getRandomNumber(0, arr.length - 1);
  let randomElementItem = arr[randomElement];
  arr.splice(randomElement, 1);
  return randomElementItem;
};

const getRandomItemNoRepeatAll = function (arr, num) {
  let newArr = [];
  let myArr = arr.slice();
  for (let i = 0; i < num; i++) {
    let random = getRandomNumber(0, myArr.length - 1);
    newArr.push(myArr[random]);
    myArr.splice(random, 1);
  }
  return newArr;
};

const randomArr = function (arr) {
  let newArr = [];
  let myArr = arr.slice();
  let num = myArr.length;
  for (let i = 0; i < num; i++) {
    let random = getRandomNumber(0, myArr.length - 1);
    newArr.push(myArr[random]);
    myArr.splice(random, 1);
  }
  return newArr;
};

const getObjects = function (num) {
  let arr = [];
  for (let i = 0; i < num; i++) {

    let locationX = getRandomNumber(300, 900);
    let locationY = getRandomNumber(200, 600);
    let mapObject = {
      author: {
        avatar: `img/avatars/user` + `0` + (i + 1) + `.png`
      },

      offer: {
        title: getRandomItemNoRepeat(TITLES),
        address: locationX + `, ` + locationY,
        price: getRandomNumber(100, 1000000),
        type: getRandomItem(TYPES),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 20),
        checkin: getRandomItem(CHECKIN),
        checkout: getRandomItem(CHECKOUT),
        features: getRandomItemNoRepeatAll(FEATURES, 2),
        description: ``,
        photos: randomArr(PHOTOS)
      },

      location: {
        x: locationX,
        y: locationY
      }
    };

    arr.push(mapObject);
  }
  return arr;
};

const mapObjects = getObjects(8);

const offerTypeRU = function () {
  switch (mapObjects.offer.type) {
    case `palace`: return `Дворец`;
    case `flat`: return `Квартира`;
    case `house`: return `Дом`;
    case `bungalow`: return `Бунгало`;
    default: return `Любой тип жилья`;
  }
};

const createDOMElement = function (el) {
  return el.content;
};

const mapPins = document.querySelector(`.map__pins`);
const map = document.querySelector(`section.map`);

const mapBalloonTemplate = createDOMElement(document.querySelector(`#map-balloon-template`));
const PIN_HEIGHT = 70;

for (let i = 0; i < mapObjects.length; i++) {

  let mapBalloonElement = mapBalloonTemplate.cloneNode(true);
  mapBalloonElement.querySelector(`.map__pin`).style.left = mapObjects[i].location.x + `px`;
  mapBalloonElement.querySelector(`.map__pin`).style.top = (mapObjects[i].location.y - (PIN_HEIGHT / 2)) + `px`;
  mapBalloonElement.querySelector(`.map__pin`).setAttribute(`title`, `My title`);
  mapBalloonElement.querySelector(`img`).setAttribute(`src`, mapObjects[i].author.avatar);

  mapPins.appendChild(mapBalloonElement);
}

const mapCardTemplate = createDOMElement(document.querySelector(`#map-card-template`));
const mapFiltersContainer = document.querySelector(`.map__filters-container`);

for (let i = 0; i < mapObjects.length; i++) {

  let mapCardElement = mapCardTemplate.cloneNode(true);
  mapCardElement.querySelector(`h3`).textContent = mapObjects[i].offer.title;
  mapCardElement.querySelector(`p > small`).textContent = mapObjects[i].offer.address;
  mapCardElement.querySelector(`.popup__price`).textContent = mapObjects[i].offer.price + ` \u20BD /ночь`;
  mapCardElement.querySelector(`h4`).textContent = offerTypeRU();
  mapCardElement.querySelector(`h4 + p`).textContent = mapObjects[i].offer.rooms + ` комнаты для ` + mapObjects[i].offer.guests + ` гостей`;
  mapCardElement.querySelector(`h4 + p + p`).textContent = `Заезд после ` + mapObjects[i].offer.checkin + `, выезд до ` + mapObjects[i].offer.checkout;
  mapCardElement.querySelector(`.popup__features + p`).textContent = mapObjects[i].offer.description;
  mapCardElement.querySelector(`.popup__avatar`).setAttribute(`src`, mapObjects[i].author.avatar);
  mapCardElement.querySelector(`.popup__features + p`).textContent = mapObjects[i].offer.description;

  let mapCardElementFeature = mapCardElement.querySelector(`.popup__features li`);

  for (let j = 0; j < mapObjects[i].offer.features.length; j++) {
    let mapCardElementFeatureElement = mapCardElementFeature.cloneNode(true);
    mapCardElementFeatureElement.classList.add(`feature`, `feature--` + mapObjects[i].offer.features[j]);
    mapCardElement.querySelector(`.popup__features`).appendChild(mapCardElementFeatureElement);
  }

  let mapCardElementPictures = mapCardElement.querySelector(`.popup__pictures li`);

  for (let k = 0; k < mapObjects[i].offer.photos.length; k++) {
    let mapCardElementPictureElement = mapCardElementPictures.cloneNode(true);
    mapCardElementPictureElement.querySelector(`img`).setAttribute(`src`, mapObjects[i].offer.photos[k]);
    mapCardElementPictureElement.querySelector(`img`).setAttribute(`width`, 100);
    mapCardElementPictureElement.querySelector(`img`).setAttribute(`height`, 75);
    mapCardElement.querySelector(`.popup__pictures`).appendChild(mapCardElementPictureElement);
  }

  map.insertBefore(mapCardElement, mapFiltersContainer);
}
