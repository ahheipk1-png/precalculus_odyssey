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

  // Light markdown -> HTML for the Bible tutorial sections (paragraphs, `code`, - and 1. lists).
  function _mdLite(s){
    s = String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    var html = s.split(/\n\s*\n/).map(function(b){
      var lines = b.split(/\n/).filter(function(l){ return l.trim(); });
      if (lines.length && lines.every(function(l){ return /^\s*-\s+/.test(l); }))
        return '<ul>' + lines.map(function(l){ return '<li>' + l.replace(/^\s*-\s+/, '') + '</li>'; }).join('') + '</ul>';
      if (lines.length && lines.every(function(l){ return /^\s*\d+\.\s+/.test(l); }))
        return '<ol>' + lines.map(function(l){ return '<li>' + l.replace(/^\s*\d+\.\s+/, '') + '</li>'; }).join('') + '</ol>';
      return '<p>' + b.trim().replace(/\n/g, '<br>') + '</p>';
    }).join('');
    return (typeof mathPretty === 'function') ? mathPretty(html) : html;
  }

  // Build step-by-step pages from the authored Bible tutorial (TUTORIAL_REGISTRY[phaseId]).
  function _bibleTutorialPages(phaseId){
    // TUTORIAL_REGISTRY is keyed by tutorialId ("Tut-P001"); fall back to raw phaseId just in case.
    var reg = (typeof TUTORIAL_REGISTRY !== 'undefined') ? TUTORIAL_REGISTRY : null;
    var T = reg && (reg['Tut-' + phaseId] || reg[phaseId]);
    if (!T) return null;
    var order = [
      ['🎯 Learning goal', 'Learning Goal'],
      ['🌟 Why it matters', 'Why It Matters'],
      ['💡 Core concept', 'Core Concept'],
      ['✏️ Worked example', 'Worked Example'],
      ['🌉 Fractions & decimals', 'Fraction/Decimal Bridge'],
      ['⚠️ Common mistakes', 'Common Mistakes']
    ];
    var pages = [];
    order.forEach(function(o){
      var txt = T[o[1]];
      if (txt && String(txt).trim()) pages.push({ type: 'section', title: o[0], md: String(txt) });
    });
    return pages.length ? pages : null;
  }

  function openTutorial(level){
    level = level || (typeof state !== 'undefined' ? state.level : 1);
    _tutLevel = level;
    var a0 = (typeof getArena === 'function') ? getArena(level) : null;
    var bib = (a0 && a0.phaseId) ? _bibleTutorialPages(a0.phaseId) : null;
    _tutPages = bib ? bib.slice() : [{ type: 'explain' }];
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
    if (page.type === 'section'){
      body = '<div class="tut-kicker">📖 How to play · Arena ' + _tutLevel + (a && a.body ? ' · ' + a.body.name : '') + '</div>' +
        '<h2 class="tut-topic">' + page.title + '</h2>' +
        '<div class="tut-section">' + _mdLite(page.md) + '</div>';
    } else if (page.type === 'explain'){
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
