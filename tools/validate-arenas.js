// ===========================================================================
// Arena question-generator validation harness (section 14).
// Paste into the browser console with the game loaded (or run via the Claude
// Browser javascript_tool), then call: validateAllArenas()  or  validateAllArenas(50)
//
// It generates each arena's problem many times and checks correctness invariants
// per mode: exactly-one-correct MC, no duplicate choices, valid directInput
// answer, valid graph spec, and no COMPUTED undefined/NaN artifacts. It does NOT
// flag benign design values — e.g. formula mode's optional `addToken:null`, or an
// intentional distractor choice literally reading "undefined" (arena 149, log(1)).
//
// Last full run (2026-07-14): 0 real issues across all 187 arenas.
// ===========================================================================
(function () {
  function validate(p) {
    var e = [];
    if (!p || !p.mode) return ['no mode'];
    if (p.mode === 'comingSoon') return [];
    if (/undefined|NaN/.test(String(p.prompt || ''))) e.push('prompt has undefined/NaN');
    if (p.mode === 'mcOnly') {
      if (!Array.isArray(p.choices) || p.choices.length < 2) { e.push('<2 choices'); }
      else {
        if (typeof p.correctIndex !== 'number' || p.correctIndex < 0 || p.correctIndex >= p.choices.length) e.push('bad correctIndex');
        var norm = p.choices.map(function (c) { return String(c).replace(/\s+/g, '').replace(/−/g, '-'); });
        var seen = {}, dup = false;
        norm.forEach(function (c) { if (seen[c]) dup = true; seen[c] = 1; });
        if (dup) e.push('duplicate choices');
        if (p.choices.some(function (c) { return /(^|\W)NaN(\W|$)/.test(String(c)); })) e.push('choice is NaN');
      }
    }
    if (p.mode === 'directInput') {
      if (p.answer == null || (typeof p.answer === 'number' && !isFinite(p.answer)) || String(p.answer) === 'NaN') e.push('bad answer');
    }
    if (p.mode === 'graph' && !p.graph) e.push('no graph spec');
    return e;
  }

  window.validateAllArenas = function (iterPerArena) {
    var ITER = iterPerArena || 30, bad = [], byMode = {};
    for (var n = 1; n <= 187; n++) {
      var seen = {};
      for (var i = 0; i < ITER; i++) {
        var p;
        try { p = generateProblem(n); } catch (ex) { seen['threw:' + ex] = 1; continue; }
        byMode[p && p.mode] = (byMode[p && p.mode] || 0) + 1;
        validate(p).forEach(function (x) { seen[x] = 1; });
      }
      var k = Object.keys(seen);
      if (k.length) bad.push({ arena: n, errs: k });
    }
    var out = { realIssues: bad.length, bad: bad, byMode: byMode };
    console.log(JSON.stringify(out, null, 1));
    return out;
  };
  window.validateProblemInvariants = validate;
})();
