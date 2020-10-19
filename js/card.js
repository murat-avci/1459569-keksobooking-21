'use strict';


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
    img.width = window.constants.AVATAR_WIDTH;
    img.height = window.constants.AVATAR_HEIGHT;
    img.classList.add(`popup__photo`);
    fragmentPhotos.appendChild(img);
  }
  return fragmentPhotos;
};

window.getCardData = function (item) {
  const cardItem = window.elements.cardTemplate.cloneNode(true);
  const roomNum = item.offer.rooms;
  const guestNum = item.offer.guests;

  let roomPhrase = ` комнат для `;

  const guestPhrase = guestNum === window.constants.MIN_GUESTS ? ` гостя` : ` гостей`;

  if (roomNum === window.constants.MIN_ROOM) {
    roomPhrase = ` комната для `;
  } else if (roomNum > window.constants.MIN_ROOM && roomNum < window.constants.MAX_ROOM) {
    roomPhrase = ` комнаты для `;
  }

  cardItem.querySelector(`.popup__title`).textContent = item.offer.title;
  cardItem.querySelector(`.popup__text--address`).textContent = item.offer.address;
  cardItem.querySelector(`.popup__text--price`).textContent = `${item.offer.price} ₽/ночь`;
  cardItem.querySelector(`.popup__type`).textContent = window.constants.TypesOfHouses[item.offer.type].translate;
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
  return cardItem;
};

