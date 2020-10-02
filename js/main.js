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

const ESC_KEYCODE = 27;
const MIN_LENGTH = 30;
const TYPES_OF_HOUSES = {
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
};

const rooms = {
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
};

const MAP_PIN_ACTIVE_CLASS = `map__pin--active`;
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
const inputAddressActive = `${inputAddressX} , ${Math.floor((PIN_OFFSET_Y + PIN_HEIGHT))}`;

let activeCardId;
let currentPin = null;
let currentCard = null;

const mapForm = document.querySelector(`.ad-form `);
const title = mapForm.querySelector(`#title`);
const timeIn = mapForm.querySelector(`#timein`);
const timeOut = mapForm.querySelector(`#timeout`);
const roomNumber = mapForm.querySelector(`#room_number`);
const capacity = mapForm.querySelector(`#capacity`);
const houseType = mapForm.querySelector(`#type`);
const housePrice = mapForm.querySelector(`#price`);
const formSubmitElement = mapForm.querySelector(`.ad-form__submit`);


const getUnique = function (titles) {
  const uniqueEl = titles[getRandom(0, titles.length)];
  titles.splice(titles.indexOf(uniqueEl), 1);
  return uniqueEl;
};

const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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
    pinElem.dataset.id = i;
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
  cardItem.querySelector(`.popup__type`).textContent = TYPES_OF_HOUSES[item.offer.type].translate;
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
  housePrice.setAttribute(`placeholder`, `1000`);
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
  removeOnButtonMouseDown();
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
    currentPin.classList.remove(MAP_PIN_ACTIVE_CLASS);
    activeCardId = null;
    currentPin.blur();
  }
};

const checkActive = function () {
  removeCard();
  if (currentPin) {
    currentPin.classList.remove(MAP_PIN_ACTIVE_CLASS);
    activeCardId = null;
  }
};

const showCard = function (evt) {
  const target = evt.target;
  const pinButton = target.closest(`.map__pin:not(.map__pin--main)`);
  const buttonClose = target.className === `popup__close`;
  timeIn.addEventListener(`change`, onTimeInChange);
  timeOut.addEventListener(`change`, onTimeOutChange);

  if (buttonClose) {
    checkActive();
  }

  if (!pinButton || (pinButton && activeCardId === pinButton.dataset.id)) {
    return;
  }

  checkActive();

  currentPin = pinButton;

  createCard(pinButton.dataset.id);

  pinButton.classList.add(MAP_PIN_ACTIVE_CLASS);
};

mapSection.addEventListener(`click`, function (evt) {
  showCard(evt);
});

const removeOnButtonMouseDown = function () {
  mainPin.removeEventListener(`mousedown`, onButtonMouseDown);
};

mainPin.addEventListener(`mousedown`, onButtonMouseDown);

const checkTitleValidity = function () {
  const validity = title.validity;
  if (validity.tooShort) {
    title.setCustomValidity(`Заголовок должен состоять минимум из 30 символов`);
  } else if (validity.tooLong) {
    title.setCustomValidity(`Заголовок не должен превышать 100 символов`);
  } else if (validity.valueMissing) {
    title.setCustomValidity(`Обязательное поле`);
  } else {
    title.setCustomValidity(``);
  }
};

const checkTitleLength = function (evt) {
  const target = evt.target;
  if (target.value.length < MIN_LENGTH) {
    target.setCustomValidity(`Заголовок должен состоять минимум из 30 символов`);
  } else {
    target.setCustomValidity(``);
  }
};

houseType.addEventListener(`change`, function () {

  const select = TYPES_OF_HOUSES[houseType.value];

  housePrice.setAttribute(`min`, select.min);
  housePrice.setAttribute(`placeholder`, select.placeholder);
});

const options = capacity.querySelectorAll(`option`);

roomNumber.addEventListener(`change`, function () {
  const selectType = rooms[roomNumber.value];
  setOptions(selectType);
  setValidity(selectType);

});

const setOptions = function (selectValue) {

  const checkValidity = function (value) {
    return selectValue.enabled.indexOf(value) === -1;
  };

  options.forEach(function (option) {
    option.disabled = checkValidity(option.value);
  });
};

const setValidity = function (selectValue) {
  const isValid = selectValue.enabled.indexOf(capacity.value) !== -1;
  const customValidity = isValid ? `` : selectValue.textError;
  capacity.setCustomValidity(customValidity);
};

capacity.addEventListener(`change`, function () {
  capacity.setCustomValidity(``);
});

const onTimeInChange = function () {
  timeOut.value = timeIn.value;
};

const onTimeOutChange = function () {
  timeIn.value = timeOut.value;
};

title.addEventListener(`invalid`, function () {
  checkTitleValidity();
});

title.addEventListener(`input`, function (evt) {
  checkTitleLength(evt);
});

const onSubmitClick = function () {
  checkBeforeSend(allInputsElements);
};

const allInputsElements = mapForm.querySelectorAll(`input`);

formSubmitElement.addEventListener(`click`, onSubmitClick);

const checkBeforeSend = function (formElements) {
  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].validity.valid === false) {
      formElements[i].setAttribute(`style`, `border: 2px solid red;`);
    } else {
      formElements[i].removeAttribute(`style`);
    }
  }
};
