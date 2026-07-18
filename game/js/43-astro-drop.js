  // ===========================================================================
  // 🟦 Astro Drop — falling tetrominoes; clear lines, speed rises every 10 lines.
  // ===========================================================================
  var AD = { COLS: 10, ROWS: 18, CELL: 28, grid: [], cur: null, acc: 0, last: 0,
             score: 0, lines: 0, level: 1, startLevel: 1, levelIdx: 0, over: false };
  var AD_SHAPES = [
    [[1,1,1,1]],            // I
    [[1,1],[1,1]],          // O
    [[1,1,1],[0,1,0]],      // T
    [[0,1,1],[1,1,0]],      // S
    [[1,1,0],[0,1,1]],      // Z
    [[1,0,0],[1,1,1]],      // J
    [[0,0,1],[1,1,1]]       // L
  ];
  var AD_COLS = ['', '#66e0ff', '#f2c14e', '#c39bff', '#7bd88f', '#f0705e', '#6ea8ff', '#ffb45e'];
  var AD_LEVELS = [
    { name: 'Cruise',    startLevel: 1 },
    { name: 'Ascent',    startLevel: 3 },
    { name: 'Booster',   startLevel: 5 },
    { name: 'Orbital',   startLevel: 8 },
    { name: 'Escape Velocity', startLevel: 12 }
  ];

  function _adRot(m){ var r = []; for (var x = 0; x < m[0].length; x++){ var row = []; for (var y = m.length - 1; y >= 0; y--) row.push(m[y][x]); r.push(row); } return r; }
  function _adHit(shape, px, py){
    for (var y = 0; y < shape.length; y++) for (var x = 0; x < shape[y].length; x++){
      if (!shape[y][x]) continue;
      var gx = px + x, gy = py + y;
      if (gx < 0 || gx >= AD.COLS || gy >= AD.ROWS) return true;
      if (gy >= 0 && AD.grid[gy][gx]) return true;
    }
    return false;
  }
  function _adSpawn(){
    var i = rand(0, AD_SHAPES.length - 1);
    AD.cur = { shape: AD_SHAPES[i].map(function(r){ return r.slice(); }), col: i + 1, x: 3, y: -1 };
    if (_adHit(AD.cur.shape, AD.cur.x, AD.cur.y)){
      AD.over = true;
      a2Later(_adGameOver, 500);
    }
  }
  // Custom result screen (not the generic a2Result) so it can also record a leaderboard score.
  function _adGameOver(){
    a2StopAll();
    var frac = Math.min(1, AD.lines / 18);
    var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('astroDrop', AD.score, AD.level) : false;
    var view = a2View(); if (!view) return;
    view.innerHTML = '<div class="wond-board">' +
      '<div class="wond-head"><h2 class="wond-title">' + (AD.lines >= 15 ? '🌟 STELLAR RUN! 🌟' : '💥 Stack overflow!') + (newHigh ? ' 🏆' : '') + '</h2>' +
        '<p class="wond-sub">Score <b>' + AD.score + '</b> · <b>' + AD.lines + '</b> lines · speed tier ' + AD.level + '</p></div>' +
      '<div class="wond-result-card"><div class="wond-result-label">Your prizes</div><div class="wond-prizes" id="adPrizes"></div></div>' +
      '<div class="wond-footer">' +
        '<button type="button" class="btn btn-primary" onclick="openAstroDrop()" data-tooltip="Back to Astro Drop\'s welcome screen.">↻ Play Again</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openWonderland()">← Lobby</button>' +
      '</div></div>';
    var r = a2Reward(frac);
    var prizesEl = document.getElementById('adPrizes');
    if (prizesEl && typeof chipsSummary === 'function'){
      prizesEl.innerHTML = '<span class="wond-chip wond-prize-chip">💵 Cash ×' + r.cash + '</span>' +
        '<span class="wond-chip wond-prize-chip">' + chipsSummary(r.loot.chips || {}) +
        (r.loot.gold ? ' 🥇' + r.loot.gold : '') + (r.loot.silver ? ' 🥈' + r.loot.silver : '') + '</span>';
    }
  }
  function _adLock(){
    var s = AD.cur;
    for (var y = 0; y < s.shape.length; y++) for (var x = 0; x < s.shape[y].length; x++){
      if (s.shape[y][x] && s.y + y >= 0) AD.grid[s.y + y][s.x + x] = s.col;
    }
    var cleared = 0;
    for (var r = AD.ROWS - 1; r >= 0; r--){
      if (AD.grid[r].every(function(c){ return c; })){
        AD.grid.splice(r, 1);
        AD.grid.unshift(new Array(AD.COLS).fill(0));
        cleared++; r++;
      }
    }
    if (cleared){
      AD.score += [0, 100, 300, 500, 800][cleared] * AD.level;
      AD.lines += cleared;
      AD.level = AD.startLevel + Math.floor(AD.lines / 10);
      if (typeof playSfx === 'function') playSfx('correct');
    } else if (typeof playSfx === 'function') playSfx('click');
    _adHud();
    _adSpawn();
  }
  function _adHud(){
    var hud = document.getElementById('adHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">⭐ <b>' + AD.score + '</b></span>' +
      '<span class="wond-chip">📏 Lines: <b>' + AD.lines + '</b></span>' +
      '<span class="wond-chip">🚀 Lv <b>' + AD.level + '</b></span>';
  }
  function _adMove(dx){ if (!_adHit(AD.cur.shape, AD.cur.x + dx, AD.cur.y)) AD.cur.x += dx; }
  function _adDown(){ if (!_adHit(AD.cur.shape, AD.cur.x, AD.cur.y + 1)) AD.cur.y++; else _adLock(); }
  function _adRotate(){
    var r = _adRot(AD.cur.shape);
    var kicks = [0, -1, 1, -2, 2];
    for (var i = 0; i < kicks.length; i++){
      if (!_adHit(r, AD.cur.x + kicks[i], AD.cur.y)){ AD.cur.shape = r; AD.cur.x += kicks[i]; return; }
    }
  }
  function _adHardDrop(){ while (!_adHit(AD.cur.shape, AD.cur.x, AD.cur.y + 1)) AD.cur.y++; _adLock(); }

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('adStart'). No more starting-speed picker: every run always begins at the
  // easiest preset (AD_LEVELS[0]) — the built-in speed ramp (every 10 lines) supplies the
  // rising difficulty from there, the same endless-run idea as Crystal Cascade.
  function openAstroDrop(){
    a2StopAll();
    gameWelcome('astroDrop', '🟦', 'Astro Drop',
      'Falling blocks! Fill whole lines to clear them — speed rises every 10 lines. An endless run: see how far you can push it!',
      'adStart');
  }

  function adStart(){
    var lv = AD_LEVELS[0];
    AD.levelIdx = 0;
    AD.grid = []; for (var r = 0; r < AD.ROWS; r++) AD.grid.push(new Array(AD.COLS).fill(0));
    AD.score = 0; AD.lines = 0; AD.level = lv.startLevel; AD.startLevel = lv.startLevel; AD.over = false; AD.acc = 0; AD.last = 0;
    a2Shell('🟦 Astro Drop', 'openAstroDrop()',
      '<div class="wond-hud" id="adHud"></div>' + a2KeyLegend('← → move · ↑ rotate · ↓ soft drop · Space hard drop') +
      '<div class="wond-canvas-wrap"><canvas id="adCanvas" class="a2-canvas" style="--cw:' + (AD.COLS * AD.CELL) + ';--ch:' + (AD.ROWS * AD.CELL) + '" width="' + (AD.COLS * AD.CELL) + '" height="' + (AD.ROWS * AD.CELL) + '"></canvas></div>' +
      '<div class="a2-pad"><div>' +
        '<button type="button" class="btn btn-secondary" onclick="_adMove(-1)">◀</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_adRotate()">⟳</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_adDown()">▼</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_adMove(1)">▶</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_adHardDrop()">⬇⬇</button>' +
      '</div></div>',
      '⬅️➡️ move · ⬆️ rotate · ⬇️ soft drop · Space hard drop');
    _adHud(); _adSpawn();
    a2Keys(function(e){
      if (AD.over) return;
      if (e.key === 'ArrowLeft'){ e.preventDefault(); _adMove(-1); }
      else if (e.key === 'ArrowRight'){ e.preventDefault(); _adMove(1); }
      else if (e.key === 'ArrowDown'){ e.preventDefault(); _adDown(); }
      else if (e.key === 'ArrowUp'){ e.preventDefault(); _adRotate(); }
      else if (e.key === ' ' || e.key === 'Spacebar'){ e.preventDefault(); _adHardDrop(); }
    });
    A2.raf = requestAnimationFrame(_adLoop);
  }
  function _adLoop(ts){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_adLoop);
    if (AD.over) { _adDraw(); return; }
    if (!AD.last) AD.last = ts;
    AD.acc += ts - AD.last; AD.last = ts;
    var interval = Math.max(110, 750 - 65 * (AD.level - 1));
    if (AD.acc > interval){ AD.acc = 0; _adDown(); }
    _adDraw();
  }
  function _adDraw(){
    var cv = document.getElementById('adCanvas'); if (!cv) return;
    var c = cv.getContext('2d'), CL = AD.CELL;
    c.fillStyle = '#0b1626'; c.fillRect(0, 0, cv.width, cv.height);
    for (var y = 0; y < AD.ROWS; y++) for (var x = 0; x < AD.COLS; x++){
      if (AD.grid[y][x]){ c.fillStyle = AD_COLS[AD.grid[y][x]]; c.fillRect(x * CL + 1, y * CL + 1, CL - 2, CL - 2); }
    }
    if (AD.cur && !AD.over){
      c.fillStyle = AD_COLS[AD.cur.col];
      var s = AD.cur.shape;
      for (var sy = 0; sy < s.length; sy++) for (var sx = 0; sx < s[sy].length; sx++){
        if (s[sy][sx] && AD.cur.y + sy >= 0) c.fillRect((AD.cur.x + sx) * CL + 1, (AD.cur.y + sy) * CL + 1, CL - 2, CL - 2);
      }
    }
  }

