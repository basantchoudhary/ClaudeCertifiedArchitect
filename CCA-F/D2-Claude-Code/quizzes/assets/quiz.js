/* Interactive quiz engine for CCA-F Domain 1 mock exams.
   A page defines window.QUIZ = { title, subtitle, passMark, questions:[
     { id, topic, question, options:[...], answer:<0-based idx>, explanation }
   ]}  and includes this script. Options are shuffled per attempt so there is
   no positional tell; grading compares against the original correct option. */
(function () {
  var QUIZ = window.QUIZ;
  if (!QUIZ) { return; }
  var PASS = QUIZ.passMark || 0.7;
  var root = document.getElementById('quiz');
  var state = [];   // per-question: { q, order:[shuffled origIdx...], picked:null|origIdx }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function build() {
    root.innerHTML = '';
    state = [];
    QUIZ.questions.forEach(function (q, qi) {
      var order = shuffle(q.options.map(function (_, i) { return i; }));
      state.push({ q: q, order: order, picked: null });

      var card = document.createElement('div');
      card.className = 'q';
      card.id = 'q' + qi;

      var head = document.createElement('div');
      head.className = 'qhead';
      head.innerHTML = '<span class="qnum">Q' + (qi + 1) + '</span>' +
        (q.topic ? '<span class="qtopic">' + esc(q.topic) + '</span>' : '');
      card.appendChild(head);

      var qt = document.createElement('div');
      qt.className = 'qtext';
      qt.textContent = q.question;
      card.appendChild(qt);

      var ul = document.createElement('ul');
      ul.className = 'opts';
      order.forEach(function (origIdx, pos) {
        var li = document.createElement('li');
        li.className = 'opt';
        li.dataset.qi = qi;
        li.dataset.orig = origIdx;
        var letter = String.fromCharCode(65 + pos);
        li.innerHTML =
          '<input type="radio" name="q' + qi + '" value="' + origIdx + '">' +
          '<span class="lbl"><b>' + letter + '.</b> ' + esc(q.options[origIdx]) + '</span>' +
          '<span class="mark ok">✓</span><span class="mark no">✗</span>';
        li.addEventListener('click', function () {
          if (card.classList.contains('graded')) return;
          var input = li.querySelector('input');
          input.checked = true;
          state[qi].picked = origIdx;
          Array.prototype.forEach.call(ul.children, function (c) { c.style.borderColor = ''; });
        });
        ul.appendChild(li);
      });
      card.appendChild(ul);

      var ex = document.createElement('div');
      ex.className = 'explain';
      card.appendChild(ex);

      root.appendChild(card);
    });
  }

  function grade() {
    var answered = state.filter(function (s) { return s.picked !== null; }).length;
    var note = document.getElementById('unanswered');
    if (answered < QUIZ.questions.length) {
      note.textContent = '⚠ You have ' + (QUIZ.questions.length - answered) +
        ' unanswered question(s). Unanswered questions are marked wrong. Submit anyway or scroll up to finish.';
      note.classList.add('show');
    } else {
      note.classList.remove('show');
    }

    var correct = 0;
    state.forEach(function (s, qi) {
      var card = document.getElementById('q' + qi);
      card.classList.add('graded');
      var isCorrect = s.picked === s.q.answer;
      if (isCorrect) correct++;
      Array.prototype.forEach.call(card.querySelectorAll('.opt'), function (li) {
        var orig = parseInt(li.dataset.orig, 10);
        li.querySelector('input').disabled = true;
        if (orig === s.q.answer) li.classList.add('correct');
        if (orig === s.picked && !isCorrect) li.classList.add('wrongpick');
      });
      var ex = card.querySelector('.explain');
      var res = s.picked === null
        ? '<span class="res skip">Skipped</span>'
        : (isCorrect ? '<span class="res ok">Correct</span>' : '<span class="res no">Incorrect</span>');
      ex.innerHTML = '<div class="eh">Explanation ' + res + '</div><div>' + esc(s.q.explanation) + '</div>';
    });

    var total = QUIZ.questions.length;
    var pct = Math.round((correct / total) * 100);
    var pass = (correct / total) >= PASS;
    var sb = document.getElementById('scorebar');
    sb.innerHTML =
      '<span class="big">' + correct + ' / ' + total + '</span>' +
      '<span class="pct">' + pct + '%</span>' +
      '<span class="verdict ' + (pass ? 'pass' : 'fail') + '">' + (pass ? 'PASS' : 'BELOW 70%') + '</span>' +
      '<span class="bar"><span style="width:' + pct + '%"></span></span>';
    sb.classList.add('show');
    document.getElementById('submitBtn').disabled = true;

    var res2 = document.getElementById('results');
    if (res2) res2.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else sb.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function reset() {
    build();
    var sb = document.getElementById('scorebar');
    sb.classList.remove('show');
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('unanswered').classList.remove('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var count = document.getElementById('qcount');
    if (count) count.textContent = QUIZ.questions.length;
    build();
    document.getElementById('submitBtn').addEventListener('click', grade);
    document.getElementById('resetBtn').addEventListener('click', reset);
  });
})();
