  // ---------- Tutorial overlay ("How to play this planet") ----------
  // Page 1 = a kid-friendly explanation (TUTORIALS[n] from tutorials.config.js, with a
  // style-based fallback). Pages 2+ = LIVE worked examples: we re-run the planet's own
  // generator so the examples are always similar-but-different from the real questions,
  // shown with their answers. "Back to the Arena" is always available. Globals, no IIFE.
  var _tutPages = [], _tutIdx = 0, _tutLevel = null;

  function tutorialFor(n){
    if (typeof TUTORIALS !== 'undefined' && TUTORIALS[n]) return TUTORIALS[n];
    var a = (typeof getArena === 'function') ? getArena(n) : null;
    var style = a ? a.mechanic : '';
    if (style === 'mcOnly') return 'Read the question, then tap the answer you think is correct.';
    if (style === 'directInput') return 'Work out the value in your head or on paper, type it in, then press Submit.';
    if (style === 'formula') return 'Move terms across the equals sign to get the letter you want on its own.';
    return 'Do the SAME operation to both sides of the scale, step by step, until x is alone.';
  }

  function _tutExample(level){
    var p; try { p = generateProblem(level); } catch (e) { return null; }
    if (p.mode === 'mcOnly') return { q: p.prompt, choices: p.choices, correct: p.correctIndex, a: p.choices[p.correctIndex] };
    if (p.mode === 'directInput') return { q: p.prompt, a: '' + p.answer };
    if (p.mode === 'formula') return { q: 'Make ' + (p.subject || 'the letter') + ' the subject of  ' + (p.original || 'the formula') + '.', a: 'rearrange step by step' };
    return { q: 'Solve the equation shown on the balance scale.', a: 'solve step by step' };
  }

  function openTutorial(level){
    level = level || (typeof state !== 'undefined' ? state.level : 1);
    _tutLevel = level;
    _tutPages = [{ type: 'explain' }];
    for (var i = 0; i < 3; i++){ var ex = _tutExample(level); if (ex) _tutPages.push({ type: 'example', ex: ex, i: i + 1 }); }
    _tutIdx = 0;
    var ov = document.getElementById('tutorialOverlay');
    if (!ov){ ov = document.createElement('div'); ov.id = 'tutorialOverlay'; ov.className = 'tutorial-overlay'; document.body.appendChild(ov); }
    _renderTutorial();
    ov.classList.add('open');
    if (typeof playSfx === 'function') playSfx('ui-click');
  }

  function _renderTutorial(){
    var ov = document.getElementById('tutorialOverlay'); if (!ov) return;
    var a = (typeof getArena === 'function') ? getArena(_tutLevel) : null;
    var page = _tutPages[_tutIdx];
    var body = '';
    if (page.type === 'explain'){
      body = '<div class="tut-kicker">📖 How to play · Arena ' + _tutLevel + (a && a.body ? ' · ' + a.body.name : '') + '</div>' +
        '<h2 class="tut-topic">' + (a ? a.topic : '') + '</h2>' +
        '<p class="tut-explain">' + tutorialFor(_tutLevel) + '</p>' +
        '<p class="tut-hint">Tap <b>Next</b> to see a few worked examples.</p>';
    } else {
      var ex = page.ex;
      var choices = ex.choices ? '<div class="tut-choices">' + ex.choices.map(function(c, i){
        return '<span class="tut-choice' + (i === ex.correct ? ' correct' : '') + '">' + c + (i === ex.correct ? '  ✓' : '') + '</span>';
      }).join('') + '</div>' : '';
      body = '<div class="tut-kicker">✏️ Worked example ' + page.i + '</div>' +
        '<div class="tut-q">' + ex.q + '</div>' + choices +
        '<div class="tut-a">Answer: <b>' + ex.a + '</b></div>';
    }
    var atEnd = _tutIdx >= _tutPages.length - 1;
    var dots = _tutPages.map(function(_, i){ return i === _tutIdx ? '●' : '○'; }).join(' ');
    var nav = '<div class="tut-nav">' +
      (_tutIdx > 0 ? '<button class="btn btn-ghost" onclick="tutPrev()">← Back</button>' : '<span class="tut-navspacer"></span>') +
      '<span class="tut-dots">' + dots + '</span>' +
      (atEnd ? '<button class="btn btn-primary" onclick="closeTutorial()">Got it! 🚀</button>'
             : '<button class="btn btn-primary" onclick="tutNext()">Next →</button>') +
      '</div>';
    ov.innerHTML =
      '<div class="tut-backdrop" onclick="closeTutorial()"></div>' +
      '<div class="tut-card">' +
        '<button class="tut-close" onclick="closeTutorial()" title="Back to the arena">✕</button>' +
        body + nav +
        '<button class="btn btn-ghost tut-toarena" onclick="closeTutorial()">← Back to the Arena</button>' +
      '</div>';
  }

  function tutNext(){ if (_tutIdx < _tutPages.length - 1){ _tutIdx++; _renderTutorial(); } }
  function tutPrev(){ if (_tutIdx > 0){ _tutIdx--; _renderTutorial(); } }
  function closeTutorial(){ var ov = document.getElementById('tutorialOverlay'); if (ov) ov.classList.remove('open'); }
