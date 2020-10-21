'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarChooser = window.elements.avatarContainer.querySelector(`input[type=file]`);
const photoChooser = window.elements.photoContainer.querySelector(`input[type=file]`);
const photoForm = document.querySelector(`.ad-form__photo`);

const createImg = function (tagName, resultReader) {
  const imgElement = document.createElement(tagName);
  imgElement.src = resultReader;
  imgElement.style.width = window.constants.PHOTO_WIDTH;
  imgElement.style.height = window.constants.PHOTO_HEIGHT;
  return imgElement;
};

const matchTypes = function (name) {
  return FILE_TYPES.some(function (it) {
    return name.endsWith(it);
  });
};

const onAvatarLoad = function (evt) {
  const fileChooser = evt.target;
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  if (matchTypes(fileName)) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      const result = reader.result;
      window.elements.previewContainer.src = result;
    });

    reader.readAsDataURL(file);

  }
};

const onPhotoLoad = function (evt) {
  const fileChooser = evt.target;
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  if (matchTypes(fileName)) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      const result = reader.result;

      if (!photoForm.hasChildNodes()) {
        photoForm.appendChild(createImg(`img`, result));
      } else {
        const divElement = document.createElement(`div`);
        divElement.classList.add(`ad-form__photo`);
        divElement.appendChild(createImg(`img`, result));
        window.elements.photoContainer.appendChild(divElement);
      }
    });
    reader.readAsDataURL(file);
  }
};

avatarChooser.addEventListener(`change`, onAvatarLoad);
photoChooser.addEventListener(`change`, onPhotoLoad);
