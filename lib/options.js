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

function assign(obj1, obj2) {
  Object.keys(obj2).forEach(k => {
    if (typeof obj2[k] === 'object'
      && obj2[k] !== null
      && !Array.isArray(obj2[k])
    ) {
      obj2[k] = assign(obj1[k], obj2[k]);
    }
  });

  return Object.assign({}, obj1, obj2);
}

function checkMixed(options) {
  for (let [key, type] of mixedList) {
    const value = options[key];
    if (typeof value === type) {
      options[key] = {};
      const obj = base[key];

      for (let prop of Object.keys(obj)) {
        if (typeof obj[prop] === type) {
          options[key][prop] = value;
        } else {
          options[key][prop] = obj[prop]
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
