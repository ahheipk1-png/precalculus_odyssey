  // ===========================================================================
  // 💊 Virus Lab — drop 2-color capsules; 4-in-a-row clears; zap every virus!
  // ===========================================================================
  var VL = { COLS: 8, ROWS: 14, CELL: 32, grid: [], cur: null, acc: 0, last: 0,
             virusTotal: 8, over: false, won: false, queue: [],
             levelIdx: 0, totalKilled: 0, interval: 850 };
  var VL_COLS = ['', '#f0705e', '#f2c14e', '#66e0ff'];
  // Sequential labs (the old game was ONE 8-virus board — too easy). viruses = how many to seed,
  // topRow = highest row viruses may spawn in (everything above stays clear so capsules have room
  // to maneuver), interval = fall-speed ms. The final labs seed 58-62 viruses ≈ 52-55% of the whole
  // 8×14 bottle — Dr-Mario-level-20 territory, as requested ("50-60% full at the end").
  var VL_LEVELS = [
    { viruses: 12, topRow: 8, interval: 850 },
    { viruses: 18, topRow: 8, interval: 810 },
    { viruses: 24, topRow: 7, interval: 770 },
    { viruses: 30, topRow: 6, interval: 730 },
    { viruses: 36, topRow: 6, interval: 690 },
    { viruses: 42, topRow: 5, interval: 650 },
    { viruses: 48, topRow: 4, interval: 610 },
    { viruses: 53, topRow: 4, interval: 570 },
    { viruses: 58, topRow: 3, interval: 535 },
    { viruses: 62, topRow: 3, interval: 500 }
  ];

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
    _vlRenderNextPanel();                                   // refresh the right-side NEXT preview
    if (_vlBlocked(VL.cur)){
      VL.over = true;
      var killed = VL.virusTotal - _vlVirusLeft();
      VL.totalKilled += killed;
      var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('virusLab', VL.totalKilled * 100, VL.levelIdx + 1) : false;
      // Reward frac = progress through the WHOLE run (labs cleared + partial credit on this one).
      var frac = Math.min(0.95, (VL.levelIdx + killed / Math.max(1, VL.virusTotal)) / VL_LEVELS.length);
      a2Later(function(){
        a2Result('💊 Virus Lab', '🦠 The lab is overrun!' + (newHigh ? ' 🏆' : ''),
          'Lab <b>' + (VL.levelIdx + 1) + ' / ' + VL_LEVELS.length + '</b> — <b>' + VL.totalKilled +
          '</b> viruses zapped this run. So close!',
          frac, 'openVirusLab');
      }, 500);
    }
  }
  function _vlVirusLeft(){ var n = 0; for (var y = 0; y < VL.ROWS; y++) for (var x = 0; x < VL.COLS; x++){ if (VL.grid[y][x] && VL.grid[y][x].virus) n++; } return n; }
  function _vlHud(){
    var hud = document.getElementById('vlHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">🧪 Lab <b>' + (VL.levelIdx + 1) + ' / ' + VL_LEVELS.length + '</b></span>' +
      '<span class="wond-chip">🦠 Viruses left: <b>' + _vlVirusLeft() + '</b></span>';
  }
  // Right-side preview panel — 2 pills deep (Dr. Mario-style NEXT box), docked beside the board
  // instead of buried in the top HUD chip strip (user 2026-07-20: "show the next and next next").
  function _vlRenderNextPanel(){
    var p = document.getElementById('vlNextPanel'); if (!p) return;
    p.innerHTML = (typeof wondNextPanelHtml === 'function') ? wondNextPanelHtml('💊 Next', [
      { label: 'Next', contentHtml: _vlPillSwatch(VL.queue[0]) },
      { label: 'Next Next', contentHtml: _vlPillSwatch(VL.queue[1]) }
    ]) : '';
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
      VL.totalKilled += VL.virusTotal;
      if (VL.levelIdx + 1 < VL_LEVELS.length){
        // Lab cleared — advance for FREE (no pass re-charge), matching the other sequential games.
        if (typeof playSfx === 'function') playSfx('victory');
        if (typeof showToast === 'function') showToast('🧪 Lab ' + (VL.levelIdx + 1) + ' sterilized! The next lab is more infected…');
        a2Later(function(){ VL.levelIdx++; _vlLevel(); }, 900);
      } else {
        var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('virusLab', VL.totalKilled * 100, VL_LEVELS.length) : false;
        a2Later(function(){
          a2Result('💊 Virus Lab', '🌟 LAB STERILIZED! 🌟' + (newHigh ? ' 🏆' : ''),
            'All <b>' + VL_LEVELS.length + '</b> labs cleansed · <b>' + VL.totalKilled +
            '</b> viruses zapped — Dr. You saves the day!', 1, 'openVirusLab');
        }, 600);
      }
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

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_vlStartRun').
  function openVirusLab(){
    gameWelcome('virusLab', '💊', 'Virus Lab',
      'Drop 2-color capsules; match 4 in a line to zap every virus! ' + VL_LEVELS.length +
      ' labs — each one more infected than the last!',
      '_vlStartRun');
  }

  // TRUE if putting colour `col` at (x,y) would line up 3+ same-coloured cells with what's already
  // on the grid — used at seeding time so a fresh board never contains a nearly-made (or, worse, an
  // already-made) match that would self-clear on the first resolve pass and look like a bug.
  function _vlMakes3(x, y, col){
    var run = 1, i;
    for (i = x - 1; i >= 0 && VL.grid[y][i] && VL.grid[y][i].col === col; i--) run++;
    for (i = x + 1; i < VL.COLS && VL.grid[y][i] && VL.grid[y][i].col === col; i++) run++;
    if (run >= 3) return true;
    run = 1;
    for (i = y - 1; i >= 0 && VL.grid[i][x] && VL.grid[i][x].col === col; i--) run++;
    for (i = y + 1; i < VL.ROWS && VL.grid[i][x] && VL.grid[i][x].col === col; i++) run++;
    return run >= 3;
  }

  function _vlStartRun(){ VL.levelIdx = 0; VL.totalKilled = 0; _vlLevel(); }

  function _vlLevel(){
    var cfg = VL_LEVELS[Math.min(VL.levelIdx, VL_LEVELS.length - 1)];
    VL.interval = cfg.interval;
    VL.grid = []; for (var r = 0; r < VL.ROWS; r++) VL.grid.push(new Array(VL.COLS).fill(0));
    VL.over = false; VL.won = false; VL.acc = 0; VL.last = 0;
    VL.queue = [_vlRoll(), _vlRoll()];                     // seed the NEXT preview
    // Seed viruses through the spawn zone in random order; each cell takes the first of a shuffled
    // colour trio that doesn't line up 3-in-a-row. At the densest labs the odd cell can refuse all
    // three colours — it's skipped, so the REAL count is whatever actually landed.
    var cells = [];
    for (var vy = cfg.topRow; vy < VL.ROWS; vy++) for (var vx = 0; vx < VL.COLS; vx++) cells.push([vx, vy]);
    for (var s = cells.length - 1; s > 0; s--){ var j = rand(0, s); var t = cells[s]; cells[s] = cells[j]; cells[j] = t; }
    var placed = 0;
    for (var i = 0; i < cells.length && placed < cfg.viruses; i++){
      var cols = [1, 2, 3];
      for (var s2 = 2; s2 > 0; s2--){ var j2 = rand(0, s2); var t2 = cols[s2]; cols[s2] = cols[j2]; cols[j2] = t2; }
      for (var ci = 0; ci < 3; ci++){
        if (!_vlMakes3(cells[i][0], cells[i][1], cols[ci])){
          VL.grid[cells[i][1]][cells[i][0]] = { col: cols[ci], virus: true }; placed++; break;
        }
      }
    }
    VL.virusTotal = placed;
    a2Shell('💊 Virus Lab', 'openWonderland()',
      '<div class="wond-hud" id="vlHud"></div>' + a2KeyLegend('← → move · ↑ rotate · ↓ soft · Space HARD drop') +
      '<div class="wond-side-layout"><div class="wond-side-main">' +
        '<div class="wond-canvas-wrap"><canvas id="vlCanvas" class="a2-canvas" style="--cw:' + (VL.COLS * VL.CELL) + ';--ch:' + (VL.ROWS * VL.CELL) + '" width="' + (VL.COLS * VL.CELL) + '" height="' + (VL.ROWS * VL.CELL) + '"></canvas></div>' +
        '<div class="a2-pad"><div>' +
          '<button type="button" class="btn btn-secondary" onclick="_vlTry(-1,0,0)">◀</button>' +
          '<button type="button" class="btn btn-secondary" onclick="_vlTry(0,0,1)">⟳</button>' +
          '<button type="button" class="btn btn-secondary" onclick="_vlDown()">▼</button>' +
          '<button type="button" class="btn btn-secondary" onclick="_vlTry(1,0,0)">▶</button>' +
        '</div></div>' +
      '</div><div class="wond-side-panel" id="vlNextPanel"></div></div>',
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
      if (VL.acc > (VL.interval || 850)){ VL.acc = 0; _vlDown(); }
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

