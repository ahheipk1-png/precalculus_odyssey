  // Needs the shared A2 shell from 39-a2-shell.js (a2Shell/a2Result/a2Keys/etc.), which loads first.
  // ===========================================================================
  // 🗼 Sky Stacker — a block swings; drop it on the tower. Overhang is sliced off!
  // Levels vary the STARTING BLOCK WIDTH (narrower = harder to line up) and the
  // swing SPEED (faster = less time to react) — always unlocked, pick any level.
  // ===========================================================================
  // target = floors you must stack to clear the level and advance to the next (harder) one.
  var STK_LEVELS = [
    { name: 'Foundation',      startW: 170, speed: 0.85, target: 6  },
    { name: 'Midrise',         startW: 140, speed: 1.05, target: 8  },
    { name: 'Highrise',        startW: 110, speed: 1.30, target: 10 },
    { name: 'Skyscraper',      startW: 85,  speed: 1.60, target: 12 },
    { name: 'Space Elevator',  startW: 62,  speed: 2.00, target: 14 }
  ];
  var STK = { W: 420, H: 580, blocks: [], cur: null, t: 0, speed: 1, floors: 0, over: false, flash: 0, levelIdx: 0, maxW: 170, runFloors: 0 };

  // One pass buys a whole RUN — start at level 1 and climb through all 5 in sequence (no level-select).
  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_stkStartRun').
  function openStacker(){
    gameWelcome('skyStacker', '🗼', 'Sky Stacker',
      'Stack the swinging blocks! Clear all ' + STK_LEVELS.length + ' levels one by one — each tower taller than the last.',
      '_stkStartRun');
  }
  function _stkStartRun(){
    STK.runFloors = 0;
    stkStart(0);
  }

  // Sets up ONE level. Called by openStacker (level 0, already charged) and by the level-clear
  // handoff (free). It must NOT charge a pass itself.
  function stkStart(levelIdx){
    var lv = STK_LEVELS[levelIdx] || STK_LEVELS[0];
    STK.levelIdx = levelIdx; STK.maxW = lv.startW;
    STK.blocks = [{ x: (STK.W - lv.startW) / 2, w: lv.startW }];
    STK.cur = { x: 20, w: lv.startW };
    STK.t = 0; STK.speed = lv.speed; STK.floors = 0; STK.over = false; STK.flash = 0;
    a2Shell('🗼 Sky Stacker — L' + (levelIdx + 1) + ' ' + lv.name, 'openWonderland()',
      '<div class="wond-hud" id="stkHud"></div>' + a2KeyLegend('Space or ⬆️ to drop') +
      '<div class="wond-canvas-wrap"><canvas id="stkCanvas" class="a2-canvas" style="--cw:' + STK.W + ';--ch:' + STK.H + '" width="' + STK.W + '" height="' + STK.H + '"></canvas></div>',
      'Click, tap, or press Space to drop the block. Line it up — the overhang gets sliced off!');
    var cv = document.getElementById('stkCanvas');
    if (cv) cv.addEventListener('pointerdown', function(e){ e.preventDefault(); stkDrop(); });
    a2Keys(function(e){ if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowUp'){ e.preventDefault(); stkDrop(); } });
    _stkHud();
    A2.raf = requestAnimationFrame(_stkLoop);
  }

  function _stkHud(){
    var hud = document.getElementById('stkHud');
    var lv = STK_LEVELS[STK.levelIdx] || STK_LEVELS[0];
    if (hud) hud.innerHTML = '<span class="wond-chip">🎚️ Level <b>' + (STK.levelIdx + 1) + ' / ' + STK_LEVELS.length + '</b></span>' +
      '<span class="wond-chip">🏗️ Floors: <b>' + STK.floors + ' / ' + lv.target + '</b></span>' +
      '<span class="wond-chip">🗼 Run total: <b>' + (STK.runFloors || 0) + '</b></span>';
  }

  function stkDrop(){
    if (STK.over || !STK.cur) return;
    var below = STK.blocks[STK.blocks.length - 1];
    var left = Math.max(STK.cur.x, below.x);
    var right = Math.min(STK.cur.x + STK.cur.w, below.x + below.w);
    var overlap = right - left;
    if (overlap <= 6){
      STK.over = true;
      if (typeof playSfx === 'function') playSfx('wrong');
      a2Later(_stkGameOver, 600);
      return;
    }
    var perfect = Math.abs(STK.cur.x - below.x) < 5;
    var newW = perfect ? Math.min(STK.maxW, below.w + 6) : overlap;
    var newX = perfect ? below.x : left;
    STK.blocks.push({ x: newX, w: newW });
    STK.floors++;
    STK.speed *= 1.045;                 // faster and faster the taller the tower gets
    STK.flash = perfect ? 12 : 0;
    STK.cur = { x: 20, w: newW };
    STK.t = 0;
    if (typeof playSfx === 'function') playSfx(perfect ? 'correct' : 'click');
    STK.runFloors = (STK.runFloors || 0) + 1;
    _stkHud();
    // Sequential levels: reaching this level's target height clears it and hands off to the next
    // (harder) level for FREE — or ends the run after the last level.
    var lv = STK_LEVELS[STK.levelIdx];
    if (lv && STK.floors >= lv.target){
      STK.over = true;
      if (typeof playSfx === 'function') playSfx('correct');
      if (STK.levelIdx + 1 < STK_LEVELS.length){
        if (typeof showToast === 'function') showToast('✅ Level ' + (STK.levelIdx + 1) + ' cleared!');
        var nxt = STK.levelIdx + 1;
        a2Later(function(){ stkStart(nxt); }, 750);
      } else {
        a2Later(_stkGameOver, 750);
      }
    }
  }

  // Result screen for the whole RUN (reached on a miss, or after clearing the last level).
  // "Play again" re-charges one pass via openStacker (which restarts at level 1).
  function _stkGameOver(){
    a2StopAll();
    var lastIdx = STK_LEVELS.length - 1;
    var clearedAll = STK.levelIdx >= lastIdx && STK.floors >= (STK_LEVELS[lastIdx].target || 14);
    var totalTargets = STK_LEVELS.reduce(function(s, l){ return s + l.target; }, 0);
    var runFloors = STK.runFloors || STK.floors;
    var frac = clearedAll ? 1 : Math.min(1, runFloors / totalTargets);
    var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('skyStacker', runFloors * 20, STK.levelIdx + 1) : false;
    var headline = (clearedAll ? '🌟 ALL LEVELS CLEARED! 🌟' : '🏗️ Tower toppled!') + (newHigh ? ' 🏆' : '');
    var view = a2View(); if (!view) return;
    view.innerHTML = '<div class="wond-board">' +
      '<div class="wond-head"><h2 class="wond-title">' + headline + '</h2>' +
        '<p class="wond-sub">Reached Level <b>' + (STK.levelIdx + 1) + ' / ' + STK_LEVELS.length + '</b> · stacked <b>' + runFloors + '</b> floors this run' +
        (clearedAll ? ' — you topped out the sky!' : '. Clear all 5 levels for the grand prize!') + '</p></div>' +
      '<div class="wond-result-card"><div class="wond-result-label">Your prizes</div><div class="wond-prizes" id="stkPrizes"></div></div>' +
      '<div class="wond-footer">' +
        '<button type="button" class="btn btn-primary" onclick="openStacker()" data-tooltip="Back to Sky Stacker\'s welcome screen.">↻ Play Again</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openWonderland()">← Lobby</button>' +
      '</div></div>';
    var r = a2Reward(frac);
    var prizesEl = document.getElementById('stkPrizes');
    if (prizesEl && typeof chipsSummary === 'function'){
      prizesEl.innerHTML = '<span class="wond-chip wond-prize-chip">💵 Cash ×' + r.cash + '</span>' +
        '<span class="wond-chip wond-prize-chip">' + chipsSummary(r.loot.chips || {}) +
        (r.loot.gold ? ' 🥇' + r.loot.gold : '') + (r.loot.silver ? ' 🥈' + r.loot.silver : '') + '</span>';
    }
  }

  function _stkLoop(ts){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_stkLoop);
    var cv = document.getElementById('stkCanvas'); if (!cv) return;
    var c = cv.getContext('2d');
    STK.t += 0.03 * STK.speed;
    if (STK.cur && !STK.over){
      var range = (STK.W - STK.cur.w) / 2 - 8;
      STK.cur.x = (STK.W - STK.cur.w) / 2 + Math.sin(STK.t) * range;
    }
    // draw
    c.fillStyle = '#0b1626'; c.fillRect(0, 0, STK.W, STK.H);
    c.fillStyle = 'rgba(244,241,232,0.25)';
    for (var s = 0; s < 26; s++) c.fillRect((s * 97 + 31) % STK.W, (s * 53 + 11) % STK.H, 2, 2);
    var offY = Math.max(0, (STK.blocks.length - 10) * 30);
    var cols = ['#66e0ff', '#f2c14e', '#f0705e', '#7bd88f', '#c39bff'];
    for (var i = 0; i < STK.blocks.length; i++){
      var b = STK.blocks[i], y = STK.H - 40 - i * 30 + offY;
      if (y > STK.H || y < -40) continue;
      c.fillStyle = cols[i % cols.length];
      c.fillRect(b.x, y, b.w, 26);
      c.fillStyle = 'rgba(0,0,0,0.18)'; c.fillRect(b.x, y + 20, b.w, 6);
    }
    if (STK.cur && !STK.over){
      var cy = STK.H - 40 - STK.blocks.length * 30 + offY;
      c.fillStyle = STK.flash > 0 ? '#ffffff' : cols[STK.blocks.length % cols.length];
      c.fillRect(STK.cur.x, cy, STK.cur.w, 26);
      if (STK.flash > 0) STK.flash--;
    }
  }
