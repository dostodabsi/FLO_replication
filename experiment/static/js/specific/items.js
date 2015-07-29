var families = {'Fa1': 'wug', // TODO: find real names
                'Fa2': 'niz',
                'Fb1': 'zak',
                'Fb2': 'dep',
                'Fc1': 'xbim',
                'Fc2': 'tob'};

var picks = ['1111', '1112', '1113', '2111', '2112', '2113',
             '2211', '2212', '2213', '3311', '3312', '3313',
             '3321', '3322', '3323', '3331', '3332', '3333'];

var counterbalance = [[ 'FL', 'LF', 'FL', 'LF' ],
                      [ 'FL', 'LF', 'LF', 'FL' ],
                      [ 'FL', 'FL', 'LF', 'LF' ],
                      [ 'FL', 'FL', 'LF', 'LF' ],
                      [ 'FL', 'LF', 'LF', 'FL' ],
                      [ 'FL', 'LF', 'FL', 'LF' ],
                      [ 'LF', 'FL', 'FL', 'LF' ],
                      [ 'LF', 'FL', 'LF', 'FL' ],
                      [ 'LF', 'FL', 'FL', 'LF' ],
                      [ 'LF', 'FL', 'LF', 'FL' ],
                      [ 'LF', 'LF', 'FL', 'FL' ],
                      [ 'LF', 'LF', 'FL', 'FL' ],
                      [ 'FL', 'FL', 'LF', 'LF' ],
                      [ 'FL', 'FL', 'LF', 'LF' ],
                      [ 'FL', 'LF', 'FL', 'LF' ],
                      [ 'FL', 'LF', 'LF', 'FL' ],
                      [ 'FL', 'LF', 'FL', 'LF' ],
                      [ 'FL', 'LF', 'LF', 'FL' ],
                      [ 'LF', 'FL', 'LF', 'FL' ],
                      [ 'LF', 'FL', 'FL', 'LF' ],
                      [ 'LF', 'LF', 'FL', 'FL' ],
                      [ 'LF', 'LF', 'FL', 'FL' ],
                      [ 'LF', 'FL', 'FL', 'LF' ],
                      [ 'LF', 'FL', 'LF', 'FL' ]];

var setup = function() {
  // condition is provided by psiTurk (automagic counterbalancing)
  // decide: should there be a pause between the training blocks?
  var cond = counterbalance[condition];

  var learning;
  var stim = _.map(_.keys(families), function(family) {
    if (family == 'Fa1' || family == 'Fa2') learning = cond[0];
    if (family == 'Fb1' || family == 'Fb2') learning = cond[1];
    if (family == 'Fc1') learning = cond[2];
    if (family == 'Fc2') learning = cond[3];

    return _.map(picks, function(pick) {
      var obj = {};
      obj.learning = learning;
      obj.family = families[family];
      obj.alien = [family, pick].join('_');
      obj.path = [family, obj.alien].join('/');
      return obj;
    });
  });

  // TODO: change to pseudo-randomized trial order
  return _.shuffle(_.flatten(stim));
};

module.exports = setup;
