'use strict';

(function () {

  const roomNumber = window.elements.mapForm.querySelector(`#room_number`);
  const capacity = window.elements.mapForm.querySelector(`#capacity`);
  const houseType = window.elements.mapForm.querySelector(`#type`);
  const timeIn = window.elements.mapForm.querySelector(`#timein`);
  const timeOut = window.elements.mapForm.querySelector(`#timeout`);
  const housePrice = window.elements.mapForm.querySelector(`#price`);
  const inputAddress = window.elements.mapForm.querySelector(`#address`);
  const options = capacity.querySelectorAll(`option`);

  const onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  const onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener(`change`, onTimeInChange);
  timeOut.addEventListener(`change`, onTimeOutChange);

  houseType.addEventListener(`change`, function () {
    const select = window.constants.TypesOfHouses[houseType.value];
    housePrice.setAttribute(`min`, select.min);
    housePrice.setAttribute(`placeholder`, select.placeholder);
  });

  roomNumber.addEventListener(`change`, function () {
    const selectType = window.constants.Rooms[roomNumber.value];
    setOptions(selectType);
    setValidity(selectType);
  });

  const setOptions = function (selectType) {
    const checkValidity = function (value) {
      return selectType.enabled.indexOf(value) === -1;
    };

    options.forEach(function (option) {
      option.disabled = checkValidity(option.value);
    });
  };

  const setValidity = function (selectType) {
    const isValid = selectType.enabled.indexOf(capacity.value) !== -1;
    const customValidity = isValid ? `` : selectType.textError;
    capacity.setCustomValidity(customValidity);
  };

  capacity.addEventListener(`change`, function () {
    capacity.setCustomValidity(``);
  });

  window.setAddress = function () {
    inputAddress.setAttribute(`value`, `${parseInt(window.elements.mainPin.style.left, 10)}, ${parseInt(window.elements.mainPin.style.top, 10)}`);
  };

  window.toggleDisabled = function (isDisabled, nodes) {
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].disabled = isDisabled;
    }
  };

})();
