  // ===========================================================================
  // 💎 Crystal Cascade — a falling vertical-triplet match-3 (Puyo-Puyo style),
  // adapted from a reference the user supplied. Drop a column of 3 gems; cycle
  // their colour order before it lands. Landing triggers cascading matches
  // (3+ same-colour gems in a row/column/either diagonal), gravity, and chain
  // reactions. An ENDLESS single run, not discrete levels — `level` climbs
  // automatically as more gems are cleared (`1 + floor(cleared/40)`), speeding
  // up the fall, the same continuous-ramp idea as Tile Ball. Ends when a fresh
  // column can't spawn (board full at the top).
  // ===========================================================================
  var CC_COLS = 6, CC_ROWS = 13, CC_CELL = 40;
  var CC_COLORS = [
    { main: '#ff5e7d', edge: '#b7264f', shine: '#ffd4df' },
    { main: '#ffb84a', edge: '#b46a17', shine: '#fff0c9' },
    { main: '#ffe75c', edge: '#b9a31f', shine: '#fffbd1' },
    { main: '#54e7a2', edge: '#168a5d', shine: '#d5ffef' },
    { main: '#51c7ff', edge: '#126da4', shine: '#d9f4ff' },
    { main: '#9c78ff', edge: '#5731b6', shine: '#ebe3ff' }
  ];
  var CC_DIRS = [[1, 0], [0, 1], [1, 1], [1, -1]];
  var CC = { active: false, board: [], piece: null, queue: [], particles: [], chainMsg: '',
             score: 0, level: 1, cleared: 0, bestChain: 0, animating: false, lastFall: 0 };

  function _ccRandColor(){ return rand(0, CC_COLORS.length - 1); }
  function _ccRandColumn(){ return [_ccRandColor(), _ccRandColor(), _ccRandColor()]; }

  function _ccCanOccupy(col, row){
    for (var i = 0; i < 3; i++){
      var r = row + i;
      if (col < 0 || col >= CC_COLS || r >= CC_ROWS) return false;
      if (r >= 0 && CC.board[r][col] !== null) return false;
    }
    return true;
  }

  function _ccSpawn(){
    while (CC.queue.length < 2) CC.queue.push(_ccRandColumn());   // keep two ready to preview
    var nx = CC.queue.shift();
    CC.queue.push(_ccRandColumn());                               // refill so the preview always shows two
    CC.piece = { col: Math.floor(CC_COLS / 2), row: -3, colors: nx };
    _ccRenderNextPanel();                                         // refresh the right-side NEXT preview
    if (!_ccCanOccupy(CC.piece.col, CC.piece.row)) _ccGameOver();
  }

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_ccStartRun').
  function openCrystal(){
    gameWelcome('crystal', '💎', 'Crystal Cascade',
      'Drop columns of 3 gems, cycle their colors, and chain cascading matches for huge combos! An endless run — how far can you push it?',
      '_ccStartRun');
  }

  function _ccStartRun(){
    CC.board = [];
    for (var r = 0; r < CC_ROWS; r++){ var row = []; for (var c = 0; c < CC_COLS; c++) row.push(null); CC.board.push(row); }
    CC.score = 0; CC.level = 1; CC.cleared = 0; CC.bestChain = 0; CC.animating = false; CC.active = true;
    CC.particles = []; CC.chainMsg = ''; CC.lastFall = 0;
    CC.queue = [_ccRandColumn(), _ccRandColumn()];
    _ccSpawn();
    a2Shell('💎 Crystal Cascade', 'openWonderland()',
      '<div class="wond-hud" id="ccHud"></div>' + a2KeyLegend('← → move · ↑/X cycle colors · ↓ soft drop · Space hard drop') +
      '<div class="wond-side-layout"><div class="wond-side-main">' +
        '<div class="wond-canvas-wrap"><canvas id="ccCanvas" class="a2-canvas" style="--cw:' + (CC_COLS * CC_CELL) + ';--ch:' + (CC_ROWS * CC_CELL) + '" width="' + (CC_COLS * CC_CELL) + '" height="' + (CC_ROWS * CC_CELL) + '"></canvas></div>' +
        '<div class="a2-pad"><div>' +
          '<button type="button" class="btn btn-secondary" onclick="_ccMove(-1)">◀</button>' +
          '<button type="button" class="btn btn-secondary" onclick="_ccCycle()">⟳</button>' +
          '<button type="button" class="btn btn-secondary" onclick="_ccSoftDrop(true)">▼</button>' +
          '<button type="button" class="btn btn-secondary" onclick="_ccMove(1)">▶</button>' +
          '<button type="button" class="btn btn-primary" onclick="_ccHardDrop()">⬇⬇</button>' +
        '</div></div>' +
      '</div><div class="wond-side-panel" id="ccNextPanel"></div></div>',
      'Match 3+ gems in a row, column, or either diagonal. Chain reactions score big — cycle the falling gems to set up cascades!');
    _ccHud();
    _ccRenderNextPanel();   // _ccSpawn() ran before the shell HTML existed, so #ccNextPanel wasn't there yet — render it now
    _ccDraw();
    a2Keys(function(e){
      var k = e.key.toLowerCase();
      if (k === 'arrowleft'){ e.preventDefault(); _ccMove(-1); }
      else if (k === 'arrowright'){ e.preventDefault(); _ccMove(1); }
      else if (k === 'arrowup' || k === 'x'){ e.preventDefault(); _ccCycle(); }
      else if (k === 'arrowdown'){ e.preventDefault(); _ccSoftDrop(true); }
      else if (k === ' ' || k === 'spacebar'){ e.preventDefault(); _ccHardDrop(); }
    });
    A2.raf = requestAnimationFrame(_ccLoop);
  }

  function _ccMove(dx){
    if (!CC.active || CC.animating) return;
    if (_ccCanOccupy(CC.piece.col + dx, CC.piece.row)){ CC.piece.col += dx; if (typeof playSfx === 'function') playSfx('click'); }
  }
  function _ccCycle(){
    if (!CC.active || CC.animating) return;
    CC.piece.colors.unshift(CC.piece.colors.pop());
    if (typeof playSfx === 'function') playSfx('click');
  }
  function _ccSoftDrop(manual){
    if (!CC.active || CC.animating) return false;
    if (_ccCanOccupy(CC.piece.col, CC.piece.row + 1)){
      CC.piece.row++;
      if (manual){ CC.score += 1; _ccHud(); }
      return true;
    }
    _ccLockActive();
    return false;
  }
  function _ccHardDrop(){
    if (!CC.active || CC.animating) return;
    var distance = 0;
    while (_ccCanOccupy(CC.piece.col, CC.piece.row + 1)){ CC.piece.row++; distance++; }
    CC.score += distance * 2;
    if (typeof playSfx === 'function') playSfx('click');
    _ccLockActive();
  }

  function _ccFallInterval(){ return Math.max(115, 820 - (CC.level - 1) * 65); }

  function _ccLoop(ts){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_ccLoop);
    if (!CC.lastFall) CC.lastFall = ts;
    if (CC.active && !CC.animating && (ts - CC.lastFall) >= _ccFallInterval()){
      _ccSoftDrop(false);
      CC.lastFall = ts;
    }
    _ccDraw();
  }

  function _ccLockActive(){
    for (var i = 0; i < 3; i++){
      var r = CC.piece.row + i;
      if (r < 0){ _ccGameOver(); return; }
      CC.board[r][CC.piece.col] = CC.piece.colors[i];
    }
    CC.animating = true;
    _ccResolveChain(0);
  }

  // Finds every gem that's part of a 3+ run in ANY of the 4 line directions — returns a
  // key-set object ('r,c' -> true), matching the codebase's usual set-via-object idiom.
  function _ccFindMatches(){
    var matched = {};
    for (var r = 0; r < CC_ROWS; r++){
      for (var c = 0; c < CC_COLS; c++){
        var color = CC.board[r][c];
        if (color === null) continue;
        for (var d = 0; d < CC_DIRS.length; d++){
          var dc = CC_DIRS[d][0], dr = CC_DIRS[d][1];
          var pr = r - dr, pc = c - dc;
          if (pr >= 0 && pr < CC_ROWS && pc >= 0 && pc < CC_COLS && CC.board[pr][pc] === color) continue;
          var run = [], rr = r, cc = c;
          while (rr >= 0 && rr < CC_ROWS && cc >= 0 && cc < CC_COLS && CC.board[rr][cc] === color){
            run.push(rr + ',' + cc); rr += dr; cc += dc;
          }
          if (run.length >= 3){ for (var i2 = 0; i2 < run.length; i2++) matched[run[i2]] = true; }
        }
      }
    }
    return matched;
  }
  function _ccMatchCount(matched){ var n = 0; for (var k in matched) n++; return n; }
  function _ccRemoveMatches(matched){
    for (var key in matched){ var p = key.split(','); CC.board[+p[0]][+p[1]] = null; }
  }
  function _ccApplyGravity(){
    for (var c = 0; c < CC_COLS; c++){
      var values = [];
      for (var r = CC_ROWS - 1; r >= 0; r--){ if (CC.board[r][c] !== null) values.push(CC.board[r][c]); }
      for (var r2 = CC_ROWS - 1, i = 0; r2 >= 0; r2--, i++){ CC.board[r2][c] = i < values.length ? values[i] : null; }
    }
  }

  // Cascades: match → pause → clear → pause → gravity → pause → re-check, chain-scoring each
  // round, until a round finds nothing — then the level ramp updates and the next piece spawns.
  function _ccResolveChain(chain){
    var matched = _ccFindMatches();
    var count = _ccMatchCount(matched);
    if (count === 0){
      CC.level = 1 + Math.floor(CC.cleared / 40);
      CC.animating = false;
      CC.chainMsg = '';
      _ccSpawn();
      _ccHud();
      CC.lastFall = 0;
      return;
    }
    chain++;
    CC.bestChain = Math.max(CC.bestChain, chain);
    CC.cleared += count;
    CC.score += Math.round((count * 30 + Math.max(0, count - 3) * 18) * chain * CC.level);
    CC.chainMsg = (chain === 1 ? '✨ Match!' : ('🔗 Chain ×' + chain)) + ' — ' + count + ' gems!';
    _ccCreateEffects(matched);
    _ccHud();
    if (typeof playSfx === 'function') playSfx('solve-correct');
    a2Later(function(){
      _ccRemoveMatches(matched);
      a2Later(function(){
        _ccApplyGravity();
        a2Later(function(){ _ccResolveChain(chain); }, 210);
      }, 90);
    }, 260);
  }

  function _ccCreateEffects(matched){
    for (var key in matched){
      var p = key.split(','), r = +p[0], c2 = +p[1];
      var colorIndex = CC.board[r][c2];
      var x = c2 * CC_CELL + CC_CELL / 2, y = r * CC_CELL + CC_CELL / 2;
      for (var i = 0; i < 6; i++){
        CC.particles.push({ x: x, y: y, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.7) * 4, life: 1, color: colorIndex, size: 3 + Math.random() * 4 });
      }
    }
  }

  function _ccHud(){
    var hud = document.getElementById('ccHud'); if (!hud) return;
    hud.innerHTML = '<span class="wond-chip">⭐ Score: <b>' + CC.score + '</b></span>' +
      '<span class="wond-chip">🎚️ Level: <b>' + CC.level + '</b></span>' +
      '<span class="wond-chip">💎 Cleared: <b>' + CC.cleared + '</b></span>' +
      '<span class="wond-chip">🔗 Best chain: <b>×' + CC.bestChain + '</b></span>' +
      (CC.chainMsg ? '<span class="wond-chip wond-chip-hot">' + CC.chainMsg + '</span>' : '');
  }
  // Right-side preview panel — 2 triplets deep (was a single next-only swatch buried in the HUD
  // chip strip; user 2026-07-20: "show the next and next next").
  function _ccRenderNextPanel(){
    var p = document.getElementById('ccNextPanel'); if (!p) return;
    p.innerHTML = (typeof wondNextPanelHtml === 'function') ? wondNextPanelHtml('🔮 Next', [
      { label: 'Next', contentHtml: _ccTripletSwatch(CC.queue[0]) },
      { label: 'Next Next', contentHtml: _ccTripletSwatch(CC.queue[1]) }
    ]) : '';
  }
  // Stacked top-to-bottom (not a row) so the swatch matches the actual falling orientation of a
  // vertical 3-gem piece.
  function _ccTripletSwatch(colors){
    if (!colors) return '';
    return '<div style="display:flex;flex-direction:column;gap:2px;align-items:center">' + colors.map(function(ci){
      var color = CC_COLORS[ci];
      return '<span style="display:inline-block;width:16px;height:16px;border-radius:50%;' +
        'background:' + color.main + ';box-shadow:0 0 0 1px rgba(0,0,0,.35) inset,-2px -2px 0 rgba(255,255,255,.3) inset"></span>';
    }).join('') + '</div>';
  }

  function _ccDrawGem(c, x, y, size, colorIndex, alpha){
    alpha = (alpha == null) ? 1 : alpha;
    var color = CC_COLORS[colorIndex];
    var cx = x + size / 2, cy = y + size / 2, r = size * 0.40;
    c.save();
    c.globalAlpha = alpha;
    c.translate(cx, cy);
    c.beginPath();
    for (var i = 0; i < 8; i++){
      var angle = Math.PI / 8 + i * Math.PI / 4;
      var px = Math.cos(angle) * r, py = Math.sin(angle) * r;
      if (i === 0) c.moveTo(px, py); else c.lineTo(px, py);
    }
    c.closePath();
    var grad = c.createRadialGradient(-r * 0.38, -r * 0.42, r * 0.05, 0, 0, r * 1.15);
    grad.addColorStop(0, color.shine);
    grad.addColorStop(0.26, color.main);
    grad.addColorStop(1, color.edge);
    c.fillStyle = grad;
    c.fill();
    c.strokeStyle = 'rgba(255,255,255,.32)';
    c.lineWidth = Math.max(1, r * 0.05);
    c.stroke();
    c.beginPath();
    c.ellipse(-r * 0.26, -r * 0.30, r * 0.16, r * 0.08, -0.45, 0, Math.PI * 2);
    c.fillStyle = 'rgba(255,255,255,.72)';
    c.fill();
    c.restore();
  }

  function _ccDraw(){
    var cv = document.getElementById('ccCanvas'); if (!cv) return;
    var c = cv.getContext('2d'), T = CC_CELL;
    c.fillStyle = '#0b1028'; c.fillRect(0, 0, cv.width, cv.height);
    c.strokeStyle = 'rgba(255,255,255,.05)';
    for (var r = 0; r < CC_ROWS; r++) for (var col = 0; col < CC_COLS; col++) c.strokeRect(col * T + 0.5, r * T + 0.5, T - 1, T - 1);
    for (var r2 = 0; r2 < CC_ROWS; r2++) for (var col2 = 0; col2 < CC_COLS; col2++){
      var color = CC.board[r2][col2];
      if (color !== null) _ccDrawGem(c, col2 * T, r2 * T, T, color);
    }
    if (CC.active && CC.piece){
      for (var i = 0; i < 3; i++){
        var rr = CC.piece.row + i;
        if (rr >= 0) _ccDrawGem(c, CC.piece.col * T, rr * T, T, CC.piece.colors[i]);
      }
    }
    var alive = [];
    for (var pi = 0; pi < CC.particles.length; pi++){
      var p = CC.particles[pi];
      p.x += p.vx; p.y += p.vy; p.vy += 0.09; p.life -= 0.04;
      if (p.life > 0){
        c.beginPath();
        c.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        c.fillStyle = CC_COLORS[p.color].main;
        c.globalAlpha = Math.max(0, p.life);
        c.fill();
        c.globalAlpha = 1;
        alive.push(p);
      }
    }
    CC.particles = alive;
  }

  function _ccGameOver(){
    CC.active = false;
    if (typeof playSfx === 'function') playSfx('wrong');
    var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('crystal', CC.score, CC.level) : false;
    var frac = Math.min(1, CC.score / 4000);
    a2Result('💎 Crystal Cascade', '💥 Game Over!' + (newHigh ? ' 🏆' : ''),
      'Final score <b>' + CC.score + '</b> · reached level <b>' + CC.level + '</b> · best chain ×' + CC.bestChain,
      frac, 'openCrystal');
  }
