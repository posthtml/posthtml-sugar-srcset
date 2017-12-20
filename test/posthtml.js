const parser = require('posthtml-parser');
const render = require('posthtml-render');
const api = require('posthtml/lib/api');

const srcset = require('../lib/');

module.exports = (html, opt) => {
  const tree = parser(html);
  tree.match = api.match;
  srcset(opt)(tree);
  return render(tree);
};
