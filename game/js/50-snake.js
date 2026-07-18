  // ===========================================================================
  // 🐍 Snake — classic grid snake. Steer with arrows/WASD; eat 🍎 to grow and
  // hit this level's target to advance; hitting a wall block, the board edge,
  // or your own tail ends the run. Sequential levels (no difficulty picker) —
  // board size stays fixed, each level raises the food target, speeds up the
  // tick, AND scatters more obstacle blocks (a fixed, hand-placed pool so a
  // level's layout is always fair — never seals off the food or the spawn).
  // ===========================================================================
  var SN_LEVELS = [
    { target: 5,  tickMs: 150, walls: 0 },
    { target: 8,  tickMs: 130, walls: 6 },
    { target: 12, tickMs: 112, walls: 10 },
    { target: 16, tickMs: 96,  walls: 14 },
    { target: 20, tickMs: 82,  walls: 20 }
  ];
  var SN_COLS = 16, SN_ROWS = 16, SN_T = 20;
  // Pool of obstacle cells, symmetric, ordered so each level just takes more of the same
  // pool (never a re-shuffle). Kept clear of the spawn row (y=8, x=5..10) and its run-up.
  var SN_WALL_POOL = [
    [3,3],[12,3],[3,12],[12,12],
    [3,4],[12,4],[3,11],[12,11],
    [7,2],[8,2],[7,13],[8,13],
    [2,6],[13,6],[2,9],[13,9],
    [5,5],[10,5],[5,10],[10,10],
    [1,1],[14,1],[1,14],[14,14]
  ];
  var SN = { active: false, level: 0, snake: [], dir: [1, 0], nextDir: [1, 0], food: null, walls: [], eaten: 0, target: 0, tickMs: 150, tick: 0, totalScore: 0 };

  function _snIsWall(x, y){ return SN.walls.some(function(w){ return w.x === x && w.y === y; }); }
  function _snPlaceFood(){
    var free = [];
    for (var y = 0; y < SN_ROWS; y++) for (var x = 0; x < SN_COLS; x++){
      if (_snIsWall(x, y)) continue;
      if (!SN.snake.some(function(s){ return s.x === x && s.y === y; })) free.push({ x: x, y: y });
    }
    SN.food = free[rand(0, free.length - 1)] || { x: 0, y: 0 };
  }

  // Free to view (no pass charge) — the welcome screen's Play button charges via
  // wonderPlay('_snStartRun').
  function openSnake(){
    gameWelcome('snake', '🐍', 'Snake',
      'Steer the classic snake — eat food to grow, avoid the walls and your own tail! ' + SN_LEVELS.length + ' levels, faster and more obstacles each time.',
      '_snStartRun');
  }

  function _snStartRun(){
    SN.level = 0; SN.totalScore = 0;
    _snSetup();
  }

  function _snSetup(){
    var lv = SN_LEVELS[SN.level] || SN_LEVELS[SN_LEVELS.length - 1];
    SN.active = true;
    SN.snake = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }];
    SN.dir = [1, 0]; SN.nextDir = [1, 0];
    SN.walls = SN_WALL_POOL.slice(0, lv.walls || 0).map(function(w){ return { x: w[0], y: w[1] }; });
    SN.eaten = 0; SN.target = lv.target; SN.tickMs = lv.tickMs;
    _snPlaceFood();
    a2Shell('🐍 Snake', 'openWonderland()',
      '<div class="wond-hud" id="snHud"></div>' + a2KeyLegend('Arrow keys or WASD to steer') +
      '<div class="wond-canvas-wrap"><canvas id="snCanvas" class="a2-canvas" style="--cw:' + (SN_COLS * SN_T) + ';--ch:' + (SN_ROWS * SN_T) + '" width="' + (SN_COLS * SN_T) + '" height="' + (SN_ROWS * SN_T) + '"></canvas></div>' +
      '<div class="a2-pad"><div>' +
        '<button type="button" class="btn btn-secondary" onclick="_snDir(-1,0)">◀</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_snDir(0,-1)">▲</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_snDir(0,1)">▼</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_snDir(1,0)">▶</button>' +
      '</div></div>',
      'Eat ' + SN.target + ' 🍎 to clear this level. Hitting a wall block, the edge, or your own tail ends the run!');
    _snHud();
    _snDraw();
    a2Keys(function(e){
      var k = e.key.toLowerCase();
      if (k === 'arrowleft' || k === 'a'){ e.preventDefault(); _snDir(-1, 0); }
      else if (k === 'arrowup' || k === 'w'){ e.preventDefault(); _snDir(0, -1); }
      else if (k === 'arrowdown' || k === 's'){ e.preventDefault(); _snDir(0, 1); }
      else if (k === 'arrowright' || k === 'd'){ e.preventDefault(); _snDir(1, 0); }
    });
    SN.tick = a2Every(_snStep, SN.tickMs);
  }

  // Queues the next direction (applied on the next tick) — never allowed to reverse straight
  // into the snake's own neck.
  function _snDir(dx, dy){
    if (!SN.active) return;
    if (dx === -SN.dir[0] && dy === -SN.dir[1]) return;
    SN.nextDir = [dx, dy];
  }

  function _snHud(){
    var hud = document.getElementById('snHud'); if (!hud) return;
    hud.innerHTML = '<span class="wond-chip">🎚️ Level <b>' + (SN.level + 1) + ' / ' + SN_LEVELS.length + '</b></span>' +
      '<span class="wond-chip">🍎 Eaten: <b>' + SN.eaten + ' / ' + SN.target + '</b></span>' +
      '<span class="wond-chip">📏 Length: <b>' + SN.snake.length + '</b></span>';
  }

  function _snStep(){
    if (!SN.active) return;
    SN.dir = SN.nextDir;
    var head = SN.snake[0];
    var next = { x: head.x + SN.dir[0], y: head.y + SN.dir[1] };
    var hitWall = next.x < 0 || next.x >= SN_COLS || next.y < 0 || next.y >= SN_ROWS;
    var hitSelf = SN.snake.some(function(s){ return s.x === next.x && s.y === next.y; });
    var hitObstacle = _snIsWall(next.x, next.y);
    if (hitWall || hitSelf || hitObstacle){ _snGameOver(); return; }
    SN.snake.unshift(next);
    if (next.x === SN.food.x && next.y === SN.food.y){
      SN.eaten++;
      if (typeof playSfx === 'function') playSfx('correct');
      if (SN.eaten >= SN.target){ _snLevelClear(); return; }
      _snPlaceFood();
    } else {
      SN.snake.pop();
    }
    _snDraw();
    _snHud();
  }

  function _snDraw(){
    var cv = document.getElementById('snCanvas'); if (!cv) return;
    var c = cv.getContext('2d'), T = SN_T;
    c.fillStyle = '#0f1e12'; c.fillRect(0, 0, cv.width, cv.height);
    c.fillStyle = '#4a5568';
    for (var wi = 0; wi < SN.walls.length; wi++){
      var w = SN.walls[wi];
      c.fillRect(w.x * T + 1, w.y * T + 1, T - 2, T - 2);
    }
    c.fillStyle = '#e0524a';
    c.beginPath(); c.arc(SN.food.x * T + T / 2, SN.food.y * T + T / 2, T * 0.38, 0, 7); c.fill();
    for (var i = SN.snake.length - 1; i >= 0; i--){
      var s = SN.snake[i];
      c.fillStyle = i === 0 ? '#8be05a' : '#5aa93f';
      c.fillRect(s.x * T + 1, s.y * T + 1, T - 2, T - 2);
    }
  }

  // Level's food target reached — advance to the next level for FREE (fresh snake, faster tick),
  // or end the run if that was the last level (matching every other Wonderland game's pattern).
  function _snLevelClear(){
    SN.active = false;
    if (SN.tick){ clearInterval(SN.tick); SN.tick = 0; }
    SN.totalScore += SN.eaten * 10 + SN.snake.length * 2;
    if (SN.level + 1 >= SN_LEVELS.length){ _snEnd(true); return; }
    if (typeof playSfx === 'function') playSfx('victory');
    if (typeof showToast === 'function') showToast('🌟 Level ' + (SN.level + 1) + ' clear! Next up!');
    SN.level++;
    a2Later(_snSetup, 900);
  }

  function _snGameOver(){
    SN.active = false;
    if (SN.tick){ clearInterval(SN.tick); SN.tick = 0; }
    SN.totalScore += SN.eaten * 10 + SN.snake.length * 2;
    if (typeof playSfx === 'function') playSfx('wrong');
    _snEnd(false);
  }

  function _snEnd(wonAll){
    var level = SN.level;
    var frac = Math.min(1, (level + (wonAll ? 1 : 0)) / SN_LEVELS.length);
    a2Result('🐍 Snake', wonAll ? '🌟 ALL LEVELS CLEARED! 🌟' : '💥 Game Over!',
      'Reached level <b>' + (level + 1) + ' / ' + SN_LEVELS.length + '</b> · total score <b>' + SN.totalScore + '</b> · length ' + SN.snake.length,
      frac, 'openSnake');
  }

