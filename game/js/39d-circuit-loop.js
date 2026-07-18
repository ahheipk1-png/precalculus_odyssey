  // Needs the shared A2 shell from 39-a2-shell.js (a2Shell/a2Result/a2Keys/etc.), which loads first.
  // ===========================================================================
  // 🔗 Circuit Loop — rotate wire tiles until the ⚡ core lights every 💡 bulb.
  // Board is a random spanning tree, then scrambled; dirs bitmask N1 E2 S4 W8.
  // ===========================================================================
  var CIRC = { N: 5, dirs: [], src: 12, moves: 0, done: false };
  var _CIRC_D = [ [0,-1,1,4], [1,0,2,8], [0,1,4,1], [-1,0,8,2] ];  // dx,dy,bit,oppositeBit

  function _circGen(){
    var N = CIRC.N, total = N * N;
    CIRC.dirs = []; for (var i = 0; i < total; i++) CIRC.dirs.push(0);
    CIRC.src = Math.floor(total / 2);
    var seen = {}; seen[CIRC.src] = 1;
    var stack = [CIRC.src];
    while (stack.length){
      var cur = stack[stack.length - 1];
      var cx = cur % N, cy = Math.floor(cur / N);
      var opts = [];
      for (var d = 0; d < 4; d++){
        var nx = cx + _CIRC_D[d][0], ny = cy + _CIRC_D[d][1];
        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        var ni = ny * N + nx;
        if (!seen[ni]) opts.push([d, ni]);
      }
      if (!opts.length){ stack.pop(); continue; }
      var pick = opts[rand(0, opts.length - 1)];
      CIRC.dirs[cur] |= _CIRC_D[pick[0]][2];
      CIRC.dirs[pick[1]] |= _CIRC_D[pick[0]][3];
      seen[pick[1]] = 1;
      stack.push(pick[1]);
    }
    // scramble (and make sure it isn't accidentally already solved)
    for (var s = 0; s < total; s++){ var r = rand(0, 3); for (var t = 0; t < r; t++) CIRC.dirs[s] = _circRot(CIRC.dirs[s]); }
    if (_circAllLit()) CIRC.dirs[0] = _circRot(CIRC.dirs[0]);
    CIRC.moves = 0; CIRC.done = false;
  }
  function _circRot(m){ return ((m << 1) & 15) | ((m & 8) ? 1 : 0); }

  function _circLitSet(){
    var N = CIRC.N, lit = {}, q = [CIRC.src]; lit[CIRC.src] = 1;
    while (q.length){
      var cur = q.shift(), cx = cur % N, cy = Math.floor(cur / N);
      for (var d = 0; d < 4; d++){
        if (!(CIRC.dirs[cur] & _CIRC_D[d][2])) continue;
        var nx = cx + _CIRC_D[d][0], ny = cy + _CIRC_D[d][1];
        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        var ni = ny * N + nx;
        if (!lit[ni] && (CIRC.dirs[ni] & _CIRC_D[d][3])){ lit[ni] = 1; q.push(ni); }
      }
    }
    return lit;
  }
  function _circAllLit(){ var lit = _circLitSet(); for (var i = 0; i < CIRC.N * CIRC.N; i++){ if (!lit[i]) return false; } return true; }

  function _circTileSvg(mask, isSrc, isBulb, lit){
    var col = lit ? '#ffd75e' : '#5a6c84';
    var s = '<svg viewBox="0 0 64 64" width="68" height="68">';
    if (mask & 1) s += '<line x1="32" y1="32" x2="32" y2="0" stroke="' + col + '" stroke-width="9" stroke-linecap="round"/>';
    if (mask & 2) s += '<line x1="32" y1="32" x2="64" y2="32" stroke="' + col + '" stroke-width="9" stroke-linecap="round"/>';
    if (mask & 4) s += '<line x1="32" y1="32" x2="32" y2="64" stroke="' + col + '" stroke-width="9" stroke-linecap="round"/>';
    if (mask & 8) s += '<line x1="32" y1="32" x2="0" y2="32" stroke="' + col + '" stroke-width="9" stroke-linecap="round"/>';
    if (isSrc) s += '<circle cx="32" cy="32" r="14" fill="#ffb300"/><text x="32" y="40" font-size="22" text-anchor="middle">⚡</text>';
    else if (isBulb) s += '<circle cx="32" cy="32" r="12" fill="' + (lit ? '#fff3b0' : '#2c3a4e') + '" stroke="' + col + '" stroke-width="4"/>';
    else s += '<circle cx="32" cy="32" r="6" fill="' + col + '"/>';
    return s + '</svg>';
  }

  function _circRender(){
    var g = document.getElementById('circWrap'); if (!g) return;
    var N = CIRC.N, lit = _circLitSet();
    var h = '<div class="a2-grid" style="grid-template-columns:repeat(' + N + ',72px)">';
    for (var i = 0; i < N * N; i++){
      var deg = 0; for (var d = 0; d < 4; d++){ if (CIRC.dirs[i] & _CIRC_D[d][2]) deg++; }
      h += '<button type="button" class="a2-cell a2-circ' + (lit[i] ? ' a2-lit' : '') + '" onclick="circRotate(' + i + ')">' +
        _circTileSvg(CIRC.dirs[i], i === CIRC.src, deg === 1, !!lit[i]) + '</button>';
    }
    g.innerHTML = h + '</div>';
    var hud = document.getElementById('circHud');
    var litCount = 0; for (var k in lit) litCount++;
    if (hud) hud.innerHTML = '<span class="wond-chip">💡 Lit: <b>' + litCount + ' / ' + (N * N) + '</b></span>' +
      '<span class="wond-chip">🔄 Turns: <b>' + CIRC.moves + '</b></span>';
  }

  function circRotate(i){
    if (CIRC.done || !a2Active()) return;
    CIRC.dirs[i] = _circRot(CIRC.dirs[i]);
    CIRC.moves++;
    if (typeof playSfx === 'function') playSfx('click');
    _circRender();
    if (_circAllLit()){
      CIRC.done = true;
      if (typeof playSfx === 'function') playSfx('victory');
      var score = Math.max(100, 1000 - CIRC.moves * 10);
      var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('circuit', score, 1) : false;
      a2Later(function(){
        a2Result('🔗 Circuit Loop', '⚡ FULL POWER! ⚡' + (newHigh ? ' 🏆' : ''),
          'Every bulb lit in ' + CIRC.moves + ' turns. The station hums back to life!',
          1, 'openCircuit');
      }, 700);
    }
  }

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_circuitStartRun').
  function openCircuit(){
    gameWelcome('circuit', '🔗', 'Circuit Loop',
      'Rotate the wires so the power core lights every bulb!',
      '_circuitStartRun');
  }

  function _circuitStartRun(){
    _circGen();
    a2Shell('🔗 Circuit Loop', 'openWonderland()',
      '<div class="wond-hud" id="circHud"></div><div class="a2-center" id="circWrap"></div>',
      'Tap a tile to rotate it. Connect the wires so the ⚡ core lights EVERY bulb!');
    _circRender();
  }

