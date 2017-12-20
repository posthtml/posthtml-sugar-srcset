const { setSrcsetForResolution, setSrcsetForResponsive } = require('../tag/src');

const apply = {
  resolution: setSrcsetForResolution,
  responsive: setSrcsetForResponsive
};

module.exports = source => {
  const type = source.url.type;
  const match = source.url.match;

  if (type && source.options[type].src) {
    apply[type](source, match);
    source.removeAttribute('src');
  }
};
