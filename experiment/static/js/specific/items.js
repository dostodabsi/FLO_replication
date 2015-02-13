var items = ['wug', 'niz', 'mob', 'zan', 'maz', 'buk']; // dummy aliens

function setup(items) {
  // will get more complicated
  return _.shuffle(items);
}

module.exports = {
  items: items,
  setup: setup
};
