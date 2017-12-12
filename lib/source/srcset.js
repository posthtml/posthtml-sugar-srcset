const url = require('url');

const { getSourceSrc } = require('../common');
const tagSrcset = require('../tag/srcset');
const share = require('../share');

module.exports = (source, imageSrc) => {
  const opts = share.get('option');

  const src = getSourceSrc(source, imageSrc);
  const media = source.attrs['media'];

  if(Object.keys(opts.replace).indexOf(media) !== -1) {
    source.attrs['media'] = opts.replace[media];
  }

  tagSrcset(source, src);

  delete source.attrs['src'];
};
