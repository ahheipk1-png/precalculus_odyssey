  function rand(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(arr){
    for (var i = arr.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  function fmt(n){
    return n < 0 ? ('\u2212' + Math.abs(n)) : ('' + n);
  }

  // Pretty-print maths notation for DISPLAY ONLY (answers are matched by index/number, never by
  // this text): 3^2 -> 3\u00b2, x^{n+1} -> superscript, log_3 -> log with a subscript 3 (no underscore),
  // sqrt -> \u221a, pi -> \u03c0, theta -> \u03b8, <=/>=/!= -> \u2264 \u2265 \u2260, * -> \u00d7. Safe to run on strings that already
  // contain <b>/<br> tags (the symbol swaps can't match tag syntax). Emits <sup>/<sub> HTML, so the
  // result must be inserted with innerHTML.
  function mathPretty(s){
    if (s == null) return '';
    s = String(s);
    s = s.replace(/&lt;=/g, '\u2264').replace(/&gt;=/g, '\u2265')
         .replace(/<=/g, '\u2264').replace(/>=/g, '\u2265').replace(/!=/g, '\u2260')
         .replace(/\+\/-/g, '\u00b1').replace(/\binfinity\b/gi, '\u221e')
         .replace(/\bsqrt\s*/gi, '\u221a').replace(/\bpi\b/g, '\u03c0').replace(/\btheta\b/gi, '\u03b8')
         .replace(/(\d|\))\s*\*\s*(?=[\da-zA-Z(])/g, '$1\u00d7');
    s = s.replace(/\^\{([^}]*)\}/g, '<sup>$1</sup>').replace(/\^(-?[0-9]+|[a-zA-Z])/g, '<sup>$1</sup>');
    s = s.replace(/_\{([^}]*)\}/g, '<sub>$1</sub>').replace(/_(-?[0-9]+|[a-zA-Z])/g, '<sub>$1</sub>');
    return s;
  }

  function formatSideHTML(eq){
    var denom = eq.denom || 1;
    var left = '';
    if (denom > 1) {
      var vPart = eq.coeff === 1 ? `<span class="term font-x">x</span>` : `<span class="term">${eq.coeff}</span><span class="term font-x">x</span>`;
      left = `<span class="fraction-container"><span class="numerator">${vPart}</span><span class="denominator"><span class="term">${denom}</span></span></span>`;
    } else {
      left = eq.coeff === 1 ? `<span class="term font-x">x</span>` : `<span class="term">${eq.coeff}</span><span class="term font-x">x</span>`;
    }
    if (eq.add > 0) left += `<span class="term"> &nbsp;+&nbsp; ${eq.add}</span>`;
    else if (eq.add < 0) left += `<span class="term"> &nbsp;&minus;&nbsp; ${Math.abs(eq.add)}</span>`;
    return left;
  }

  function formatBracketHTML(a, k){
    var inner = 'x ' + (k >= 0 ? ('+ ' + k) : ('&minus; ' + Math.abs(k)));
    var lead = (a === 1) ? '' : a;   // a coefficient of 1 is implicit: "1(x+3)" → "(x+3)"
    return `<span class="term">${lead}(${inner})</span>`;
  }

  function formatFormulaSideHTML(eq, subject){
    var s = '';
    if (eq.coeffToken) s += `<span class="term">${eq.coeffToken}</span>`;
    s += `<span class="term font-x">${subject}</span>`;
    if (eq.addToken) {
      s += `<span class="term"> &nbsp;${eq.addSign === 1 ? '+' : '&minus;'}&nbsp; ${eq.addToken}</span>`;
    }
    return s;
  }

  function exprToHTML(expr) {
    if (typeof expr === 'string') {
      return `<span class="term">${expr}</span>`;
    }
    if (expr.op === '+') {
      return exprToHTML(expr.left) + `<span class="term"> &nbsp;+&nbsp; </span>` + exprToHTML(expr.right);
    }
    if (expr.op === '-') {
      return exprToHTML(expr.left) + `<span class="term"> &nbsp;&minus;&nbsp; </span>` + exprToHTML(expr.right);
    }
    if (expr.op === '*') {
      return exprToHTML(expr.left) + `<span class="term">&middot;</span>` + exprToHTML(expr.right);
    }
    if (expr.op === '/') {
      var numHTML = exprToHTML(expr.left);
      var denHTML = exprToHTML(expr.right);
      return `<span class="fraction-container"><span class="numerator">${numHTML}</span><span class="denominator">${denHTML}</span></span>`;
    }
  }

  function exprToText(expr) {
    if (typeof expr === 'string') return expr;
    if (expr.op === '+') return exprToText(expr.left) + ' + ' + exprToText(expr.right);
    if (expr.op === '-') return exprToText(expr.left) + ' \u2212 ' + exprToText(expr.right);
    if (expr.op === '*') return exprToText(expr.left) + ' ' + exprToText(expr.right);
    if (expr.op === '/') {
      var leftStr = exprToText(expr.left);
      var rightStr = exprToText(expr.right);
      if (leftStr.indexOf(' ') !== -1) leftStr = '(' + leftStr + ')';
      return leftStr + ' / ' + rightStr;
    }
  }

  function formatSide(coeff, add){
    var left = coeff === 1 ? 'x' : (coeff + 'x');
    if (add > 0) left += ' + ' + add;
    else if (add < 0) left += ' \u2212 ' + Math.abs(add);
    return left;
  }

  function formatBracket(a, k){
    return (a === 1 ? '' : a) + '(x ' + (k >= 0 ? ('+ ' + k) : ('\u2212 ' + Math.abs(k))) + ')';
  }

  function formatFormulaSide(eq, subject){
    var s = '';
    if (eq.coeffToken) s += eq.coeffToken;
    s += subject;
    if (eq.addToken) s += (eq.addSign === 1 ? ' + ' : ' \u2212 ') + eq.addToken;
    return s;
  }

  function starString(rating){
    var s = '';
    for (var i = 0; i < 3; i++) s += i < rating ? '\u2605' : '\u2606';
    return s;
  }

  function fitFont(node){
    var len = node.textContent.length;
    var size = len <= 6 ? 44 : (len <= 9 ? 38 : (len <= 13 ? 32 : 26));
    node.style.fontSize = size + 'px';
  }

  function pop(node){
    node.classList.remove('pop');
    void node.getBoundingClientRect();
    node.classList.add('pop');
  }

  function wobbleBeam(){
    var dir = Math.random() < 0.5 ? -1 : 1;
    el.beamGroup.style.setProperty('--tip-angle', (dir * 8) + 'deg');
    el.beamGroup.classList.remove('wobble');
    void el.beamGroup.getBoundingClientRect();
    el.beamGroup.classList.add('wobble');
    if (typeof playSfx === 'function') playSfx('wrong');
  }

  // ---------- Problem generation ----------

  function generateNumericProblem(level){
    var tier = Math.min(level, 5);
    var extra = Math.max(0, level - 5);
    var pool;
    if (tier === 1) pool = ['add','sub'];
    else if (tier === 2) pool = ['add','sub','mul','div'];
    else if (tier === 3) pool = ['mul','div','twoStepAdd','twoStepDiv','bracket'];
    else pool = ['twoStepAdd','twoStepSub','twoStepDiv','bracket'];

    var type = pool[rand(0, pool.length - 1)];

    if (type === 'bracket'){
      var ba = rand(2, 6 + Math.min(extra, 3));
      var bk = rand(-(9 + extra), 9 + extra);
      while (bk === 0) bk = rand(-(9 + extra), 9 + extra);
      var bx = rand(1, 10 + extra);
      var brhs = ba * (bx + bk);
      return { mode: 'bracket', coeffA: ba, innerK: bk, x: bx, rhs: brhs, par: 3 };
    }

    var x, a, b, coeff, denom, add, result;
    denom = 1;

    if (type === 'add'){
      x = rand(1, 10 + extra); a = rand(1, 10 + extra);
      coeff = 1; add = a; result = x + a;
    } else if (type === 'sub'){
      x = rand(1, 10 + extra); a = rand(1, 10 + extra);
      coeff = 1; add = -a; result = x - a;
    } else if (type === 'mul'){
      x = rand(1, 10 + extra);
      a = rand(2, tier <= 2 ? 5 : 6 + Math.min(extra, 3));
      coeff = a; add = 0; result = a * x;
    } else if (type === 'div'){
      var d = rand(2, tier <= 2 ? 4 : 5);
      x = d * rand(1, 10 + extra);
      coeff = 1; denom = d; add = 0; result = x / d;
    } else if (type === 'twoStepAdd'){
      var xMinA = tier >= 5 ? -10 - extra : 1;
      x = rand(xMinA, 10 + extra);
      a = rand(2, 6 + Math.min(extra, 3));
      b = rand(1, 10 + extra);
      coeff = a; add = b; result = a * x + b;
    } else if (type === 'twoStepSub') {
      var xMinS = tier >= 5 ? -10 - extra : 1;
      x = rand(xMinS, 10 + extra);
      a = rand(2, 6 + Math.min(extra, 3));
      b = rand(1, 10 + extra);
      coeff = a; add = -b; result = a * x - b;
    } else { // twoStepDiv
      var d = rand(2, 5);
      var xMinD = tier >= 5 ? -5 - extra : 1;
      x = d * rand(xMinD, 10 + extra);
      b = rand(1, 10 + extra);
      var isAdd = Math.random() < 0.5;
      coeff = 1; denom = d;
      if (isAdd) {
        add = b; result = (x / d) + b;
      } else {
        add = -b; result = (x / d) - b;
      }
    }

    var par = (add !== 0 ? 1 : 0) + (coeff !== 1 ? 1 : 0) + (denom !== 1 ? 1 : 0);
    return { mode: 'numeric', coeff: coeff, denom: denom, add: add, result: result, x: x, par: par };
  }

  function generateFormulaProblem(){
    var f = formulaBank[rand(0, formulaBank.length - 1)];
    var par = (f.coeff ? 1 : 0) + (f.add ? 1 : 0);
    return {
      mode: 'formula',
      subject: f.subject,
      coeffToken: f.coeff,
      addToken: f.add,
      addSign: f.addSign,
      resultText: f.result,
      label: f.label,
      original: f.original,
      par: par
    };
  }

  function generateBalanceQuestProblem(roomInChapter){
    if (roomInChapter >= 6){
      var formulaChance = Math.min(1, (roomInChapter - 5) * 0.25);
      if (Math.random() < formulaChance) return generateFormulaProblem();
    }
    return generateNumericProblem(roomInChapter);
  }

  // ---------- New question styles: Identify (mcOnly) & Compute (directInput) ----------
  // Problem shapes consumed by 05-render:
  //   mcOnly:      { mode:'mcOnly',      prompt, choices:[a,b,c,d], correctIndex, par:0 }
  //   directInput: { mode:'directInput', prompt, answer, par:0 }
  //   comingSoon:  { mode:'comingSoon',  prompt(topic), par:0 }
  function _mc(prompt, correct, distractors){
    var choices = [String(correct)];
    for (var i = 0; i < distractors.length && choices.length < 4; i++){
      var d = String(distractors[i]);
      if (choices.indexOf(d) === -1) choices.push(d);
    }
    // Defensive pad — must never duplicate the answer (would create two "correct" taps).
    var guard = 0;
    while (choices.length < 4 && guard++ < 50){
      var r = String(rand(1, 99));
      if (choices.indexOf(r) === -1 && r !== String(correct)) choices.push(r);
    }
    shuffle(choices);
    return { mode: 'mcOnly', prompt: prompt, choices: choices, correctIndex: choices.indexOf(String(correct)), par: 0 };
  }
  function _num(prompt, answer){ return { mode: 'directInput', prompt: prompt, answer: answer, par: 0 }; }

  function _isPrime(n){ if (n < 2) return false; for (var i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; }
  function _hcf(a, b){ return gcd(a, b); }

  // World I · Numbers — one small generator per arena (keyed by arena number).
  var ARENA_GENS = {
    1: function(){ var set = []; while (set.length < 4){ var v = rand(-9, 9); if (set.indexOf(v) === -1) set.push(v); } var mx = Math.max.apply(null, set); return _mc('Which number is the LARGEST?', mx, set.filter(function(x){ return x !== mx; })); },
    2: function(){ var a = rand(-9, 9), b = rand(-9, 9); var s = a + b; return _mc('What is ' + fmt(a) + ' + ' + fmt(b) + ' ?', s, [s + 1, s - 1, a - b]); },
    3: function(){ var a = rand(-9, 9), b = rand(1, 9); var s = a - (-b); return _mc('What is ' + fmt(a) + ' − (' + fmt(-b) + ') ?', s, [a - b, s + 2, s - 2]); },
    4: function(){ var a = rand(-6, 6), b = rand(-6, 6); while (a === 0 || b === 0){ a = rand(-6, 6); b = rand(-6, 6); } var p = a * b; return _mc('What is (' + fmt(a) + ') × (' + fmt(b) + ') ?', p, [-p, p + a, p - b]); },
    8: function(){ var primes = [2,3,5,7,11,13,17,19,23,29,31,37]; var comps = [4,6,8,9,10,12,14,15,16,18,20,21,25,27]; var pr = primes[rand(0, primes.length - 1)]; var ds = shuffle(comps.slice()).slice(0, 3); return _mc('Which of these is a PRIME number?', pr, ds); },
    9: function(){ var base = [12,18,20,24,30,36]; var n = base[rand(0, base.length - 1)]; var facs = []; for (var i = 2; i < n; i++) if (n % i === 0) facs.push(i); var f = facs[rand(0, facs.length - 1)]; var non = []; for (var j = 2; j < n; j++) if (n % j !== 0) non.push(j); shuffle(non); return _mc('Which number is a FACTOR of ' + n + ' ?', f, non.slice(0, 3)); },
    10: function(){ var b = rand(3, 9), k = rand(3, 6); return _num('What is the ' + k + (k === 3 ? 'rd' : 'th') + ' multiple of ' + b + ' ?', b * k); },
    12: function(){ var g = rand(2, 9), m = rand(2, 6), n = rand(2, 6); while (gcd(m, n) !== 1){ m = rand(2, 6); n = rand(2, 6); } return _num('What is the Highest Common Factor of ' + (g * m) + ' and ' + (g * n) + ' ?', g); },
    14: function(){ var b = rand(2, 5), e = rand(2, 4); return _num('What is ' + b + '^' + e + ' ?', Math.pow(b, e)); },
    15: function(){ var b = rand(2, 6), x = rand(2, 5), y = rand(2, 5); return _num(b + '^' + x + ' × ' + b + '^' + y + ' = ' + b + '^?  (find the power)', x + y); },
    16: function(){ var b = rand(2, 6), x = rand(5, 9), y = rand(1, 4); return _num(b + '^' + x + ' ÷ ' + b + '^' + y + ' = ' + b + '^?  (find the power)', x - y); },
    17: function(){ var b = rand(2, 5), x = rand(2, 4), y = rand(2, 3); return _num('(' + b + '^' + x + ')^' + y + ' = ' + b + '^?  (find the power)', x * y); },
    18: function(){ var b = rand(2, 9); return _mc('Zero index law:  ' + b + '^0 = ?', 1, [0, b, -1]); },
    20: function(){ var r = rand(2, 12); return _num('What is √' + (r * r) + ' ?', r); },
    22: function(){ var d = rand(2, 9), z = rand(3, 6); var num = d * Math.pow(10, z); var correct = d + ' × 10^' + z; return _mc('Write ' + num.toLocaleString() + ' in standard form.', correct, [d + ' × 10^' + (z + 1), d + ' × 10^' + (z - 1), (d * 10) + ' × 10^' + z]); },
    23: function(){ var d = rand(2, 9), z = rand(2, 4); var correct = d + ' × 10^−' + z; return _mc('Write 0.' + (new Array(z).join('0')) + d + ' in standard form.', correct, [d + ' × 10^' + z, d + ' × 10^−' + (z + 1), d + ' × 10^−' + (z - 1)]); }
  };

  // World III basic-linear arenas (47–54) reuse the built Balance Quest generator.
  (function(){ for (var n = 47; n <= 54; n++){ (function(nn){ ARENA_GENS[nn] = function(){ return generateBalanceQuestProblem(nn - 46); }; })(n); } })();

  // Display convention: a coefficient of 1 is implicit — render "1x" as "x", "x² + 1x" as "x² + x",
  // "−1x" as "−x". Leaves "21x", "10x" and a standalone constant "1" (e.g. "x + 1") untouched.
  function _stripUnitCoef(s){
    return (typeof s === 'string') ? s.replace(/(^|[^0-9.])1(?=[a-zA-Z])/g, '$1') : s;
  }
  function _sanitizeProblem(p){
    if (p && typeof p === 'object'){
      if (typeof p.prompt === 'string') p.prompt = _stripUnitCoef(p.prompt);
      if (Array.isArray(p.choices)) p.choices = p.choices.map(_stripUnitCoef);
    }
    return p;
  }

  // Serve ONE Bible question for a phase arena, built from QUESTION_TEMPLATES. Picks a
  // template not seen recently (per phase), so a 10-question run rarely repeats. The
  // authored example/answer/distractors are used verbatim (NOT run through _sanitizeProblem,
  // which is tuned for the numeric generators). True/False & 2-option items keep exactly
  // their authored options (no numeric padding).
  var _bibleRecent = {};

  // Some batch-generated phases (P021-P054) shipped placeholder "distractor recipe" text
  // ("uses a nearby rule", etc.) instead of real wrong answers, which makes the real answer
  // trivially identifiable. Detect those and substitute genuine, well-formatted, topic-matched
  // wrong answers borrowed from SIBLING templates in the same phase.
  var _GENERIC_DISTRACTORS = { 'uses a nearby rule':1, 'ignores the stated condition':1,
    'makes a sign or order error':1, 'stops after the first step':1 };
  function _cleanChoice(s){
    s = String(s == null ? '' : s).replace(/\\"/g, '"').trim();
    while (s.length >= 2 && s.charAt(0) === '"' && s.charAt(s.length - 1) === '"') s = s.slice(1, -1).trim();
    return s;
  }
  function _isGenericDistractor(d){
    return !!_GENERIC_DISTRACTORS[_cleanChoice(d).toLowerCase().replace(/[.]+$/, '').trim()];
  }
  function _answerShape(s){
    if (/^(yes|no|true|false)\b/i.test(s)) return 'bool';
    if (/^-?\d+(\.\d+)?$/.test(s)) return 'num';
    if (/(pi|theta|sqrt|\/)/i.test(s)) return 'sym';
    return 'expr';
  }
  function _normChoice(s){ return _cleanChoice(s).replace(/\s+/g, ' ').trim(); }

  // "… X or Y?" questions: the ONLY sensible choices are the two things being compared.
  // ("Which is narrower: y=x^2 or y=4x^2?" -> [y=x^2, y=4x^2]; "cross or bounce" -> [cross, bounce];
  //  "greater maximum: A(x)=… or B(x)=…?" -> [A(x)=…, B(x)=…], matched to an answer of "A"/"B".)
  function _orChoices(prompt, ans){
    var seg = String(prompt || '');
    var q = seg.indexOf('?'); if (q >= 0) seg = seg.slice(0, q);
    var idx = seg.lastIndexOf(' or ');
    if (idx < 0) return null;
    var left = seg.slice(0, idx).trim();
    var right = seg.slice(idx + 4).trim();
    // Right disjunct: drop a trailing context clause ("… at x=-2", "… when t=3",
    // "…, and what is its value").
    right = right.split(',')[0].replace(/\s+(?:at|when|for|if|given|near)\s+.*$/, '').trim();
    // Left disjunct: the last word if it's a plain word ("cross"), else the chunk after the
    // last ":" or "," ("Which is narrower: y=x^2").
    var toks = left.split(/\s+/);
    var lastTok = toks[toks.length - 1] || '';
    var ldis;
    if (/^[A-Za-z-]+$/.test(lastTok)) ldis = lastTok;
    else {
      var cut = Math.max(left.lastIndexOf(':'), left.lastIndexOf(','));
      ldis = (cut >= 0 ? left.slice(cut + 1) : lastTok).trim();
    }
    if (!ldis || !right || ldis.length > 42 || right.length > 42) return null;
    var A = _normChoice(ldis), B = _normChoice(right);
    var al = A.toLowerCase(), bl = B.toLowerCase(), nl = _normChoice(ans).toLowerCase();
    function hit(d){ return !!nl && (d === nl || d.indexOf(nl) === 0 || nl.indexOf(d) === 0); }
    var am = hit(al), bm = hit(bl);
    if (!am && !bm){
      // "A(x)=…" / "B(x)=…" compared against an answer that just says "A" (or "A; because …").
      var fa = al.match(/^([a-z])\s*\(/), fb = bl.match(/^([a-z])\s*\(/), fn = nl.match(/^([a-z])\b/);
      if (fa && fb && fn && fa[1] !== fb[1]){ am = (fa[1] === fn[1]); bm = (fb[1] === fn[1]); }
    }
    if (am === bm) return null;                 // neither (or both) matched — don't guess
    return { correct: am ? A : B, wrong: [am ? B : A] };
  }

  // Believable wrong answers derived from the RIGHT answer's own structure
  // (numbers -> near misses & sign flips; "x=10" -> x=9/x=11/x=-10; "(a,b)" -> swaps/sign flips).
  function _perturbDistractors(ans){
    var s = _normChoice(ans), m, out;
    if (/^-?\d+$/.test(s)){
      var n = parseInt(s, 10);
      out = [n + 1, n - 1, (n === 0 ? 2 : -n), n + 2];
    } else if ((m = s.match(/^([A-Za-z])\s*=\s*(-?\d+)$/))){
      var v = m[1], k = parseInt(m[2], 10);
      out = [v + '=' + (k + 1), v + '=' + (k - 1), v + '=' + (k === 0 ? 2 : -k)];
    } else if ((m = s.match(/^\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/))){
      var a = +m[1], b = +m[2];
      out = ['(' + b + ',' + a + ')', '(' + (-a) + ',' + b + ')', '(' + a + ',' + (-b) + ')'];
    } else return null;
    out = out.map(String).filter(function(d, i, arr){ return d !== s && arr.indexOf(d) === i; });
    return out.length >= 2 ? out.slice(0, 4) : null;
  }

  // Same-format near-misses for expression answers: toggle each sign (the classic mistakes —
  // "(x+4)(x-3)" -> "(x-4)(x+3)"; "x=3 or x=-1/2" -> "x=-3 or x=-1/2") and bump the first/last
  // number. The wrong answers LOOK like the right one, so the format never gives it away.
  function _exprVariants(ans){
    var s = _normChoice(ans);
    if (!s || s.length > 60 || !/\d/.test(s)) return null;
    var out = [], i, c;
    var flips = 0;
    for (i = 0; i < s.length && flips < 3; i++){
      c = s.charAt(i);
      // flip "+45t", "- 3", "x+2" … (sign may be followed by a space: "20 + 45t")
      if ((c === '+' || c === '-') && /^\s?[0-9a-zA-Z(]/.test(s.slice(i + 1, i + 3))){
        var v = s.slice(0, i) + (c === '+' ? '-' : '+') + s.slice(i + 1);
        v = v.replace(/([=(,<\s])\+(?=\d)/g, '$1').replace(/^\+/, '');   // "x=+3" -> "x=3"
        out.push(v); flips++;
      }
    }
    var nums = s.match(/\d+/g);
    if (nums && nums.length){
      out.push(s.replace(/\d+/, function(n){ return String(+n + 1); }));
      if (nums.length > 1){
        var last = nums[nums.length - 1], li = s.lastIndexOf(last);
        out.push(s.slice(0, li) + String(+last + 1) + s.slice(li + last.length));
        // swap the first two DISTINCT numbers — the classic "used the numbers backwards" mistake
        // ("20 + 45t = 155" -> "45 + 20t = 155")
        var a = nums[0], b = nums.find(function(x){ return x !== nums[0]; });
        if (b){
          var ia = s.indexOf(a), ib = s.indexOf(b, ia + a.length);
          if (ia >= 0 && ib > ia){
            out.push(s.slice(0, ia) + b + s.slice(ia + a.length, ib) + a + s.slice(ib + b.length));
          }
        }
      }
    }
    out = out.filter(function(d, ix, arr){ return d !== s && arr.indexOf(d) === ix; });
    return out.length >= 2 ? out.slice(0, 4) : null;
  }

  // Parse interval notation out of an answer string: "[-4,1) union [3,5) union (5,infinity)"
  // -> [{lo,hi,loC,hiC}...] plus {5}-style singletons. Used to DRAW the described graph.
  function _parseIntervals(s){
    s = String(s || '').toLowerCase()
      .replace(/∞|infinity|\binf\b/g, 'inf')
      .replace(/union|∪/g, ' U ');
    var out = [], m;
    var re = /([\[\(])\s*(-?\d+(?:\.\d+)?|-inf)\s*,\s*(-?\d+(?:\.\d+)?|inf)\s*([\]\)])/g;
    while ((m = re.exec(s))){
      out.push({ lo: m[2] === '-inf' ? -Infinity : parseFloat(m[2]),
                 hi: m[3] === 'inf' ? Infinity : parseFloat(m[3]),
                 loC: m[1] === '[', hiC: m[4] === ']' });
    }
    var re2 = /\{\s*(-?\d+(?:\.\d+)?)\s*\}/g;
    while ((m = re2.exec(s))) out.push({ lo: parseFloat(m[1]), hi: parseFloat(m[1]), loC: true, hiC: true, point: true });
    return out;
  }

  // Shape signature of a choice: does it look like "equation; solution", a single equation,
  // or a plain value? If the RIGHT answer's shape is unique among the choices, a kid can pick
  // it by FORMAT alone without doing any maths.
  function _choiceSig(s){
    s = _normChoice(s);
    var eqs = (s.match(/=/g) || []).length;
    return (s.indexOf(';') >= 0 ? 'semi' : '') + '|' + (eqs >= 2 ? 'multi' : (eqs === 1 ? 'eq' : 'plain'));
  }
  function _formatGiveaway(ans, ds){
    var a = _choiceSig(ans);
    if (a === '|plain' || a === '|eq') return false;      // common shapes — no giveaway
    return ds.every(function(d){ return _choiceSig(d) !== a; });
  }

  // Last resort: real answers from sibling templates of the same phase, same shape.
  function _siblingDistractors(phaseId, ans){
    var want = _answerShape(ans), same = [], other = [], seen = {};
    seen[ans] = 1;
    (QUESTION_TEMPLATES[phaseId] || []).forEach(function(t){
      var a = _cleanChoice(t.answer);
      if (!a || seen[a]) return;
      seen[a] = 1;
      (_answerShape(a) === want ? same : other).push(a);
    });
    shuffle(same); shuffle(other);
    var pool = same.concat(other);   // prefer same-shape wrong answers, then fill from the rest
    return pool.slice(0, 4);
  }

  // Build the served problem for ONE template. Split out from bibleProblem so the QA audit
  // can run every template deterministically.
  function _bibleBuildFromTemplate(t, phaseId){
    var ans = _cleanChoice(t.answer);
    var raw = (t.distractors || []);
    var genericCount = raw.filter(_isGenericDistractor).length;
    var ds, via = 'authored';
    if (genericCount >= 2) {
      // Placeholder "recipe" distractors -> derive real choices from the question itself.
      var orc = _orChoices(t.example, ans);
      if (orc){ ans = orc.correct; ds = orc.wrong; via = 'or'; }
      else {
        ds = _perturbDistractors(ans);
        if (ds){ via = 'perturb'; }
        else {
          ds = _exprVariants(ans);
          if (ds){ via = 'variant'; }
          else { ds = _siblingDistractors(phaseId, ans); via = 'sibling'; }
        }
      }
    } else {
      ds = raw.map(_cleanChoice).filter(function(d){ return d && d !== ans; });
      // Even AUTHORED distractors can leak the answer by shape (e.g. the only choice that reads
      // "20 + 45t = 155; t = 3 hours." among bare "t = …" options). Rebuild same-format
      // near-misses from the answer so every choice looks alike.
      if (ds.length >= 1 && _formatGiveaway(ans, ds)){
        var fv = _exprVariants(ans);
        if (fv && fv.length >= 2){ ds = fv; via = 'format-fix'; }
      }
    }
    var meta = { templateId: t.templateId, phaseId: phaseId, questionType: t.questionType,
      hintSequenceId: t.hintSequenceId, tutorialId: t.tutorialId, socraticId: t.socraticId,
      explanation: t.explanation, distractorVia: via };
    // "A graph has a closed point at x=-4 …" questions describe a picture in words — draw it!
    // The correct answer IS the interval notation, so we parse it and render the curve below
    // the prompt (31-graph.js buildIntervalIllu). Reading the picture is the skill being tested.
    var exs = String(t.example || '');
    if (/graph/i.test(String(t.questionType || '') + ' ' + exs) && /domain|range/i.test(exs)){
      var iv = _parseIntervals(ans);
      if (iv.length) meta.graphIllu = { axis: /range/i.test(exs) ? 'y' : 'x', intervals: iv };
    }
    if (ds.length >= 1 && ans){
      var choices = [ans].concat(ds);
      choices = choices.filter(function(v, i){ return choices.indexOf(v) === i; }).slice(0, 5);
      shuffle(choices);
      var mc = { mode: 'mcOnly', prompt: t.example, choices: choices, correctIndex: choices.indexOf(ans), par: 0 };
      for (var k in meta) mc[k] = meta[k];
      return mc;
    }
    var di = { mode: 'directInput', prompt: t.example, answer: ans, par: 0 };
    for (var k2 in meta) di[k2] = meta[k2];
    return di;
  }

  function bibleProblem(arena){
    var tpls = QUESTION_TEMPLATES[arena.phaseId];
    if (!tpls || !tpls.length) return { mode: 'comingSoon', prompt: arena.topic, par: 0 };
    var recent = _bibleRecent[arena.phaseId] || (_bibleRecent[arena.phaseId] = []);
    var pool = tpls.filter(function(t){ return recent.indexOf(t.templateId) === -1; });
    if (!pool.length) { recent.length = 0; pool = tpls; }
    var t = pool[rand(0, pool.length - 1)];
    recent.push(t.templateId); if (recent.length > 12) recent.shift();
    return _bibleBuildFromTemplate(t, arena.phaseId);
  }

  function generateProblem(level){
    var arena = (typeof getArena === 'function') ? getArena(level) : null;
    if (!arena) {                                   // legacy safety (no curriculum): old behaviour
      var loc = getChapterForLevel(level);
      return loc.chapter.generator ? loc.chapter.generator(loc.roomInChapter, level, loc.chapter)
                                   : generateBalanceQuestProblem(level);
    }
    // Native Equation Battle (balance solver) for the linear-solving arenas — infinite variety.
    if (arena.mechanic === 'numeric' || arena.mechanic === 'formula' || arena.mechanic === 'bracket') {
      try { return _sanitizeProblem(generateBalanceQuestProblem(1 + rand(0, 5))); } catch (e) {}
    }
    // Bible-authored arenas (P001..P059) → served from the registry.
    if (arena.phaseId && typeof QUESTION_TEMPLATES !== 'undefined' && QUESTION_TEMPLATES[arena.phaseId]) {
      try { var bp = bibleProblem(arena); if (bp) return bp; } catch (e) {}
    }
    // Pre-algebra warm-ups reuse an existing generator (arena.gen), else fall back by arena number.
    var g = arena.gen || arena.n;
    if (ARENA_GENS[g]) {
      try { return _sanitizeProblem(ARENA_GENS[g](arena)); }
      catch (e) { return { mode: 'comingSoon', prompt: arena.topic, par: 0 }; }
    }
    return { mode: 'comingSoon', prompt: arena.topic, par: 0 };
  }

  // ---------- Hints ----------

  function getHintNumeric(eq){
    if (eq.add !== 0){
      return eq.add > 0
        ? ('Right now the x-term has +' + eq.add + ' beside it. To remove +' + eq.add + ', use the opposite operation: minus. Subtract ' + eq.add + ' from both sides.')
        : ('Right now the x-term has \u2212' + Math.abs(eq.add) + ' beside it. To remove \u2212' + Math.abs(eq.add) + ', use the opposite operation: plus. Add ' + Math.abs(eq.add) + ' to both sides.');
    }
    if (eq.denom && eq.denom !== 1) {
      return 'Right now the x-term is divided by ' + eq.denom + '. To undo division, use the opposite operation: multiply. Multiply both sides by ' + eq.denom + '.';
    }
    if (eq.coeff !== 1) return 'Right now x is being multiplied by ' + eq.coeff + '. To undo multiplication, use the opposite operation: divide. Divide both sides by ' + eq.coeff + '.';
    return 'This side already just says x!';
  }

  function getHintFormula(eq){
    if (eq.addToken){
      if (eq.addSign === 1) {
        return 'Right now the subject has +' + eq.addToken + ' beside it. To remove +' + eq.addToken + ', use the opposite operation: minus. Subtract ' + eq.addToken + ' from both sides.';
      }
      return 'Right now the subject has \u2212' + eq.addToken + ' beside it. To remove \u2212' + eq.addToken + ', use the opposite operation: plus. Add ' + eq.addToken + ' to both sides.';
    }
    if (eq.coeffToken) return 'Right now the subject is being multiplied by ' + eq.coeffToken + '. To undo multiplication, use the opposite operation: divide. Divide both sides by ' + eq.coeffToken + '.';
    return 'This side already just says ' + state.problem.subject + '!';
  }

  // ---------- Mode registry ----------
  // Each problem mode (state.mode) registers how to render/hint/answer itself, so new chapters
  // can add a new mode here instead of extending an if/else chain in every consumer. `controls`
  // drives updatePanelVisibility(): 'opInput' = number/letter input + op row, 'mcThenMorph' =
  // multiple-choice that morphs the problem into another mode on a correct pick (bracket's
  // existing expand-then-become-numeric pattern). numeric/bracket/formula below are a direct,
  // behavior-preserving refactor of the pre-registry if/else logic — not new behavior.
  var modeRegistry = {
    numeric: {
      controls: 'opInput',
      hint: function(){ return getHintNumeric(state.eq); },
      caption: null,
      renderLeft: function(){ return formatSideHTML(state.eq); },
      renderRight: function(){ return `<span class="term">${fmt(state.eq.result)}</span>`; },
      describeAnswer: function(){ return 'x = ' + fmt(state.eq.result); }
    },
    bracket: {
      controls: 'mcThenMorph',
      hint: function(){ return 'The number outside the brackets means multiply everything inside by ' + state.bracketEq.coeffA + '. So multiply both x and the number beside x by ' + state.bracketEq.coeffA + '.'; },
      caption: null,
      renderLeft: function(){ return formatBracketHTML(state.bracketEq.coeffA, state.bracketEq.innerK); },
      renderRight: function(){ return `<span class="term">${fmt(state.bracketEq.rhs)}</span>`; },
      describeAnswer: null // bracket always morphs into numeric before being solved
    },
    formula: {
      controls: 'opInput',
      hint: function(){ return getHintFormula(state.eq); },
      caption: function(){ updateFormulaCaption(); }, // lazy: updateFormulaCaption lives in render.js (loads after logic.js)
      renderLeft: function(){ return formatFormulaSideHTML(state.eq, state.problem.subject); },
      renderRight: function(){ return exprToHTML(state.eq.resultText); },
      describeAnswer: function(){ return state.problem.subject + ' = ' + exprToText(state.eq.resultText); }
    },
    // NEW · Identify — tap one of four choices; a correct tap ends the arena.
    mcOnly: {
      controls: 'mcOnly',
      hint: function(){ return 'Read the question and tap the answer you think is correct.'; },
      renderLeft: function(){ return ''; }, renderRight: function(){ return ''; },
      describeAnswer: function(){ return state.problem.choices[state.problem.correctIndex]; }
    },
    // NEW · Compute — type one positive integer and Submit.
    directInput: {
      controls: 'directInput',
      hint: function(){ return 'Work out the value, type it in, then press Submit.'; },
      renderLeft: function(){ return ''; }, renderRight: function(){ return ''; },
      describeAnswer: function(){ return '' + state.problem.answer; }
    },
    // NEW · Graph — interactive coordinate grid; tap a point, or two points on a line.
    graph: {
      controls: 'graph',
      hint: function(){ return (state.problem.graph && state.problem.graph.interactive === 'line')
        ? 'Tap two lattice points the line passes through.'
        : 'Tap the correct point on the grid.'; },
      renderLeft: function(){ return ''; }, renderRight: function(){ return ''; },
      describeAnswer: function(){ return (typeof describeGraphAnswer === 'function') ? describeGraphAnswer() : ''; }
    },
    // Placeholder for arenas whose generator isn't authored yet — never a wrong question.
    comingSoon: {
      controls: 'comingSoon',
      hint: function(){ return 'This planet’s puzzles are being forged — explore its astronomy for now!'; },
      renderLeft: function(){ return ''; }, renderRight: function(){ return ''; },
      describeAnswer: function(){ return ''; }
    }
  };

  function getHint(){
    return modeRegistry[state.mode].hint();
  }

  // 6-level progressive hint ladder. Bible questions carry a hintSequenceId that resolves to
  // HINT_REGISTRY[id] = [nudge, concept, focus, guided step, nearly-complete, full solution].
  // Native Equation-Battle / fallback modes have no ladder, so we serve one live, state-aware
  // hint (which updates as the equation morphs) as a single-rung "ladder".
  function getHintLadder(){
    var p = state.problem;
    if (p && p.hintSequenceId && typeof HINT_REGISTRY !== 'undefined' && HINT_REGISTRY[p.hintSequenceId]) {
      var arr = HINT_REGISTRY[p.hintSequenceId];
      if (arr && arr.length) return arr;
    }
    try { return [ modeRegistry[state.mode].hint() ]; }
    catch (e) { return ['Read the question carefully, then choose your answer.']; }
  }

  // ---------- Move application ----------

  function gcd(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

  function applyOp(eq, op, n){
    if (!Number.isInteger(n) || n <= 0){
      return { ok: false, message: 'Enter a positive whole number.' };
    }
    var coeff = eq.coeff, denom = eq.denom || 1, add = eq.add, result = eq.result;
    if (op === '+'){
      return { ok: true, next: { coeff: coeff, denom: denom, add: add + n, result: result + n } };
    }
    if (op === '-'){
      return { ok: true, next: { coeff: coeff, denom: denom, add: add - n, result: result - n } };
    }
    if (op === '*'){
      if (n === 1) return { ok: false, message: 'Multiplying by 1 won\u2019t change anything.' };
      var nextCoeff = coeff;
      var nextDenom = denom;
      if (nextDenom % n === 0) {
        nextDenom = nextDenom / n;
      } else {
        nextCoeff = nextCoeff * n;
      }
      var g = gcd(nextCoeff, nextDenom);
      return { ok: true, next: { coeff: nextCoeff / g, denom: nextDenom / g, add: add * n, result: result * n } };
    }
    if (op === '/'){
      if (n === 1) return { ok: false, message: 'Dividing by 1 won\u2019t change anything.' };
      if (add % n !== 0 || result % n !== 0){
        return { ok: false, message: 'That won\u2019t divide evenly \u2014 try another number.' };
      }
      var nextCoeff = coeff;
      var nextDenom = denom;
      if (nextCoeff % n === 0) {
        nextCoeff = nextCoeff / n;
      } else {
        nextDenom = nextDenom * n;
      }
      var g = gcd(nextCoeff, nextDenom);
      return { ok: true, next: { coeff: nextCoeff / g, denom: nextDenom / g, add: add / n, result: result / n } };
    }
  }

  // Letter comparison is CASE-INSENSITIVE: formula tokens mix cases (Ohm's law's R, force's F,
  // motion's t/u) and players type either case. Bug history: the input path lowercased the typed
  // letter while these checks compared with `!==`, so "V = IR \u2192 divide by R" could NEVER match.
  function sameToken(a, b){
    return typeof a === 'string' && typeof b === 'string' && a.toLowerCase() === b.toLowerCase();
  }

  function applyFormulaOp(eq, op, token){
    if (eq.addToken){
      var neededOp = eq.addSign === 1 ? '-' : '+';
      if (op !== neededOp){
        return { ok: false, message: 'First deal with the ' + (eq.addSign === 1 ? '+' : '\u2212') + eq.addToken + ' term \u2014 use the opposite operation.' };
      }
      if (!sameToken(token, eq.addToken)){
        return { ok: false, message: 'That\u2019s not the term currently ' + (eq.addSign === 1 ? 'added' : 'subtracted') + ' here \u2014 look for ' + eq.addToken + '.' };
      }
      var newResult = { op: op, left: eq.resultText, right: eq.addToken };
      return { ok: true, next: { coeffToken: eq.coeffToken, addToken: null, addSign: 1, resultText: newResult } };
    }
    if (eq.coeffToken){
      if (op !== '/'){
        return { ok: false, message: 'Try dividing both sides by ' + eq.coeffToken + '.' };
      }
      if (!sameToken(token, eq.coeffToken)){
        return { ok: false, message: 'That\u2019s not the coefficient here \u2014 look for ' + eq.coeffToken + '.' };
      }
      var newResult2 = { op: '/', left: eq.resultText, right: eq.coeffToken };
      return { ok: true, next: { coeffToken: null, addToken: null, addSign: 1, resultText: newResult2 } };
    }
    return { ok: false, message: 'Already solved!' };
  }

  function solveFully(eq){
    var cur = { coeffToken: eq.coeffToken, addToken: eq.addToken, addSign: eq.addSign, resultText: eq.resultText };
    while (cur.addToken || cur.coeffToken){
      if (cur.addToken){
        var op = cur.addSign === 1 ? '-' : '+';
        cur.resultText = { op: op, left: cur.resultText, right: cur.addToken };
        cur.addToken = null;
      } else {
        cur.resultText = { op: '/', left: cur.resultText, right: cur.coeffToken };
        cur.coeffToken = null;
      }
    }
    return cur.resultText;
  }

