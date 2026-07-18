  // ============================================================================
  // Arena problem generators — the authored question for every planet.
  // Adds entries to the global ARENA_GENS (started in 04-logic.js) for the arenas
  // 04-logic didn't cover. Each generator returns a problem in one of the five
  // shapes the render layer understands (mcOnly / directInput / numeric / formula).
  // Correctness is by construction: the correct answer is computed, and distractors
  // are distinct wrong values/strings. Reuses global helpers _mc, _num, rand,
  // shuffle, gcd, generateBalanceQuestProblem (all from 04-logic.js).
  //
  // At the end, a loop stamps each arena's ACTUAL question style back onto
  // CURRICULUM[n].mechanic so the Star Atlas labels always match reality.
  // ============================================================================
  (function(){
    if (typeof ARENA_GENS === 'undefined') return;
    var G = ARENA_GENS;
    function mc(prompt, correct, distractors){ return _mc(prompt, correct, distractors); }
    function num(prompt, answer){ return _num(prompt, answer); }
    function ri(lo, hi){ return rand(lo, hi); }
    function coprime(a, b){ return gcd(a, b) === 1; }

    // ---- Illustrative graph specs (see 31-graph.js buildGraphSVG). Attach to a problem's `.graph`.
    // These are for illustration only — the question already states its data in text — so they never
    // change the answer. Coordinates match the question exactly.
    // Right triangle with legs a (horizontal) and b (vertical) at the origin.
    function gTriangle(a, b){
      var m = Math.max(a, b);
      return { xmin: -1, xmax: m + 1, ymin: -1, ymax: m + 1,
        polygons: [{ pts: [[0,0],[a,0],[0,b]], right: 0 }],
        points: [{x:0,y:0,label:'O'},{x:a,y:0},{x:0,y:b}] };
    }
    // Circle x² + y² = r² centred at the origin (a conic illustration).
    function gCircle(r, extraPts){
      var g = { xmin: -(r+1), xmax: r+1, ymin: -(r+1), ymax: r+1, circle: { cx:0, cy:0, r:r } };
      if (extraPts) g.points = extraPts;
      return g;
    }
    // Parabola y = a·x² + b·x + c, auto-windowed around the vertex (and real roots, if asked).
    function gParab(a, b, c, opt){
      opt = opt || {};
      var vx = -b / (2*a), vy = c - b*b/(4*a);
      var xmin = (opt.xmin != null) ? opt.xmin : Math.floor(vx - 4);
      var xmax = (opt.xmax != null) ? opt.xmax : Math.ceil(vx + 4);
      var ymin = (opt.ymin != null) ? opt.ymin : Math.max(-8, Math.min(-2, Math.floor(vy) - 1));
      var ymax = (opt.ymax != null) ? opt.ymax : Math.min(14, Math.max(8, Math.ceil(vy) + 9));
      var g = { xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, parabola: { a:a, b:b, c:c }, points: [] };
      if (opt.vertex) g.points.push({ x: vx, y: vy, label: opt.vertexLabel || 'V' });
      if (opt.roots){
        var d = b*b - 4*a*c;
        if (d >= 0){ var s = Math.sqrt(d); [(-b - s)/(2*a), (-b + s)/(2*a)].forEach(function(rt){
          if (Math.abs(rt - Math.round(rt)) < 1e-6) g.points.push({ x: Math.round(rt), y: 0 });
        }); }
      }
      return g;
    }
    // Ellipse x²/A² + y²/B² = 1 centred at the origin (a conic illustration).
    function gEllipse(rx, ry){
      var m = Math.max(rx, ry);
      return { xmin: -(m+1), xmax: m+1, ymin: -(m+1), ymax: m+1, ellipse: { cx:0, cy:0, rx:rx, ry:ry } };
    }
    // Attach a graph to a problem and return the problem (keeps generators terse).
    function withGraph(p, graph){ if (p && graph) p.graph = graph; return p; }

    // ---- World I · Numbers (the 8 arenas 04-logic left for here) ----
    G[5] = function(){ return generateBalanceQuestProblem(5); }; // real 1-/2-step eqns w/ negatives
    G[6] = function(){ var a = ri(2,9), b = ri(2,9), c = ri(2,6); return mc('In ' + a + ' + ' + b + ' × ' + c + ', which do you work out FIRST?', b + ' × ' + c, [a + ' + ' + b, a + ' × ' + c, b + ' + ' + c]); };
    G[7] = function(){ var a = ri(1,5), b = ri(1,5); return num('Work out ( ' + a + ' + ' + b + ' )²', (a + b) * (a + b)); };
    G[11] = function(){ var opts = [[12,'2 × 2 × 3',['2 × 6','3 × 4','2 × 2 × 2']],[18,'2 × 3 × 3',['2 × 9','3 × 6','2 × 2 × 3']],[20,'2 × 2 × 5',['4 × 5','2 × 10','2 × 5 × 5']],[30,'2 × 3 × 5',['5 × 6','3 × 10','2 × 2 × 5']],[24,'2 × 2 × 2 × 3',['4 × 6','2 × 12','2 × 2 × 6']]]; var o = opts[ri(0, opts.length - 1)]; return mc('What is the prime factorization of ' + o[0] + '?', o[1], o[2]); };
    G[13] = function(){ var a = ri(2,6), b = ri(2,6); while (a === b) b = ri(2,6); var l = a * b / gcd(a, b); return num('One light flashes every ' + a + ' seconds, another every ' + b + ' seconds. After how many seconds do they flash together?', l); };
    G[19] = function(){ var base = ri(2,4), x = ri(3,6), y = ri(2,4), z = ri(1,2); return num(base + '^' + x + ' × ' + base + '^' + y + ' ÷ ' + base + '^' + z + ' = ' + base + '^?  (find the power)', x + y - z); };
    G[21] = function(){ var t = [[12,'2√3'],[8,'2√2'],[18,'3√2'],[20,'2√5'],[27,'3√3'],[50,'5√2'],[45,'3√5'],[75,'5√3']]; var o = t[ri(0, t.length - 1)]; var wrong = t.filter(function(w){ return w[1] !== o[1]; }); shuffle(wrong); return mc('Simplify √' + o[0], o[1], [wrong[0][1], wrong[1][1], wrong[2][1]]); };
    G[24] = function(){ var a = ri(2,5), b = ri(2,5), x = ri(1,3), y = ri(1,3); return mc('( ' + a + ' × 10^' + x + ' ) × ( ' + b + ' × 10^' + y + ' ) = ?', (a * b) + ' × 10^' + (x + y), [(a * b) + ' × 10^' + (x * y), (a + b) + ' × 10^' + (x + y), (a * b) + ' × 10^' + (x + y + 1)]); };

    // ---- World II · Expressions (25–46) ----
    G[25] = function(){ var k = ri(2,9); return mc("Write '" + k + " more than a number n' in algebra.", 'n + ' + k, ['n − ' + k, k + 'n', k + ' − n']); };
    G[26] = function(){ var k = ri(2,6); return mc("Write '" + k + " groups of a number n' in algebra.", k + 'n', ['n + ' + k, 'n − ' + k, 'n ÷ ' + k]); };
    G[27] = function(){ var r = ri(2,9), f = ri(2,9); return mc('A taxi costs $' + r + ' per km plus $' + f + '. Cost for k km?', r + 'k + ' + f, [f + 'k + ' + r, r + 'k − ' + f, (r + f) + 'k']); };
    G[28] = function(){ var k = ri(2,9); return mc("Write 'a number n shared equally among " + k + "' in algebra.", 'n ÷ ' + k, [k + ' ÷ n', k + 'n', 'n − ' + k]); };
    G[29] = function(){ var c = ri(2,6), n = ri(2,9); return num('If n = ' + n + ', what is ' + c + 'n?', c * n); };
    G[30] = function(){ var a = ri(2,5), b = ri(1,9), x = ri(2,9); return num('If x = ' + x + ', what is ' + a + 'x + ' + b + '?', a * x + b); };
    G[31] = function(){ var a = ri(2,5), b = ri(1,9), n = ri(2,8); return num('Multiply a number by ' + a + ', then add ' + b + '. If the number is ' + n + ', the result is?', a * n + b); };
    G[32] = function(){ var a = ri(2,6), b = ri(2,6); return mc('Simplify ' + a + 'a + ' + b + 'a', (a + b) + 'a', [(a * b) + 'a', (a + b) + 'a²', '' + a + b + 'a']); };
    G[33] = function(){ var a = ri(2,5), b = ri(2,5), c = ri(1,9); return mc('Simplify ' + a + 'x + ' + c + ' + ' + b + 'x', (a + b) + 'x + ' + c, [(a + b + c) + 'x', (a + b) + 'x', (a + b) + 'x + ' + (c + 1)]); };
    G[34] = function(){ var a = ri(2,4), b = ri(2,4), c = ri(1,3); return mc('Simplify ' + a + 'a + ' + b + 'b + ' + c + 'a', (a + c) + 'a + ' + b + 'b', [(a + b + c) + 'ab', (a + b) + 'a + ' + c + 'b', (a + c) + 'a + ' + (b + 1) + 'b']); };
    G[35] = function(){ var a = ri(2,4), b = ri(2,4), x = ri(2,6); return num('Simplify ' + a + 'x + ' + b + 'x, then put x = ' + x + '.', (a + b) * x); };
    G[36] = function(){ var a = ri(2,5), b = ri(1,6); return mc('Expand ' + a + '(x + ' + b + ')', a + 'x + ' + (a * b), [a + 'x + ' + b, 'x + ' + (a * b), a + 'x − ' + (a * b)]); };
    G[37] = function(){ var a = ri(2,4), c = ri(2,4), b = ri(2,6); return mc('Expand ' + a + '(' + c + 'x − ' + b + ')', (a * c) + 'x − ' + (a * b), [(a * c) + 'x − ' + b, (a * c) + 'x + ' + (a * b), (a + c) + 'x − ' + (a * b)]); };
    G[38] = function(){ var a = ri(2,4), b = ri(1,4), c = ri(2,4), d = ri(1,4); return mc('Expand and simplify ' + a + '(x + ' + b + ') + ' + c + '(x + ' + d + ')', (a + c) + 'x + ' + (a * b + c * d), [(a + c) + 'x + ' + (b + d), (a * c) + 'x + ' + (a * b + c * d), (a + c) + 'x + ' + (a * b + c * d + 1)]); };
    G[39] = function(){ var p = ri(1,6), q = ri(1,6); while (p + q === p * q) q = ri(1,6); return mc('Expand (x + ' + p + ')(x + ' + q + ')', 'x² + ' + (p + q) + 'x + ' + (p * q), ['x² + ' + (p * q) + 'x + ' + (p + q), 'x² + ' + (p * q), 'x² + ' + (p + q + 1) + 'x + ' + (p * q)]); };
    G[40] = function(){ var p = ri(3,7), q = ri(1,2); return mc('Expand (x + ' + p + ')(x − ' + q + ')', 'x² + ' + (p - q) + 'x − ' + (p * q), ['x² − ' + (p - q) + 'x − ' + (p * q), 'x² + ' + (p - q) + 'x + ' + (p * q), 'x² − ' + (p * q)]); };
    G[41] = function(){ var p = ri(3,8); return mc('Expand (x + ' + p + ')²', 'x² + ' + (2 * p) + 'x + ' + (p * p), ['x² + ' + (p * p), 'x² + ' + (2 * p) + 'x + ' + (2 * p), 'x² + ' + p + 'x + ' + (p * p)]); };
    G[42] = function(){ var a = ri(2,9); return mc('Make x the subject:  y = x + ' + a, 'x = y − ' + a, ['x = y + ' + a, 'x = ' + a + ' − y', 'x = ' + a + 'y']); };
    G[43] = function(){ var a = ri(2,9); return mc('Make x the subject:  y = ' + a + 'x', 'x = y ÷ ' + a, ['x = ' + a + 'y', 'x = y + ' + a, 'x = ' + a + ' ÷ y']); };
    G[44] = function(){ var a = ri(2,6), b = ri(1,9); return mc('Make x the subject:  y = ' + a + 'x + ' + b, 'x = (y − ' + b + ') ÷ ' + a, ['x = y ÷ ' + a + ' − ' + b, 'x = (y + ' + b + ') ÷ ' + a, 'x = y − ' + b + ' ÷ ' + a]); };
    G[45] = function(){ return mc('Make r the subject:  C = 2πr', 'r = C ÷ (2π)', ['r = 2πC', 'r = C − 2π', 'r = 2π ÷ C']); };
    G[46] = function(){ var a = ri(2,5), b = ri(1,6); return mc('Make x the subject:  y = ' + a + '(x + ' + b + ')', 'x = y ÷ ' + a + ' − ' + b, ['x = y ÷ ' + a + ' + ' + b, 'x = ' + a + 'y − ' + b, 'x = (y + ' + b + ') ÷ ' + a]); };

    // ---- World III · Equations (55–68; 47–54 stay balanceQuest from 04-logic) ----
    G[55] = function(){ var a = ri(1,9), b = ri(a + 2, a + 10); return num('Solve  x + ' + a + ' > ' + b + '.   x > ?', b - a); };
    G[56] = function(){ var a = ri(2,6), x = ri(2,9); return num('Solve  ' + a + 'x > ' + (a * x) + '.   x > ?', x); };
    G[57] = function(){ var a = ri(2,5), b = ri(1,9), x = ri(2,8); return num('Solve  ' + a + 'x + ' + b + ' > ' + (a * x + b) + '.   x > ?', x); };
    G[58] = function(){ var per = ri(2,6), n = ri(3,8); var budget = per * n + ri(0, per - 1); return num('Apples cost $' + per + ' each. With $' + budget + ', the most you can buy is?', Math.floor(budget / per)); };
    G[59] = function(){ return mc('When you divide both sides of an inequality by a NEGATIVE number, the inequality sign…', 'flips direction (> becomes <)', ['stays the same', 'becomes an equals sign', 'disappears']); };
    G[60] = function(){ var k = ri(1,9); return mc("Which inequality means 'x is greater than " + k + "'?", 'x > ' + k, ['x < ' + k, 'x ≥ ' + k, 'x = ' + k]); };
    G[61] = function(){ var a = ri(2,4), k = ri(2,6); return mc('Solve  −' + a + 'x > −' + (a * k) + '   (remember to flip!)', 'x < ' + k, ['x > ' + k, 'x < −' + k, 'x > −' + k]); };
    G[62] = function(){ return mc('A solution to a pair of simultaneous equations is a point that…', 'makes BOTH equations true', ['makes just one equation true', 'is always (0, 0)', 'has no meaning']); };
    G[63] = function(){ var y = ri(2,7), s = ri(y + 2, y + 9); return num('If  y = ' + y + '  and  x + y = ' + s + ',  what is x?', s - y); };
    G[64] = function(){ var x = ri(3,8), y = ri(1, x - 1); return num('x + y = ' + (x + y) + '   and   x − y = ' + (x - y) + '.   What is x?', x); };
    G[65] = function(){ var x = ri(2,7), y = ri(2,7); return num('x + y = ' + (x + y) + '   and   x − y = ' + (x - y) + '.   Add the equations to find x.  x = ?', x); };
    G[66] = function(){ var x = ri(2,7), y = ri(1,7); return num('2x + y = ' + (2 * x + y) + '   and   x + y = ' + (x + y) + '.   Subtract to find x.  x = ?', x); };
    G[67] = function(){ var x = ri(2,6), y = ri(1,6); return num('2x + y = ' + (2 * x + y) + '   and   x + 2y = ' + (x + 2 * y) + '.   What is x?', x); };
    G[68] = function(){ var p = ri(3,7), q = ri(1, p - 1); return num('2 pencils and a pen cost $' + (2 * p + q) + '. One pencil and one pen cost $' + (p + q) + '. What does one pencil cost?', p); };

    // ---- World IV · Factoring (69–90) ----
    G[69] = function(){ var g = ri(2,9), m = ri(2,6), n = ri(2,6); while (!coprime(m, n)) { m = ri(2,6); n = ri(2,6); } return num('What is the Highest Common Factor of ' + (g * m) + ' and ' + (g * n) + '?', g); };
    G[70] = function(){ var c = ri(2,6); return mc('What is the common factor of ' + c + 'x and ' + (2 * c) + 'x?', c + 'x', [(2 * c) + 'x', 'x', '' + c]); };
    G[71] = function(){ var c = ri(2,5), a = ri(2,5), b = ri(2,5); while (!coprime(a, b)) { a = ri(2,5); b = ri(2,5); } return mc('Factorise ' + (c * a) + 'x + ' + (c * b), c + '(' + a + 'x + ' + b + ')', [c + '(' + a + 'x + ' + (b + 1) + ')', (c + 1) + '(' + a + 'x + ' + b + ')', c + '(' + (a + 1) + 'x + ' + b + ')']); };
    G[72] = function(){ var b = ri(2,6); return mc('Factorise x² + ' + b + 'x', 'x(x + ' + b + ')', ['x(x + ' + (b + 1) + ')', 'x²(1 + ' + b + ')', b + 'x(x)']); };
    G[73] = function(){ var c = ri(2,4), a = ri(2,4), b = ri(2,4); while (!coprime(a, b)) { a = ri(2,4); b = ri(2,4); } return mc('Factorise ' + (c * a) + 'x² + ' + (c * b) + 'x', c + 'x(' + a + 'x + ' + b + ')', [c + 'x(' + (a + 1) + 'x + ' + b + ')', c + 'x(' + a + 'x + ' + (b + 1) + ')', (c + 1) + 'x(' + a + 'x + ' + b + ')']); };
    G[74] = function(){ var a = ri(2,9); return mc('Which of these is a DIFFERENCE OF TWO SQUARES?', 'x² − ' + (a * a), ['x² + ' + (a * a), 'x² − ' + (a * a + 1), 'x + ' + (a * a)]); };
    G[75] = function(){ var a = ri(2,9); return mc('Factorise x² − ' + (a * a), '(x − ' + a + ')(x + ' + a + ')', ['(x − ' + (a * a) + ')(x + 1)', '(x − ' + a + ')²', '(x + ' + a + ')²']); };
    G[76] = function(){ var p = ri(2,4), a = ri(2,5); return mc('Factorise ' + (p * p) + 'x² − ' + (a * a), '(' + p + 'x − ' + a + ')(' + p + 'x + ' + a + ')', ['(' + p + 'x − ' + a + ')²', '(' + (p * p) + 'x − ' + a + ')(x + ' + a + ')', '(' + p + 'x − ' + (a * a) + ')(' + p + 'x + 1)']); };
    G[77] = function(){ var a = ri(2,10); return withGraph(num('x² − ' + (a * a) + ' = 0.   The positive solution is  x = ?', a), gParab(1, 0, -(a*a), {roots:true, xmin:-(a+1), xmax:a+1})); };
    G[78] = function(){ var a = ri(1,5), b = ri(1,5); while (a === b) b = ri(1,5); return mc('Factorise by grouping:  x² + ' + a + 'x + ' + b + 'x + ' + (a * b), '(x + ' + a + ')(x + ' + b + ')', ['(x + ' + (a + b) + ')(x + 1)', '(x + ' + a + ')(x − ' + b + ')', 'x(' + (a + b) + 'x + ' + (a * b) + ')']); };
    G[79] = function(){ var a = ri(1,4), b = ri(1,4); while (a === b) b = ri(1,4); return mc('Factorise by grouping:  2x² + ' + a + 'x + ' + (2 * b) + 'x + ' + (a * b), '(2x + ' + a + ')(x + ' + b + ')', ['(2x + ' + b + ')(x + ' + a + ')', '(x + ' + a + ')(x + ' + b + ')', '2(x² + ' + a + 'x)']); };
    G[80] = function(){ var a = ri(2,6), b = ri(2,6); return mc('For x² + ' + (a + b) + 'x + ' + (a * b) + ', which pair multiplies to ' + (a * b) + ' AND adds to ' + (a + b) + '?', a + ' and ' + b, [(a + 1) + ' and ' + b, a + ' and ' + (b + 2), (a * b) + ' and 1']); };
    G[81] = function(){ var a = ri(1,6), b = ri(1,6); return mc('Factorise x² + ' + (a + b) + 'x + ' + (a * b), '(x + ' + a + ')(x + ' + b + ')', ['(x + ' + a + ')(x − ' + b + ')', '(x − ' + a + ')(x − ' + b + ')', '(x + ' + (a + 1) + ')(x + ' + b + ')']); };
    G[82] = function(){ var a = ri(1,6), b = ri(1,6); return mc('Factorise x² − ' + (a + b) + 'x + ' + (a * b), '(x − ' + a + ')(x − ' + b + ')', ['(x + ' + a + ')(x + ' + b + ')', '(x − ' + a + ')(x + ' + b + ')', '(x − ' + (a + 1) + ')(x − ' + b + ')']); };
    G[83] = function(){ var a = ri(2,6), b = ri(1, a - 1); return mc('Factorise x² + ' + (a - b) + 'x − ' + (a * b), '(x + ' + a + ')(x − ' + b + ')', ['(x − ' + a + ')(x + ' + b + ')', '(x + ' + a + ')(x + ' + b + ')', '(x − ' + a + ')(x − ' + b + ')']); };
    G[84] = function(){ var a = ri(2,6), b = ri(2,6); return withGraph(num('x² − ' + (a + b) + 'x + ' + (a * b) + ' = 0.   The LARGER root is  x = ?', Math.max(a, b)), gParab(1, -(a+b), a*b, {roots:true})); };
    G[85] = function(){ var a = ri(1,4), b = ri(1,4); while (a === b) b = ri(1,4); return mc('Factorise 2x² + ' + (2 * b + a) + 'x + ' + (a * b), '(2x + ' + a + ')(x + ' + b + ')', ['(2x + ' + b + ')(x + ' + a + ')', '(x + ' + a + ')(x + ' + b + ')', '(2x + ' + (a + 1) + ')(x + ' + b + ')']); };
    G[86] = function(){ var k = ri(2,9); return mc('Factorise  x² − ' + (k * k) + '  (difference of two squares)', '(x − ' + k + ')(x + ' + k + ')', ['(x − ' + k + ')(x − ' + k + ')', '(x + ' + k + ')(x + ' + k + ')', '(x − ' + (k * k) + ')(x + 1)']); };
    G[87] = function(){ var a = ri(1,4), b = ri(1,5), x = ri(2,4); return withGraph(num('If P(x) = x² + ' + a + 'x + ' + b + ', find P(' + x + ').', x * x + a * x + b), gParab(1, a, b, {vertex:true})); };
    G[88] = function(){ var r = ri(2,5); return mc('For P(x) = x² − ' + (r * r) + ', is (x − ' + r + ') a factor?  (What is P(' + r + ')?)', 'Yes — P(' + r + ') = 0', ['No — P(' + r + ') ≠ 0', 'Only when x = 0', 'Impossible to tell']); };
    G[89] = function(){ var a = ri(2,6), b = ri(2,6); return withGraph(num('x² − ' + (a + b) + 'x + ' + (a * b) + ' = 0.   The SMALLER root is  x = ?', Math.min(a, b)), gParab(1, -(a+b), a*b, {roots:true})); };
    G[90] = function(){ var r = ri(2,4), s = ri(2,4); return mc('One root of (x − 1)(x − ' + r + ')(x − ' + s + ') = 0 is x = 1. Which is a FACTOR?', '(x − 1)', ['(x + 1)', '(x − ' + (r + s) + ')', '(x + ' + r + ')']); };

    // ---- World V · Quadratics (91–111) ----
    G[91] = function(){ var b = ri(1,5), c = ri(1,5); return withGraph(mc('Which expression is a QUADRATIC?', 'x² + ' + b + 'x + ' + c, [b + 'x + ' + c, 'x³ − ' + c, '' + (b + c)]), gParab(1, b, c, {vertex:true})); };
    G[92] = function(){ var a = ri(2,5), b = ri(1,9), c = ri(1,9); return num('In ' + a + 'x² + ' + b + 'x + ' + c + ', what is a (the number in front of x²)?', a); };
    G[93] = function(){ var g = ri(2,5), a = ri(2,4), b = ri(2,5); return mc('Take out the common factor:  ' + (g * a) + 'x² + ' + (g * b) + 'x + ' + g, g + '(' + a + 'x² + ' + b + 'x + 1)', [g + 'x(' + a + 'x + ' + b + ')', (g + 1) + '(' + a + 'x² + ' + b + 'x + 1)', g + '(' + (a + 1) + 'x² + ' + b + 'x + 1)']); };
    G[94] = function(){ var p = ri(1,6), q = ri(1,6); while (q === p) q = ri(1,6); return withGraph(mc('For (x − ' + p + ')(x + ' + q + ') = 0, the roots are…', 'x = ' + p + '  or  x = −' + q, ['x = −' + p + '  or  x = ' + q, 'x = ' + p + '  or  x = ' + q, 'x = −' + p + '  or  x = −' + q]), gParab(1, q-p, -p*q, {roots:true})); };
    G[95] = function(){ var p = ri(2,7), q = ri(1,6); return withGraph(num('(x − ' + p + ')(x + ' + q + ') = 0.   The positive root is  x = ?', p), gParab(1, q-p, -p*q, {roots:true})); };
    G[96] = function(){ var a = ri(2,6), b = ri(2,6); return withGraph(num('x² − ' + (a + b) + 'x + ' + (a * b) + ' = 0.   The larger root is  x = ?', Math.max(a, b)), gParab(1, -(a+b), a*b, {roots:true})); };
    G[97] = function(){ var x = ri(2,6), k = ri(1,5); return num('A rectangle has width x and length x + ' + k + '. Its area is ' + (x * (x + k)) + '. Find x.', x); };
    G[98] = function(){ var p = ri(2,6); return mc('Which is a PERFECT-SQUARE trinomial?', 'x² + ' + (2 * p) + 'x + ' + (p * p), ['x² + ' + (2 * p) + 'x + ' + (p * p + 1), 'x² + ' + (2 * p + 1) + 'x + ' + (p * p), 'x² + ' + (p * p)]); };
    G[99] = function(){ var h = ri(1,6), b = 2 * h; return num('x² + ' + b + 'x + ___   What number completes the square?', h * h); };
    G[100] = function(){ var p = ri(2,6); return mc('x² + ' + (2 * p) + 'x + ' + (p * p) + ' = ?', '(x + ' + p + ')²', ['(x + ' + (2 * p) + ')²', '(x + ' + (p * p) + ')²', '(x + ' + p + ')']); };
    G[101] = function(){ var r = ri(2,12); return withGraph(num('x² = ' + (r * r) + '.   The positive value of x = ?', r), gParab(1, 0, -(r*r), {roots:true, xmin:-(r+1), xmax:r+1})); };
    G[102] = function(){ var p = ri(1,5), k = ri(3,9); return num('x² + ' + (2 * p) + 'x = ' + k + '   becomes   (x + ' + p + ')² = ?', k + p * p); };
    G[103] = function(){ var p = ri(1,5), m = ri(p + 1, p + 5); return num('(x + ' + p + ')² = ' + (m * m) + '.   The positive solution is  x = ?', m - p); };
    G[104] = function(){ var h = ri(10,30), t = ri(1,5); return mc('For  h = −(t − ' + t + ')² + ' + h + ',  the maximum height is…', '' + h, ['' + t, '−' + t, '' + (h + t)]); };
    G[105] = function(){ var b = ri(1,9), c = ri(1,9); return num('In x² + ' + b + 'x + ' + c + ', what is the constant term c?', c); };
    G[106] = function(){ var b = ri(4,9), c = ri(1,3); return num('For x² + ' + b + 'x + ' + c + ', the discriminant  b² − 4ac = ?', b * b - 4 * c); }; // b²>4c ⇒ positive answer
    G[107] = function(){ return withGraph(mc('If the discriminant of a quadratic is POSITIVE, how many real roots does it have?', 'Two', ['One', 'None', 'Infinitely many']), gParab(1, 0, -4, {roots:true})); };
    G[108] = function(){ var b = ri(1,4), c = ri(3,9); var disc = b * b - 4 * c; var all = ['Two real roots', 'One real root', 'No real roots']; var correct = disc > 0 ? all[0] : (disc === 0 ? all[1] : all[2]); return mc('For x² + ' + b + 'x + ' + c + '  (discriminant = ' + disc + '), the roots are…', correct, all.filter(function(o){ return o !== correct; })); };
    G[109] = function(){ var a = ri(2,6), b = ri(2,6); return withGraph(num('Using the quadratic formula, solve x² − ' + (a + b) + 'x + ' + (a * b) + ' = 0.   The larger root = ?', Math.max(a, b)), gParab(1, -(a+b), a*b, {roots:true})); };
    G[110] = function(){ var a = ri(2,6), b = ri(2,6); return withGraph(num('x² − ' + (a + b) + 'x + ' + (a * b) + ' = 0.   Work out the discriminant, then give the larger root.', Math.max(a, b)), gParab(1, -(a+b), a*b, {roots:true})); };
    G[111] = function(){ var t1 = ri(1,3), t2 = ri(4,8); return num("A rocket's height is 0 at t = " + t1 + "s and t = " + t2 + "s. It lands at the later time. When does it land? (seconds)", t2); };

    // ---- World VI · Functions (112–133) ----
    G[112] = function(){ return mc('If f(x) = 2x + 1, what does f(3) MEAN?', 'Put x = 3 into the rule', ['Multiply f by 3', 'f × x × 3', 'Add 3 to f']); };
    G[113] = function(){ var b = ri(1,9), x = ri(1,9); return num('f(x) = x + ' + b + '.   Find f(' + x + ').', x + b); };
    G[114] = function(){ var a = ri(2,5), b = ri(1,9), x = ri(1,7); return num('f(x) = ' + a + 'x + ' + b + '.   Find f(' + x + ').', a * x + b); };
    G[115] = function(){ var a = ri(2,5), b = ri(1,5), x = ri(3,8); return num('f(x) = ' + a + 'x − ' + b + '.   Find f(' + x + ').', a * x - b); };
    G[116] = function(){ var b = ri(0,5), x = ri(1,5); return withGraph(num('f(x) = x² + ' + b + '.   Find f(' + x + ').', x * x + b), gParab(1, 0, b, {vertex:true})); };
    G[117] = function(){ var a = ri(2,5), b = ri(1,9), x = ri(2,8); return num('f(x) = ' + a + 'x + ' + b + '.   If f(x) = ' + (a * x + b) + ', what is x?', x); };
    G[118] = function(){ var b = ri(2,9); return mc('If f(x) = x + ' + b + ', the inverse f⁻¹(x) = ?', 'x − ' + b, ['x + ' + b, b + ' − x', b + 'x']); };
    G[119] = function(){ var b = ri(1,5), a = ri(2,3), x = ri(1,5); return num('f(x) = x + ' + b + '  and  g(x) = ' + a + 'x.   Find g(f(' + x + ')).', a * (x + b)); };
    G[120] = function(){ return mc('What is the domain of f(x) = 2x + 1?', 'All real numbers', ['x > 0', 'x ≠ 0', 'Only whole numbers']); };
    G[121] = function(){ var k = ri(2,7); return mc('For f(x) = 1 ÷ (x − ' + k + '), which value of x is NOT allowed?', 'x = ' + k, ['x = 0', 'x = 1', 'x = −' + k]); };
    G[122] = function(){ var k = ri(2,9); return num('For f(x) = 1 ÷ (x − ' + k + '), the excluded value is  x = ?', k); };
    G[123] = function(){ var a = ri(1,6), v = ri(1,9); return num('The graph of f passes through the point (' + a + ', ' + v + '). What is f(' + a + ')?', v); };
    G[124] = function(){ var y = ri(1,6); return withGraph(mc('A parabola opens UPWARD with lowest point y = ' + y + '. Its range is…', 'y ≥ ' + y, ['y ≤ ' + y, 'all values of y', 'y > 0']), gParab(1, 0, y, {vertex:true, vertexLabel:'min'})); };
    G[125] = function(){ var a = ri(2,5), r = ri(1,6); return num('f(x) = ' + a + 'x − ' + (a * r) + '.   The x-intercept (where f(x) = 0) is  x = ?', r); };
    G[126] = function(){ var a = ri(2,5); return mc('Is the line f(x) = −' + a + 'x + 1 increasing or decreasing?', 'Decreasing', ['Increasing', 'Constant', 'Neither']); };
    G[127] = function(){ var base = ri(2,5); return mc('What KIND of function is f(x) = ' + base + '^x?', 'Exponential', ['Linear', 'Quadratic', 'Constant']); };
    G[128] = function(){ var x = ri(2,3), b = ri(1,5); return num('f(x) = x³ + ' + b + '.   Find f(' + x + ').', x * x * x + b); };
    G[129] = function(){ return withGraph(mc('At most how many times can a quadratic (degree 2) cross the x-axis?', '2', ['1', '3', '0']), gParab(1, 0, -4, {roots:true})); };
    G[130] = function(){ var k = ri(2,9); return num('For f(x) = 1 ÷ (x − ' + k + '), the vertical asymptote is  x = ?', k); };
    G[131] = function(){ var base = ri(2,3), e = ri(2,4); return num('f(x) = ' + base + '^x.   Find f(' + e + ').', Math.pow(base, e)); };
    G[132] = function(){ var base = ri(2,3), e = ri(2,5); return num(base + '^x = ' + Math.pow(base, e) + '.   What is x?', e); };
    G[133] = function(){ var start = ri(2,5), h = ri(2,4); return num(start + ' bacteria double every hour. How many after ' + h + ' hours?', start * Math.pow(2, h)); };

    // ================= NEW WORLDS (134–187) =================
    var TRIPLES = [[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[7,24,25],[20,21,29],[9,40,41]];
    function triple(){ return TRIPLES[ri(0, TRIPLES.length - 1)]; }

    // ---- World VII · Sequences & Series (134–144) ----
    G[134] = function(){ var a = ri(1,9), d = ri(1,6); return num('Find the next term:   ' + [a, a + d, a + 2 * d, a + 3 * d].join(', ') + ', ?', a + 4 * d); };
    G[135] = function(){ var a = ri(1,9), d = ri(1,7); return num('Find the common difference:   ' + [a, a + d, a + 2 * d, a + 3 * d].join(', '), d); };
    G[136] = function(){ var a = ri(1,9), d = ri(1,6), k = ri(5,9); return num('An arithmetic sequence starts at ' + a + ' and goes up by ' + d + ' each time. What is term number ' + k + '?', a + (k - 1) * d); };
    G[137] = function(){ if (Math.random() < 0.5){ var a = ri(1,4), r = ri(2,3); return mc('Is this sequence ARITHMETIC or GEOMETRIC?   ' + [a, a * r, a * r * r, a * r * r * r].join(', '), 'Geometric', ['Arithmetic', 'Neither', 'Both']); } var b = ri(1,6), dd = ri(2,5); return mc('Is this sequence ARITHMETIC or GEOMETRIC?   ' + [b, b + dd, b + 2 * dd, b + 3 * dd].join(', '), 'Arithmetic', ['Geometric', 'Neither', 'Both']); };
    G[138] = function(){ var a = ri(1,4), r = ri(2,4); return num('Find the common ratio:   ' + [a, a * r, a * r * r, a * r * r * r].join(', '), r); };
    G[139] = function(){ var a = ri(1,4), r = ri(2,3); return num('Find the next term:   ' + [a, a * r, a * r * r].join(', ') + ', ?', a * r * r * r); };
    G[140] = function(){ var a = ri(1,3), r = ri(2,3), k = ri(3,5); return num('A geometric sequence starts at ' + a + ' with ratio ' + r + '. What is term number ' + k + '?', a * Math.pow(r, k - 1)); };
    G[141] = function(){ var a = ri(1,5), d = ri(1,4), n = ri(3,5); return num('Add the first ' + n + ' terms of the sequence that starts at ' + a + ' and goes up by ' + d + ' each time.', n * (2 * a + (n - 1) * d) / 2); };
    G[142] = function(){ if (Math.random() < 0.5){ var k = ri(3,7); return num('Square numbers: 1, 4, 9, 16, …   What is the ' + k + 'th square number?', k * k); } var t = ri(4,8); return num('Triangular numbers: 1, 3, 6, 10, …   What is the ' + t + 'th triangular number?', t * (t + 1) / 2); };
    G[143] = function(){ var fib = [1,1,2,3,5,8,13,21,34,55]; var i = ri(0,5); return num('Find the next number:   ' + fib.slice(i, i + 4).join(', ') + ', ?', fib[i + 4]); };
    G[144] = function(){ var a = ri(1,3), r = 2, n = ri(3,4); var terms = []; var s = 0; for (var j = 0; j < n; j++){ terms.push(a * Math.pow(r, j)); s += a * Math.pow(r, j); } return num('Add up:   ' + terms.join(' + '), s); };

    // ---- World VIII · Logarithms (145–154) ----
    G[145] = function(){ return mc('logₐ(x) = y  is another way of writing…', 'aʸ = x', ['a × y = x', 'xʸ = a', 'y × x = a']); };
    G[146] = function(){ var e = ri(2,5); return num('What is log₂(' + Math.pow(2, e) + ')?', e); };
    G[147] = function(){ var e = ri(2,4); return num('What is log₁₀(' + Math.pow(10, e) + ')?', e); };
    G[148] = function(){ var b = ri(2,4), e = ri(2,3); return num('What is log_' + b + '(' + Math.pow(b, e) + ')?', e); };
    G[149] = function(){ return mc('What is log(1)  (the log of 1, in any base)?', '0', ['1', 'the base', 'undefined']); };
    G[150] = function(){ return mc('What is logₐ(a)  (the log of the base itself)?', '1', ['0', 'a', 'the base squared']); };
    G[151] = function(){ return mc('log(a × b) = ?', 'log a + log b', ['log a × log b', 'log a − log b', '(log a)(log b)']); };
    G[152] = function(){ var k = ri(2,5); return num('Solve  log₂ x = ' + k + '.    x = ?', Math.pow(2, k)); };
    G[153] = function(){ var base = ri(2,4), ex = ri(2,3), val = Math.pow(base, ex); return mc('Rewrite  ' + base + '^' + ex + ' = ' + val + '  in logarithm form.', 'log_' + base + '(' + val + ') = ' + ex, ['log_' + ex + '(' + val + ') = ' + base, 'log_' + base + '(' + ex + ') = ' + val, 'log_' + val + '(' + base + ') = ' + ex]); };
    G[154] = function(){ var b = ri(2,4), k = ri(2,5); return num('What is log_' + b + '(' + b + '^' + k + ')?', k); };

    // ---- World IX · Trigonometry (155–166) ----
    G[155] = function(){ return withGraph(mc('In a right triangle, the longest side (opposite the right angle) is the…', 'hypotenuse', ['opposite', 'adjacent', 'base']), gTriangle(4, 3)); };
    G[156] = function(){ return withGraph(mc('sin θ = ?', 'opposite ÷ hypotenuse', ['adjacent ÷ hypotenuse', 'opposite ÷ adjacent', 'hypotenuse ÷ opposite']), gTriangle(4, 3)); };
    G[157] = function(){ var t = triple(); return withGraph(num('A right triangle has legs ' + t[0] + ' and ' + t[1] + '. Find the hypotenuse.', t[2]), gTriangle(t[0], t[1])); };
    G[158] = function(){ var t = triple(); return withGraph(num('A right triangle has hypotenuse ' + t[2] + ' and one leg ' + t[0] + '. Find the other leg.', t[1]), gTriangle(t[0], t[1])); };
    G[159] = function(){ return mc('What is sin 30°?', '1/2', ['√3/2', '1', '√2/2']); };
    G[160] = function(){ return mc('What is cos 60°?', '1/2', ['√3/2', '1', '0']); };
    G[161] = function(){ return mc('What is tan 45°?', '1', ['0', '√3', '1/2']); };
    G[162] = function(){ return withGraph(mc('On the unit circle, what is sin 90°?', '1', ['0', '1/2', '√3/2']), gCircle(1, [{x:0,y:1,label:'90°'},{x:1,y:0}])); };
    G[163] = function(){ var o = [['a full turn (a whole circle)', 360], ['a straight line', 180]][ri(0,1)]; return num('How many degrees are in ' + o[0] + '?', o[1]); };
    G[164] = function(){ return mc('sin²θ + cos²θ = ?', '1', ['0', '2', 'tan²θ']); };
    G[165] = function(){ return num('If tan θ = 1, what is the angle θ  (in degrees)?', 45); };
    G[166] = function(){ return num('How many degrees are in a right angle?', 90); };

    // ---- World X · Coordinate Geometry & Conics (167–176) ----
    G[167] = function(){ var x1 = ri(1,4), x2 = x1 + ri(3,6); var p = num('How far apart are the points (' + x1 + ', 3) and (' + x2 + ', 3)?', x2 - x1);
      p.graph = { xmin:-1, xmax:12, ymin:-1, ymax:8, points:[{x:x1,y:3,label:'A'},{x:x2,y:3,label:'B'}], segments:[{x1:x1,y1:3,x2:x2,y2:3}] }; return p; };
    G[168] = function(){ var t = triple(); var a = t[0], b = t[1]; var p = num('Find the distance between (0, 0) and (' + a + ', ' + b + ').', t[2]);
      p.graph = { xmin:-1, xmax:Math.max(a,10)+1, ymin:-1, ymax:Math.max(b,10)+1, points:[{x:0,y:0,label:'O'},{x:a,y:b,label:'P'}], segments:[{x1:0,y1:0,x2:a,y2:0,dash:true},{x1:a,y1:0,x2:a,y2:b,dash:true},{x1:0,y1:0,x2:a,y2:b}] }; return p; };
    G[169] = function(){ var ax = ri(0,8), bx = ri(0,8); while (bx === ax || (ax + bx) % 2 !== 0) bx = ri(0,8);
      var ay = ri(0,8), by = ri(0,8); while ((ay + by) % 2 !== 0) by = ri(0,8);
      return { mode:'graph', par:0, prompt:'Tap the MIDPOINT of  A(' + ax + ', ' + ay + ')  and  B(' + bx + ', ' + by + ').',
        graph:{ xmin:-1, xmax:10, ymin:-1, ymax:10, points:[{x:ax,y:ay,label:'A'},{x:bx,y:by,label:'B'}], segments:[{x1:ax,y1:ay,x2:bx,y2:by,dash:true}], interactive:'point', target:{ x:(ax+bx)/2, y:(ay+by)/2 } } }; };
    G[170] = function(){ var m = ri(1,3), x1 = ri(0,3), y1 = ri(0,3); var x2 = x1 + 2, y2 = y1 + 2 * m; var p = num('Find the gradient (slope) of the line through (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + ').', m);
      p.graph = { xmin:-1, xmax:9, ymin:-1, ymax:11, points:[{x:x1,y:y1,label:'A'},{x:x2,y:y2,label:'B'}], segments:[{x1:x1,y1:y1,x2:x2,y2:y1,dash:true},{x1:x2,y1:y1,x2:x2,y2:y2,dash:true},{x1:x1,y1:y1,x2:x2,y2:y2}] }; return p; };
    G[171] = function(){ var m = ri(1,3), c = ri(0,5); var eq = 'y = ' + m + 'x' + (c > 0 ? ' + ' + c : ''); return { mode:'graph', par:0, prompt:'Tap TWO points that the line  ' + eq + '  passes through.',
      graph:{ xmin:-1, xmax:10, ymin:-1, ymax:12, interactive:'line', targetLine:{ m:m, c:c } } }; };
    G[172] = function(){ var r = ri(2,9); return withGraph(num('For the circle  x² + y² = ' + (r * r) + ', what is the radius?', r), gCircle(r, [{x:r,y:0,label:'r'}])); };
    G[173] = function(){ var a = ri(1,6), b = ri(1,6); while (a === b) b = ri(1,6); var r = ri(2,5); return mc('What is the CENTRE of  (x − ' + a + ')² + (y − ' + b + ')² = ' + (r * r) + '?', '(' + a + ', ' + b + ')', ['(−' + a + ', −' + b + ')', '(' + b + ', ' + a + ')', '(' + (r * r) + ', 0)']); };
    G[174] = function(){ var t = ri(0,2);
      if (t === 0) return withGraph(mc('Which conic is  x² + y² = 25?', 'Circle', ['Parabola', 'Ellipse', 'Straight line']), gCircle(5));
      if (t === 1) return withGraph(mc('Which conic is  y = x²?', 'Parabola', ['Circle', 'Ellipse', 'Straight line']), gParab(1, 0, 0, {vertex:true, vertexLabel:'(0,0)'}));
      return withGraph(mc('Which conic is  x²/9 + y²/4 = 1?', 'Ellipse', ['Circle', 'Parabola', 'Straight line']), gEllipse(3, 2)); };
    G[175] = function(){ var p = mc('Where is the VERTEX of the parabola  y = x²?', '(0, 0)', ['(1, 1)', '(0, 1)', '(1, 0)']);
      p.graph = { xmin:-4, xmax:4, ymin:-1, ymax:9, parabola:{ a:1, b:0, c:0 }, points:[{x:0,y:0,label:'vertex'}] }; return p; };
    G[176] = function(){ var t = triple(); var a = t[0], b = t[1]; var p = num('How far is the point (' + a + ', ' + b + ') from the origin (0, 0)?', t[2]);
      p.graph = { xmin:-1, xmax:Math.max(a,10)+1, ymin:-1, ymax:Math.max(b,10)+1, points:[{x:0,y:0,label:'O'},{x:a,y:b,label:'P'}], segments:[{x1:0,y1:0,x2:a,y2:b}] }; return p; };

    // ---- World XI · The Calculus Threshold (177–187) ----
    G[177] = function(){ return mc('What is  i²  (the imaginary unit squared)?', '−1', ['1', 'i', '0']); };
    G[178] = function(){ return num('What is  i⁴?', 1); };
    G[179] = function(){ var a = ri(1,9), b = ri(1,9), c = ri(1,9), d = ri(1,9); return num('What is the REAL part of  (' + a + ' + ' + b + 'i) + (' + c + ' + ' + d + 'i)?', a + c); };
    G[180] = function(){ var a = ri(1,7), b = ri(1,7); return mc('What is the complex conjugate of  ' + a + ' + ' + b + 'i?', a + ' − ' + b + 'i', [a + ' + ' + b + 'i', '−' + a + ' + ' + b + 'i', b + ' − ' + a + 'i']); };
    G[181] = function(){ return withGraph(mc('A quadratic with a NEGATIVE discriminant has how many REAL roots?', 'None (0)', ['One', 'Two', 'Infinitely many']), gParab(1, 0, 3)); };
    G[182] = function(){ var t = triple(); return num('What is  |' + t[0] + ' + ' + t[1] + 'i|  ?   (use  √(a² + b²) )', t[2]); };
    G[183] = function(){ var m = ri(2,6), a = ri(1,4), b = a + ri(1,5), k = ri(0,5); return num('A function passes through (' + a + ', ' + (m * a + k) + ') and (' + b + ', ' + (m * b + k) + '). What is its average rate of change?', m); };
    G[184] = function(){ var m = ri(2,6), a = ri(1,4), b = a + ri(1,5), k = ri(0,5); return num('A secant line joins (' + a + ', ' + (m * a + k) + ') and (' + b + ', ' + (m * b + k) + '). What is its slope?', m); };
    G[185] = function(){ var a = ri(1,6), v = ri(2,9); return num('A continuous function f has f(' + a + ') = ' + v + '. What is  lim(x→' + a + ') f(x)?', v); };
    G[186] = function(){ var a = ri(1,5), v = ri(2,9); return mc('As x gets closer to ' + a + ', a curve gets closer to y = ' + v + '. What is  lim(x→' + a + ') f(x)?', '' + v, ['' + a, '0', '∞']); };
    G[187] = function(){ return mc('The DERIVATIVE of a function measures…', 'the slope of the curve at a single point', ['the area under the curve', 'the length of a line', 'the number of roots']); };

    // ---- Stamp each arena's ACTUAL question style onto the curriculum (atlas labels) ----
    // Skip Bible arenas (mechanic + questions come from the registry), Equation Battle arenas
    // (numeric/formula/bracket must stay the native balance solver), and special arenas (arena
    // 66/999 Giant Black Hole, arena 67/888 Second Chance — generateProblem, 04-logic.js, gives
    // them their own dedicated generator and their authored `mechanic` is already correct; without
    // this guard, arena.gen||arena.n happens to collide with an unrelated LEGACY G[n] entry from
    // the old 187-arena numbering — e.g. G[66] below is really an old "solve for x" generator that
    // has nothing to do with the black hole, and was silently overwriting its mechanic from the
    // authored 'mcOnly' to 'directInput', mislabelling its atlas card "🔢 Compute" instead of the
    // correct "✔️ Identify". Found + fixed 2026-07-18 while renaming arena 66's display number).
    if (typeof CURRICULUM !== 'undefined'){
      for (var i = 0; i < CURRICULUM.length; i++){
        var a = CURRICULUM[i];
        if (a.phaseId) continue;
        if (a.special) continue;
        if (a.mechanic === 'numeric' || a.mechanic === 'formula' || a.mechanic === 'bracket') continue;
        var g = a.gen || a.n;
        if (G[g]){
          try { var p = G[g](a); if (p && p.mode) a.mechanic = p.mode; } catch (e) {}
        }
      }
    }
  })();
