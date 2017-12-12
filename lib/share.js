module.exports = (() => {
  const share = {};
  return {
    set: (key, value) => {
      share[key] = value
    },
    get: key => {
      if (share.hasOwnProperty(key)) {
        return share[key];
      } else {
        throw new Error(`${key} is not shared.`);
      }
    }
  }
})();
