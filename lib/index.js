const picture = require('./picture');
const imageSrc = require('./image/src');
const imageSrcset = require('./image/srcset');
const Image = require('./Image');
const options = require('./options');

module.exports = (opts = {}) => {
  opts = options(opts);
  return tree => main(tree, opts);
};

function main(tree, opts) {
  tree.match({ tag: 'img' }, node => {
    const image = new Image(node, opts);
    const parent = image.searchParent(tree);

    if (parent.tag === 'picture') {
      picture(image, parent);
    }

    if (image.hasSrcSet()) {
      if (opts.resolution.srcset || opts.responsive.srcset) {
        imageSrcset(image);
      }
    } else {
      if (opts.resolution.src || opts.responsive.src) {
        imageSrc(image);
      }
    }

    return node;
  });
}
