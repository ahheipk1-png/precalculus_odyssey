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
  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_blastBotStartRun').
  function openBlastBot(){
    gameWelcome('blastBot', '💣', 'Blast Bot',
      'Bomb the crates and zap the drones — mind the blast! ' + BB_LEVELS.length + ' levels.',
      '_blastBotStartRun');
  }

  function _blastBotStartRun(){
    BB.level = 0;
    _bbSetup();
    a2Shell('💣 Blast Bot', 'openWonderland()',
      '<div class="wond-hud" id="bbHud"></div>' + a2KeyLegend('Arrow keys move · Space bomb') +
      '<div class="wond-canvas-wrap"><canvas id="bbCanvas" class="a2-canvas" style="--cw:' + (BB.W * BB.T) + ';--ch:' + (BB.H * BB.T) + '" width="' + (BB.W * BB.T) + '" height="' + (BB.H * BB.T) + '"></canvas></div>' +
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
      var newHighBB = (typeof wgRecordScore === 'function') ? wgRecordScore('blastBot', BB.level * 200 + BB.kills * 20, BB_LEVELS.length) : false;
      a2Later(function(){ a2Result('💣 Blast Bot', '🌟 ALL DRONES DOWN! 🌟' + (newHighBB ? ' 🏆' : ''), 'A flawless demolition run — all ' + BB_LEVELS.length + ' levels cleared!', 1, 'openBlastBot'); }, 600);
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
          var newHighF = (typeof wgRecordScore === 'function') ? wgRecordScore('blastBot', BB.level * 200 + BB.kills * 20, BB.level + 1) : false;
          a2Later(function(){ a2Result('💣 Blast Bot', '💥 Singed circuits!' + (newHighF ? ' 🏆' : ''), 'Reached Level <b>' + (BB.level + 1) + '</b> · zapped <b>' + BB.kills + ' / ' + BB.foeStart + '</b> drones this level. Watch that blast radius!', (BB.level + BB.kills / BB.foeStart) / BB_LEVELS.length * 0.85, 'openBlastBot'); }, 500);
        }
      }
      // foe touch
      for (var ft = 0; ft < BB.foes.length; ft++){
        if (BB.foes[ft].x === BB.px && BB.foes[ft].y === BB.py && !BB.over){
          BB.over = true;
          var newHighT = (typeof wgRecordScore === 'function') ? wgRecordScore('blastBot', BB.level * 200 + BB.kills * 20, BB.level + 1) : false;
          a2Later(function(){ a2Result('💣 Blast Bot', '🛸 Zapped by a drone!' + (newHighT ? ' 🏆' : ''), 'Reached Level <b>' + (BB.level + 1) + '</b> · got <b>' + BB.kills + ' / ' + BB.foeStart + '</b> first.', (BB.level + BB.kills / BB.foeStart) / BB_LEVELS.length * 0.85, 'openBlastBot'); }, 500);
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

