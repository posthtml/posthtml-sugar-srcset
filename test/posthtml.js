const posthtml = require('posthtml');
const srcset = require('../lib/');

module.exports = (html, opt) => {
  return posthtml(srcset(opt))
    .process(html)
    .then(tree => tree.html);
};
