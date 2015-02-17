var items = [{
  'alien': 'wug'
}, {
  'alien': 'niz'
}, {
  'alien': 'mob'
}, {
  'alien': 'zan'
}, {
  'alien': 'maz'
}, {
  'alien': 'buk'
}]; // dummy aliens

function setup(items) {
  var FL = 0;
  var LF = 0;
  var trials = _.shuffle(items);
  var nr_cond = items.length / 2;

  return _.reduce(trials, (base, el) => {
    var trial = el;
    var isFL = _.random(0, 1) === 0;

    if (FL == nr_cond) isFL = false;
    if (LF == nr_cond) isFL = true;

    if (isFL){
      FL += 1;
      trial.learning = 'FL';
    }
    else {
      LF += 1;
      trial.learning = 'LF';
    }

    base.push(trial);
    return base;
  }, []);
}

module.exports = {
  items: items,
  setup: setup
};
