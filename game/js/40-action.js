  // ============================================================================
  // Wonderland arcade — wave 2, part 2 (module 40; needs the A2 shell from 39)
  //   🟦 Astro Drop   (falling blocks)   💊 Virus Lab   (falling match)
  //   👾 Comet Muncher (maze + AI)       💣 Blast Bot   (grid + AI)
  //   🫧 Bubble Blast  (platformer)
  // ============================================================================

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
  // Custom result screen — retry needs the SAME level index and its own pass charge, so it
  // can't reuse the generic a2Result (which fires wonderPlay on a no-arg name).
  function _adGameOver(){
    a2StopAll();
    var lv = AD_LEVELS[AD.levelIdx] || AD_LEVELS[0];
    var frac = Math.min(1, AD.lines / 18);
    var view = a2View(); if (!view) return;
    view.innerHTML = '<div class="wond-board">' +
      '<div class="wond-head"><h2 class="wond-title">' + (AD.lines >= 15 ? '🌟 STELLAR RUN! 🌟' : '💥 Stack overflow!') + '</h2>' +
        '<p class="wond-sub">Level ' + (AD.levelIdx + 1) + ' · ' + lv.name + ' — Score <b>' + AD.score + '</b> · <b>' + AD.lines + '</b> lines · speed tier ' + AD.level + '</p></div>' +
      '<div class="wond-result-card"><div class="wond-result-label">Your prizes</div><div class="wond-prizes" id="adPrizes"></div></div>' +
      '<div class="wond-footer">' +
        '<button type="button" class="btn btn-primary" onclick="adStart(' + AD.levelIdx + ')" data-tooltip="Costs 1 Wonderland Pass.">↻ Retry this level (1 🎟️)</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openAstroDrop()">🎚️ Level Select</button>' +
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

  function openAstroDrop(){
    a2StopAll();
    var view = a2View(); if (!view) return;
    var passes = (typeof state === 'object' && state) ? (state.wonderPasses || 0) : 0;
    var cards = AD_LEVELS.map(function(lv, i){
      return '<div class="wond-lvl-card">' +
        '<div class="wond-lvl-num">Level ' + (i + 1) + '</div>' +
        '<div class="wond-lvl-name">' + lv.name + '</div>' +
        '<div class="wond-lvl-meta">Starts at speed tier ' + lv.startLevel + '</div>' +
        '<button type="button" class="btn btn-primary wond-lvl-play" onclick="adStart(' + i + ')" data-tooltip="Costs 1 Wonderland Pass.">Play (1 🎟️)</button>' +
      '</div>';
    }).join('');
    view.innerHTML = '<div class="wond-board">' +
      (typeof agTopBar === 'function' ? agTopBar('🟦 Astro Drop — Choose a Level', 'openWonderland()') : '') +
      '<p class="wond-sub" style="text-align:center;margin:0 0 4px">Higher levels start faster — lines still speed things up further as you go!</p>' +
      '<p class="wond-sub" style="text-align:center;margin:0 0 12px">🎟️ Passes: <b>' + passes + '</b></p>' +
      '<div class="wond-lvl-grid">' + cards + '</div>' +
      '<div class="wond-footer"><button type="button" class="btn btn-ghost" onclick="openWonderland()">← Lobby</button></div>' +
    '</div>';
  }

  function adStart(levelIdx){
    if (typeof wonderSpendPass === 'function' && !wonderSpendPass()) return;
    var lv = AD_LEVELS[levelIdx] || AD_LEVELS[0];
    AD.levelIdx = levelIdx;
    AD.grid = []; for (var r = 0; r < AD.ROWS; r++) AD.grid.push(new Array(AD.COLS).fill(0));
    AD.score = 0; AD.lines = 0; AD.level = lv.startLevel; AD.startLevel = lv.startLevel; AD.over = false; AD.acc = 0; AD.last = 0;
    a2Shell('🟦 Astro Drop — ' + lv.name, 'openAstroDrop()',
      '<div class="wond-hud" id="adHud"></div>' + a2KeyLegend('← → move · ↑ rotate · ↓ soft drop · Space hard drop') +
      '<div class="wond-canvas-wrap"><canvas id="adCanvas" class="a2-canvas" width="' + (AD.COLS * AD.CELL) + '" height="' + (AD.ROWS * AD.CELL) + '"></canvas></div>' +
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

  // ===========================================================================
  // 💊 Virus Lab — drop 2-color capsules; 4-in-a-row clears; zap every virus!
  // ===========================================================================
  var VL = { COLS: 8, ROWS: 14, CELL: 32, grid: [], cur: null, acc: 0, last: 0,
             virusTotal: 8, over: false, won: false, queue: [] };
  var VL_COLS = ['', '#f0705e', '#f2c14e', '#66e0ff'];

  // A capsule is a pair of colours. We keep a small look-ahead QUEUE so the player
  // can see the next two medicines (like Dr. Mario's "NEXT" box).
  function _vlRoll(){ return { c1: rand(1, 3), c2: rand(1, 3) }; }
  function _vlPillSwatch(p){
    if (!p) return '';
    function dot(col){ return '<span style="display:inline-block;width:15px;height:15px;border-radius:50%;' +
      'vertical-align:middle;background:' + VL_COLS[col] + ';box-shadow:0 0 0 1px rgba(0,0,0,.35) inset,-2px -2px 0 rgba(255,255,255,.3) inset"></span>'; }
    return '<span style="display:inline-block;white-space:nowrap;margin-left:3px">' + dot(p.c1) + dot(p.c2) + '</span>';
  }

  function _vlCells(cur){
    var b = (cur.rot % 2 === 0) ? { x: cur.x + 1, y: cur.y } : { x: cur.x, y: cur.y - 1 };
    var swap = cur.rot >= 2;
    return [ { x: cur.x, y: cur.y, col: swap ? cur.c2 : cur.c1 }, { x: b.x, y: b.y, col: swap ? cur.c1 : cur.c2 } ];
  }
  function _vlBlocked(cur){
    var cs = _vlCells(cur);
    for (var i = 0; i < 2; i++){
      var p = cs[i];
      if (p.x < 0 || p.x >= VL.COLS || p.y >= VL.ROWS) return true;
      if (p.y >= 0 && VL.grid[p.y][p.x]) return true;
    }
    return false;
  }
  function _vlSpawn(){
    while (VL.queue.length < 2) VL.queue.push(_vlRoll());   // keep two ready to preview
    var nx = VL.queue.shift();
    VL.queue.push(_vlRoll());                               // refill so the preview always shows two
    VL.cur = { x: 3, y: 0, rot: 0, c1: nx.c1, c2: nx.c2 };
    _vlHud();                                               // refresh the NEXT preview
    if (_vlBlocked(VL.cur)){
      VL.over = true;
      var killed = VL.virusTotal - _vlVirusLeft();
      a2Later(function(){
        a2Result('💊 Virus Lab', '🦠 The lab is overrun!',
          'You zapped <b>' + killed + ' / ' + VL.virusTotal + '</b> viruses. So close!',
          killed / VL.virusTotal * 0.8, 'openVirusLab');
      }, 500);
    }
  }
  function _vlVirusLeft(){ var n = 0; for (var y = 0; y < VL.ROWS; y++) for (var x = 0; x < VL.COLS; x++){ if (VL.grid[y][x] && VL.grid[y][x].virus) n++; } return n; }
  function _vlHud(){
    var hud = document.getElementById('vlHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">🦠 Viruses left: <b>' + _vlVirusLeft() + '</b></span>' +
      '<span class="wond-chip">💊 Next: ' + _vlPillSwatch(VL.queue[0]) + _vlPillSwatch(VL.queue[1]) + '</span>';
  }
  function _vlResolve(){
    var again = true, clearedVirus = false;
    while (again){
      again = false;
      var kill = {};
      // rows
      for (var y = 0; y < VL.ROWS; y++){
        var run = 1;
        for (var x = 1; x <= VL.COLS; x++){
          var same = x < VL.COLS && VL.grid[y][x] && VL.grid[y][x - 1] && VL.grid[y][x].col === VL.grid[y][x - 1].col;
          if (same) run++;
          else { if (run >= 4){ for (var k = x - run; k < x; k++) kill[k + ',' + y] = 1; } run = 1; }
        }
      }
      // cols
      for (var cx = 0; cx < VL.COLS; cx++){
        var run2 = 1;
        for (var cy = 1; cy <= VL.ROWS; cy++){
          var same2 = cy < VL.ROWS && VL.grid[cy][cx] && VL.grid[cy - 1][cx] && VL.grid[cy][cx].col === VL.grid[cy - 1][cx].col;
          if (same2) run2++;
          else { if (run2 >= 4){ for (var k2 = cy - run2; k2 < cy; k2++) kill[cx + ',' + k2] = 1; } run2 = 1; }
        }
      }
      var any = false;
      for (var key in kill){
        var p = key.split(','), gx = +p[0], gy = +p[1];
        if (VL.grid[gy][gx] && VL.grid[gy][gx].virus) clearedVirus = true;
        VL.grid[gy][gx] = 0; any = true;
      }
      if (any){
        again = true;
        // gravity: loose (non-virus) cells fall
        var moved = true;
        while (moved){
          moved = false;
          for (var fy = VL.ROWS - 2; fy >= 0; fy--) for (var fx = 0; fx < VL.COLS; fx++){
            var cell = VL.grid[fy][fx];
            if (cell && !cell.virus && !VL.grid[fy + 1][fx]){ VL.grid[fy + 1][fx] = cell; VL.grid[fy][fx] = 0; moved = true; }
          }
        }
      }
    }
    if (clearedVirus && typeof playSfx === 'function') playSfx('correct');
    _vlHud();
    if (_vlVirusLeft() === 0 && !VL.won){
      VL.won = true; VL.over = true;
      a2Later(function(){
        a2Result('💊 Virus Lab', '🌟 LAB STERILIZED! 🌟',
          'Every virus zapped — Dr. You saves the day!', 1, 'openVirusLab');
      }, 600);
    }
  }
  function _vlLock(){
    var cs = _vlCells(VL.cur);
    for (var i = 0; i < 2; i++){ var p = cs[i]; if (p.y >= 0) VL.grid[p.y][p.x] = { col: p.col, virus: false }; }
    VL.cur = null;
    _vlResolve();
    if (!VL.over) _vlSpawn();
  }
  function _vlTry(dx, dy, drot){
    if (!VL.cur || VL.over) return false;
    var t = { x: VL.cur.x + dx, y: VL.cur.y + dy, rot: (VL.cur.rot + drot) % 4, c1: VL.cur.c1, c2: VL.cur.c2 };
    if (drot && _vlBlocked(t)){ t.x -= 1; }   // simple wall kick
    if (_vlBlocked(t)) return false;
    VL.cur = t; return true;
  }
  function _vlDown(){ if (!VL.cur || VL.over) return; if (!_vlTry(0, 1, 0)) _vlLock(); }
  function _vlHardDrop(){ if (!VL.cur || VL.over) return; while (_vlTry(0, 1, 0)){ /* fall to the floor */ } _vlLock(); }

  function openVirusLab(){
    VL.grid = []; for (var r = 0; r < VL.ROWS; r++) VL.grid.push(new Array(VL.COLS).fill(0));
    VL.over = false; VL.won = false; VL.acc = 0; VL.last = 0; VL.virusTotal = 8;
    VL.queue = [_vlRoll(), _vlRoll()];                     // seed the NEXT preview
    var placed = 0;
    while (placed < VL.virusTotal){
      var vy = rand(7, VL.ROWS - 1), vx = rand(0, VL.COLS - 1);
      if (!VL.grid[vy][vx]){ VL.grid[vy][vx] = { col: rand(1, 3), virus: true }; placed++; }
    }
    a2Shell('💊 Virus Lab', 'openWonderland()',
      '<div class="wond-hud" id="vlHud"></div>' + a2KeyLegend('← → move · ↑ rotate · ↓ soft · Space HARD drop') +
      '<div class="wond-canvas-wrap"><canvas id="vlCanvas" class="a2-canvas" width="' + (VL.COLS * VL.CELL) + '" height="' + (VL.ROWS * VL.CELL) + '"></canvas></div>' +
      '<div class="a2-pad"><div>' +
        '<button type="button" class="btn btn-secondary" onclick="_vlTry(-1,0,0)">◀</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_vlTry(0,0,1)">⟳</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_vlDown()">▼</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_vlTry(1,0,0)">▶</button>' +
      '</div></div>',
      'Match 4 of a color in a line to clear. Zap every 🦠 to win! ⬆️ rotates.');
    _vlHud(); _vlSpawn();
    a2Keys(function(e){
      if (e.key === 'ArrowLeft'){ e.preventDefault(); _vlTry(-1, 0, 0); }
      else if (e.key === 'ArrowRight'){ e.preventDefault(); _vlTry(1, 0, 0); }
      else if (e.key === 'ArrowUp'){ e.preventDefault(); _vlTry(0, 0, 1); }
      else if (e.key === 'ArrowDown'){ e.preventDefault(); _vlDown(); }
      else if (e.key === ' ' || e.key === 'Spacebar'){ e.preventDefault(); _vlHardDrop(); }
    });
    A2.raf = requestAnimationFrame(_vlLoop);
  }
  function _vlLoop(ts){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_vlLoop);
    if (!VL.over){
      if (!VL.last) VL.last = ts;
      VL.acc += ts - VL.last; VL.last = ts;
      if (VL.acc > 850){ VL.acc = 0; _vlDown(); }
    }
    var cv = document.getElementById('vlCanvas'); if (!cv) return;
    var c = cv.getContext('2d'), CL = VL.CELL;
    c.fillStyle = '#101b2c'; c.fillRect(0, 0, cv.width, cv.height);
    // Capsules (medicine) draw as glossy pill/stadium shapes — not flat "simple blocks" — while
    // viruses draw as bumpy, angry-faced germ blobs, clearly distinct from the friendly medicine
    // (2026-07-16: was a plain rounded block for capsules + a neutral happy-face for viruses).
    function cell(x, y, col, virus){
      var cx = x * CL + CL / 2, cy = y * CL + CL / 2;
      if (virus){
        var rad = CL / 2 - 4, spikes = 8;
        c.fillStyle = VL_COLS[col];
        c.beginPath();
        for (var i = 0; i <= spikes; i++){
          var ang = (i / spikes) * Math.PI * 2;
          var r = rad + (i % 2 === 0 ? 3 : -1);
          var px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
          if (i === 0) c.moveTo(px, py); else c.lineTo(px, py);
        }
        c.closePath(); c.fill();
        c.strokeStyle = '#0b1626'; c.fillStyle = '#0b1626'; c.lineWidth = 2;
        c.beginPath(); c.moveTo(cx - 8, cy - 5); c.lineTo(cx - 3, cy - 2); c.stroke();     // angled eyebrow
        c.beginPath(); c.moveTo(cx + 8, cy - 5); c.lineTo(cx + 3, cy - 2); c.stroke();     // angled eyebrow
        c.fillRect(cx - 5, cy - 1, 3, 3); c.fillRect(cx + 2, cy - 1, 3, 3);                // beady eyes
        c.beginPath(); c.moveTo(cx - 6, cy + 7); c.lineTo(cx - 2, cy + 4); c.lineTo(cx + 1, cy + 7); c.lineTo(cx + 5, cy + 4); c.stroke(); // jagged frown
      } else {
        c.fillStyle = VL_COLS[col];
        c.beginPath();
        if (c.roundRect) c.roundRect(x * CL + 3, y * CL + 3, CL - 6, CL - 6, (CL - 6) / 2);
        else c.rect(x * CL + 3, y * CL + 3, CL - 6, CL - 6);
        c.fill();
        c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 1; c.stroke();
        c.fillStyle = 'rgba(255,255,255,.35)';   // glossy pill highlight
        c.beginPath(); c.ellipse(cx - CL * 0.14, cy - CL * 0.16, CL * 0.16, CL * 0.09, -0.5, 0, Math.PI * 2); c.fill();
      }
    }
    for (var y = 0; y < VL.ROWS; y++) for (var x = 0; x < VL.COLS; x++){
      if (VL.grid[y][x]) cell(x, y, VL.grid[y][x].col, VL.grid[y][x].virus);
    }
    if (VL.cur && !VL.over){
      var cs = _vlCells(VL.cur);
      for (var i = 0; i < 2; i++){ if (cs[i].y >= 0) cell(cs[i].x, cs[i].y, cs[i].col, false); }
    }
  }

  // ===========================================================================
  // 👾 Comet Muncher — eat every star-dot; dodge the UFOs; ⭐ pellets turn the tables!
  // ===========================================================================
  var CM = { T: 28, maze: [], W: 15, H: 13, dots: 0, eaten: 0, pac: null, ghosts: [],
             fright: 0, lives: 3, over: false, paused: 0 };
  var CM_MAZE = [
    '###############',
    '#P...........P#',
    '#.###.###.###.#',
    '#.#.........#.#',
    '#.#.###.###.#.#',
    '#.....#G#.....#',
    '#.###.#.#.###.#',
    '#.............#',
    '#.###.#.#.###.#',
    '#.....#.#.....#',
    '#.###.###.###.#',
    '#P...........P#',
    '###############'
  ];
  function _cmWall(tx, ty){ return tx < 0 || ty < 0 || tx >= CM.W || ty >= CM.H || CM.maze[ty][tx] === '#'; }
  function _cmEnt(tx, ty, spd){ return { x: tx * CM.T + CM.T / 2, y: ty * CM.T + CM.T / 2, dir: [0,0], want: [0,0], spd: spd, sx: tx, sy: ty, tx: tx, ty: ty }; }
  function _cmTile(e){ return [Math.floor(e.x / CM.T), Math.floor(e.y / CM.T)]; }

  function openComet(){
    CM.maze = CM_MAZE.map(function(r){ return r.split(''); });
    CM.dots = 0; CM.eaten = 0; CM.fright = 0; CM.lives = 3; CM.over = false; CM.paused = 0;
    for (var y = 0; y < CM.H; y++) for (var x = 0; x < CM.W; x++){
      var ch = CM.maze[y][x];
      if (ch === '.' || ch === 'P') CM.dots++;
      if (ch === 'G') CM.maze[y][x] = ' ';
    }
    CM.maze[7][7] = ' '; CM.dots--;             // pac spawn tile has no dot
    CM.pac = _cmEnt(7, 7, 2.1);
    CM.ghosts = [ _cmEnt(7, 5, 1.8), _cmEnt(6, 5, 1.7), _cmEnt(8, 5, 1.6) ];
    CM.ghosts[0].hue = '#f0705e'; CM.ghosts[1].hue = '#c39bff'; CM.ghosts[2].hue = '#7bd88f';
    a2Shell('👾 Comet Muncher', 'openWonderland()',
      '<div class="wond-hud" id="cmHud"></div>' + a2KeyLegend('Arrow keys to move') +
      '<div class="wond-canvas-wrap"><canvas id="cmCanvas" class="a2-canvas" width="' + (CM.W * CM.T) + '" height="' + (CM.H * CM.T) + '"></canvas></div>' +
      '<div class="a2-pad"><div>' +
        '<button type="button" class="btn btn-secondary" onclick="CM.pac.want=[-1,0]">◀</button>' +
        '<button type="button" class="btn btn-secondary" onclick="CM.pac.want=[0,-1]">▲</button>' +
        '<button type="button" class="btn btn-secondary" onclick="CM.pac.want=[0,1]">▼</button>' +
        '<button type="button" class="btn btn-secondary" onclick="CM.pac.want=[1,0]">▶</button>' +
      '</div></div>',
      'Munch every ⭐ dot! Big ⭐ pellets let you chomp the UFOs for a few seconds.');
    _cmHud();
    a2Keys(function(e){
      var m = { ArrowUp: [0,-1], ArrowDown: [0,1], ArrowLeft: [-1,0], ArrowRight: [1,0] }[e.key];
      if (m){ e.preventDefault(); CM.pac.want = m; }
    });
    A2.raf = requestAnimationFrame(_cmLoop);
  }
  function _cmHud(){
    var hud = document.getElementById('cmHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">⭐ <b>' + CM.eaten + ' / ' + CM.dots + '</b></span>' +
      '<span class="wond-chip">' + '❤️'.repeat(Math.max(0, CM.lives)) + '</span>' +
      (CM.fright > 0 ? '<span class="wond-chip wond-chip-hot">⚡ CHOMP TIME!</span>' : '');
  }
  function _cmStep(e, isPac){
    // Re-evaluate direction whenever the entity crosses into a NEW tile (tx/ty changed since last
    // frame), or every frame while stopped (dir=[0,0], e.g. blocked by a wall) so a freshly-pressed
    // `want` is picked up immediately rather than waiting for a tile crossing that will never come.
    // This is tile-INDEX based, not a distance-to-centre threshold, so it can't be thrown off by any
    // speed/tile-size combination (the old threshold math worked for today's speeds, but a mismatched
    // speed could make an entity's per-frame step overshoot the detection window and skip a turn).
    // NOTE: a tile-index change is detected shortly AFTER the entity crosses the boundary into the
    // new tile (floor(x/T) flips a fraction of a step past the edge, not at the tile's centre) — so
    // this must NOT snap position to the tile centre here, or it would teleport the entity forward
    // by up to half a tile every crossing. Position is left exactly where `+= dir*spd` put it; only
    // the want/dir DECISION is re-evaluated, using the tile index as which cell to check walls from.
    var curTx = Math.floor(e.x / CM.T), curTy = Math.floor(e.y / CM.T);
    var stopped = (e.dir[0] === 0 && e.dir[1] === 0);
    if (curTx !== e.tx || curTy !== e.ty || stopped){
      e.tx = curTx; e.ty = curTy;
      var t = [curTx, curTy];
      if (isPac){
        if (e.want && !_cmWall(t[0] + e.want[0], t[1] + e.want[1])) e.dir = e.want.slice();
        if (_cmWall(t[0] + e.dir[0], t[1] + e.dir[1])) e.dir = [0, 0];
      } else {
        var opts = [];
        var dirs = [[0,-1],[0,1],[-1,0],[1,0]];
        for (var i = 0; i < 4; i++){
          var d = dirs[i];
          if (_cmWall(t[0] + d[0], t[1] + d[1])) continue;
          if (d[0] === -e.dir[0] && d[1] === -e.dir[1] && opts.length) continue;
          opts.push(d);
        }
        if (!opts.length) opts = [[-e.dir[0], -e.dir[1]]];
        if (CM.fright > 0 || Math.random() < 0.35 || e.hue === '#7bd88f'){
          e.dir = opts[rand(0, opts.length - 1)];
        } else {
          var best = opts[0], bd = 1e9;
          for (var j = 0; j < opts.length; j++){
            var nx = (t[0] + opts[j][0]) * CM.T, ny = (t[1] + opts[j][1]) * CM.T;
            var dd = Math.pow(nx - CM.pac.x, 2) + Math.pow(ny - CM.pac.y, 2);
            if (dd < bd){ bd = dd; best = opts[j]; }
          }
          e.dir = best;
        }
      }
    }
    var spd = (!isPac && CM.fright > 0) ? e.spd * 0.6 : e.spd;
    e.x += e.dir[0] * spd; e.y += e.dir[1] * spd;
  }
  function _cmLoop(){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_cmLoop);
    var cv = document.getElementById('cmCanvas'); if (!cv) return;
    var c = cv.getContext('2d');
    if (!CM.over && CM.paused <= 0){
      _cmStep(CM.pac, true);
      for (var g = 0; g < CM.ghosts.length; g++) _cmStep(CM.ghosts[g], false);
      if (CM.fright > 0) CM.fright--;
      // eat dots
      var t = _cmTile(CM.pac), ch = CM.maze[t[1]][t[0]];
      if (ch === '.' || ch === 'P'){
        CM.maze[t[1]][t[0]] = ' ';
        CM.eaten++;
        if (ch === 'P'){ CM.fright = 60 * 7; if (typeof playSfx === 'function') playSfx('correct'); }
        _cmHud();
        if (CM.eaten >= CM.dots){
          CM.over = true;
          a2Later(function(){ a2Result('👾 Comet Muncher', '🌟 MAZE CLEARED! 🌟', 'Every star munched with ' + CM.lives + ' ❤️ to spare!', 1, 'openComet'); }, 500);
        }
      }
      // ghost collisions
      for (var gi = 0; gi < CM.ghosts.length; gi++){
        var gh = CM.ghosts[gi];
        if (Math.abs(gh.x - CM.pac.x) < 14 && Math.abs(gh.y - CM.pac.y) < 14){
          if (CM.fright > 0){
            gh.x = gh.sx * CM.T + CM.T / 2; gh.y = gh.sy * CM.T + CM.T / 2; gh.dir = [0, 0]; gh.tx = gh.sx; gh.ty = gh.sy;
            if (typeof playSfx === 'function') playSfx('battle-hit');
          } else {
            CM.lives--;
            _cmHud();
            if (typeof playSfx === 'function') playSfx('wrong');
            if (CM.lives <= 0){
              CM.over = true;
              a2Later(function(){ a2Result('👾 Comet Muncher', '👾 Caught by the UFOs!', 'You munched <b>' + CM.eaten + ' / ' + CM.dots + '</b> stars.', CM.eaten / CM.dots * 0.8, 'openComet'); }, 500);
            } else {
              CM.pac.x = 7 * CM.T + CM.T / 2; CM.pac.y = 7 * CM.T + CM.T / 2; CM.pac.dir = [0,0]; CM.pac.want = [0,0]; CM.pac.tx = 7; CM.pac.ty = 7;
              CM.paused = 45;
            }
            break;
          }
        }
      }
    } else if (CM.paused > 0) CM.paused--;
    // draw
    c.fillStyle = '#0b1626'; c.fillRect(0, 0, cv.width, cv.height);
    for (var y = 0; y < CM.H; y++) for (var x = 0; x < CM.W; x++){
      var m = CM.maze[y][x];
      if (m === '#'){ c.fillStyle = '#24406b'; c.fillRect(x * CM.T + 1, y * CM.T + 1, CM.T - 2, CM.T - 2); }
      else if (m === '.'){ c.fillStyle = '#f2c14e'; c.fillRect(x * CM.T + CM.T / 2 - 2.5, y * CM.T + CM.T / 2 - 2.5, 5, 5); }
      else if (m === 'P'){ c.fillStyle = '#f2c14e'; c.beginPath(); c.arc(x * CM.T + CM.T / 2, y * CM.T + CM.T / 2, 8, 0, 7); c.fill(); }
    }
    // pac
    c.fillStyle = '#ffe14d';
    c.beginPath();
    var ang = Math.atan2(CM.pac.dir[1], CM.pac.dir[0]) || 0;
    var mouth = 0.25 + 0.15 * Math.sin(Date.now() / 90);
    c.moveTo(CM.pac.x, CM.pac.y);
    c.arc(CM.pac.x, CM.pac.y, 12, ang + mouth, ang - mouth + Math.PI * 2);
    c.fill();
    // ghosts
    for (var gg = 0; gg < CM.ghosts.length; gg++){
      var G = CM.ghosts[gg];
      c.fillStyle = CM.fright > 0 ? (CM.fright < 90 && Math.floor(CM.fright / 8) % 2 ? '#ffffff' : '#3b62d9') : G.hue;
      c.beginPath();
      c.arc(G.x, G.y - 2, 11, Math.PI, 0);
      c.lineTo(G.x + 11, G.y + 9); c.lineTo(G.x - 11, G.y + 9);
      c.closePath(); c.fill();
      c.fillStyle = '#fff'; c.fillRect(G.x - 6, G.y - 6, 4, 5); c.fillRect(G.x + 2, G.y - 6, 4, 5);
    }
  }

  // ===========================================================================
  // 💣 Blast Bot — bomb the crates, zap the drones. Don't singe your circuits!
  // ===========================================================================
  var BB = { W: 13, H: 11, T: 36, hard: {}, soft: {}, px: 1, py: 1, cool: 0,
             bombs: [], flames: [], foes: [], kills: 0, over: false, keys: {},
             level: 0, radius: 2, foeMs: 420, foeStart: 3 };
  // Sequential levels (no selection): more drones, denser crates, faster drones, bigger blasts.
  var BB_LEVELS = [
    { foes: 2, density: 0.28, foeMs: 540, radius: 2 },
    { foes: 3, density: 0.38, foeMs: 460, radius: 2 },
    { foes: 4, density: 0.46, foeMs: 380, radius: 3 },
    { foes: 5, density: 0.52, foeMs: 320, radius: 3 }
  ];
  var BB_FOE_SPOTS = [ [11,9], [11,1], [1,9], [11,5], [7,9], [5,1] ];   // drawn in order per level
  function _bbKey(x, y){ return x + ',' + y; }
  function _bbBlocked(x, y){
    if (x < 0 || y < 0 || x >= BB.W || y >= BB.H) return true;
    if (BB.hard[_bbKey(x, y)] || BB.soft[_bbKey(x, y)]) return true;
    for (var i = 0; i < BB.bombs.length; i++){ if (BB.bombs[i].x === x && BB.bombs[i].y === y) return true; }
    return false;
  }
  // Builds the board for the CURRENT BB.level (no shell — that's openBlastBot's job).
  function _bbSetup(){
    var cfg = BB_LEVELS[BB.level] || BB_LEVELS[BB_LEVELS.length - 1];
    BB.hard = {}; BB.soft = {}; BB.bombs = []; BB.flames = []; BB.foes = [];
    BB.px = 1; BB.py = 1; BB.kills = 0; BB.over = false; BB.cool = 0; BB.keys = {};
    BB.radius = cfg.radius; BB.foeMs = cfg.foeMs;
    for (var y = 0; y < BB.H; y++) for (var x = 0; x < BB.W; x++){
      if (x === 0 || y === 0 || x === BB.W - 1 || y === BB.H - 1 || (x % 2 === 0 && y % 2 === 0)) BB.hard[_bbKey(x, y)] = 1;
    }
    for (var sy = 1; sy < BB.H - 1; sy++) for (var sx = 1; sx < BB.W - 1; sx++){
      if (BB.hard[_bbKey(sx, sy)]) continue;
      if (sx + sy <= 3) continue;                                   // player corner stays open
      if ((sx >= BB.W - 3 && sy >= BB.H - 3)) continue;             // foe corner stays open
      if (Math.random() < cfg.density) BB.soft[_bbKey(sx, sy)] = 1;
    }
    BB.foes = BB_FOE_SPOTS.slice(0, cfg.foes).map(function(s){ return { x: s[0], y: s[1] }; });
    BB.foeStart = BB.foes.length;
    BB.foes.forEach(function(f){ delete BB.soft[_bbKey(f.x, f.y)]; });
    _bbHud();
  }
  function openBlastBot(){
    BB.level = 0;
    _bbSetup();
    a2Shell('💣 Blast Bot', 'openWonderland()',
      '<div class="wond-hud" id="bbHud"></div>' + a2KeyLegend('Arrow keys move · Space bomb') +
      '<div class="wond-canvas-wrap"><canvas id="bbCanvas" class="a2-canvas" width="' + (BB.W * BB.T) + '" height="' + (BB.H * BB.T) + '"></canvas></div>' +
      '<div class="a2-pad"><div>' +
        '<button type="button" class="btn btn-secondary" onclick="_bbMove(-1,0)">◀</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_bbMove(0,-1)">▲</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_bbMove(0,1)">▼</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_bbMove(1,0)">▶</button>' +
        '<button type="button" class="btn btn-primary" onclick="_bbBomb()">💣</button>' +
      '</div></div>',
      'Arrows move · Space drops a bomb (blast = 2 tiles). Zap all 3 drones to win!');
    _bbHud();
    a2Keys(function(e){
      var m = { ArrowUp: [0,-1], ArrowDown: [0,1], ArrowLeft: [-1,0], ArrowRight: [1,0] }[e.key];
      if (m){ e.preventDefault(); _bbMove(m[0], m[1]); }
      else if (e.key === ' ' || e.key === 'Spacebar'){ e.preventDefault(); _bbBomb(); }
    });
    A2.raf = requestAnimationFrame(_bbLoop);
  }
  function _bbHud(){
    var hud = document.getElementById('bbHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">🎚️ Level <b>' + (BB.level + 1) + ' / ' + BB_LEVELS.length + '</b></span>' +
      '<span class="wond-chip">🛸 Drones left: <b>' + BB.foes.length + '</b></span>' +
      '<span class="wond-chip">💣 Bombs: <b>' + Math.max(0, 2 - BB.bombs.length) + '</b></span>';
  }
  function _bbMove(dx, dy){
    if (BB.over) return;
    var now = Date.now();
    if (BB.cool > now) return;
    if (_bbBlocked(BB.px + dx, BB.py + dy)) return;
    BB.px += dx; BB.py += dy;
    BB.cool = now + 130;
  }
  function _bbBomb(){
    if (BB.over || BB.bombs.length >= 2) return;
    for (var i = 0; i < BB.bombs.length; i++){ if (BB.bombs[i].x === BB.px && BB.bombs[i].y === BB.py) return; }
    BB.bombs.push({ x: BB.px, y: BB.py, t: Date.now() + 1800 });
    _bbHud();
    if (typeof playSfx === 'function') playSfx('click');
  }
  function _bbExplode(b){
    var cells = [[b.x, b.y]];
    var dirs = [[0,-1],[0,1],[-1,0],[1,0]];
    for (var d = 0; d < 4; d++){
      for (var r = 1; r <= BB.radius; r++){
        var x = b.x + dirs[d][0] * r, y = b.y + dirs[d][1] * r, k = _bbKey(x, y);
        if (BB.hard[k]) break;
        cells.push([x, y]);
        if (BB.soft[k]){ delete BB.soft[k]; break; }
      }
    }
    var until = Date.now() + 380;
    for (var c = 0; c < cells.length; c++) BB.flames.push({ x: cells[c][0], y: cells[c][1], t: until });
    if (typeof playSfx === 'function') playSfx('battle-hit');
    // chain other bombs caught in the blast
    for (var bi = 0; bi < BB.bombs.length; bi++){
      var ob = BB.bombs[bi];
      for (var ci = 0; ci < cells.length; ci++){
        if (ob.x === cells[ci][0] && ob.y === cells[ci][1]) ob.t = Math.min(ob.t, Date.now() + 80);
      }
    }
  }
  function _bbWin(){
    if (BB.over) return;
    BB.over = true;
    if (typeof playSfx === 'function') playSfx('victory');
    if (BB.level + 1 < BB_LEVELS.length){
      if (typeof showToast === 'function') showToast('🌟 ALL DRONES DOWN! Level ' + (BB.level + 1) + ' clear!');
      BB.level++;
      a2Later(function(){ _bbSetup(); }, 800);   // next, harder level — the loop keeps running
    } else {
      a2Later(function(){ a2Result('💣 Blast Bot', '🌟 ALL DRONES DOWN! 🌟', 'A flawless demolition run — all ' + BB_LEVELS.length + ' levels cleared!', 1, 'openBlastBot'); }, 600);
    }
  }
  function _bbLoop(){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_bbLoop);
    var now = Date.now();
    if (!BB.over){
      // fuses
      for (var i = BB.bombs.length - 1; i >= 0; i--){
        if (BB.bombs[i].t <= now){ var b = BB.bombs.splice(i, 1)[0]; _bbExplode(b); _bbHud(); }
      }
      BB.flames = BB.flames.filter(function(f){ return f.t > now; });
      // foes wander
      for (var fi = 0; fi < BB.foes.length; fi++){
        var f = BB.foes[fi];
        if (!f.next || f.next <= now){
          var dirs = [[0,-1],[0,1],[-1,0],[1,0]].filter(function(d){ return !_bbBlocked(f.x + d[0], f.y + d[1]); });
          if (dirs.length){ var d2 = dirs[rand(0, dirs.length - 1)]; f.x += d2[0]; f.y += d2[1]; }
          f.next = now + BB.foeMs;
        }
      }
      // flame kills
      for (var fl = 0; fl < BB.flames.length; fl++){
        var F = BB.flames[fl];
        for (var k = BB.foes.length - 1; k >= 0; k--){
          if (BB.foes[k].x === F.x && BB.foes[k].y === F.y){ BB.foes.splice(k, 1); BB.kills++; _bbHud(); }
        }
        if (F.x === BB.px && F.y === BB.py && !BB.over){
          BB.over = true;
          a2Later(function(){ a2Result('💣 Blast Bot', '💥 Singed circuits!', 'Reached Level <b>' + (BB.level + 1) + '</b> · zapped <b>' + BB.kills + ' / ' + BB.foeStart + '</b> drones this level. Watch that blast radius!', (BB.level + BB.kills / BB.foeStart) / BB_LEVELS.length * 0.85, 'openBlastBot'); }, 500);
        }
      }
      // foe touch
      for (var ft = 0; ft < BB.foes.length; ft++){
        if (BB.foes[ft].x === BB.px && BB.foes[ft].y === BB.py && !BB.over){
          BB.over = true;
          a2Later(function(){ a2Result('💣 Blast Bot', '🛸 Zapped by a drone!', 'Reached Level <b>' + (BB.level + 1) + '</b> · got <b>' + BB.kills + ' / ' + BB.foeStart + '</b> first.', (BB.level + BB.kills / BB.foeStart) / BB_LEVELS.length * 0.85, 'openBlastBot'); }, 500);
        }
      }
      if (!BB.foes.length && !BB.over) _bbWin();
    }
    // draw
    var cv = document.getElementById('bbCanvas'); if (!cv) return;
    var c = cv.getContext('2d'), T = BB.T;
    c.fillStyle = '#12243c'; c.fillRect(0, 0, cv.width, cv.height);
    c.font = '26px serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    for (var y = 0; y < BB.H; y++) for (var x = 0; x < BB.W; x++){
      var kk = _bbKey(x, y);
      if (BB.hard[kk]){ c.fillStyle = '#2c4a76'; c.fillRect(x * T + 1, y * T + 1, T - 2, T - 2); }
      else if (BB.soft[kk]){ c.fillStyle = '#8a6b4a'; c.fillRect(x * T + 3, y * T + 3, T - 6, T - 6); }
    }
    for (var bb2 = 0; bb2 < BB.bombs.length; bb2++) c.fillText('💣', BB.bombs[bb2].x * T + T / 2, BB.bombs[bb2].y * T + T / 2);
    c.fillStyle = '#ffb300';
    for (var ff = 0; ff < BB.flames.length; ff++){ c.fillStyle = '#ffb300'; c.fillRect(BB.flames[ff].x * T + 4, BB.flames[ff].y * T + 4, T - 8, T - 8); }
    for (var fo = 0; fo < BB.foes.length; fo++) c.fillText('🛸', BB.foes[fo].x * T + T / 2, BB.foes[fo].y * T + T / 2);
    if (!BB.over) c.fillText('🤖', BB.px * T + T / 2, BB.py * T + T / 2);
  }

  // ===========================================================================
  // 🫧 Bubble Blast — trap the gremlins in bubbles, then pop them!
  // ===========================================================================
  var BU = { W: 480, H: 352, plats: [], player: null, foes: [], bubbles: [],
             lives: 3, popped: 0, total: 4, over: false, keys: {}, inv: 0, shootCool: 0, level: 0 };
  // Sequential levels (no selection): more gremlins, faster, and eventually starting angry.
  var BU_LEVELS = [
    { spd: 1.0,  angry: false, spots: [[300,300,1],[100,220,-1]] },
    { spd: 1.15, angry: false, spots: [[300,300,1],[100,220,-1],[220,140,1]] },
    { spd: 1.3,  angry: false, spots: [[300,300,1],[100,220,-1],[220,140,1],[380,60,-1]] },
    { spd: 1.5,  angry: true,  spots: [[300,300,1],[100,220,-1],[220,140,1],[380,60,-1],[60,140,1]] }
  ];
  function _buSetup(){
    var cfg = BU_LEVELS[BU.level] || BU_LEVELS[BU_LEVELS.length - 1];
    BU.plats = [
      { x: 0, y: 332, w: 480, h: 20 },
      { x: 40, y: 250, w: 150, h: 12 }, { x: 290, y: 250, w: 150, h: 12 },
      { x: 140, y: 168, w: 200, h: 12 },
      { x: 20, y: 92, w: 130, h: 12 }, { x: 330, y: 92, w: 130, h: 12 }
    ];
    BU.player = { x: 40, y: 300, vx: 0, vy: 0, dir: 1, ground: false };
    BU.foes = cfg.spots.map(function(s){ return { x: s[0], y: s[1], vx: s[2] * cfg.spd, vy: 0, angry: cfg.angry }; });
    BU.bubbles = []; BU.popped = 0; BU.total = BU.foes.length;
    BU.over = false; BU.keys = {}; BU.inv = 0; BU.shootCool = 0;
    _buHud();
  }
  function _buWin(){
    if (BU.over) return;
    BU.over = true;
    if (typeof playSfx === 'function') playSfx('victory');
    if (BU.level + 1 < BU_LEVELS.length){
      if (typeof showToast === 'function') showToast('🌟 ALL GREMLINS POPPED! Level ' + (BU.level + 1) + ' clear!');
      BU.level++;
      a2Later(function(){ _buSetup(); }, 800);   // next, harder level — the loop keeps running
    } else {
      a2Later(function(){ a2Result('🫧 Bubble Blast', '🌟 ALL GREMLINS POPPED! 🌟', 'A perfect bubble hunt — all ' + BU_LEVELS.length + ' levels cleared with ' + BU.lives + ' ❤️ left!', 1, 'openBubble'); }, 600);
    }
  }
  function openBubble(){
    BU.level = 0; BU.lives = 3;
    _buSetup();
    a2Shell('🫧 Bubble Blast', 'openWonderland()',
      '<div class="wond-hud" id="buHud"></div>' + a2KeyLegend('← → move · ↑ jump · Space bubble') +
      '<div class="wond-canvas-wrap"><canvas id="buCanvas" class="a2-canvas" width="' + BU.W + '" height="' + BU.H + '"></canvas></div>' +
      '<div class="a2-pad"><div>' +
        '<button type="button" class="btn btn-secondary" onpointerdown="BU.keys.left=1" onpointerup="BU.keys.left=0">◀</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_buJump()">⤒ Jump</button>' +
        '<button type="button" class="btn btn-primary" onclick="_buShoot()">🫧</button>' +
        '<button type="button" class="btn btn-secondary" onpointerdown="BU.keys.right=1" onpointerup="BU.keys.right=0">▶</button>' +
      '</div></div>',
      'Arrows move · ⬆️ jump · Space blows a bubble. Trap a gremlin, then touch the bubble to POP it!');
    _buHud();
    a2Keys(function(e){
      if (e.key === 'ArrowLeft'){ BU.keys.left = 1; e.preventDefault(); }
      else if (e.key === 'ArrowRight'){ BU.keys.right = 1; e.preventDefault(); }
      else if (e.key === 'ArrowUp'){ _buJump(); e.preventDefault(); }
      else if (e.key === ' ' || e.key === 'Spacebar'){ _buShoot(); e.preventDefault(); }
    }, function(e){
      if (e.key === 'ArrowLeft') BU.keys.left = 0;
      else if (e.key === 'ArrowRight') BU.keys.right = 0;
    });
    A2.raf = requestAnimationFrame(_buLoop);
  }
  function _buHud(){
    var hud = document.getElementById('buHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">🎚️ Level <b>' + (BU.level + 1) + ' / ' + BU_LEVELS.length + '</b></span>' +
      '<span class="wond-chip">👹 Left: <b>' + (BU.total - BU.popped) + '</b></span>' +
      '<span class="wond-chip">' + '❤️'.repeat(Math.max(0, BU.lives)) + '</span>';
  }
  function _buOnGround(e, w, h){
    if (e.vy < 0) return false;
    for (var i = 0; i < BU.plats.length; i++){
      var p = BU.plats[i];
      if (e.x + w / 2 > p.x && e.x - w / 2 < p.x + p.w &&
          e.y + h >= p.y && e.y + h <= p.y + p.h + Math.max(4, e.vy + 1)){
        e.y = p.y - h; return true;
      }
    }
    return false;
  }
  function _buJump(){ if (BU.player && BU.player.ground){ BU.player.vy = -8.6; BU.player.ground = false; if (typeof playSfx === 'function') playSfx('click'); } }
  function _buShoot(){
    var now = Date.now();
    if (BU.over || BU.shootCool > now) return;
    BU.shootCool = now + 450;
    BU.bubbles.push({ x: BU.player.x + BU.player.dir * 16, y: BU.player.y + 8, vx: BU.player.dir * 4.4, life: 0, foe: null });
    if (typeof playSfx === 'function') playSfx('click');
  }
  function _buLoop(){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_buLoop);
    var P = BU.player;
    if (!BU.over){
      // player physics
      P.vx = (BU.keys.left ? -3 : 0) + (BU.keys.right ? 3 : 0);
      if (P.vx) P.dir = P.vx > 0 ? 1 : -1;
      P.x = Math.max(12, Math.min(BU.W - 12, P.x + P.vx));
      P.vy += 0.5; P.y += P.vy;
      P.ground = _buOnGround(P, 22, 26);
      if (P.ground) P.vy = 0;
      if (P.y > BU.H){ P.y = 0; }                       // fell off: drop in from the top
      if (BU.inv > 0) BU.inv--;
      // foes
      for (var i = 0; i < BU.foes.length; i++){
        var f = BU.foes[i];
        if (f.trapped) continue;
        f.x += f.vx * (f.angry ? 1.7 : 1);
        if (f.x < 14 || f.x > BU.W - 14) f.vx *= -1;
        f.vy += 0.5; f.y += f.vy;
        if (_buOnGround(f, 20, 22)) f.vy = 0;
        if (f.y > BU.H) f.y = 0;
        // touch player
        if (BU.inv <= 0 && Math.abs(f.x - P.x) < 20 && Math.abs(f.y - P.y) < 22){
          BU.lives--; BU.inv = 90; _buHud();
          if (typeof playSfx === 'function') playSfx('wrong');
          if (BU.lives <= 0){
            BU.over = true;
            a2Later(function(){ a2Result('🫧 Bubble Blast', '👹 The gremlins got you!', 'Reached Level <b>' + (BU.level + 1) + '</b> · popped <b>' + BU.popped + ' / ' + BU.total + '</b>.', (BU.level + BU.popped / BU.total) / BU_LEVELS.length * 0.85, 'openBubble'); }, 500);
          } else { P.x = 40; P.y = 60; P.vy = 0; }
        }
      }
      // bubbles
      for (var b = BU.bubbles.length - 1; b >= 0; b--){
        var B = BU.bubbles[b];
        B.life++;
        if (!B.foe){
          if (B.life < 26){ B.x += B.vx; } else { B.y -= 1.4; B.x += Math.sin(B.life / 9) * 0.7; }
          if (B.life > 240 || B.x < 6 || B.x > BU.W - 6 || B.y < -20){ BU.bubbles.splice(b, 1); continue; }
          // trap a foe
          for (var t = 0; t < BU.foes.length; t++){
            var tf = BU.foes[t];
            if (!tf.trapped && Math.abs(tf.x - B.x) < 18 && Math.abs(tf.y - B.y) < 20){
              tf.trapped = true; B.foe = tf; B.life = 0;
              if (typeof playSfx === 'function') playSfx('correct');
              break;
            }
          }
        } else {
          B.y = Math.max(30, B.y - 1.1); B.x += Math.sin(B.life / 12);
          B.foe.x = B.x; B.foe.y = B.y;
          if (B.life > 420){                                // escaped — angrier now!
            B.foe.trapped = false; B.foe.angry = true; B.foe.vy = 0;
            BU.bubbles.splice(b, 1); continue;
          }
          if (Math.abs(P.x - B.x) < 22 && Math.abs(P.y - B.y) < 24){   // POP!
            var idx = BU.foes.indexOf(B.foe);
            if (idx >= 0) BU.foes.splice(idx, 1);
            BU.bubbles.splice(b, 1);
            BU.popped++; _buHud();
            if (typeof playSfx === 'function') playSfx('correct');
            if (BU.popped >= BU.total) _buWin();
          }
        }
      }
    }
    // draw
    var cv = document.getElementById('buCanvas'); if (!cv) return;
    var c = cv.getContext('2d');
    c.fillStyle = '#0b1626'; c.fillRect(0, 0, BU.W, BU.H);
    c.fillStyle = '#2a9d8f';
    for (var pl = 0; pl < BU.plats.length; pl++){ var pp = BU.plats[pl]; c.fillRect(pp.x, pp.y, pp.w, pp.h); }
    c.font = '24px serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    for (var fd = 0; fd < BU.foes.length; fd++){
      var F2 = BU.foes[fd];
      if (!F2.trapped) c.fillText(F2.angry ? '😡' : '👹', F2.x, F2.y + 12);
    }
    for (var bd = 0; bd < BU.bubbles.length; bd++){
      var B2 = BU.bubbles[bd];
      c.strokeStyle = 'rgba(150,220,255,0.9)'; c.lineWidth = 2;
      c.beginPath(); c.arc(B2.x, B2.y, B2.foe ? 18 : 11, 0, 7); c.stroke();
      c.fillStyle = 'rgba(150,220,255,0.12)'; c.fill();
      if (B2.foe) c.fillText('👹', B2.x, B2.y + 2);
    }
    if (!BU.over && (BU.inv <= 0 || Math.floor(BU.inv / 6) % 2 === 0)) c.fillText('🧑‍🚀', P.x, P.y + 14);
  }

  // ===========================================================================
  // 🎳 Star Lanes Bowling — a real 10-frame game. Each throw is set by STOPPING
  // three moving markers yourself: ANGLE (aim), POWER (throw strength), SPIN
  // (curve). A strike pays an immediate +100 🪙 Gold bonus on top of the normal
  // end-of-game reward. One pass buys the whole 10-frame game.
  // ===========================================================================
  var BOWL_PIN_X = [0, -0.18, 0.18, -0.36, 0, 0.36, -0.54, -0.18, 0.18, 0.54];   // pins 1-10 (index 0-9)
  var BOWL_LANE_W = 320, BOWL_LANE_H = 460;
  var BOWL = {
    frame: 1, ballInFrame: 0, pins: [], rolls: [], frameScores: [],
    phase: 'aim',                          // aim -> power -> spin -> rolling -> result -> (next)
    angleT: 0, powerT: 0, spinT: 0,        // 0..1 oscillation trackers (triangle wave)
    angle: 0, power: 0, spin: 0,           // LOCKED values once each phase is stopped
    animT: 0, lastRollPins: 0, strikeGold: 0, over: false, lastTs: 0
  };

  // Triangle wave 0->1->0->1... driven by elapsed ms; `speed` = full cycles per second.
  function _bowlWave(tMs, speedHz){
    var p = (tMs * speedHz / 1000) % 1;
    return p < 0.5 ? p * 2 : 2 - p * 2;
  }
  function _bowlResetPins(){ BOWL.pins = [true,true,true,true,true,true,true,true,true,true]; }
  function _bowlStanding(){ var n = 0; for (var i = 0; i < 10; i++) if (BOWL.pins[i]) n++; return n; }

  // PURE: classic flat-rolls bowling scoring. rolls = per-ball pinfall (a strike is ONE entry
  // of value 10, not two). Returns an array of 10 entries — a running cumulative score once a
  // frame's bonus balls are known, or null while a frame's score isn't resolved yet.
  function bowlScoreFrames(rolls){
    var out = [], idx = 0, running = 0;
    for (var f = 0; f < 10; f++){
      if (idx >= rolls.length){ out.push(null); continue; }
      if (rolls[idx] === 10){                                   // strike
        if (idx + 2 < rolls.length){ running += 10 + rolls[idx + 1] + rolls[idx + 2]; out.push(running); }
        else { out.push(null); }
        idx += 1;
      } else if (idx + 1 < rolls.length && rolls[idx] + rolls[idx + 1] === 10){   // spare
        if (idx + 2 < rolls.length){ running += 10 + rolls[idx + 2]; out.push(running); }
        else { out.push(null); }
        idx += 2;
      } else if (idx + 1 < rolls.length){                       // open frame
        running += rolls[idx] + rolls[idx + 1]; out.push(running); idx += 2;
      } else { out.push(null); idx += 1; }                      // only 1 ball played, unresolved
    }
    return out;
  }

  // PURE: given where the ball crosses the pin deck (impactX, roughly -0.75..0.75) and how hard it
  // was thrown (power 0..1), decide which of the currently-STANDING pins (per `standing`, an array
  // of 10 booleans) get knocked down. Direct hits are pins within a power-scaled radius of impactX;
  // a single domino pass then gives immediate neighbours of a direct hit a power-scaled chance to
  // fall too (so a pocket hit at high power can clear the rack, but isn't guaranteed — same as real
  // bowling, where the 7/10 corner pins are the hardest to carry). `rand01` is injectable for tests.
  function bowlComputeKnockdown(impactX, power, standing, rand01){
    rand01 = rand01 || Math.random;
    if (Math.abs(impactX) > 0.72) return [];                    // gutter ball
    var radius = 0.10 + power * 0.20;
    var fallen = {};
    for (var i = 0; i < 10; i++){
      if (!standing[i]) continue;
      if (Math.abs(BOWL_PIN_X[i] - impactX) <= radius) fallen[i] = 1;
    }
    var directIdx = Object.keys(fallen).map(Number);
    var chainChance = 0.3 + power * 0.55;
    for (var d = 0; d < directIdx.length; d++){
      for (var j = 0; j < 10; j++){
        if (!standing[j] || fallen[j]) continue;
        if (Math.abs(BOWL_PIN_X[j] - BOWL_PIN_X[directIdx[d]]) <= 0.19 && rand01() < chainChance) fallen[j] = 1;
      }
    }
    return Object.keys(fallen).map(Number);
  }

  function _bowlHud(){
    var hud = document.getElementById('bowlHud'); if (!hud) return;
    var total = bowlScoreFrames(BOWL.rolls);
    var running = 0; for (var i = 0; i < 10; i++) if (total[i] != null) running = total[i];
    hud.innerHTML = '<span class="wond-chip">🎳 Frame <b>' + Math.min(BOWL.frame, 10) + ' / 10</b></span>' +
      '<span class="wond-chip">📊 Score: <b>' + running + '</b></span>' +
      '<span class="wond-chip">📌 Standing: <b>' + _bowlStanding() + '</b></span>' +
      (BOWL.strikeGold > 0 ? '<span class="wond-chip sl-jp-chip">🪙 Strike bonus: <b>' + BOWL.strikeGold + '</b></span>' : '');
  }

  function _bowlScorecardHtml(){
    var scores = bowlScoreFrames(BOWL.rolls);
    var cells = '';
    for (var f = 0; f < 10; f++){
      cells += '<div class="bowl-frame' + (f + 1 === BOWL.frame ? ' bowl-frame-cur' : '') + '">' +
        '<div class="bowl-frame-n">' + (f + 1) + '</div>' +
        '<div class="bowl-frame-score">' + (scores[f] != null ? scores[f] : '') + '</div></div>';
    }
    return '<div class="bowl-scorecard">' + cells + '</div>';
  }

  // Entered via wonderPlay('openBowling') from the lobby card, which already charges 1 pass — this
  // buys the WHOLE 10-frame game (unlike Sky Stacker/Astro Drop, there's no level-select here, so
  // this does NOT self-charge; the replay button below routes back through wonderPlay too).
  function openBowling(){
    BOWL.frame = 1; BOWL.ballInFrame = 0; BOWL.rolls = []; BOWL.strikeGold = 0; BOWL.over = false; BOWL._f10 = 0;
    _bowlResetPins();
    a2Shell('🎳 Star Lanes Bowling', 'openWonderland()',
      '<div class="wond-hud" id="bowlHud"></div>' +
      '<div id="bowlScorecardWrap"></div>' +
      a2KeyLegend('Space (or tap) to stop the marker — aim, then power, then spin') +
      '<div class="wond-canvas-wrap"><canvas id="bowlCanvas" class="a2-canvas" width="' + BOWL_LANE_W + '" height="' + BOWL_LANE_H + '"></canvas></div>' +
      '<div class="a2-pad"><button type="button" class="btn btn-primary" id="bowlStopBtn" onclick="_bowlStop()">⏹ STOP</button></div>',
      'Hit ⏹ (or press Space) once to lock your AIM, again to lock your POWER, again to lock your SPIN — then watch the ball roll! A strike pays an instant +100 🪙 Gold.');
    _bowlHud();
    document.getElementById('bowlScorecardWrap').innerHTML = _bowlScorecardHtml();
    _bowlStartAim();
    a2Keys(function(e){ if (e.key === ' ' || e.key === 'Spacebar'){ e.preventDefault(); _bowlStop(); } });
    BOWL.lastTs = 0;
    A2.raf = requestAnimationFrame(_bowlLoop);
  }

  function _bowlStartAim(){ BOWL.phase = 'aim'; BOWL.angleT = 0; }

  // Advances the current phase: aim -> power -> spin -> (kicks off the roll animation).
  // The marker's CURRENT value is already live in BOWL.angle/power/spin — _bowlLoop updates it
  // every frame while that phase is active — so stopping just locks it in by moving to the next
  // phase (and freezes it, since _bowlLoop only writes that field while its phase is current).
  function _bowlStop(){
    if (!a2Active() || BOWL.over) return;
    if (BOWL.phase === 'aim'){ BOWL.phase = 'power'; BOWL.powerT = 0; }
    else if (BOWL.phase === 'power'){ BOWL.phase = 'spin'; BOWL.spinT = 0; }
    else if (BOWL.phase === 'spin'){ BOWL.phase = 'rolling'; BOWL.animT = 0; }
    else { return; }
    if (typeof playSfx === 'function') playSfx('click');
  }

  function _bowlLoop(ts){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_bowlLoop);
    if (!BOWL.lastTs) BOWL.lastTs = ts;
    var dt = ts - BOWL.lastTs; BOWL.lastTs = ts;

    if (BOWL.phase === 'aim'){ BOWL.angleT += dt; BOWL.angle = _bowlWave(BOWL.angleT, 0.55) * 2 - 1; }
    else if (BOWL.phase === 'power'){ BOWL.powerT += dt; BOWL.power = _bowlWave(BOWL.powerT, 0.7); }
    else if (BOWL.phase === 'spin'){ BOWL.spinT += dt; BOWL.spin = _bowlWave(BOWL.spinT, 0.65) * 2 - 1; }
    else if (BOWL.phase === 'rolling'){
      BOWL.animT += dt / 900;
      if (BOWL.animT >= 1){ BOWL.animT = 1; _bowlResolveRoll(); }
    }
    _bowlDraw();
  }

  function _bowlResolveRoll(){
    var impactX = Math.max(-0.9, Math.min(0.9, BOWL.angle * 0.55 + BOWL.spin * 0.35));
    var knocked = bowlComputeKnockdown(impactX, BOWL.power, BOWL.pins.slice());
    knocked.forEach(function(i){ BOWL.pins[i] = false; });
    var pinCount = knocked.length;
    BOWL.lastRollPins = pinCount;
    if (pinCount === 10 && typeof playSfx === 'function') playSfx('victory');
    else if (typeof playSfx === 'function') playSfx(pinCount > 0 ? 'click' : 'wrong');
    if (pinCount === 10){
      state.coins = (state.coins || 0) + 100;
      BOWL.strikeGold += 100;
      if (typeof showToast === 'function') showToast('🎳 STRIKE! +100 🪙 Gold bonus!');
      if (typeof updateStats === 'function') updateStats();
    }
    BOWL.rolls.push(pinCount);
    BOWL.phase = 'result';
    _bowlHud();
    document.getElementById('bowlScorecardWrap').innerHTML = _bowlScorecardHtml();
    a2Later(_bowlAdvance, 900);
  }

  // Standard 10th-frame rules: frames 1-9 get a 2nd ball unless ball 1 is a strike; frame 10 gets a
  // bonus ball on a strike or spare (with pins reset before any bonus ball after a strike).
  function _bowlAdvance(){
    if (BOWL.over || !a2Active()) return;
    var f = BOWL.frame, last = BOWL.rolls[BOWL.rolls.length - 1];
    if (f < 10){
      if (BOWL.ballInFrame === 0 && last === 10){ BOWL.frame++; BOWL.ballInFrame = 0; _bowlResetPins(); }
      else if (BOWL.ballInFrame === 0){ BOWL.ballInFrame = 1; }
      else { BOWL.frame++; BOWL.ballInFrame = 0; _bowlResetPins(); }
    } else {
      // Frame 10: track how many balls have been thrown THIS frame via a local counter on BOWL.
      BOWL._f10 = (BOWL._f10 || 0) + 1;
      var tail = BOWL.rolls.slice(-BOWL._f10);
      var ball1 = tail[0], ball2 = tail[1], ball3 = tail[2];
      var done = false;
      if (BOWL._f10 === 1){
        if (ball1 === 10) _bowlResetPins();          // strike on ball 1 → fresh rack for ball 2
      } else if (BOWL._f10 === 2){
        if (ball1 === 10 || ball1 + ball2 === 10) _bowlResetPins();   // strike or spare → bonus ball 3
        else done = true;                              // open 10th frame — game over after 2 balls
      } else if (BOWL._f10 === 3){
        done = true;
      }
      if (done){ BOWL.over = true; a2Later(_bowlGameOver, 400); return; }
    }
    if (BOWL.over) return;
    _bowlStartAim();
  }

  function _bowlGameOver(){
    a2StopAll();
    var scores = bowlScoreFrames(BOWL.rolls);
    var final = 0; for (var i = 0; i < 10; i++) if (scores[i] != null) final = scores[i];
    var frac = Math.max(0, Math.min(1, final / 200));   // 200+ ≈ a strong game; 300 = perfect
    var headline = final === 300 ? '🌟 PERFECT GAME! 🌟' : (final >= 200 ? '🎳 Great bowling!' : (final >= 100 ? '🎳 Nice game!' : '🎳 Game over!'));
    var view = a2View(); if (!view) return;
    view.innerHTML = '<div class="wond-board">' +
      '<div class="wond-head"><h2 class="wond-title">' + headline + '</h2>' +
      '<p class="wond-sub">Final score <b>' + final + '</b> / 300' + (BOWL.strikeGold > 0 ? ' · +' + BOWL.strikeGold + ' 🪙 Gold from strikes' : '') + '</p></div>' +
      _bowlScorecardHtml() +
      '<div class="wond-result-card"><div class="wond-result-label">Your prizes</div><div class="wond-prizes" id="bowlPrizes"></div></div>' +
      '<div class="wond-footer">' +
        '<button type="button" class="btn btn-primary" onclick="wonderPlay(\'openBowling\')" data-tooltip="Costs 1 Wonderland Pass.">↻ Play again (1 🎟️)</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openWonderland()">← Lobby</button>' +
      '</div></div>';
    var r = a2Reward(frac);
    var prizes = document.getElementById('bowlPrizes');
    if (prizes && r){
      var chips = '<span class="wond-chip wond-prize-chip">💵 Cash ×' + (r.cash || 0) + '</span>';
      if (r.loot){
        if (r.loot.gold) chips += '<span class="wond-chip wond-prize-chip">🥇 Gold ×' + r.loot.gold + '</span>';
        if (r.loot.silver) chips += '<span class="wond-chip wond-prize-chip">🥈 Silver ×' + r.loot.silver + '</span>';
      }
      prizes.innerHTML = chips;
    }
  }

  function _bowlDraw(){
    var cv = document.getElementById('bowlCanvas'); if (!cv) return;
    var c = cv.getContext('2d'), W = BOWL_LANE_W, H = BOWL_LANE_H;
    c.fillStyle = '#2a1c10'; c.fillRect(0, 0, W, H);
    // lane
    var laneX0 = W * 0.18, laneX1 = W * 0.82;
    c.fillStyle = '#c9924f'; c.fillRect(laneX0, 20, laneX1 - laneX0, H - 90);
    c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 1;
    for (var g = 1; g < 8; g++){ var gx = laneX0 + (laneX1 - laneX0) * g / 8; c.beginPath(); c.moveTo(gx, 20); c.lineTo(gx, H - 70); c.stroke(); }
    // pins
    var pinCx = W / 2, pinCy = 70;
    for (var i = 0; i < 10; i++){
      var px = pinCx + BOWL_PIN_X[i] * (laneX1 - laneX0) * 0.62;
      var py = pinCy + Math.floor(i >= 6 ? 3 : (i >= 3 ? 2 : (i >= 1 ? 1 : 0))) * 26;
      if (!BOWL.pins[i]) continue;
      c.fillStyle = '#f4f1e8'; c.beginPath(); c.ellipse(px, py, 8, 13, 0, 0, 7); c.fill();
      c.strokeStyle = '#c0392b'; c.lineWidth = 2; c.beginPath(); c.moveTo(px - 6, py - 2); c.lineTo(px + 6, py - 2); c.stroke();
    }
    // ball + meters, drawn low on the lane (player's end)
    var meterY = H - 46;
    if (BOWL.phase === 'aim' || BOWL.phase === 'power' || BOWL.phase === 'spin'){
      c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(laneX0, meterY, laneX1 - laneX0, 14);
      if (BOWL.phase === 'aim'){
        var ax = laneX0 + (laneX1 - laneX0) * ((BOWL.angle + 1) / 2);
        c.fillStyle = '#5aa9ff'; c.fillRect(ax - 3, meterY - 4, 6, 22);
      } else if (BOWL.phase === 'power'){
        c.fillStyle = '#f0705e'; c.fillRect(laneX0, meterY, (laneX1 - laneX0) * BOWL.power, 14);
      } else {
        var sx = laneX0 + (laneX1 - laneX0) * ((BOWL.spin + 1) / 2);
        c.fillStyle = '#7bd88f'; c.fillRect(sx - 3, meterY - 4, 6, 22);
      }
    }
    // ball position: fixed x during aim/power/spin (center), animates up the lane during 'rolling'
    var ballX = pinCx, ballY = H - 30;
    if (BOWL.phase === 'rolling'){
      var impactX = Math.max(-0.9, Math.min(0.9, BOWL.angle * 0.55 + BOWL.spin * 0.35));
      var travelX = pinCx + impactX * (laneX1 - laneX0) * 0.62 * BOWL.animT;
      var startX = pinCx;
      ballX = startX + (travelX - startX);
      ballY = (H - 30) - (H - 100) * BOWL.animT;
    }
    c.fillStyle = '#1a2740'; c.beginPath(); c.arc(ballX, ballY, 9, 0, 7); c.fill();
    c.font = '13px sans-serif'; c.fillStyle = '#e8e8ea'; c.textAlign = 'center';
    var label = BOWL.phase === 'aim' ? 'AIM — stop the marker!' : BOWL.phase === 'power' ? 'POWER — stop the bar!' : BOWL.phase === 'spin' ? 'SPIN — stop the marker!' : BOWL.phase === 'result' ? (BOWL.lastRollPins + ' pin' + (BOWL.lastRollPins === 1 ? '' : 's') + '!') : '';
    if (label) c.fillText(label, W / 2, H - 8);
  }

  // ===========================================================================
  // 🎵 Cosmic Rhythm — a 4-lane falling-note rhythm game. Press D F J K (or tap
  // the lane buttons) exactly when a note crosses the hit line. Entered via
  // wonderPlay('openRhythm') (1 Wonderland Pass); difficulty picks the song
  // length + note density; replay/difficulty-change inside the game is free
  // (routes through rhythmStart/openRhythm directly, not wonderPlay again).
  // Cash-only reward via wgPayReward, like the other carnival games.
  // ===========================================================================
  var RHY_LANES = 4;
  var RHY_KEYS = ['d', 'f', 'j', 'k'];   // classic 4-key rhythm-game layout, left to right
  var RHY_KEY_LABEL = ['D', 'F', 'J', 'K'];
  var RHY_LANE_COL = ['#f0705e', '#f2c14e', '#7bd88f', '#5aa9ff'];
  var RHY_BEAT_MS = 500;          // 120 BPM
  var RHY_LEAD_MS = 2000;         // ms a note takes to fall from spawn to the hit line
  var RHY_PERFECT_MS = 90, RHY_GOOD_MS = 180;
  var RHY_DIFFS = {
    easy:   { beats: 48, density: 0.5,  doubleChance: 0.04 },
    normal: { beats: 64, density: 0.72, doubleChance: 0.14 },
    hard:   { beats: 80, density: 0.92, doubleChance: 0.28 }
  };
  var RHY = { active: false, diff: 'normal', chart: [], t: 0, lastTs: 0, ended: false,
              score: 0, combo: 0, maxCombo: 0, perfect: 0, good: 0, miss: 0, laneFlash: [0, 0, 0, 0] };

  // PURE: builds a beatmap for a difficulty. Every note is { t (ms), lane (0-3), judged }.
  // A "double" occasionally adds a 2nd note on the SAME beat in a different lane (a chord).
  function rhyGenChart(diff){
    var cfg = RHY_DIFFS[diff] || RHY_DIFFS.normal;
    var chart = [];
    for (var b = 0; b < cfg.beats; b++){
      if (Math.random() >= cfg.density) continue;
      var t = b * RHY_BEAT_MS, lane = rand(0, RHY_LANES - 1);
      chart.push({ t: t, lane: lane, judged: false });
      if (Math.random() < cfg.doubleChance){
        var lane2 = rand(0, RHY_LANES - 1);
        if (lane2 !== lane) chart.push({ t: t, lane: lane2, judged: false });
      }
    }
    chart.sort(function(a, b2){ return a.t - b2.t; });
    return chart;
  }

  function openRhythm(){
    if (typeof wgStopAll === 'function') wgStopAll();
    var v = (typeof agShowView === 'function') ? agShowView() : document.getElementById('wonderlandView');
    if (!v) return;
    var best = (typeof wgMini === 'function') ? wgMini('rhythm').highScore || 0 : 0;
    v.innerHTML = '<div class="wond-board wond-game">' +
      (typeof agTopBar === 'function' ? agTopBar('🎵 Cosmic Rhythm', 'openWonderland()') : '') +
      '<p class="wond-sub" style="text-align:center;margin-bottom:10px">Hit D F J K exactly when each note crosses the line. Pick a difficulty — replay is free until you leave!</p>' +
      '<div class="wg-diff-row" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
        '<button type="button" class="btn btn-primary" onclick="rhythmStart(\'easy\')" data-tooltip="Slower, sparser notes.">🟢 Easy</button>' +
        '<button type="button" class="btn btn-primary" onclick="rhythmStart(\'normal\')" data-tooltip="A steady beat.">🟡 Normal</button>' +
        '<button type="button" class="btn btn-primary" onclick="rhythmStart(\'hard\')" data-tooltip="Dense chords, best Cash.">🔴 Hard</button>' +
      '</div>' +
      '<p class="wond-sub" style="text-align:center;margin-top:16px">🏆 Best score: <b>' + best + '</b></p>' +
    '</div>';
  }

  function rhythmStart(diff){
    if (typeof wgStopAll === 'function') wgStopAll();
    var v = document.getElementById('wonderlandView'); if (!v) return;
    RHY.active = true; RHY.diff = diff; RHY.chart = rhyGenChart(diff);
    RHY.t = 0; RHY.lastTs = 0; RHY.ended = false;
    RHY.score = 0; RHY.combo = 0; RHY.maxCombo = 0; RHY.perfect = 0; RHY.good = 0; RHY.miss = 0;
    RHY.laneFlash = [0, 0, 0, 0];
    var W = 320, H = 460;
    v.innerHTML = '<div class="wond-board wond-game">' +
      (typeof agTopBar === 'function' ? agTopBar('🎵 Cosmic Rhythm — ' + diff.charAt(0).toUpperCase() + diff.slice(1), 'openRhythm()') : '') +
      '<div class="wond-hud" id="rhyHud"></div>' +
      a2KeyLegend('D F J K to hit each lane') +
      '<div class="wond-canvas-wrap"><canvas id="rhyCanvas" class="a2-canvas" width="' + W + '" height="' + H + '"></canvas></div>' +
      '<div class="a2-pad">' + RHY_KEY_LABEL.map(function(lb, i){
        return '<button type="button" class="btn btn-secondary" onclick="rhyHitLane(' + i + ')">' + lb + '</button>';
      }).join('') + '</div>' +
    '</div>';
    if (typeof playSfx === 'function') playSfx('ui-click');
    _rhyHud();
    a2Keys(function(e){
      var idx = RHY_KEYS.indexOf(e.key.toLowerCase());
      if (idx !== -1){ e.preventDefault(); rhyHitLane(idx); }
    });
    A2.raf = requestAnimationFrame(_rhyLoop);
  }

  function _rhyHud(){
    var hud = document.getElementById('rhyHud'); if (!hud) return;
    hud.innerHTML = '<span class="wond-chip">⭐ Score: <b>' + RHY.score + '</b></span>' +
      '<span class="wond-chip">🔥 Combo: <b>' + RHY.combo + '</b></span>' +
      '<span class="wond-chip">🎯 Perfect: <b>' + RHY.perfect + '</b></span>' +
      '<span class="wond-chip">👍 Good: <b>' + RHY.good + '</b></span>' +
      '<span class="wond-chip">💢 Miss: <b>' + RHY.miss + '</b></span>';
  }

  // Judge whichever unjudged note in `lane` is closest to "now" — PERFECT/GOOD/(too far = ignored,
  // no penalty for an early stray tap since there's nothing in range to judge against).
  function rhyHitLane(lane){
    if (!RHY.active) return;
    RHY.laneFlash[lane] = 160;
    var best = null, bestDiff = Infinity;
    for (var i = 0; i < RHY.chart.length; i++){
      var n = RHY.chart[i];
      if (n.lane !== lane || n.judged) continue;
      var d = Math.abs(RHY.t - n.t);
      if (d < bestDiff){ bestDiff = d; best = n; }
    }
    if (best && bestDiff <= RHY_GOOD_MS){
      best.judged = true;
      _rhyJudge(bestDiff <= RHY_PERFECT_MS ? 'perfect' : 'good');
    }
  }

  function _rhyJudge(kind){
    if (kind === 'perfect'){ RHY.perfect++; RHY.combo++; RHY.score += 100 + Math.min(RHY.combo, 20) * 5; if (typeof playSfx === 'function') playSfx('solve-correct'); }
    else if (kind === 'good'){ RHY.good++; RHY.combo++; RHY.score += 50 + Math.min(RHY.combo, 20) * 2; if (typeof playSfx === 'function') playSfx('ui-click'); }
    else { RHY.miss++; RHY.combo = 0; if (typeof playSfx === 'function') playSfx('wrong'); }
    if (RHY.combo > RHY.maxCombo) RHY.maxCombo = RHY.combo;
    _rhyHud();
  }

  function _rhyLoop(ts){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_rhyLoop);
    if (!RHY.lastTs) RHY.lastTs = ts;
    RHY.t += ts - RHY.lastTs; RHY.lastTs = ts;
    for (var i = 0; i < RHY.chart.length; i++){
      var n = RHY.chart[i];
      if (!n.judged && RHY.t > n.t + RHY_GOOD_MS){ n.judged = true; _rhyJudge('miss'); }
    }
    for (var L = 0; L < RHY_LANES; L++){ if (RHY.laneFlash[L] > 0) RHY.laneFlash[L] -= (ts - RHY.lastTs) || 16; }
    var lastT = RHY.chart.length ? RHY.chart[RHY.chart.length - 1].t : 0;
    if (!RHY.ended && RHY.t > lastT + RHY_GOOD_MS + 500){
      RHY.ended = true; RHY.active = false;
      a2Later(_rhyEnd, 200);
    }
    _rhyDraw();
  }

  function _rhyDraw(){
    var cv = document.getElementById('rhyCanvas'); if (!cv) return;
    var c = cv.getContext('2d'), W = cv.width, H = cv.height;
    var hitY = H - 60, laneW = W / RHY_LANES;
    c.fillStyle = '#0b1626'; c.fillRect(0, 0, W, H);
    for (var L = 0; L < RHY_LANES; L++){
      c.fillStyle = RHY.laneFlash[L] > 0 ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.02)';
      c.fillRect(L * laneW, 0, laneW, H);
      c.strokeStyle = 'rgba(255,255,255,.08)'; c.beginPath(); c.moveTo(L * laneW, 0); c.lineTo(L * laneW, H); c.stroke();
    }
    c.strokeStyle = '#f2c14e'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, hitY); c.lineTo(W, hitY); c.stroke();
    c.font = 'bold 20px sans-serif'; c.textAlign = 'center'; c.fillStyle = 'rgba(255,255,255,.5)';
    for (var K = 0; K < RHY_LANES; K++) c.fillText(RHY_KEY_LABEL[K], K * laneW + laneW / 2, hitY + 26);
    for (var i = 0; i < RHY.chart.length; i++){
      var n = RHY.chart[i];
      if (n.judged) continue;
      var y = hitY - ((n.t - RHY.t) / RHY_LEAD_MS) * hitY;
      if (y < -20 || y > H + 20) continue;
      var cx = n.lane * laneW + laneW / 2;
      c.fillStyle = RHY_LANE_COL[n.lane];
      c.beginPath(); c.arc(cx, y, 15, 0, 7); c.fill();
      c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 2; c.stroke();
    }
  }

  function _rhyEnd(){
    a2StopAll();
    var total = RHY.perfect + RHY.good + RHY.miss;
    var acc = total > 0 ? Math.round(((RHY.perfect + RHY.good * 0.5) / total) * 100) : 0;
    var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('rhythm', RHY.score, RHY.diff) : false;
    var rate = RHY.diff === 'hard' ? 0.12 : (RHY.diff === 'normal' ? 0.08 : 0.05);
    var coins = Math.max(0, Math.round(RHY.score * rate)) + (newHigh ? 20 : 0);
    if (coins > 0 && typeof wgPayReward === 'function') wgPayReward({ coins: coins, newHigh: newHigh });
    if (typeof playSfx === 'function') playSfx(acc >= 80 ? 'victory' : (acc >= 50 ? 'ui-click' : 'wrong'));
    var view = document.getElementById('wonderlandView'); if (!view) return;
    var headline = acc >= 95 ? '🌟 FLAWLESS SET!' : (acc >= 80 ? '🎵 Great rhythm!' : (acc >= 50 ? '🎶 Nice try!' : '🎵 Off-beat!'));
    view.innerHTML = '<div class="wond-board wond-game">' +
      (typeof agTopBar === 'function' ? agTopBar('🎵 Cosmic Rhythm', 'openRhythm()') : '') +
      '<div class="wond-head"><h2 class="wond-title">' + headline + (newHigh ? ' 🏆' : '') + '</h2>' +
      '<p class="wond-sub">Score <b>' + RHY.score + '</b> · ' + acc + '% accuracy · max combo <b>' + RHY.maxCombo + '</b> · ' + RHY.diff + '</p>' +
      '<p class="wond-sub">🎯 ' + RHY.perfect + ' Perfect · 👍 ' + RHY.good + ' Good · 💢 ' + RHY.miss + ' Miss</p></div>' +
      '<div class="wond-result-card"><div class="wond-result-label">Reward</div>' +
        '<div class="wond-prizes"><span class="wond-chip wond-prize-chip">💵 Cash ×' + coins + '</span></div></div>' +
      '<div class="wond-footer" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
        '<button type="button" class="btn btn-primary" onclick="rhythmStart(\'' + RHY.diff + '\')" data-tooltip="Play again, same difficulty.">↻ Replay</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openRhythm()" data-tooltip="Change difficulty.">🎚️ Difficulty</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
      '</div>' +
    '</div>';
  }
