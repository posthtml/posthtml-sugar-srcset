const options = require('./options');
const main = require('./main');

module.exports = (opts = {}) => {
  opts = options(opts);
  return tree => main(tree, opts);
};
