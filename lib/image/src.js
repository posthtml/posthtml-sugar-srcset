const { setSrcsetForResolution, setSrcsetForResponsive } = require('../tag/src');

const apply = {};

apply.resolution = (image, match) => {
  const { removeSrc, resolution } = image.options;

  setSrcsetForResolution(image, match);

  if(removeSrc) {
    image.removeAttribute('src');
  } else if(resolution.srcReplace >= 0) {
    if(resolution.skip1xSuffix) {
      image.url.suffix('');
    } else {
      const suffix = resolution.suffix.replace('[match]', resolution.srcReplace);
      image.url.suffix(suffix);
    }

    image.setAttribute('src', image.url.format());
  }
};

apply.responsive = (image, match) => {
  const { responsive } = image.options;

  setSrcsetForResponsive(image, match);

  if (responsive.srcReplace < 0)
    return;

  const suffix = responsive.suffix.replace('[match]', responsive.srcReplace);
  image.url.suffix(suffix);
  image.setAttribute('src', image.url.format());
};


module.exports = image => {
  const type = image.url.type;
  const match = image.url.match;

  if (type && image.options[type].src) {
    apply[type](image, match);
  }
};
