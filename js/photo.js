'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarChooser = document.querySelector(`#avatar`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const photoChooser = document.querySelector(`#images`);
const photoForm = document.querySelector(`.ad-form__photo`);

const matchTypes = function (file) {
  return FILE_TYPES.some(function (it) {
    return file.name.toLowerCase().endsWith(it);
  });
};

const changeAvatar = function (src) {
  avatarPreview.src = src;
};

const createImg = function (tagName, resultReader) {
  const imgElement = document.createElement(tagName);
  imgElement.src = resultReader;
  imgElement.style.width = `${window.constants.PHOTO_WIDTH}px`;
  imgElement.style.height = `${window.constants.PHOTO_HEIGHT}px`;
  return imgElement;
};

const addPhoto = function (result) {
  if (!photoForm.hasChildNodes()) {
    photoForm.appendChild(createImg(`img`, result));
  } else {
    const divElement = document.createElement(`div`);
    divElement.classList.add(`ad-form__photo`);
    divElement.appendChild(createImg(`img`, result));
    window.elements.photoContainer.appendChild(divElement);
  }
};

const loadFile = function (chooser, func) {
  const files = Array.from(chooser.files).filter(matchTypes);
  if (files) {
    files.forEach(function (it) {
      const reader = new FileReader();
      reader.addEventListener(`load`, function (evt) {
        func(evt.target.result);
      });
      reader.readAsDataURL(it);
    });
  }
};

const onAvatarChange = function (evt) {
  loadFile(evt.target, changeAvatar);
};

const onPhotoChange = function (evt) {
  loadFile(evt.target, addPhoto);
};

avatarChooser.addEventListener(`change`, onAvatarChange);
photoChooser.addEventListener(`change`, onPhotoChange);

