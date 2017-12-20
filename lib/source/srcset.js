const tagSrcset = require('../tag/srcset');

module.exports = (source) => {
  tagSrcset(source);
  source.removeAttribute('src');
};
