const path = require('path');

module.exports = {
  entry: [
    './js/backend.js',
    './js/debounce.js',
    './js/constants.js',
    './js/elements.js',
    './js/filter.js',
    './js/form.js',
    './js/main.js',
    './js/pin.js',
    './js/map.js',
    './js/card.js',
    './js/show-cards.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
