const sourceSrc = require('./source/src');
const sourceSrcset = require('./source/srcset');

const Source = require('./Source');

module.exports = function(image, picture) {
  const { resolution, responsive } = image.options;

  for (let node of picture.content) {
    if (node.tag !== 'source') {
      continue;
    }

    const source = new Source(node, image);
    source.replaceMedia();

    if (source.hasSrcSet()) {
      if (resolution.srcset || responsive.srcset) {
        sourceSrcset(source, image);
      }
    } else if(resolution.src || responsive.src) {
      sourceSrc(source, image);
    }
  }
};
