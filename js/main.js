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
const MIN_GUESTS = 1;
const MAX_GUESTS = 5;
const MIN_LOCATION_X = 100;
const MAX_LOCATION_X = 900;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;
const IMAGE_NUM_RANGES = [1, 2, 3, 4, 5, 6, 7, 8];
const IMG_WIDTH = 45;
const IMG_HEIGHT = 40;
const PIN_WIDTH = 65;
const PIN_HEIGHT = 65;
const PIN_OFFSET_X = 570;
const PIN_OFFSET_Y = 375;
const POINTER_HEIGHT = 22;

const ESC_KEYCODE = 27;

const TypeOfHouses = {
  'flat': `Квартира`,
  'bungalow': `Бунгало`,
  'house': `Дом`,
  'palace': `Дворец`
};


const mapSection = document.querySelector(`.map`);
const fieldsets = document.querySelectorAll(`fieldset`);
const selects = document.querySelectorAll(`select[name^=housing]`);
const mapPinList = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

const mainPin = document.querySelector(`.map__pin--main`);
const advertForm = document.querySelector(`.ad-form`);
const inputAddress = document.querySelector(`#address`);
const inputAddressX = Math.floor(PIN_OFFSET_X + (PIN_WIDTH / 2));
const inputAddressLoad = `${inputAddressX} , ${Math.floor(PIN_OFFSET_Y + (PIN_HEIGHT / 2))}`;
const inputAddressActive = `${inputAddressX} , ${Math.floor((PIN_OFFSET_Y + PIN_HEIGHT + POINTER_HEIGHT))}`;

let activeCardId;
let currentPin = null;
let currentCard = null;

const getUnique = function (titles) {
  const uniqueEl = titles[getRandom(0, titles.length)];
  titles.splice(titles.indexOf(uniqueEl), 1);
  return uniqueEl;
};

const getRandom = function (min, max) {
  return Math.floor(Math.random() * max + min);
};

const shuffleArray = function (array) {
  const finalArr = array.slice();
  for (let i = 0; i < finalArr.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = finalArr[i];
    finalArr[i] = finalArr[j];
    finalArr[j] = tmp;
  }
  return finalArr;
};

const createObject = function () {

  const locationX = getRandom(MIN_LOCATION_X, MAX_LOCATION_X);
  const locationY = getRandom(MIN_LOCATION_Y, MAX_LOCATION_Y);
  return {
    author: {
      avatar: `img/avatars/user0${getUnique(IMAGE_NUM_RANGES)}.png`
    },

    offer: {
      title: getUnique(TITLES),
      address: `${locationX}, ${locationY}`,
      price: getRandom(MIN_PRICE, MAX_PRICE),
      type: OFFER_TYPES[getRandom(0, OFFER_TYPES.length + 1)],
      rooms: getRandom(MIN_ROOM, MAX_ROOM + MIN_ROOM),
      guests: getRandom(MIN_GUESTS, MAX_GUESTS + 1),
      checkin: CHECK_TIMES[getRandom(0, CHECK_TIMES.length)],
      checkout: CHECK_TIMES[getRandom(0, CHECK_TIMES.length)],
      features: shuffleArray(FEATURES.slice(0, getRandom(0, FEATURES.length + 1))),
      description: DESCRIPTIONS,
      photos: shuffleArray(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

const createData = function () {
  const objects = [];
  for (let i = 0; i < CARDS_AMOUNTS; i++) {
    objects.push(createObject());
  }
  return objects;
};

const createFragmentFeatures = function (facilities) {
  const fragmentFeatures = document.createDocumentFragment();
  for (let i = 0; i < facilities.length; i++) {
    const li = document.createElement(`li`);
    li.classList.add(`popup__feature`);
    const classAdded = `popup__feature--${facilities[i]}`;
    li.classList.add(classAdded);
    fragmentFeatures.appendChild(li);
  }
  return fragmentFeatures;
};

const createFragmentPhotos = function (pins) {
  const fragmentPhotos = document.createDocumentFragment();
  for (let i = 0; i < pins.length; i++) {
    const img = document.createElement(`img`);
    img.src = pins[i];
    img.width = IMG_WIDTH;
    img.height = IMG_HEIGHT;
    img.classList.add(`popup__photo`);
    fragmentPhotos.appendChild(img);
  }
  return fragmentPhotos;
};

const createPins = function (icons) {
  for (let i = 0; i < icons.length; i++) {
    const fragmentPins = document.createDocumentFragment();
    const pinElem = pinTemplate.cloneNode(true);
    pinElem.children[0].src = icons[i].author.avatar;
    pinElem.style.left = `${icons[i].location.x}px`;
    pinElem.style.top = `${icons[i].location.y}px`;
    pinElem.children[0].alt = icons[i].offer.title;
    fragmentPins.appendChild(pinElem);
    mapPinList.appendChild(fragmentPins);
  }
};

const getCardData = function (item) {
  const cardItem = cardTemplate.cloneNode(true);
  const roomNum = item.offer.rooms;
  const guestNum = item.offer.guests;

  const guestPhrase = guestNum === 1 ? ` гостя` : ` гостей`;
  const roomPhrase = roomNum === 1 ? ` комната для ` : `комнаты для`;


  mapSection.insertBefore(cardItem, mapPinList);
  cardItem.querySelector(`.popup__title`).textContent = item.offer.title;
  cardItem.querySelector(`.popup__text--address`).textContent = item.offer.address;
  cardItem.querySelector(`.popup__text--price`).innerHTML = `${item.offer.price} &#x20bd/ночь`;
  cardItem.querySelector(`.popup__type`).textContent = TypeOfHouses[item.offer.type];
  cardItem.querySelector(`.popup__text--capacity`).textContent = `${roomNum}${roomPhrase} для ${guestNum}${guestPhrase}`;
  cardItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${item.offer.checkin} выезд после ${item.offer.checkout}`;
  const cardFeatures = cardItem.querySelector(`.popup__features`);
  cardFeatures.innerHTML = ``;
  cardFeatures.appendChild(createFragmentFeatures(item.offer.features));
  cardItem.querySelector(`.popup__description`).textContent = item.offer.description;
  const cardPhotos = cardItem.querySelector(`.popup__photos`);
  cardPhotos.innerHTML = ``;
  cardPhotos.appendChild(createFragmentPhotos(item.offer.photos));
  cardItem.querySelector(`.popup__avatar`).src = item.author.avatar;
  mapSection.appendChild(cardItem);
};

const cards = createData();

const toggleDisabled = function (isDisabled, nodes) {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].disabled = isDisabled;
  }
};

window.addEventListener(`load`, function () {
  toggleDisabled(true, fieldsets);
  toggleDisabled(true, selects);
  inputAddress.value = inputAddressLoad;
});

const onButtonMouseDown = function () {
  inputAddress.disabled = true;
  inputAddress.value = inputAddressActive;
  mapSection.classList.remove(`map--faded`);
  advertForm.classList.remove(`ad-form--disabled`);
  createPins(cards);
  toggleDisabled(false, fieldsets);
  toggleDisabled(false, selects);
  mainPin.addEventListener(`mousedown`, removeOnButtonMouseDown);
};

const createCard = function (id) {
  activeCardId = id;
  currentCard = mapSection.appendChild(getCardData(cards[id]));
  document.addEventListener(`keydown`, onPopupEscPress);
};

const removeCard = function () {
  if (currentCard) {
    mapSection.removeChild(currentCard);
    currentCard = null;
  }
};

const onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removeCard();
    document.removeEventListener(`keydown`, onPopupEscPress);
    currentPin.classList.remove(`map__pin--active`);
    activeCardId = null;
    currentPin.blur();
  }
};

const checkActive = function () {
  removeCard();
  if (currentPin) {
    currentPin.classList.remove(`map__pin--active`);
    activeCardId = null;
  }
};

const showCard = function (evt) {
  const target = evt.target;
  const pinButton = target.closest(`.map__pin:not(.map__pin--main)`);
  const buttonClose = target.className === `popup__close`;

  if (buttonClose) {
    checkActive();
  }

  if (!pinButton || (pinButton && activeCardId === pinButton.dataset.id)) {
    return;
  }

  checkActive();

  currentPin = pinButton;

  createCard(pinButton.dataset.id);

  pinButton.classList.add(`map__pin--active`);
};

mapSection.addEventListener(`click`, function (evt) {
  showCard(evt);
});

const removeOnButtonMouseDown = function () {
  mainPin.removeEventListener(`mousedown`, onButtonMouseDown);
};

mainPin.addEventListener(`mousedown`, onButtonMouseDown);

const formElementRoomNumber = document.querySelector(`#room_number`);
const formElementCapacity = document.querySelector(`#capacity`);

let roomNumberValue = formElementRoomNumber.value;
let capacityValue = formElementCapacity.value;

const setRoomNumberCapacityValidity = function (evt) {
  const target = evt.target;
  roomNumberValue = formElementRoomNumber.value;
  capacityValue = formElementCapacity.value;
  if ((+roomNumberValue === 100 && +capacityValue !== 0) || (+capacityValue === 0 && +roomNumberValue !== 100)) {
    target.setCustomValidity(`Недопустимое значение`);
  } else if (+roomNumberValue < +capacityValue) {
    target.setCustomValidity(`Количество гостей не должно быть больше количества комнат`);
  } else {
    formElementCapacity.setCustomValidity(``);
    formElementRoomNumber.setCustomValidity(``);
  }
};

formElementCapacity.addEventListener(`input`, setRoomNumberCapacityValidity);
formElementRoomNumber.addEventListener(`input`, setRoomNumberCapacityValidity);
