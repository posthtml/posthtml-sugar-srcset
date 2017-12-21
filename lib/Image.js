const Node = require('./Node');

class Image extends Node {
  constructor(node, options) {
    super(node, options);
    this.url = this.src;
  }

  hasSrcSet() {
    const srcset = this.getAttribute('srcset');
    return srcset !== undefined && srcset !== '';
  }

  searchParent(tree) {
    for (let rootContent of tree) {
      const res = Image.searchContent(this.node, rootContent);
      if (res) {
        return res;
      }
    }
    return {};
  }
}

Image.searchContent = function(node, tree) {
  if (!Array.isArray(tree.content)) {
    return tree.content === node ? node : false;
  }

  if (tree.content.includes(node)) {
    return tree;
  }

  const res = tree.content.map(child => Image.searchContent(node, child)).filter(Boolean);

  return res.length > 0 ? res[0] : false;
};

module.exports = Image;
