  // ============================================================================
  // 31-graph.js — coordinate-geometry graphs for the arena.
  // ----------------------------------------------------------------------------
  // A problem may carry a `graph` spec. Two uses:
  //   • STATIC  — a directInput/mcOnly question shows a plotted grid alongside its
  //     normal answer controls (distance, midpoint, gradient, intercepts, …).
  //   • INTERACTIVE (mode 'graph') — the grid IS the input:
  //       graph.interactive === 'point'  → tap the one correct lattice point.
  //       graph.interactive === 'line'   → tap TWO points that lie on the target line.
  //
  // Graph spec fields (all optional unless noted):
  //   xmin,xmax,ymin,ymax (or min/max for a square window)
  //   points:   [{x,y,label}]         plotted dots
  //   segments: [{x1,y1,x2,y2,dash}]  line segments (e.g. right-triangle legs)
  //   lines:    [{m,c}]               full lines y = m·x + c
  //   parabola: {a,b,c}               y = a·x² + b·x + c
  //   circle:   {cx,cy,r}
  //   interactive: 'point' | 'line'
  //   target:     {x,y}   (interactive 'point')  — the correct lattice point
  //   targetLine: {m,c}   (interactive 'line')   — two taps must lie on this line
  // Self-contained SVG; integer lattice only so it stays tap-friendly + testable.
  // ============================================================================

  function _gWindow(g){
    var xmin = (g.xmin != null) ? g.xmin : (g.min != null ? g.min : -1);
    var xmax = (g.xmax != null) ? g.xmax : (g.max != null ? g.max : 10);
    var ymin = (g.ymin != null) ? g.ymin : (g.min != null ? g.min : -1);
    var ymax = (g.ymax != null) ? g.ymax : (g.max != null ? g.max : 10);
    return { xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax };
  }

  function buildGraphSVG(g){
    var w = _gWindow(g), W = 340, H = 340, pad = 24;
    var sx = function(x){ return pad + (x - w.xmin) / (w.xmax - w.xmin) * (W - 2 * pad); };
    var sy = function(y){ return H - pad - (y - w.ymin) / (w.ymax - w.ymin) * (H - 2 * pad); };
    var s = '<svg class="coord-graph" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="coordinate grid">';
    var xi, yi;
    // grid
    for (xi = Math.ceil(w.xmin); xi <= Math.floor(w.xmax); xi++)
      s += '<line class="cg-grid" x1="' + sx(xi) + '" y1="' + sy(w.ymin) + '" x2="' + sx(xi) + '" y2="' + sy(w.ymax) + '"/>';
    for (yi = Math.ceil(w.ymin); yi <= Math.floor(w.ymax); yi++)
      s += '<line class="cg-grid" x1="' + sx(w.xmin) + '" y1="' + sy(yi) + '" x2="' + sx(w.xmax) + '" y2="' + sy(yi) + '"/>';
    // axes
    if (w.ymin <= 0 && w.ymax >= 0) s += '<line class="cg-axis" x1="' + sx(w.xmin) + '" y1="' + sy(0) + '" x2="' + sx(w.xmax) + '" y2="' + sy(0) + '"/>';
    if (w.xmin <= 0 && w.xmax >= 0) s += '<line class="cg-axis" x1="' + sx(0) + '" y1="' + sy(w.ymin) + '" x2="' + sx(0) + '" y2="' + sy(w.ymax) + '"/>';
    // axis number labels (skip 0; thin them out on wide ranges)
    var stepX = Math.ceil((w.xmax - w.xmin) / 10), stepY = Math.ceil((w.ymax - w.ymin) / 10);
    var ax = (w.ymin <= 0 && w.ymax >= 0) ? sy(0) : sy(w.ymin);
    var ay = (w.xmin <= 0 && w.xmax >= 0) ? sx(0) : sx(w.xmin);
    for (xi = Math.ceil(w.xmin); xi <= Math.floor(w.xmax); xi++) if (xi !== 0 && xi % stepX === 0)
      s += '<text class="cg-num" x="' + sx(xi) + '" y="' + (ax + 13) + '">' + xi + '</text>';
    for (yi = Math.ceil(w.ymin); yi <= Math.floor(w.ymax); yi++) if (yi !== 0 && yi % stepY === 0)
      s += '<text class="cg-num cg-num-y" x="' + (ay - 6) + '" y="' + (sy(yi) + 4) + '">' + yi + '</text>';

    // plotted curves/lines/segments (behind points)
    (g.lines || []).forEach(function(L){
      s += '<line class="cg-plot" x1="' + sx(w.xmin) + '" y1="' + sy(L.m * w.xmin + L.c) + '" x2="' + sx(w.xmax) + '" y2="' + sy(L.m * w.xmax + L.c) + '"/>';
    });
    (g.segments || []).forEach(function(S){
      s += '<line class="cg-seg' + (S.dash ? ' cg-dash' : '') + '" x1="' + sx(S.x1) + '" y1="' + sy(S.y1) + '" x2="' + sx(S.x2) + '" y2="' + sy(S.y2) + '"/>';
    });
    // filled polygons (e.g. triangles). Optional `right` = index of the vertex holding a right angle.
    (g.polygons || []).forEach(function(P){
      var pts = (P.pts || []).map(function(pt){ return sx(pt[0]).toFixed(1) + ',' + sy(pt[1]).toFixed(1); }).join(' ');
      s += '<polygon class="cg-poly" points="' + pts + '"/>';
      if (typeof P.right === 'number' && P.pts && P.pts.length >= 3){
        // small right-angle square at the right-angle vertex, along its two edges
        var i0 = P.right, i1 = (i0 + 1) % P.pts.length, i2 = (i0 + 2) % P.pts.length;
        var v = P.pts[i0], u1 = P.pts[i1], u2 = P.pts[i2];
        var d = 0.6;
        var n1 = [Math.sign(u1[0] - v[0]), Math.sign(u1[1] - v[1])];
        var n2 = [Math.sign(u2[0] - v[0]), Math.sign(u2[1] - v[1])];
        var a1 = [v[0] + n1[0] * d, v[1] + n1[1] * d];
        var a2 = [v[0] + n2[0] * d, v[1] + n2[1] * d];
        var ac = [v[0] + (n1[0] + n2[0]) * d, v[1] + (n1[1] + n2[1]) * d];
        s += '<polyline class="cg-seg" points="' + sx(a1[0]) + ',' + sy(a1[1]) + ' ' + sx(ac[0]) + ',' + sy(ac[1]) + ' ' + sx(a2[0]) + ',' + sy(a2[1]) + '"/>';
      }
    });
    if (g.parabola){
      var pts = [], a = g.parabola.a, b = g.parabola.b || 0, c = g.parabola.c || 0;
      for (var x = w.xmin; x <= w.xmax + 0.001; x += (w.xmax - w.xmin) / 80){
        var yv = a * x * x + b * x + c;
        if (yv >= w.ymin - 1 && yv <= w.ymax + 1) pts.push(sx(x).toFixed(1) + ',' + sy(yv).toFixed(1));
      }
      s += '<polyline class="cg-plot" points="' + pts.join(' ') + '"/>';
    }
    if (g.circle){
      s += '<ellipse class="cg-plot" cx="' + sx(g.circle.cx) + '" cy="' + sy(g.circle.cy) +
        '" rx="' + (g.circle.r / (w.xmax - w.xmin) * (W - 2 * pad)) +
        '" ry="' + (g.circle.r / (w.ymax - w.ymin) * (H - 2 * pad)) + '"/>';
    }
    if (g.ellipse){
      s += '<ellipse class="cg-plot" cx="' + sx(g.ellipse.cx) + '" cy="' + sy(g.ellipse.cy) +
        '" rx="' + (g.ellipse.rx / (w.xmax - w.xmin) * (W - 2 * pad)) +
        '" ry="' + (g.ellipse.ry / (w.ymax - w.ymin) * (H - 2 * pad)) + '"/>';
    }
    (g.points || []).forEach(function(P){
      s += '<circle class="cg-point" cx="' + sx(P.x) + '" cy="' + sy(P.y) + '" r="5"/>';
      if (P.label) s += '<text class="cg-plabel" x="' + (sx(P.x) + 8) + '" y="' + (sy(P.y) - 7) + '">' + P.label + '</text>';
    });
    // interactive: a group we can repaint (picked dots + drawn line) + clickable lattice targets
    s += '<g id="cgLive"></g>';
    if (g.interactive){
      for (xi = Math.ceil(w.xmin); xi <= Math.floor(w.xmax); xi++)
        for (yi = Math.ceil(w.ymin); yi <= Math.floor(w.ymax); yi++)
          s += '<circle class="cg-hit" data-gx="' + xi + '" data-gy="' + yi + '" cx="' + sx(xi) + '" cy="' + sy(yi) + '" r="10"/>';
    }
    s += '</svg>';
    return s;
  }

  // Render the graph (if any) into #graphPanel and wire interaction.
  function renderGraphPanel(){
    var el0 = (typeof el !== 'undefined') ? el.graphPanel : null;
    if (!el0) return;
    var p = state.problem, g = p && p.graph;
    if (!g){ el0.hidden = true; el0.style.display = 'none'; el0.innerHTML = ''; return; }
    el0.hidden = false; el0.style.display = 'flex';
    state.graphPicks = [];
    var controls = '';
    if (g.interactive === 'point') controls = '<div class="cg-controls"><span class="cg-tip">Tap the correct point on the grid.</span></div>';
    else if (g.interactive === 'line') controls = '<div class="cg-controls"><span class="cg-tip" id="cgTip">Tap two points the line passes through.</span> <button type="button" class="btn btn-ghost cg-clear" onclick="graphClear()">↺ Clear</button></div>';
    el0.innerHTML = buildGraphSVG(g) + controls;
    if (g.interactive){
      var svg = el0.querySelector('.coord-graph');
      if (svg) svg.addEventListener('click', function(ev){
        var hit = ev.target.closest('.cg-hit'); if (!hit) return;
        graphClick(parseInt(hit.getAttribute('data-gx'), 10), parseInt(hit.getAttribute('data-gy'), 10));
      });
    }
  }

  function _gWinFor(){ return _gWindow(state.problem.graph); }
  function _cgDot(gx, gy, cls){
    var g = state.problem.graph, w = _gWindow(g), W = 340, H = 340, pad = 24;
    var sx = pad + (gx - w.xmin) / (w.xmax - w.xmin) * (W - 2 * pad);
    var sy = H - pad - (gy - w.ymin) / (w.ymax - w.ymin) * (H - 2 * pad);
    return { x: sx, y: sy, svg: '<circle class="' + cls + '" cx="' + sx + '" cy="' + sy + '" r="6"/>' };
  }
  function _cgRepaint(){
    var live = el.graphPanel.querySelector('#cgLive'); if (!live) return;
    var picks = state.graphPicks || [], html = '';
    if (picks.length === 2) html += '<line class="cg-userline" x1="' + _cgDot(picks[0].x, picks[0].y).x + '" y1="' + _cgDot(picks[0].x, picks[0].y).y + '" x2="' + _cgDot(picks[1].x, picks[1].y).x + '" y2="' + _cgDot(picks[1].x, picks[1].y).y + '"/>';
    picks.forEach(function(pk){ html += _cgDot(pk.x, pk.y, 'cg-pick').svg; });
    live.innerHTML = html;
  }

  function graphClear(){
    if (state.locked) return;
    state.graphPicks = [];
    _cgRepaint();
    var tip = document.getElementById('cgTip'); if (tip) tip.textContent = 'Tap two points the line passes through.';
  }

  // A lattice point was tapped.
  function graphClick(gx, gy){
    if (state.locked) return;
    var g = state.problem.graph;
    if (g.interactive === 'point'){
      state.graphPicks = [{ x: gx, y: gy }]; _cgRepaint();
      if (gx === g.target.x && gy === g.target.y){ state.movesTaken = 0; state.locked = true; handleSolved(); }
      else { wobbleBeam && wobbleBeam(); showMsg('Not that point — try again!', true); if (typeof registerFail === 'function') registerFail(); }
    } else if (g.interactive === 'line'){
      var picks = state.graphPicks = state.graphPicks || [];
      if (picks.some(function(pk){ return pk.x === gx && pk.y === gy; })) return; // ignore re-tap
      picks.push({ x: gx, y: gy });
      if (picks.length > 2) picks.shift();
      _cgRepaint();
      if (picks.length === 2){
        var L = g.targetLine, ok = picks.every(function(pk){ return pk.y === L.m * pk.x + L.c; }) && picks[0].x !== picks[1].x;
        if (ok){ state.movesTaken = 0; state.locked = true; handleSolved(); }
        else { wobbleBeam && wobbleBeam(); showMsg('Those points aren’t both on the line — try again.', true); if (typeof registerFail === 'function') registerFail(); state.graphPicks = []; setTimeout(_cgRepaint, 350); }
      } else {
        var tip = document.getElementById('cgTip'); if (tip) tip.textContent = 'One more point on the line…';
      }
    }
  }

  // Human-readable answer for the solved toast.
  function describeGraphAnswer(){
    var g = state.problem.graph;
    if (!g) return '';
    if (g.interactive === 'point') return '(' + g.target.x + ', ' + g.target.y + ')';
    if (g.interactive === 'line') return 'y = ' + g.targetLine.m + 'x + ' + g.targetLine.c;
    return '';
  }

  // ---------- Interval illustration (for "A graph has ..." prose questions) ----------
  // Draws the described graph from parsed interval notation (see _parseIntervals, 04-logic.js).
  // axis 'x' = domain question (curve over x-intervals); axis 'y' = range question.
  function buildIntervalIllu(illu){
    try {
      return (illu.axis === 'y') ? _illuRange(illu.intervals) : _illuDomain(illu.intervals);
    } catch (e) { return ''; }
  }

  var _ILLU_CURVE = '#66e0ff', _ILLU_AXIS = '#5a6c84', _ILLU_BG = '#101b2c', _ILLU_TXT = '#9fb3c8';

  function _illuDot(x, y, closed){
    return '<circle cx="' + x + '" cy="' + y + '" r="6" fill="' + (closed ? _ILLU_CURVE : _ILLU_BG) +
      '" stroke="' + _ILLU_CURVE + '" stroke-width="3"/>';
  }
  function _illuArrow(x, y, dir){    // dir: 1 = right, -1 = left, -2 = up
    if (dir === -2) return '<path d="M' + (x - 6) + ' ' + (y + 9) + ' L' + x + ' ' + y + ' L' + (x + 6) + ' ' + (y + 9) + '" fill="none" stroke="' + _ILLU_CURVE + '" stroke-width="3"/>';
    return '<path d="M' + (x - dir * 9) + ' ' + (y - 6) + ' L' + x + ' ' + y + ' L' + (x - dir * 9) + ' ' + (y + 6) + '" fill="none" stroke="' + _ILLU_CURVE + '" stroke-width="3"/>';
  }

  function _illuDomain(raw){
    // merge open-open neighbours sharing an endpoint into one curve with a HOLE
    var iv = raw.slice().sort(function(a, b){ return a.lo - b.lo; });
    var merged = [], holes = [];
    iv.forEach(function(cur){
      var prev = merged[merged.length - 1];
      if (prev && !cur.point && !prev.point && prev.hi === cur.lo && !prev.hiC && !cur.loC){
        holes.push(cur.lo); prev.hi = cur.hi; prev.hiC = cur.hiC;
      } else merged.push({ lo: cur.lo, hi: cur.hi, loC: cur.loC, hiC: cur.hiC, point: cur.point });
    });
    var fin = [];
    merged.forEach(function(v){ if (isFinite(v.lo)) fin.push(v.lo); if (isFinite(v.hi)) fin.push(v.hi); });
    holes.forEach(function(h){ fin.push(h); });
    if (!fin.length){ fin = [-4, 4]; }
    var lo = Math.min.apply(null, fin) - 2, hi = Math.max.apply(null, fin) + 2;
    var W = 440, H = 190, L = 26, R = 414;
    function X(v){ return L + (v - lo) / (hi - lo) * (R - L); }
    function CY(x, k){ return 86 - 32 * Math.sin(x / 46 + k * 1.9); }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="graph">';
    s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="12" fill="' + _ILLU_BG + '"/>';
    s += '<line x1="14" y1="158" x2="426" y2="158" stroke="' + _ILLU_AXIS + '" stroke-width="2"/>';
    s += '<path d="M420 152 L428 158 L420 164" fill="none" stroke="' + _ILLU_AXIS + '" stroke-width="2"/>';
    var ticks = {};
    fin.forEach(function(v){ ticks[v] = 1; });
    Object.keys(ticks).forEach(function(v){
      var tx = X(parseFloat(v));
      s += '<line x1="' + tx + '" y1="153" x2="' + tx + '" y2="163" stroke="' + _ILLU_AXIS + '" stroke-width="2"/>';
      s += '<text x="' + tx + '" y="180" font-size="13" text-anchor="middle" fill="' + _ILLU_TXT + '">' + v + '</text>';
    });
    merged.forEach(function(v, k){
      if (v.point){ s += _illuDot(X(v.lo), CY(X(v.lo), k), true); return; }
      var A = isFinite(v.lo) ? X(v.lo) : 18, B = isFinite(v.hi) ? X(v.hi) : 422;
      var pts = [];
      for (var i = 0; i <= 30; i++){ var x = A + (B - A) * i / 30; pts.push(x.toFixed(1) + ',' + CY(x, k).toFixed(1)); }
      s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + _ILLU_CURVE + '" stroke-width="3.5" stroke-linecap="round"/>';
      if (isFinite(v.lo)) s += _illuDot(A, CY(A, k), v.loC); else s += _illuArrow(18, CY(18, k), -1);
      if (isFinite(v.hi)) s += _illuDot(B, CY(B, k), v.hiC); else s += _illuArrow(422, CY(422, k), 1);
      holes.forEach(function(h){ if (h > v.lo && h < v.hi) s += _illuDot(X(h), CY(X(h), k), false); });
    });
    return s + '</svg>';
  }

  function _illuRange(raw){
    var v = raw[0] || { lo: 1, hi: Infinity, loC: true, hiC: false };
    var W = 440, H = 190;
    var yLow = 138, yHigh = 42;                 // canvas y for the range's low/high value
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="graph">';
    s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="12" fill="' + _ILLU_BG + '"/>';
    s += '<line x1="60" y1="170" x2="60" y2="16" stroke="' + _ILLU_AXIS + '" stroke-width="2"/>';
    s += '<path d="M54 24 L60 14 L66 24" fill="none" stroke="' + _ILLU_AXIS + '" stroke-width="2"/>';
    function guide(y, label){
      s += '<line x1="60" y1="' + y + '" x2="426" y2="' + y + '" stroke="' + _ILLU_AXIS + '" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.55"/>';
      s += '<line x1="55" y1="' + y + '" x2="65" y2="' + y + '" stroke="' + _ILLU_AXIS + '" stroke-width="2"/>';
      s += '<text x="46" y="' + (y + 5) + '" font-size="13" text-anchor="end" fill="' + _ILLU_TXT + '">' + label + '</text>';
    }
    var pts = [], i, t;
    if (isFinite(v.lo) && !isFinite(v.hi)){          // [a, inf) — upward parabola, vertex = lowest point
      guide(yLow, v.lo);
      for (i = -20; i <= 20; i++){ t = i / 20; pts.push((240 + 150 * t).toFixed(1) + ',' + (yLow - (yLow - 26) * t * t).toFixed(1)); }
      s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + _ILLU_CURVE + '" stroke-width="3.5" stroke-linecap="round"/>';
      s += _illuArrow(90, 26, -2) + _illuArrow(390, 26, -2);
      s += _illuDot(240, yLow, v.loC);
    } else if (!isFinite(v.lo) && isFinite(v.hi)){   // (-inf, b] — downward parabola, vertex = highest point
      guide(yHigh, v.hi);
      for (i = -20; i <= 20; i++){ t = i / 20; pts.push((240 + 150 * t).toFixed(1) + ',' + (yHigh + (160 - yHigh) * t * t).toFixed(1)); }
      s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + _ILLU_CURVE + '" stroke-width="3.5" stroke-linecap="round"/>';
      s += _illuDot(240, yHigh, v.hiC);
    } else if (isFinite(v.lo) && isFinite(v.hi)){    // [a, b] — a wave that touches both bounds
      guide(yLow, v.lo); guide(yHigh, v.hi);
      var mid = (yLow + yHigh) / 2, amp = (yLow - yHigh) / 2;
      for (i = 0; i <= 60; i++){ var x = 84 + i * (330 / 60); pts.push(x.toFixed(1) + ',' + (mid - amp * Math.sin((i / 60) * Math.PI * 2.5)).toFixed(1)); }
      s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + _ILLU_CURVE + '" stroke-width="3.5" stroke-linecap="round"/>';
      s += _illuDot(84 + (0.2 * 330), yHigh, v.hiC);           // peak touches the top bound
      s += _illuDot(84 + (0.6 * 330), yLow, v.loC);            // trough touches the bottom bound
    } else {                                          // all reals — a rising S-curve
      for (i = 0; i <= 40; i++){ var x2 = 70 + i * (330 / 40); pts.push(x2.toFixed(1) + ',' + (92 - 60 * Math.tanh((i - 20) / 9)).toFixed(1)); }
      s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + _ILLU_CURVE + '" stroke-width="3.5" stroke-linecap="round"/>';
    }
    return s + '</svg>';
  }

  // ---------- Parabola illustration (equations named directly in the prompt) ----------
  // curves: [{label,a,h,k}, ...] up to 2, for y = a(x-h)^2 + k. See _parseParabolasFromPrompt.
  function buildParabolaIllu(curves){
    try {
      if (!curves || !curves.length) return '';
      var W = 440, H = 220, cx = 220, cy = 128, scale = 15;
      var cols = ['#66e0ff', '#f0705e'];
      function px(x, y){ return { x: cx + x * scale, y: cy - y * scale }; }
      var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="graph">';
      s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="12" fill="' + _ILLU_BG + '"/>';
      s += '<line x1="0" y1="' + cy + '" x2="' + W + '" y2="' + cy + '" stroke="' + _ILLU_AXIS + '" stroke-width="1.5" opacity="0.55"/>';
      s += '<line x1="' + cx + '" y1="0" x2="' + cx + '" y2="' + H + '" stroke="' + _ILLU_AXIS + '" stroke-width="1.5" opacity="0.55"/>';
      curves.forEach(function(c, ci){
        var pts = [], i;
        for (i = -13; i <= 13; i++){
          var xu = i * 0.5;
          var yu = c.a * (xu - c.h) * (xu - c.h) + c.k;
          var yc = Math.max(-7.2, Math.min(7.2, yu));
          var p = px(xu, yc);
          pts.push(p.x.toFixed(1) + ',' + p.y.toFixed(1));
        }
        var col = cols[ci % cols.length];
        s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + col + '" stroke-width="3" stroke-linecap="round"/>';
        var vp = px(c.h, Math.max(-7.2, Math.min(7.2, c.k)));
        s += '<circle cx="' + vp.x.toFixed(1) + '" cy="' + vp.y.toFixed(1) + '" r="4.5" fill="' + col + '"/>';
        var tx = vp.x + (ci === 0 ? -9 : 9), anchor = ci === 0 ? 'end' : 'start';
        var ty = vp.y - 9 < 12 ? vp.y + 18 : vp.y - 9;
        s += '<text x="' + tx.toFixed(1) + '" y="' + ty.toFixed(1) + '" font-size="13" text-anchor="' + anchor + '" fill="' + col + '">' +
          (curves.length > 1 ? String(c.label).replace(/</g, '&lt;') : 'vertex') + '</text>';
      });
      return s + '</svg>';
    } catch (e) { return ''; }
  }
