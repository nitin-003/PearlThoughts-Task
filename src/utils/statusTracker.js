const tracker = {};

module.exports = {
  set: (id, status) => {
    tracker[id] = status;
  },
  get: (id) => tracker[id] || null,
  getAll: () => tracker,
};


