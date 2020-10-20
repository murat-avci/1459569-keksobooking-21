'use strict';


window.pin = {
  visible: [],
  createPins(icons) {
    icons.forEach(function (pin, i) {
      const pinElem = window.elements.pinTemplate.cloneNode(true);
      pinElem.children[0].src = pin.author.avatar;
      pinElem.dataset.id = i;
      pinElem.style.left = `${Math.floor(pin.location.x - window.constants.PIN_WIDTH / 2)}px`;
      pinElem.style.top = `${pin.location.y}px`;
      pinElem.children[0].alt = pin.offer.title;
      window.pin.visible.push(pinElem);
      window.elements.fragmentPins.appendChild(pinElem);
    });

    window.elements.mapPinList.appendChild(window.elements.fragmentPins);

  }
};
