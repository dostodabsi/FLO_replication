var psiTurk = require('./psiturk');
var ending = require('./specific/ending');
var items = require('./specific/items').items;
var setup = require('./specific/items').setup;


class Experiment {

  constructor() {
    this.curTrial = 0;
    this.trialData = [];

    this.ALIEN_TIME = 200;
    this.LABEL_TIME = 1000;
    this.allTrials = setup(items);

    // get variable *condition* from psiTurk
    this.condition = condition === '0' ? 'FL' : 'LF';
    this.isFL = this.condition == 'FL';
  }

  nextTrial() {
    if (this.curTrial < this.allTrials.length) {
      if (!this.isFL) $('img').attr('src', '');
      this.alien = this.allTrials[this.curTrial++];
      this.startLearning();
    }
    else
      this.recognition();
  }

  startLearning() {
    // FL: image (175ms) ~ 150 pause ~ label ~ 1000 pause
    // LF: label (1000ms) ~ 150 pause ~ image ~ 1000 pause
    return this.isFL ? this.changeImage() : this.changeLabel();
  }

  pause(from) {
    $('#label').text('');
    $('img').attr('src', ''); // reset the screen

    var img = from == 'img';
    var time = this.isFL ? (img ? 150 : 1000) : (img ? 1000 : 150);

    if (time == 1000) this.nextTrial();
    else {
      setTimeout(() => {
        return img ? this.changeLabel() : this.changeImage();
      }, time);
    }
  }

  changeLabel() {
    var text = this.isFL ? 'That was a ' : 'This is a ';
    $('#label').text(text + this.alien);
    setTimeout(() => this.pause('label'), this.LABEL_TIME);
  }

  changeImage() {
    $('img').attr('src', `../static/aliens/${this.alien}.png`);
    setTimeout(() => this.pause('img'), this.ALIEN_TIME);
  }

  save() {}

  start() {
    psiTurk.showPage('item.html');
    this.nextTrial();
  }

  end() {
    psiTurk.showPage('postquestionnaire.html');
    psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
    ending();
  }

  recognition() {
    $('#buttons').css('visibility', 'visible');
    $('#label').text('Recognition Task will follow!');
    this.bindButtons();
  }

  categorization() {
    $('#label').text('Categorization Task will follow!');
    setTimeout(this.end, 2000);
  }

  bindButtons() {
    $('.btn').on('click', (e) => {
      var answer = $(e.target).attr('id');
      this.trialData.push(this.alien, this.condition, answer, true);
      psiTurk.recordTrialData(this.trialData);
      this.categorization();
    });
  }
}


module.exports = Experiment;
