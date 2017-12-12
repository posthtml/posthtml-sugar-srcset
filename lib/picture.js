const sourceSrc = require('./source/src');
const sourceSrcset = require('./source/srcset');

module.exports = function(picture, img, opts) {
  const imageSrc = img.attrs['src'];

  for (let node of picture.content) {
    if (node.tag !== 'source') {
      continue;
    }

    const srcset = node.attrs['srcset'];
    const hasSrcset = srcset !== void 0 && srcset !== '';

    if(hasSrcset) {
      if(opts.resolution.srcset || opts.responsive.srcset) {
        sourceSrcset(node, imageSrc);
      }
    } else {
      if(opts.resolution.src || opts.responsive.src) {
        sourceSrc(node, imageSrc);
      }
    }
  }
};
