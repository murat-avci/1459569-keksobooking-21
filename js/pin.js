'use strict';
(function () {

  window.pin = {
    createPins(icons) {
      icons.forEach(function (pin, i) {
        const pinElem = window.elements.pinTemplate.cloneNode(true);
        pinElem.children[0].src = icons[i].author.avatar;
        pinElem.dataset.id = i;
        pinElem.style.left = `${icons[i].location.x}px`;
        pinElem.style.top = `${icons[i].location.y}px`;
        pinElem.children[0].alt = icons[i].offer.title;
        window.elements.fragmentPins.appendChild(pinElem);
      });

      window.elements.mapPinList.appendChild(window.elements.fragmentPins);

    }
  };

})();
