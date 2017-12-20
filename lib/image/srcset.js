const tagSrcset = require('../tag/srcset');

const replaceResolutionSrc = image => {
  const { resolution } = image.options;

  if (resolution.srcReplace < 0)
    return;

  const suffix = resolution.skip1xSuffix
    ? ''
    : resolution.suffix.replace('[match]', resolution.srcReplace);
  image.url.suffix(suffix);
  image.setAttribute('src', image.url.format());
};

const replaceResponsiveSrc = image => {
  const { responsive } = image.options;

  image.replaceSizes();
  image.url.suffix(responsive.suffix.replace('[match]', responsive.srcReplace));
  image.setAttribute('src', image.url.format());
};


module.exports = image => {
  const { removeSrc, responsive } = image.options;
  const srcset = tagSrcset(image);

  if (removeSrc) {
    image.removeAttribute('src');
  } else if (srcset[srcset.length - 1] === 'x') {
    replaceResolutionSrc(image)
  } else if (srcset[srcset.length - 1] === 'w' && responsive.srcReplace >= 0) {
    replaceResponsiveSrc(image);
  }
};
