function assign(obj1, obj2) {
  Object.keys(obj2).forEach(k => {
    if (typeof obj2[k] === 'object'
      && obj2[k] !== null
      && !Array.isArray(obj2[k])
    ) {
      obj2[k] = assign(obj1[k], obj2[k]);
    }
  });

  return Object.assign({}, obj1, obj2);
}

exports.assign = assign;
