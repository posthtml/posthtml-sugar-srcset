const searchParent = require('./searchParent');
const picture = require('./picture');

const imageSrc = require('./image/src');
const imageSrcset = require('./image/srcset');

const share = require('./share');
const suffix = require('./suffix');

module.exports = function(tree, opts) {
  share.set('option', opts);
  share.set('suffix', suffix());

  tree.match({ tag: 'img' }, node => {
    const parent = searchParent(node, tree);
    const srcset = node.attrs['srcset'];
    const hasSrcset = srcset !== void 0 && srcset !== '';

    if (parent.tag === 'picture') {
      picture(parent, node, opts);
    }

    if(hasSrcset) {
      if(opts.resolution.srcset || opts.responsive.srcset) {
        imageSrcset(node);
      }
    } else {
      if(opts.resolution.src || opts.responsive.src) {
        imageSrc(node);
      }
    }

    return node;
  });

};
