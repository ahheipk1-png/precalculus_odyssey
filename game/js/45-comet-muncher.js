  // ===========================================================================
  // 👾 Comet Muncher — eat every star-dot; dodge the UFOs; ⭐ pellets turn the tables!
  // Sequential levels (no selection): same maze, more UFOs and faster each level.
  // UFOs stay frozen at spawn until the player's first move (so you're never caught
  // before you've even reacted).
  // ===========================================================================
  var CM = { T: 28, maze: [], W: 15, H: 13, dots: 0, eaten: 0, pac: null, ghosts: [],
             fright: 0, lives: 3, over: false, paused: 0, level: 0, totalEaten: 0, waiting: true };
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
  var CM_LEVELS = [
    { ghosts: 3, spd: 1.0 },
    { ghosts: 3, spd: 1.18 },
    { ghosts: 4, spd: 1.32 },
    { ghosts: 4, spd: 1.48 },
    { ghosts: 5, spd: 1.62 }
  ];
  var CM_GHOST_SPOTS = [ [7,5,'#f0705e'], [6,5,'#c39bff'], [8,5,'#7bd88f'], [7,4,'#ffb454'], [7,6,'#5ec8ff'] ];
  var CM_GHOST_BASE_SPD = [1.8, 1.7, 1.6, 1.75, 1.65];
  function _cmWall(tx, ty){ return tx < 0 || ty < 0 || tx >= CM.W || ty >= CM.H || CM.maze[ty][tx] === '#'; }
  function _cmEnt(tx, ty, spd){ return { x: tx * CM.T + CM.T / 2, y: ty * CM.T + CM.T / 2, dir: [0,0], want: [0,0], spd: spd, sx: tx, sy: ty, tx: tx, ty: ty }; }
  function _cmTile(e){ return [Math.floor(e.x / CM.T), Math.floor(e.y / CM.T)]; }

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_cometStartRun').
  function openComet(){
    gameWelcome('comet', '👾', 'Comet Muncher',
      'Munch every star in the maze — dodge the UFOs! ' + CM_LEVELS.length + ' levels — more UFOs, faster each time.',
      '_cometStartRun');
  }

  function _cometStartRun(){
    CM.level = 0; CM.totalEaten = 0;
    _cmSetup();
    a2Shell('👾 Comet Muncher', 'openWonderland()',
      '<div class="wond-hud" id="cmHud"></div>' + a2KeyLegend('Arrow keys to move') +
      '<div class="wond-canvas-wrap"><canvas id="cmCanvas" class="a2-canvas" style="--cw:' + (CM.W * CM.T) + ';--ch:' + (CM.H * CM.T) + '" width="' + (CM.W * CM.T) + '" height="' + (CM.H * CM.T) + '"></canvas></div>' +
      '<div class="a2-pad"><div>' +
        '<button type="button" class="btn btn-secondary" onclick="_cmWant(-1,0)">◀</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_cmWant(0,-1)">▲</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_cmWant(0,1)">▼</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_cmWant(1,0)">▶</button>' +
      '</div></div>',
      'Munch every ⭐ dot! Big ⭐ pellets let you chomp the UFOs for a few seconds. The UFOs wait until you make your first move.');
    _cmHud();
    a2Keys(function(e){
      var m = { ArrowUp: [0,-1], ArrowDown: [0,1], ArrowLeft: [-1,0], ArrowRight: [1,0] }[e.key];
      if (m){ e.preventDefault(); _cmWant(m[0], m[1]); }
    });
    A2.raf = requestAnimationFrame(_cmLoop);
  }
  // Builds the maze + UFOs for the CURRENT CM.level (no shell — that's _cometStartRun's job).
  function _cmSetup(){
    var cfg = CM_LEVELS[CM.level] || CM_LEVELS[CM_LEVELS.length - 1];
    CM.maze = CM_MAZE.map(function(r){ return r.split(''); });
    CM.dots = 0; CM.eaten = 0; CM.fright = 0; CM.lives = 3; CM.over = false; CM.paused = 0; CM.waiting = true;
    for (var y = 0; y < CM.H; y++) for (var x = 0; x < CM.W; x++){
      var ch = CM.maze[y][x];
      if (ch === '.' || ch === 'P') CM.dots++;
      if (ch === 'G') CM.maze[y][x] = ' ';
    }
    CM.maze[7][7] = ' '; CM.dots--;             // pac spawn tile has no dot
    CM.pac = _cmEnt(7, 7, 2.1);
    CM.ghosts = CM_GHOST_SPOTS.slice(0, cfg.ghosts).map(function(s, i){
      var g = _cmEnt(s[0], s[1], CM_GHOST_BASE_SPD[i] * cfg.spd);
      g.hue = s[2];
      return g;
    });
    _cmHud();
  }
  // Clears CM.waiting (UFOs start moving) the moment the player makes their first move.
  function _cmWant(dx, dy){
    if (CM.waiting){ CM.waiting = false; _cmHud(); }
    if (CM.pac) CM.pac.want = [dx, dy];
  }
  function _cmHud(){
    var hud = document.getElementById('cmHud');
    if (hud) hud.innerHTML = '<span class="wond-chip">🎚️ Level <b>' + (CM.level + 1) + ' / ' + CM_LEVELS.length + '</b></span>' +
      '<span class="wond-chip">⭐ <b>' + CM.eaten + ' / ' + CM.dots + '</b></span>' +
      '<span class="wond-chip">' + '❤️'.repeat(Math.max(0, CM.lives)) + '</span>' +
      (CM.fright > 0 ? '<span class="wond-chip wond-chip-hot">⚡ CHOMP TIME!</span>' : '') +
      (CM.waiting ? '<span class="wond-chip">▶ Move to start!</span>' : '');
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
  // All dots eaten — advance to the next level for FREE (same maze, more/faster UFOs),
  // or end the run if that was the last level (matching every other Wonderland game's pattern).
  function _cmLevelClear(){
    CM.over = true;
    CM.totalEaten += CM.eaten;
    if (CM.level + 1 >= CM_LEVELS.length){
      var newHighClear = (typeof wgRecordScore === 'function') ? wgRecordScore('comet', CM.totalEaten * 10, CM_LEVELS.length) : false;
      a2Later(function(){ a2Result('👾 Comet Muncher', '🌟 ALL LEVELS CLEARED! 🌟' + (newHighClear ? ' 🏆' : ''), 'Every star munched across all ' + CM_LEVELS.length + ' levels with ' + CM.lives + ' ❤️ to spare!', 1, 'openComet'); }, 500);
      return;
    }
    if (typeof playSfx === 'function') playSfx('victory');
    if (typeof showToast === 'function') showToast('🌟 Level ' + (CM.level + 1) + ' clear! Next up!');
    CM.level++;
    a2Later(_cmSetup, 900);
  }
  function _cmLoop(){
    if (!a2Active()){ a2StopAll(); return; }
    A2.raf = requestAnimationFrame(_cmLoop);
    var cv = document.getElementById('cmCanvas'); if (!cv) return;
    var c = cv.getContext('2d');
    if (!CM.over && CM.paused <= 0){
      _cmStep(CM.pac, true);
      if (!CM.waiting) for (var g = 0; g < CM.ghosts.length; g++) _cmStep(CM.ghosts[g], false);
      if (CM.fright > 0) CM.fright--;
      // eat dots
      var t = _cmTile(CM.pac), ch = CM.maze[t[1]][t[0]];
      if (ch === '.' || ch === 'P'){
        CM.maze[t[1]][t[0]] = ' ';
        CM.eaten++;
        if (ch === 'P'){ CM.fright = 60 * 7; if (typeof playSfx === 'function') playSfx('correct'); }
        _cmHud();
        if (CM.eaten >= CM.dots) _cmLevelClear();
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
              var totalSoFar = CM.totalEaten + CM.eaten;
              var newHighCaught = (typeof wgRecordScore === 'function') ? wgRecordScore('comet', totalSoFar * 10, CM.level + 1) : false;
              var caughtFrac = Math.min(1, (CM.level + CM.eaten / CM.dots) / CM_LEVELS.length) * 0.85;
              a2Later(function(){ a2Result('👾 Comet Muncher', '👾 Caught by the UFOs!' + (newHighCaught ? ' 🏆' : ''), 'Reached level <b>' + (CM.level + 1) + ' / ' + CM_LEVELS.length + '</b> · munched <b>' + CM.eaten + ' / ' + CM.dots + '</b> stars this level.', caughtFrac, 'openComet'); }, 500);
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

