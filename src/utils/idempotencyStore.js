const store = new Map();

module.exports = {
  has: (key) => store.has(key),
  add: (key) => store.set(key, true)
};

