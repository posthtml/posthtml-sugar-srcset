const Image = require('./Image');
const Source = require('./Source');
const options = require('./options');

module.exports = opts => tree => main(tree, options(opts));

function main(tree, opts) {
  tree.match({ tag: 'img' }, node => {
    const image = new Image(node, opts);
    const parent = image.searchParent(tree);

    if (parent.tag === 'picture')
      picture(image, parent);

    image.fixSrcset();
    return node;
  });
}

function picture(image, picture) {
  for (const node of picture.content) {
    if (node.tag !== 'source')
      continue;

    const source = new Source(node, image);
    source.replaceMedia();
    source.fixSrcset();
    source.removeAttribute('src');
  }
}
