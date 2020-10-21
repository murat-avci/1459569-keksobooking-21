'use strict';


window.elements = {
  mapSection: document.querySelector(`.map`),
  fieldsets: document.querySelectorAll(`fieldset`),
  filterSelects: document.querySelectorAll(`select[name^=housing]`),
  mapPinList: document.querySelector(`.map__pins`),
  pinTemplate: document.querySelector(`#pin`).content
  .querySelector(`.map__pin`),
  cardTemplate: document.querySelector(`#card`).content
  .querySelector(`.map__card`),
  mainPin: document.querySelector(`.map__pin--main`),
  advertForm: document.querySelector(`.ad-form`),
  mapForm: document.querySelector(`.ad-form `),
  fragmentPins: document.createDocumentFragment(),
  errorTemplate: document.querySelector(`#error`).content
  .querySelector(`.error`),
  successTemplate: document.querySelector(`#success`).content
  .querySelector(`.success`),
  inputAddress: document.querySelector(`#address`),
  avatarContainer: document.querySelector(`.ad-form-header__upload`),
  previewContainer: document.querySelector(`.ad-form-header__preview img`),
  photoContainer: document.querySelector(`.ad-form__photo-container`),
  filterForm: document.querySelector(`.map__filters`)
};
