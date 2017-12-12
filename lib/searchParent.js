function search(node, tree) {

  if (!Array.isArray(tree.content)) {
    return tree.content === node;
  }

  if (tree.content.includes(node)) {
    return tree;
  }

  const res = tree.content.map(_t => search(node, _t)).filter(Boolean);

  return res.length > 0 ? res[0] : false;
}

module.exports = function(node, tree) {
  for (let n of tree) {
    const res = search(node, n);
    if (res) {
      return res;
    }
  }
  return {};
};
