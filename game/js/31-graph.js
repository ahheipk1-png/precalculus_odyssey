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
    el0.hidden = false; el0.style.display = 'block';
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
