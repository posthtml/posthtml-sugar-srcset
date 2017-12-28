const srcset = require('../lib/');
const posthtml = require('posthtml');

module.exports = (html, opt) => posthtml().use(srcset(opt)).process(html, { sync: true }).html;
