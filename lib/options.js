const { assign } = require('./utils');
const suffix = require('./suffix');

const base = {
  resolution: {
    src: true,
    srcset: true,

    suffix: '@[match]x',
    pixelRatio: [1, 2, 3, 4],
    skip1x: true,
    skip1xSuffix: true,
    srcReplace: 1,
  },
  responsive: {
    suffix: '-[match]w',
    width: [],
    srcReplace: -1,

    src: false,
    srcset: true
  },

  sourceSrc: true,
  replace: {}
};

const mixedList = new Map([
  ['resolution', 'boolean'],
  ['responsive', 'boolean']
]);

function checkMixed(options) {
  for (const [key, type] of mixedList) {
    const value = options[key];
    if (typeof value === type) {
      options[key] = {};
      const obj = base[key];

      for (const prop of Object.keys(obj)) {
        if (typeof obj[prop] === type) {
          options[key][prop] = value;
        } else {
          options[key][prop] = obj[prop];
        }
      }
    }
  }

  return options;
}

module.exports = function(options = {}) {
  options = checkMixed(assign(base, options));
  options.suffix = suffix(options);
  return options;
};
