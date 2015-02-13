var psiTurk = require('../psiturk');

module.exports = function() {

  psiTurk.showPage('postquestionnaire.html');
  psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});

  // participant finished answering the questions
  $('#next').on('click', () => {
    // save their native language
    var language = $('#language').val();

    if (language === '') {
      alert('Please indicate your native language.');
      $('#language').focus();
      return false;
    }

    else {
      psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});
      psiTurk.recordTrialData([language]);

      $('select').each(function(i, val) {
        psiTurk.recordUnstructuredData(this.id, this.value);
      });

      psiTurk.recordUnstructuredData("language", $('#language').val());
      psiTurk.recordUnstructuredData("comments", $('#comment').val());

      psiTurk.saveData({
        success: () =>  psiTurk.completeHIT()
      });
    }
  });
};
