// ===========================================================================
// Question VARIETY engine (Phase 1b).
//
// Goal (spec §4-7): each arena trial should mix distinct question STYLES rather
// than the same template with new numbers. This module composes a 10-question
// "trial" per arena by deriving several genuinely-different styles FROM the
// arena's own native, already-verified problem — so every derived question is
// correct by construction (its answer comes from `generateProblem(n)`).
//
// Everything is expressed as the existing render modes (`mcOnly` / `directInput`),
// so NO renderer changes are needed. Styles derived from a numeric-answer
// (`directInput`) arena: direct, multiple-choice, true/false, error-analysis,
// compare, estimate, plus a two-step FINALE for question 10. Arenas whose native
// is `mcOnly` get the styles derivable without a numeric answer (direct,
// true/false). Arenas in the complex modes (numeric/bracket/formula/graph) are
// left to their native generator (buildArenaTrial returns null → loadProblem
// falls back to generateProblem), so those keep their existing behaviour.
//
// Composition constraints (best-effort, never at the cost of correctness):
//   • no style appears twice in a row
//   • no style more than 3× in the 10
//   • maximise distinct styles (prefer unused, then least-used)
//   • question 10 is a multi-stage finale where a numeric answer exists
// Every derived question is validated (_validOk) before it is accepted.
// ===========================================================================
(function () {
  window.VARIETY_ENABLED = true;

  function _vfmt(v) { return (typeof fmt === 'function') ? fmt(v) : String(v); }
  function _delta(a) { var d = (rand(0, 1) ? 1 : -1) * rand(1, 3); return d; } // nonzero

  // Three distinct wrong integers near A (all ≠ A and ≠ each other).
  function _intDistractors(A, count) {
    var cands = [A + 1, A - 1, A + 2, A - 2, A + 3, A - 3, A + 5, A + 10,
      (A > 0 ? A * 2 : A - 5), (A !== 0 ? -A : 7)];
    shuffle(cands);
    var out = [], seen = {}; seen[A] = 1;
    for (var i = 0; i < cands.length && out.length < count; i++) {
      if (!seen[cands[i]]) { seen[cands[i]] = 1; out.push(cands[i]); }
    }
    var g = A + 11;
    while (out.length < count) { if (!seen[g]) { seen[g] = 1; out.push(g); } g++; }
    return out;
  }

  // ---- correctness gate (mirrors tools/validate-arenas.js) ----
  function _validOk(p) {
    if (!p || !p.mode) return false;
    if (/undefined|NaN/.test(String(p.prompt || ''))) return false;
    if (p.mode === 'mcOnly') {
      if (!Array.isArray(p.choices) || p.choices.length < 2) return false;
      if (typeof p.correctIndex !== 'number' || p.correctIndex < 0 || p.correctIndex >= p.choices.length) return false;
      // Reject only a choice literally reading 'NaN' (a computed artifact); an intentional
      // 'undefined' distractor (e.g. arena 149 "What is log(1)?") is legitimate content.
      if (p.choices.some(function (c) { return /(^|\W)NaN(\W|$)/.test(String(c)); })) return false;
      var norm = p.choices.map(function (c) { return String(c).replace(/\s+/g, '').replace(/−/g, '-'); });
      var seen = {};
      for (var i = 0; i < norm.length; i++) { if (seen[norm[i]]) return false; seen[norm[i]] = 1; }
    }
    if (p.mode === 'directInput') {
      if (p.answer == null || (typeof p.answer === 'number' && !isFinite(p.answer)) || String(p.answer) === 'NaN') return false;
    }
    return true;
  }

  // ---- style generators (each returns a valid problem or null) ----
  function _freshDirect(n) {
    var p = generateProblem(n);
    if (p.mode === 'directInput') { p.styleId = 'direct'; p.templateId = 'native'; p.category = 'calculation'; return p; }
    if (p.mode === 'mcOnly') {
      p.styleId = 'direct'; p.templateId = 'native';
      p.category = /larg|small|great|order|which .*(not|correct)|compar/i.test(p.prompt || '') ? 'comparison' : 'concept';
      return p;
    }
    return null;
  }

  function _freshMc(n) {
    var p = generateProblem(n);
    if (p.mode !== 'directInput' || typeof p.answer !== 'number') return null;
    var A = p.answer, ds = _intDistractors(A, 3), opts = [A].concat(ds);
    shuffle(opts);
    var ci = opts.indexOf(A);
    return { mode: 'mcOnly', prompt: p.prompt, choices: opts.map(_vfmt), correctIndex: ci, par: 0,
      graph: p.graph, styleId: 'mc', templateId: 'mc', category: 'calculation' };
  }

  function _freshTF(n) {
    var p = generateProblem(n), isTrue = (rand(0, 1) === 0), claimStr;
    // Only reframe SELF-CONTAINED compute questions. An mcOnly prompt like
    // "Which number is the largest?" is meaningless without its choices, so skip it.
    if (p.mode === 'directInput' && typeof p.answer === 'number') {
      claimStr = _vfmt(isTrue ? p.answer : p.answer + _delta(p.answer));
    } else { return null; }
    return { mode: 'mcOnly',
      prompt: '<b>True or False?</b><br>For “' + p.prompt + '”, the answer is <b>' + claimStr + '</b>.',
      choices: ['✓ True', '✗ False'], correctIndex: isTrue ? 0 : 1, par: 0,
      graph: p.graph, styleId: 'trueFalse', templateId: 'tf', category: 'reasoning' };
  }

  function _freshError(n) {
    var p = generateProblem(n), ok = (rand(0, 1) === 0), claim;
    // Same rule as _freshTF: only compute questions can be reframed without losing meaning.
    if (p.mode === 'directInput' && typeof p.answer === 'number') {
      claim = _vfmt(ok ? p.answer : p.answer + _delta(p.answer));
    } else { return null; }
    return { mode: 'mcOnly',
      prompt: 'A cadet answered “' + p.prompt + '” with <b>' + claim + '</b>.<br>Is the cadet correct?',
      choices: ['✓ Correct', '✗ Incorrect'], correctIndex: ok ? 0 : 1, par: 0,
      graph: p.graph, styleId: 'errorAnalysis', templateId: 'err', category: 'reasoning' };
  }

  function _freshCompare(n) {
    var a = generateProblem(n), b = generateProblem(n);
    if (a.mode !== 'directInput' || b.mode !== 'directInput') return null;
    if (typeof a.answer !== 'number' || typeof b.answer !== 'number') return null;
    var ci = a.answer > b.answer ? 0 : (a.answer < b.answer ? 1 : 2);
    return { mode: 'mcOnly',
      prompt: 'Which is larger?<br>(A) ' + a.prompt + '<br>(B) ' + b.prompt,
      choices: ['(A) is larger', '(B) is larger', 'They are equal'], correctIndex: ci, par: 0,
      styleId: 'compare', templateId: 'cmp', category: 'comparison' };
  }

  function _freshEstimate(n) {
    var p = generateProblem(n);
    if (p.mode !== 'directInput' || typeof p.answer !== 'number') return null;
    if (Math.abs(p.answer) < 25) return null;   // rounding to nearest 10 only makes sense for larger values
    return { mode: 'directInput',
      prompt: 'Estimate: work out “' + p.prompt + '”, then round to the nearest 10.',
      answer: Math.round(p.answer / 10) * 10, par: 0,
      graph: p.graph, styleId: 'estimate', templateId: 'est', category: 'estimation' };
  }

  function _freshFinale(n) {
    var a = generateProblem(n), b = generateProblem(n);
    if (a.mode !== 'directInput' || b.mode !== 'directInput') return null;
    if (typeof a.answer !== 'number' || typeof b.answer !== 'number') return null;
    return { mode: 'directInput',
      prompt: '<b>Arena finale — two steps.</b><br>Work out (A) ' + a.prompt + ' and (B) ' + b.prompt +
        '.<br>Now type the <b>sum</b> A + B.',
      answer: a.answer + b.answer, par: 0,
      styleId: 'finale', templateId: 'finale-sum', category: 'multi-stage' };
  }

  function _gen(id, n) {
    switch (id) {
      case 'direct': return _freshDirect(n);
      case 'mc': return _freshMc(n);
      case 'trueFalse': return _freshTF(n);
      case 'errorAnalysis': return _freshError(n);
      case 'compare': return _freshCompare(n);
      case 'estimate': return _freshEstimate(n);
      case 'finale': return _freshFinale(n);
    }
    return null;
  }
  function _tryGen(id, n) {
    for (var i = 0; i < 6; i++) { var p = _gen(id, n); if (p && _validOk(p)) { p.styleId = (id === 'finale') ? 'finale' : (p.styleId || id); return p; } }
    return null;
  }

  function _poolFor(native) {
    if (native === 'directInput') return ['direct', 'mc', 'trueFalse', 'errorAnalysis', 'compare', 'estimate'];
    if (native === 'mcOnly') return ['direct'];   // serve mcOnly with its real choices; never reframe
    return [];
  }

  function _composeSlot(n, pool, lastId, counts, finale) {
    if (finale) { var f = _tryGen('finale', n); if (f) return f; }
    var avail = pool.filter(function (id) { return id !== lastId && (counts[id] || 0) < 3; });
    shuffle(avail);
    avail.sort(function (a, b) { return (counts[a] || 0) - (counts[b] || 0); }); // least-used first
    for (var i = 0; i < avail.length; i++) { var p = _tryGen(avail[i], n); if (p) return p; }
    var any = shuffle(pool.slice());                                            // relax constraints
    for (var j = 0; j < any.length; j++) { var q = _tryGen(any[j], n); if (q) return q; }
    return null;
  }

  // Build a 10-question trial for arena n, or null to fall back to the native generator.
  function buildArenaTrial(n) {
    if (!window.VARIETY_ENABLED || typeof generateProblem !== 'function') return null;
    // Bible arenas already ship 20 pre-authored, varied templates — serve them directly
    // (bibleProblem picks a fresh one each question) rather than running the numeric-style
    // transforms, which assume computed numeric answers. Special arenas (66/999 Giant Black
    // Hole, 67/888 Second Chance) ALSO own their question source end-to-end (generateProblem's
    // special branches, 04-logic.js) — deriving "direct"/"true-false" variants from a single
    // `generateProblem(n)` sample here would instead compose reworded variants of just ONE
    // sampled question (or, for the comeback trial, corrupt its levelSolves-indexed shuffle —
    // found 2026-07-18 while building Arena 888: repeated questions within one run).
    try { var _a = (typeof getArena === 'function') ? getArena(n) : null; if (_a && (_a.phaseId || _a.special)) return null; } catch (e) {}
    var sample; try { sample = generateProblem(n); } catch (e) { return null; }
    if (!sample) return null;
    var pool = _poolFor(sample.mode);
    if (!pool.length) return null;   // complex/native modes keep their own behaviour

    var trial = [], lastId = null, counts = {};
    for (var q = 0; q < 10; q++) {
      var finale = (q === 9);
      var prob = _composeSlot(n, pool, lastId, counts, finale);
      if (!prob) { try { prob = generateProblem(n); prob.styleId = 'direct'; } catch (e) { prob = null; } }
      if (!prob || !_validOk(prob)) return trial.length ? trial : null;
      prob.qIndex = q; prob.finale = finale;
      trial.push(prob);
      lastId = prob.styleId; counts[prob.styleId] = (counts[prob.styleId] || 0) + 1;
    }
    return trial;
  }

  // Debug/analysis: summarise the variety of a freshly-built trial.
  function analyzeTrial(n) {
    var t = buildArenaTrial(n);
    if (!t) return { arena: n, trial: null, nativeFallback: true };
    var styles = {}, cats = {}, consec = 0, last = null;
    t.forEach(function (p) {
      styles[p.styleId] = (styles[p.styleId] || 0) + 1;
      cats[p.category] = (cats[p.category] || 0) + 1;
      if (p.styleId === last) consec++;
      last = p.styleId;
    });
    var maxOne = Math.max.apply(null, Object.keys(styles).map(function (k) { return styles[k]; }));
    return { arena: n, length: t.length, distinctStyles: Object.keys(styles).length,
      styles: styles, categories: cats, maxOneStyle: maxOne, consecutiveRepeats: consec,
      finaleStyle: t[9] && t[9].styleId, allValid: t.every(_validOk) };
  }

  window.buildArenaTrial = buildArenaTrial;
  window.analyzeTrial = analyzeTrial;
})();
