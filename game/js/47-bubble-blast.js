  // ===========================================================================
  // 🫧 Bubble Blast — trap the gremlins in bubbles, then pop them!
  // ===========================================================================
  var BU = { W: 480, H: 352, plats: [], player: null, foes: [], bubbles: [],
             lives: 3, popped: 0, total: 4, over: false, keys: {}, inv: 0, shootCool: 0, level: 0, waiting: true };
  // Sequential levels (no selection): more gremlins, faster, and eventually starting angry.
  // Spawn x's are kept over a platform tier so each gremlin lands on solid ground:
  //   ground y332 (any x) · y250 left x40-190 / right x290-440 · y168 x140-340 · y92 left x20-150 / right x330-460.
  var BU_LEVELS = [
    { spd: 1.0,  angry: false, spots: [[300,300,1],[100,220,-1]] },                                                        // 2
    { spd: 1.15, angry: false, spots: [[300,300,1],[100,220,-1],[220,140,1]] },                                            // 3
    { spd: 1.3,  angry: false, spots: [[300,300,1],[100,220,-1],[220,140,1],[380,60,-1]] },                                // 4
    { spd: 1.45, angry: false, spots: [[120,300,1],[360,300,-1],[100,220,-1],[380,220,1],[220,140,1]] },                   // 5
    { spd: 1.6,  angry: true,  spots: [[120,300,1],[360,300,-1],[100,220,-1],[380,220,1],[220,140,1],[60,60,1]] },         // 6
    { spd: 1.75, angry: true,  spots: [[120,300,1],[360,300,-1],[80,220,-1],[400,220,1],[200,140,1],[60,60,1],[420,60,-1]] }, // 7
    { spd: 1.9,  angry: true,  spots: [[120,300,1],[360,300,-1],[80,220,-1],[400,220,1],[180,140,1],[300,140,-1],[60,60,1],[420,60,-1]] } // 8
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
    BU.over = false; BU.keys = {}; BU.inv = 0; BU.shootCool = 0; BU.waiting = true;
    _buHud();
  }
  // Clears BU.waiting (gremlins start moving) the moment the player makes their first move.
  function _buWake(){ if (BU.waiting){ BU.waiting = false; _buHud(); } }
  function _buWin(){
    if (BU.over) return;
    BU.over = true;
    if (typeof playSfx === 'function') playSfx('victory');
    if (BU.level + 1 < BU_LEVELS.length){
      if (typeof showToast === 'function') showToast('🌟 ALL GREMLINS POPPED! Level ' + (BU.level + 1) + ' clear!');
      BU.level++;
      a2Later(function(){ _buSetup(); }, 800);   // next, harder level — the loop keeps running
    } else {
      var newHighBU = (typeof wgRecordScore === 'function') ? wgRecordScore('bubble', BU.level * 200 + BU.popped * 20, BU_LEVELS.length) : false;
      a2Later(function(){ a2Result('🫧 Bubble Blast', '🌟 ALL GREMLINS POPPED! 🌟' + (newHighBU ? ' 🏆' : ''), 'A perfect bubble hunt — all ' + BU_LEVELS.length + ' levels cleared with ' + BU.lives + ' ❤️ left!', 1, 'openBubble'); }, 600);
    }
  }
  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_bubbleStartRun').
  function openBubble(){
    gameWelcome('bubble', '🫧', 'Bubble Blast',
      'Trap gremlins in bubbles, then pop them platform-style! ' + BU_LEVELS.length + ' levels.',
      '_bubbleStartRun');
  }

  function _bubbleStartRun(){
    BU.level = 0; BU.lives = 3;
    _buSetup();
    a2Shell('🫧 Bubble Blast', 'openWonderland()',
      '<div class="wond-hud" id="buHud"></div>' + a2KeyLegend('← → move · ↑ jump · Space bubble') +
      '<div class="wond-canvas-wrap"><canvas id="buCanvas" class="a2-canvas" style="--cw:' + BU.W + ';--ch:' + BU.H + '" width="' + BU.W + '" height="' + BU.H + '"></canvas></div>' +
      '<div class="a2-pad"><div>' +
        '<button type="button" class="btn btn-secondary" onpointerdown="BU.keys.left=1;_buWake()" onpointerup="BU.keys.left=0">◀</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_buJump()">⤒ Jump</button>' +
        '<button type="button" class="btn btn-primary" onclick="_buShoot()">🫧</button>' +
        '<button type="button" class="btn btn-secondary" onpointerdown="BU.keys.right=1;_buWake()" onpointerup="BU.keys.right=0">▶</button>' +
      '</div></div>',
      'Arrows move · ⬆️ jump · Space blows a bubble. Trap a gremlin, then touch the bubble to POP it! The gremlins wait until you make your first move.');
    _buHud();
    a2Keys(function(e){
      if (e.key === 'ArrowLeft'){ BU.keys.left = 1; _buWake(); e.preventDefault(); }
      else if (e.key === 'ArrowRight'){ BU.keys.right = 1; _buWake(); e.preventDefault(); }
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
      '<span class="wond-chip">' + '❤️'.repeat(Math.max(0, BU.lives)) + '</span>' +
      (BU.waiting ? '<span class="wond-chip">▶ Move to start!</span>' : '');
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
  function _buJump(){ _buWake(); if (BU.player && BU.player.ground){ BU.player.vy = -8.6; BU.player.ground = false; if (typeof playSfx === 'function') playSfx('click'); } }
  function _buShoot(){
    _buWake();
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
      // foes — frozen at spawn until the player's first move (BU.waiting)
      for (var i = 0; i < BU.foes.length; i++){
        var f = BU.foes[i];
        if (f.trapped) continue;
        if (!BU.waiting){
          f.x += f.vx * (f.angry ? 1.7 : 1);
          if (f.x < 14 || f.x > BU.W - 14) f.vx *= -1;
          f.vy += 0.5; f.y += f.vy;
          if (_buOnGround(f, 20, 22)) f.vy = 0;
          if (f.y > BU.H) f.y = 0;
        }
        // touch player
        if (BU.inv <= 0 && Math.abs(f.x - P.x) < 20 && Math.abs(f.y - P.y) < 22){
          BU.lives--; BU.inv = 90; _buHud();
          if (typeof playSfx === 'function') playSfx('wrong');
          if (BU.lives <= 0){
            BU.over = true;
            var newHighBU2 = (typeof wgRecordScore === 'function') ? wgRecordScore('bubble', BU.level * 200 + BU.popped * 20, BU.level + 1) : false;
            a2Later(function(){ a2Result('🫧 Bubble Blast', '👹 The gremlins got you!' + (newHighBU2 ? ' 🏆' : ''), 'Reached Level <b>' + (BU.level + 1) + '</b> · popped <b>' + BU.popped + ' / ' + BU.total + '</b>.', (BU.level + BU.popped / BU.total) / BU_LEVELS.length * 0.85, 'openBubble'); }, 500);
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

