var psiTurk = require('./psiturk');
var items = require('./specific/items').items;
var setup = require('./specific/items').setup;
var Questionnaire = require('./specific/postquestionnaire');


class Experiment {

  constructor() {
    this.curTrial = 0;
    this.trialData = [];

    this.ALIEN_TIME = 175;
    this.LABEL_TIME = 1000;
    this.allTrials = setup(items);

    // dummy trials
    this.recognitionTrials = setup(items);
    this.categorizationTrials = setup(items);

    // dummy correct answers
    this.corAns = {
      'recognition': [true, true, true, false, false, false],
      'categorization': [false, false, false, true, true, true]
    };

  }

  nextTrial() {
    if (this.curTrial < this.allTrials.length) {
      this.trial = this.allTrials[this.curTrial++];
      this.isFL = this.trial.learning == 'FL';

      if (!this.isFL) {
        $('img').hide();
      } else {
        $('#label').text(''); // fixation cross ?
      }
      this.startLearning();
    }
    else {
      // prepare the recognition task
      $('img').hide();
      $('#label').text('');
      $('#label').css('margin-top', '0px');
      $('#buttons').css('visibility', 'visible');
      this.bindButtons('recognition');
    }
  }

  startLearning() {
    // FL: image (175ms) ~ 150 pause ~ label ~ 1000 pause
    // LF: label (1000ms) ~ 150 pause ~ image ~ 1000 pause
    return this.isFL ? this.changeImage() : this.changeLabel();
  }

  pause(from) {
    $('#label').text('');
    $('img').hide();

    var img = from == 'img';
    var time = this.isFL ? (img ? 150 : 1000) : (img ? 1000 : 150);

    if (time == 1000){
      //$('#label').text('+'); fixation cross?
      setTimeout(() => this.nextTrial(), time);
    }
    else {
      setTimeout(() => {
        return img ? this.changeLabel() : this.changeImage();
      }, time);
    }
  }

  changeLabel() {
    var text = this.isFL ? 'That was a ' : 'This is a ';
    $('#label').text(text + this.trial.alien);
    setTimeout(() => this.pause('label'), this.LABEL_TIME);
  }

  changeImage() {
    $('img').attr('src', `../static/aliens/${this.trial.alien}.png`);
    $('img').show();
    setTimeout(() => this.pause('img'), this.ALIEN_TIME);
  }

  save() {}

  start() {
    psiTurk.showPage('item.html');
    this.nextTrial();
  }

  end() {
    new Questionnaire(psiTurk).start();
  }

  recognition() {
    if (this.recognitionTrials.length === 0) {
      // prepare categorization task
      $('img').attr('id', 'left');
      var image = $('<img id = "right">');
      image.insertAfter($('img'));

      $('#new').attr('id', 'left learned').text('left learned');
      $('#old').attr('id', 'right learned').text('right learned');
      $('.btn').unbind('click');
      return this.bindButtons('categorization');
    }

    this.testStim = this.recognitionTrials.pop();
    $('img').attr('src', `../static/aliens/${this.testStim.alien}.png`);
    $('img').show();
    $('#label').text(this.testStim.alien);
  }

  categorization() {
    if (this.categorizationTrials.length === 0) {
      return this.end();
    }

    this.testStim = this.categorizationTrials.pop();
    var candidates = [this.testStim.alien, 'wug']; // hardcore comparison stimuli for now
    var left = _.random(0, 1);

    $('#left').attr('src', ['../static/aliens/', candidates[left], '.png'].join(''));
    $('#right').attr('src', ['../static/aliens/', candidates[left === 0 ? 1 : 0], '.png'].join(''));
    $('#label').text('Did you learn the left or the right alien?');
  }

  bindButtons(task) { // and start trial!
    $('.btn').on('click', (e) => {
      var answer = $(e.target).attr('id');
      var corAns = this.corAns[task][_.random(0, 5)];
      this.trialData.push(this.testStim.alien, this.testStim.learning, task, answer, corAns);

      psiTurk.recordTrialData(this.trialData);
      this.trialData = [];
      return task === 'recognition' ? this.recognition() : this.categorization();
    });

    return task === 'recognition' ? this.recognition() : this.categorization();
  }
}

module.exports = Experiment;
