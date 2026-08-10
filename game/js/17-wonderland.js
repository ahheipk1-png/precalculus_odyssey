  // ============================================================================
  // Wonderland — carnival lobby + "Tile Ball" minigame (module 17)
  // ----------------------------------------------------------------------------
  // Classic script sharing the one global scope (see other js/ modules). Renders
  // its whole UI into <div id="wonderlandView" class="view-container"> at open
  // time (innerHTML, no `el` cache) and toggles views the same way openShop does.
  //
  // Economy: playing Tile Ball costs 1 Wonderland Pass (state.wonderPasses,
  // earned via awardWonderPasses in 09-items.js). Prizes are materials + items
  // paid out through addMaterials/addItem, then updateStats() (which autosaves —
  // this module never touches localStorage itself).
  //
  // Design decisions:
  // - The game runs on a fixed 480x340 logical canvas; CSS scales it to the
  //   container width (height:auto keeps the aspect), and pointer input is
  //   mapped back through getBoundingClientRect, so it works at any size.
  // - One requestAnimationFrame loop, id kept in WOND.raf. stopTileBall()
  //   cancels it and unbinds listeners; as a safety net the loop also
  //   self-stops if #wonderlandView ever loses .active (e.g. another module
  //   switched views without calling closeWonderland()).
  // - Ball movement is integrated in <=6px substeps so a sped-up ball can never
  //   tunnel through an 18px tile between frames.
  // - Every cross-module call (playMusic, playSfx, showToast, updateStats,
  //   openMapHub, addMaterials, addItem, ...) is typeof-guarded per the house
  //   rules, so the module degrades gracefully if a dependency is missing.
  // - wonderRewardForScore(f) and applyWonderReward(r) are the pure/testable
  //   API: reward tiers by fraction of tiles destroyed, and the payout side
  //   effects, kept separate so the console can exercise both.
  // ============================================================================

  // ---------- Tile Ball constants ----------
  var WOND_W = 480, WOND_H = 340;            // logical canvas size (CSS scales it)
  var WOND_MAX_SPEED = 9.0;                  // hard cap on ball speed (per-level maxSpeed is lower)

  // Progressive difficulty levels. Each: grid size, ball start speed + speed cap, balls (lives),
  // and a tile pattern. 'tough' rows/'toughcheck' add 2-hit armoured tiles; 'checker' leaves gaps.
  var WOND_LEVELS = [
    { name: 'Warm-Up',       cols: 6, rows: 4, speed: 3.3, maxSpeed: 6.2, balls: 4, pattern: 'full' },
    { name: 'Cadet Run',     cols: 7, rows: 5, speed: 3.8, maxSpeed: 6.8, balls: 3, pattern: 'full' },
    { name: 'Asteroid Belt', cols: 8, rows: 5, speed: 4.2, maxSpeed: 7.4, balls: 3, pattern: 'checker' },
    { name: 'Ion Storm',     cols: 8, rows: 6, speed: 4.7, maxSpeed: 8.0, balls: 3, pattern: 'tough' },
    { name: 'Singularity',   cols: 9, rows: 6, speed: 5.2, maxSpeed: 8.8, balls: 2, pattern: 'toughcheck' }
  ];

  // Per-profile Tile Ball progress (persisted via state.miniGames — see 03-save.js).
  function wondTB(){
    if (typeof state !== 'object' || !state) return { unlockedCount: 1, firstCleared: {}, best: {}, plays: 0 };
    if (!state.miniGames) state.miniGames = {};
    var tb = state.miniGames.tileBall;
    if (!tb || typeof tb !== 'object'){ tb = { unlockedCount: 1, firstCleared: {}, best: {}, plays: 0 }; state.miniGames.tileBall = tb; }
    if (typeof tb.unlockedCount !== 'number' || tb.unlockedCount < 1) tb.unlockedCount = 1;
    if (!tb.firstCleared) tb.firstCleared = {};
    if (!tb.best) tb.best = {};
    return tb;
  }

  // ---------- Mutable game state (module-global, reset by wondInitGame) ----------
  var WOND = {
    raf: 0,               // requestAnimationFrame id (0 = not scheduled)
    running: false,
    over: false,
    runScore: 0,           // accumulates across the whole paid run, for wgRecordScore at the end
    canvas: null,
    ctx2d: null,
    lastTs: 0,
    colors: null,
    stars: [],
    tiles: [],
    levelIdx: 0,          // which WOND_LEVELS entry is being played
    level: null,          // the active level config
    tilesTotal: 0,
    tilesLeft: 0,
    balls: 3,
    hits: 0,              // paddle bounces + tile breaks; every 8th speeds the ball up
    speed: 4.0,
    launched: false,
    paddle: { x: 0, y: 0, w: 84, h: 12 },
    ball: { x: 0, y: 0, vx: 0, vy: 0, r: 7 },
    keys: { left: false, right: false },
    handlers: null        // bound listeners, kept so stopTileBall can remove them
  };

  // ---------- Small pure helpers ----------
  function wondClamp(v, lo, hi){ return v < lo ? lo : (v > hi ? hi : v); }

  // Read a CSS design token off :root (canvas can't use var() directly).
  function wondToken(name, fallback){
    try {
      var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fallback;
    } catch (e) { return fallback; }
  }

  function wondPalette(){
    return {
      chalk:    wondToken('--chalk', '#F4F1E8'),
      chalkDim: wondToken('--chalk-dim', '#B9C7BE'),
      yellow:   wondToken('--yellow', '#F2C14E'),
      coral:    wondToken('--coral', '#F0705E'),
      sky:      wondToken('--sky', '#6EC1E4')
    };
  }

  // PURE: reward tier for a cleared fraction f (tiles destroyed / total).
  function wonderRewardForScore(f){
    if (f >= 1.0) return { chips: { quantum_chip: 1, cpu: 2 },        gold: 2, silver: 2, item: 'star_dew' };
    if (f >= 0.7) return { chips: { cpu: 1, energy_core: 2 },         gold: 2, silver: 1, item: 'moon_herb' };
    if (f >= 0.4) return { chips: { energy_core: 2, robotic_alloy: 1 }, silver: 2, item: null };
    return { chips: { energy_core: 1 }, item: null };                // consolation
  }
  // Compact "🥇2 🥈2 🔋2 🖥️1" summary of a reward.
  function wondRewardStr(r){
    var parts = [];
    if (r.gold)   parts.push('🥇' + r.gold);
    if (r.silver) parts.push('🥈' + r.silver);
    if (r.chips && typeof chipsSummary === 'function') { var s = chipsSummary(r.chips); if (s) parts.push(s); }
    return parts.join(' ');
  }

  // PURE: kid-facing label for the tier a fraction currently earns (HUD + results).
  function wondTierLabel(f){
    if (f >= 1.0) return '🌟 Grand Prize';
    if (f >= 0.7) return '🥇 Gold Prize';
    if (f >= 0.4) return '🥈 Silver Prize';
    return '🫀 Consolation Prize';
  }

  // PURE: scale a base tier reward by the level played, add a first-clear bonus, and diminish
  // repeat clears (anti-farming). levelIdx is 0-based. firstClear = first full clear of THIS level.
  function wondLevelReward(levelIdx, f, firstClear){
    var base = wonderRewardForScore(f);
    var lvlMult = 1 + levelIdx * 0.35;                 // L1=1.0x … L5=2.4x
    var r = { chips: {}, gold: 0, silver: 0, item: base.item, levelIdx: levelIdx };
    for (var k in (base.chips || {})) r.chips[k] = base.chips[k];   // rare chips not scaled by level
    r.gold = Math.round((base.gold || 0) * lvlMult);
    r.silver = Math.round((base.silver || 0) * lvlMult);
    if (f >= 1 && firstClear){
      r.gold += 2 + levelIdx;                          // first-clear bonus grows with level
      if (levelIdx >= 2){ r.chips.cpu = (r.chips.cpu || 0) + 1; }
      r.firstClearBonus = true;
    } else if (f >= 1 && !firstClear){
      r.gold = Math.floor(r.gold / 2);                 // repeat full clear: halved metals
      r.silver = Math.floor(r.silver / 2);
      r.item = null;                                   // no repeat item drops
      r.repeat = true;
    }
    return r;
  }

  // Pay out a reward object from wonderRewardForScore. Side effects only — the
  // full-clear fanfare is inferred from the tier itself (only f>=1 grants star_dew).
  function applyWonderReward(r){
    if (!r) return;
    if (r.chips && typeof addChips === 'function') addChips(r.chips);
    if ((r.gold || r.silver) && typeof addCurrency === 'function') addCurrency(r.gold, r.silver);
    if (r.item && typeof addItem === 'function') addItem(r.item, 1);
    if (typeof updateStats === 'function') updateStats();   // refresh HUD + autosave
    var msg = '🎁 Prize won: ' + wondRewardStr(r);
    if (r.item) {
      var it = (typeof ITEMS === 'object' && ITEMS[r.item]) ? ITEMS[r.item] : { icon: '🎁', name: r.item };
      msg += ' + ' + it.icon + ' ' + it.name;
    }
    if (typeof showToast === 'function') showToast(msg);
    var fullClear = r.item === 'star_dew';
    if (typeof playSfx === 'function') playSfx(fullClear ? 'victory' : 'loot');
  }

  // ---------- View toggling (openShop pattern, robust variant) ----------
  function wondShowView(){
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    var view = document.getElementById('wonderlandView');
    if (view) view.classList.add('active');
    return view;
  }

  // openWonderland() is the ONE function every game's "← Lobby"/back button calls (34 call sites)
  // as well as the Earth Hub's Wonderland door — so pointing it at the walkable carnival threads the
  // new hub through the whole app with zero other call sites touched.
  //
  // 2026-08-05 (player: "we should change the wonderland into walkable map format... you need to
  // make the map much larger"): the lobby used to be Hub -> Casino/Arcade -> a flat grid of 24 cards.
  // It's now a fairground you walk around, running on the SAME tile engine as the Earth Hub
  // (15-map.js) — one config object instead of a second copy of the stepping/camera/D-pad code.
  function openWonderland(){
    stopTileBall();                       // never leave a stale loop behind
    if (typeof wgStopAll === 'function') wgStopAll();   // and no stray carnival-game timer
    if (typeof wmapMount !== 'function'){ return; }
    WONDER_MAP.spots = wondSpots();       // built lazily: the level counts live in other files
    if (!wmapMount(WONDER_MAP, 'wonderlandView')) return;
    if (typeof playMusic === 'function') playMusic('arena');
  }

  // The old Casino / Arcade sub-pages are now two zones of one map, but keep the names working —
  // they were public entry points, and walking the player to the right end of the fairground is a
  // better answer than a dead function.
  function openWonderCasino(){ wondEnterZone('casino'); }
  function openWonderArcade(){ wondEnterZone('arcade'); }
  function wondEnterZone(zone){
    var first = wondSpots().filter(function(s){ return s.zone === zone; })[0];
    if (first){ WONDER_MAP.pos.x = first.tx; WONDER_MAP.pos.y = first.ty + WONDER_MAP.bsize; }
    openWonderland();
  }

  function closeWonderland(){
    stopTileBall();
    if (typeof wgStopAll === 'function') wgStopAll();
    var view = document.getElementById('wonderlandView');
    if (view) view.classList.remove('active');
    var eq = document.getElementById('equationView');
    if (eq) eq.classList.add('active');
    if (typeof playMusic === 'function') playMusic('practice');
  }

  // Back button: the Map Hub when it exists, otherwise fall back to the equation view.
  function wonderBackToMap(){
    stopTileBall();
    if (typeof wgStopAll === 'function') wgStopAll();
    var view = document.getElementById('wonderlandView');
    if (view) view.classList.remove('active');
    if (typeof openMapHub === 'function') { openMapHub(); return; }
    closeWonderland();
  }

  // ---------- Shared pass economy: every game room costs 1 Wonderland Pass to enter ----------
  function wonderPassCount(){ return (typeof state === 'object' && state) ? (state.wonderPasses || 0) : 0; }
  function wonderSpendPass(n){
    n = n || 1;
    if (wonderPassCount() < n){
      if (typeof showToast === 'function') showToast('You need ' + n + ' Wonderland Pass' + (n > 1 ? 'es' : '') + '! 🎟️ Earn some in the planet arenas or Arena Infinity.');
      if (typeof playSfx === 'function') playSfx('wrong');
      return false;
    }
    state.wonderPasses = wonderPassCount() - n;
    if (typeof updateStats === 'function') updateStats();   // HUD + autosave
    return true;
  }
  // Charge a pass, then launch the named global. Non-gambling games route through this via their
  // own welcome screen's Play button (see gameWelcome()) rather than straight from the lobby card,
  // so browsing a game's leaderboard is always free — only clicking Play spends a pass.
  function wonderPlay(launchName, cost){
    if (!wonderSpendPass(cost || 1)) return;
    var fn = window[launchName];
    if (typeof fn === 'function') fn();
    if (typeof playSfx === 'function') playSfx('ui-click');
  }

  // ------------------------------------------------------------------
  // THE CARNIVAL MAP — 24 booths you walk to (replaces the Hub/Casino/Arcade card grids)
  // ------------------------------------------------------------------
  // Runs on the shared tile engine in 15-map.js: this file supplies pure DATA (grid, booths, what
  // bumping one does) and the engine does the stepping, camera, D-pad, keyboard and audit.
  //
  // Layout — 37 x 22, roughly 1.6x the Earth Hub's area (player: "you need to make the map much
  // larger"). Booths are 2x2 like Earth's shops, on a 5-tile pitch, which leaves a 3-tile corridor
  // between every neighbour in both directions so nothing feels cramped:
  //
  //     row  2   CASINO WING — 3 booths (cols 3/8/13) + the fountain plaza to their right
  //     row  7   ARCADE MIDWAY 1 — 7 booths
  //     row 12   ARCADE MIDWAY 2 — 7 booths
  //     row 17   ARCADE MIDWAY 3 — 7 booths
  //     row 20   the entrance you spawn on
  //
  // Splitting casino from arcade by GEOGRAPHY rather than by a menu keeps the old "you chose to walk
  // into the gambling half" separation without an extra screen in front of every game.
  var WOND_COLS = 37, WOND_ROWS = 22;
  var WOND_BX = [3, 8, 13, 18, 23, 28, 33];      // booth column origins (2-wide, 3-tile gaps)
  var WOND_CASINO_Y = 2, WOND_MIDWAY_Y = [7, 12, 17];

  // Every booth: what it looks like, and EXACTLY what its old lobby card's button did.
  //   gambling:true -> entering IS the play, so it charges passes up front (wonderPlay), which is
  //                    what the three casino cards always did.
  //   otherwise     -> open the game's own welcome screen for free; the pass is spent there, on
  //                    Play, so browsing a leaderboard still costs nothing.
  // `count` names a global holding that game's level list — read lazily (see wondSpots) because
  // those live in files that load after this one.
  var WOND_BOOTHS = [
    // --- Casino wing (bet Cash; entry charged on arrival) ---
    { id: 'hoohey',   emoji: '🎲', name: 'Hoo Hey How',      zone: 'casino', launch: 'openHooHey',        gambling: true, cost: 2, accent: 'var(--coral)',  desc: 'Bet Cash on lucky symbols and roll three dice!' },
    { id: 'slots',    emoji: '🎰', name: 'Star Slots',       zone: 'casino', launch: 'openSlots',         gambling: true, cost: 2, accent: 'var(--yellow)', desc: 'Bet Cash and spin the reels — a full centre cross pays a MEGA jackpot!' },
    { id: 'poptic',   emoji: '🎯', name: 'Pop-a-Tic-Tac-Toe', zone: 'casino', launch: 'openPopTicTacToe', gambling: true, cost: 1, accent: 'var(--coral)',  desc: 'Roll 4 balls onto the board, FIX the ones you like, reroll the rest — chase the jackpot pattern!' },

    // --- Arcade midway, row 1 ---
    { id: 'fishin',   emoji: '🎣', name: 'Gone Fishin’',     zone: 'arcade', launch: 'openFishin',        accent: 'var(--sky)',    desc: 'Catch only the fish whose number matches the rule!', count: 'FISH_MAX_LEVEL', countIsNumber: true },
    { id: 'tileball', emoji: '🧱', name: 'Tile Ball',        zone: 'arcade', launch: 'wondOpenTileLevels', accent: 'var(--coral)', desc: 'Bounce the ball and smash every tile!', count: 'WOND_LEVELS' },
    { id: 'forge',    emoji: '🧩', name: 'Quantum Block Forge', zone: 'arcade', launch: 'openBlockForge', accent: 'var(--sky)',    desc: 'Drag blocks to fill rows & columns — clear lines for combos!', count: 'QBF_LEVELS' },
    { id: 'match',    emoji: '🃏', name: 'Star Match',       zone: 'arcade', launch: 'openMemory',        accent: 'var(--yellow)', desc: 'Memorise the board, then match every cosmic pair!', count: 'MEM_LEVELS' },
    { id: 'sudoku',   emoji: '🔢', name: 'Mini Sudoku',      zone: 'arcade', launch: 'openSudoku',        accent: 'var(--sky)',    desc: 'Drag numbered tiles so every row, column & box is complete — 4×4 warm-up up to a full 9×9!', count: 'SUD_LEVELS' },
    { id: 'cargo',    emoji: '📦', name: 'Cargo Bay',        zone: 'arcade', launch: 'openCargo',         accent: 'var(--yellow)', desc: 'Push every crate onto its ring through dense pillar mazes!', count: 'CARGO_DIFFS' },
    { id: 'glacier',  emoji: '❄️', name: 'Glacier Push',     zone: 'arcade', launch: 'openGlacier',       accent: 'var(--sky)',    desc: 'Ice blocks SLIDE until they hit something. Plan your pushes!', count: 'GLACIER_DIFFS' },

    // --- Arcade midway, row 2 ---
    { id: 'forbidden', emoji: '🏯', name: 'Forbidden City',  zone: 'arcade', launch: 'openShikinjou',     accent: 'var(--coral)',  desc: 'Slide matching spirit tiles together to cancel them — beware the same-color decoys!', count: 'SHIK_DIFFS' },
    { id: 'stacker',  emoji: '🗼', name: 'Sky Stacker',      zone: 'arcade', launch: 'openStacker',       accent: 'var(--yellow)', desc: 'Stack the swinging blocks — each tower taller than the last.', count: 'STK_LEVELS' },
    { id: 'astro',    emoji: '🟦', name: 'Astro Drop',       zone: 'arcade', launch: 'openAstroDrop',     accent: 'var(--sky)',    desc: 'Falling blocks! Fill whole lines to clear them — speed rises every 10 lines.' },
    { id: 'virus',    emoji: '💊', name: 'Virus Lab',        zone: 'arcade', launch: 'openVirusLab',      accent: 'var(--coral)',  desc: 'Drop 2-color capsules; match 4 in a line to zap every virus!', count: 'VL_LEVELS' },
    { id: 'circuit',  emoji: '🔗', name: 'Circuit Loop',     zone: 'arcade', launch: 'openCircuit',       accent: 'var(--yellow)', desc: 'Rotate the wires so the power core lights every bulb!' },
    { id: 'comet',    emoji: '👾', name: 'Comet Muncher',    zone: 'arcade', launch: 'openComet',         accent: 'var(--sky)',    desc: 'Munch every star in the maze — dodge the UFOs!' },
    { id: 'blastbot', emoji: '💣', name: 'Blast Bot',        zone: 'arcade', launch: 'openBlastBot',      accent: 'var(--coral)',  desc: 'Bomb the crates and zap the drones — mind the blast!', count: 'BB_LEVELS' },

    // --- Arcade midway, row 3 ---
    { id: 'bubble',   emoji: '🫧', name: 'Bubble Blast',     zone: 'arcade', launch: 'openBubble',        accent: 'var(--sky)',    desc: 'Trap gremlins in bubbles, then pop them platform-style!', count: 'BU_LEVELS' },
    { id: 'bowling',  emoji: '🎳', name: 'Star Lanes Bowling', zone: 'arcade', launch: 'openBowling',     accent: 'var(--yellow)', desc: 'A full 10-frame game — stop the marker to set aim, power & spin. Strikes pay +100 Gold!' },
    { id: 'rhythm',   emoji: '🎵', name: 'Cosmic Rhythm',    zone: 'arcade', launch: 'openRhythm',        accent: 'var(--coral)',  desc: 'Hit the falling notes on the beat — faster and denser as you climb!', count: 'RHY_LEVELS' },
    { id: 'snake',    emoji: '🐍', name: 'Snake',            zone: 'arcade', launch: 'openSnake',         accent: 'var(--sky)',    desc: 'Eat food to grow, avoid the walls and your own tail!', count: 'SN_LEVELS' },
    { id: 'crystal',  emoji: '💎', name: 'Crystal Cascade',  zone: 'arcade', launch: 'openCrystal',       accent: 'var(--yellow)', desc: 'Drop columns of 3 gems, cycle their colors, and chain cascading matches for huge combos!' },
    { id: 'cloudberry', emoji: '☁️', name: 'Cloudberry Squadron', zone: 'arcade', launch: 'openCloudberry', accent: 'var(--coral)', desc: 'Ten stages of homing-missile mayhem, ending on an escalating boss.' },
    { id: 'skysquad', emoji: '✈️', name: 'Sky Squadron 194X', zone: 'arcade', launch: 'openSkySquadron',  accent: 'var(--sky)',    desc: 'A 10-level island campaign — a different boss commander every mission.' }
  ];

  // Booth -> tile position, plus the "N levels" tail its lobby card used to show.
  //
  // Built on first use rather than at load time: the level-count globals (QBF_LEVELS, SN_LEVELS…)
  // live in files loaded AFTER this one, so reading them in a top-level literal would silently
  // produce "undefined levels". By the time anyone opens Wonderland they all exist.
  var _wondSpots = null;
  function wondSpots(){
    if (_wondSpots) return _wondSpots;
    var casino = WOND_BOOTHS.filter(function(b){ return b.zone === 'casino'; });
    var arcade = WOND_BOOTHS.filter(function(b){ return b.zone !== 'casino'; });
    _wondSpots = casino.map(function(b, i){
      return _wondSpot(b, WOND_BX[i], WOND_CASINO_Y);
    }).concat(arcade.map(function(b, i){
      return _wondSpot(b, WOND_BX[i % WOND_BX.length], WOND_MIDWAY_Y[Math.floor(i / WOND_BX.length)]);
    }));
    return _wondSpots;
  }
  function _wondSpot(b, tx, ty){
    var n = null;
    if (b.count){
      var g = window[b.count];
      if (b.countIsNumber) n = (typeof g === 'number') ? g : null;
      else if (g && g.length) n = g.length;
    }
    var cost = b.cost || 1;
    var desc = b.desc + (n ? ' ' + n + ' levels.' : '') +
      ' Costs ' + cost + ' Wonderland Pass' + (cost > 1 ? 'es' : '') +
      (b.gambling ? ' to enter.' : ' to play.');
    return { id: b.id, emoji: b.emoji, name: b.name, accent: b.accent, tx: tx, ty: ty,
             zone: b.zone, launch: b.launch, gambling: !!b.gambling, cost: cost, desc: desc };
  }

  var WONDER_MAP = {
    id: 'wonder',
    title: '🎡 Wonderland',
    cols: WOND_COLS, rows: WOND_ROWS,
    bsize: 2,
    nounPlural: 'booth',
    // Fairground lawn: a wishing fountain in the casino plaza, and trees down every corridor. Trees
    // sit only on corridor rows (5/10/15/20) and in the gaps BETWEEN booth columns, so they decorate
    // the walk without ever narrowing a route — verified by wmapAudit().
    grid: wmapBuildGrid(WOND_COLS, WOND_ROWS,
      [[24, 2, 4, 3]],
      [[6,5],[11,5],[16,5],[21,5],[31,5],
       [6,10],[11,10],[16,10],[21,10],[26,10],[31,10],
       [6,15],[11,15],[16,15],[21,15],[26,15],[31,15],
       [6,20],[26,20]]),
    spots: [],                                  // filled by wondSpots() on mount
    spawn: { x: 18, y: 20 },                    // the fairground gate, bottom-centre
    pos:   { x: 18, y: 20 },
    facing: 'up',
    backLabel: '← Back to Earth',
    backCall: 'wonderBackToMap()',
    statusHtml: function(){
      return '<span class="wond-passes">🎟️ Wonderland Passes: <b>' + wonderPassCount() + '</b></span>' +
        '<span class="wond-hint">Earn passes in the planet arenas — or in ♾️ Arena Infinity, right next door!</span>' +
        '<button type="button" class="btn btn-secondary wond-rank-btn" onclick="openRanking()" ' +
        'data-tooltip="See the global leaderboard — top levels and top minigame scores across every player.">🏆 Ranking</button>';
    },
    badgeHtml: function(s){ return '<span class="wmap-badge">' + s.cost + ' 🎟️</span>'; },
    onEnter: function(id){ wondEnterBooth(id); }
  };

  // Walking into a booth does exactly what its old lobby-card button did — nothing about the pass
  // economy or any game's own flow changes, only how you get there.
  function wondEnterBooth(id){
    var s = wondSpots().filter(function(b){ return b.id === id; })[0];
    if (!s) return;
    if (s.gambling){ wonderPlay(s.launch, s.cost); return; }   // charges up front, then launches
    var fn = window[s.launch];
    if (typeof fn === 'function'){
      if (typeof playSfx === 'function') playSfx('ui-click');
      fn();
      return;
    }
    if (typeof showToast === 'function') showToast(s.emoji + ' ' + s.name + ' — opening soon!');
  }

  // ---------- Global Ranking (leaderboard) ----------
  // Reads /api/cloud/leaderboard: highest state.level + best score per Wonderland minigame,
  // aggregated across EVERY player's cloud profile (not just the signed-in account's own saves).
  function openRanking(){
    var view = wondShowView();
    if (!view) return;
    view.innerHTML =
      '<div class="wond-board">' +
        '<div class="wond-head"><h2 class="wond-title"><span class="wond-wheel">🏆</span> Ranking</h2>' +
          '<p class="wond-sub">The global leaderboard — every signed-in player, every save.</p></div>' +
        '<div id="rankBody" class="rank-body"><p class="wond-sub">Loading…</p></div>' +
        '<div class="wond-footer"><button type="button" class="btn btn-ghost" onclick="openWonderland()">← Wonderland</button></div>' +
      '</div>';
    _rankLoad();
  }

  function _rankLoad(){
    var sess = (typeof authSession === 'function') ? authSession() : null;
    var body = document.getElementById('rankBody');
    if (!sess || !sess.token){
      if (body) body.innerHTML = '<p class="wond-sub">Sign in with a cloud account to see the global leaderboard.</p>';
      return;
    }
    fetch('/api/cloud/leaderboard', { headers: { Authorization: 'Bearer ' + sess.token } })
      .then(function (res){ return res.json().then(function (data){ return { status: res.status, data: data }; }); })
      .then(function (r){
        var b = document.getElementById('rankBody'); if (!b) return;
        if (!r.data || !r.data.ok){ b.innerHTML = '<p class="wond-sub">' + ((r.data && r.data.error) || 'Could not load the leaderboard.') + '</p>'; return; }
        b.innerHTML = _rankHtml(r.data);
      })
      .catch(function (){
        var b = document.getElementById('rankBody'); if (!b) return;
        b.innerHTML = '<p class="wond-sub">Network error — is the game deployed to Cloudflare?</p>';
      });
  }

  function _rankEsc(s){ return (typeof escapeHtml === 'function') ? escapeHtml(String(s)) : String(s == null ? '' : s); }

  function _rankHtml(data){
    var levelRows = (data.byLevel || []).map(function (row, i){
      return '<div class="rank-row"><span class="rank-n">#' + (i + 1) + '</span>' +
        '<span class="rank-name">' + _rankEsc(row.playerName) + '</span>' +
        '<span class="rank-val">Level ' + row.level + '</span></div>';
    }).join('');
    var gameRows = (data.games || []).map(function (g){
      var top = (data.byGameTop10 && data.byGameTop10[g.id]) || [];
      var best = top[0];
      return '<div class="rank-row"><span class="rank-name">' + g.label + '</span>' +
        '<span class="rank-val">' + (best ? (_rankEsc(best.playerName) + ' — <b>' + best.score + '</b>') : '—') + '</span></div>';
    }).join('');
    return '<div class="rank-section"><h3>🌟 Top Levels</h3>' + (levelRows || '<p class="wond-sub">No players ranked yet.</p>') + '</div>' +
      '<div class="rank-section"><h3>🎮 Top Minigame Scores</h3>' + gameRows + '</div>';
  }

  // ---------- Shared per-game welcome screen ----------
  // Every non-gambling Wonderland game shows this instead of a difficulty/level picker: icon,
  // title, description, that game's own top-10 leaderboard (from the SAME /api/cloud/leaderboard
  // endpoint the Ranking screen uses), and a single Play button. wonderPlay(playFn) charges the
  // pass and hands off straight into that game's own level-1 start function — there is no picker
  // to choose a starting level or difficulty; every paid run always begins at level 1.
  function gameWelcome(gameId, icon, title, desc, playFn){
    var view = document.getElementById('wonderlandView');
    if (!view) return;
    if (typeof wgStopAll === 'function') wgStopAll();   // kill any running game's loops + A2 key handler
    document.querySelectorAll('.view-container').forEach(function (v){ v.classList.remove('active'); });
    view.classList.add('active');
    var m = (typeof wgMini === 'function') ? wgMini(gameId) : { highScore: 0 };
    view.innerHTML =
      '<div class="wond-board">' +
        '<div class="wond-head"><h2 class="wond-title"><span class="wond-wheel">' + icon + '</span> ' + title + '</h2>' +
          '<p class="wond-sub">' + desc + '</p></div>' +
        '<div class="wond-passrow"><span class="wond-passes">🏆 Your best: <b>' + (m.highScore || 0) + '</b></span>' +
          '<span class="wond-hint">Always starts at level 1 — see how far you can get!</span></div>' +
        '<div id="gwBoard" class="rank-body"><p class="wond-sub">Loading leaderboard…</p></div>' +
        '<div class="wond-footer">' +
          '<button type="button" class="btn btn-primary" onclick="wonderPlay(\'' + playFn + '\')" data-tooltip="' + title + ' — costs 1 Wonderland Pass.">▶ Play! (1 🎟️)</button>' +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()">← Lobby</button>' +
        '</div>' +
      '</div>';
    _gwLoadBoard(gameId);
  }

  function _gwLoadBoard(gameId){
    var sess = (typeof authSession === 'function') ? authSession() : null;
    var box = document.getElementById('gwBoard');
    if (!sess || !sess.token){
      if (box) box.innerHTML = '<p class="wond-sub">Sign in with a cloud account to see the leaderboard.</p>';
      return;
    }
    fetch('/api/cloud/leaderboard', { headers: { Authorization: 'Bearer ' + sess.token } })
      .then(function (res){ return res.json().then(function (data){ return { status: res.status, data: data }; }); })
      .then(function (r){
        var b = document.getElementById('gwBoard'); if (!b) return;
        if (!r.data || !r.data.ok){ b.innerHTML = '<p class="wond-sub">' + ((r.data && r.data.error) || 'Could not load the leaderboard.') + '</p>'; return; }
        var top = (r.data.byGameTop10 && r.data.byGameTop10[gameId]) || [];
        if (!top.length){ b.innerHTML = '<p class="wond-sub">No scores yet — be the first!</p>'; return; }
        b.innerHTML = top.map(function (row, i){
          return '<div class="rank-row"><span class="rank-n">#' + (i + 1) + '</span>' +
            '<span class="rank-name">' + _rankEsc(row.playerName) + '</span>' +
            '<span class="rank-val">Lv ' + row.level + ' · <b>' + row.score + '</b></span></div>';
        }).join('');
      })
      .catch(function (){
        var b = document.getElementById('gwBoard'); if (!b) return;
        b.innerHTML = '<p class="wond-sub">Network error — is the game deployed to Cloudflare?</p>';
      });
  }

  // ---------- Tile Ball: level select ----------
  // Free to view (no pass charge) — the welcome screen's own Play button is what charges via
  // wonderPlay('_tbStartRun'). No more locked level-select grid: every run always starts at
  // level 1 and free-advances through WOND_LEVELS within that one paid run (see _tbGoToLevel).
  function wondOpenTileLevels(){
    stopTileBall();
    gameWelcome('tileBall', '🧱', 'Tile Ball',
      'Bounce the ball and smash every tile! ' + WOND_LEVELS.length + ' levels of rising difficulty — clear one to advance for free. Higher levels pay bigger prizes!',
      '_tbStartRun');
  }

  // ---------- Tile Ball: screens ----------
  function wondGameHtml(){
    return '' +
      '<div class="wond-board wond-game">' +
        (typeof agTopBar === 'function' ? agTopBar('🧱 Tile Ball — L' + (WOND.levelIdx + 1) + ' ' + (WOND.level ? WOND.level.name : ''), 'wondOpenTileLevels()') : '') +
        '<div class="wond-hud" id="wondHud"></div>' +
        '<div class="wond-canvas-wrap">' +
          '<canvas id="wondCanvas" class="wond-canvas" width="' + WOND_W + '" height="' + WOND_H + '" aria-label="Tile Ball game"></canvas>' +
        '</div>' +
        '<p class="wond-tip">Move: mouse, drag, or ⬅️ ➡️ keys · Click, tap, or Space to launch · Leaving mid-game skips the prize!</p>' +
      '</div>';
  }

  function wondPrizeChips(r){
    var parts = [];
    if (r.gold)   parts.push('<span class="wond-chip wond-prize-chip">🥇 Gold ×' + r.gold + '</span>');
    if (r.silver) parts.push('<span class="wond-chip wond-prize-chip">🥈 Silver ×' + r.silver + '</span>');
    var cm = r.chips || {};
    var order = (typeof CHIP_ORDER !== 'undefined') ? CHIP_ORDER : Object.keys(cm);
    order.forEach(function(k){
      if (!cm[k]) return;
      var m = (typeof CHIPS === 'object' && CHIPS[k]) ? CHIPS[k] : { icon: '🧩', name: k };
      parts.push('<span class="wond-chip wond-prize-chip">' + m.icon + ' ' + m.name + ' ×' + cm[k] + '</span>');
    });
    if (r.item){
      var it = (typeof ITEMS === 'object' && ITEMS[r.item]) ? ITEMS[r.item] : { icon: '🎁', name: r.item };
      parts.push('<span class="wond-chip wond-prize-chip wond-item-chip">' + it.icon + ' ' + it.name + ' ×1</span>');
    }
    return parts.join('');
  }

  // runOver = this ends the whole paid run (failed to clear, or just cleared the LAST level);
  // otherwise the level was cleared and the run continues — the "Next Level" button advances
  // for FREE (already paid for by this run's single pass), matching the other Wonderland games.
  function wondResultHtml(f, destroyed, r, runOver, newHigh){
    var pct = Math.round(f * 100);
    var idx = WOND.levelIdx, lv = WOND.level || WOND_LEVELS[idx];
    var cleared = f >= 1.0;
    var headline = !runOver ? '🌟 LEVEL CLEAR! 🌟' : (cleared ? '🌟 ALL LEVELS CLEARED! 🌟' : (f >= 0.4 ? '🎉 Nice run!' : '💪 Nice try!'));
    var bonusLine = r.firstClearBonus ? '<p class="wond-sub">🎉 First clear bonus awarded!</p>'
                  : (r.repeat ? '<p class="wond-sub">↩ Repeat clear — reduced prize (no farming!).</p>' : '');
    var nextIdx = idx + 1;
    var footerMain = !runOver
      ? '<button type="button" class="btn btn-primary" onclick="_tbGoToLevel(' + nextIdx + ')" data-tooltip="Advance to the next, harder level — already paid for this run.">▶ Next Level: ' + WOND_LEVELS[nextIdx].name + '</button>'
      : '<button type="button" class="btn btn-primary" onclick="wondOpenTileLevels()" data-tooltip="Back to Tile Ball\'s welcome screen.">↻ Play Again</button>';
    return '' +
      '<div class="wond-board">' +
        '<div class="wond-head">' +
          '<h2 class="wond-title">' + headline + (newHigh ? ' 🏆' : '') + '</h2>' +
          '<p class="wond-sub">Level ' + (idx + 1) + ' · ' + lv.name + ' — smashed <b>' + destroyed + ' / ' + WOND.tilesTotal + '</b> tiles (' + pct + '%) — ' + wondTierLabel(f) + '</p>' +
          (runOver ? '<p class="wond-sub">Run score: <b>' + WOND.runScore + '</b></p>' : '') +
          bonusLine +
        '</div>' +
        '<div class="wond-result-card">' +
          '<div class="wond-result-label">Your prizes</div>' +
          '<div class="wond-prizes">' + wondPrizeChips(r) + '</div>' +
        '</div>' +
        '<div class="wond-footer">' +
          footerMain +
          '<button type="button" class="btn btn-ghost" onclick="openWonderland()" data-tooltip="Back to the lobby.">← Lobby</button>' +
        '</div>' +
      '</div>';
  }

  // ---------- Tile Ball: lifecycle ----------
  // Entry point for the welcome screen's Play button (wonderPlay('_tbStartRun') already charged
  // the pass) — always begins a fresh run at level 1. No more per-level pass charges or unlock
  // gating; clearing a level advances to the next one for free within the same run (_tbGoToLevel).
  function _tbStartRun(){
    WOND.runScore = 0;
    var tb = wondTB();
    tb.plays = (tb.plays || 0) + 1;
    if (typeof updateStats === 'function') updateStats();
    _tbGoToLevel(0);
  }

  // Renders + initializes a given level — no pass charge, no unlock check. Called by
  // _tbStartRun (level 0) and by the result screen's free "Next Level" advance.
  function _tbGoToLevel(levelIdx){
    if (WOND.running) return;                                 // ignore double-clicks
    var view = document.getElementById('wonderlandView');
    if (!view) return;                                        // container not wired yet
    levelIdx = (typeof levelIdx === 'number' && levelIdx >= 0 && levelIdx < WOND_LEVELS.length) ? levelIdx : 0;
    WOND.levelIdx = levelIdx;
    WOND.level = WOND_LEVELS[levelIdx];
    wondShowView();
    view.innerHTML = wondGameHtml();
    wondInitGame();
    if (typeof playSfx === 'function') playSfx('ui-click');
  }

  function wondInitGame(){
    var canvas = document.getElementById('wondCanvas');
    if (!canvas) return;
    WOND.canvas = canvas;
    WOND.ctx2d = canvas.getContext('2d');
    WOND.colors = wondPalette();
    var lv = WOND.level || WOND_LEVELS[0];
    WOND.running = true;
    WOND.over = false;
    WOND.lastTs = 0;
    WOND.balls = lv.balls;
    WOND.maxBalls = lv.balls + 2;         // extra-ball tiles can't stack past a sane cap
    WOND.hits = 0;
    WOND.elapsed = 0;                     // continuous time-based ramp (on top of the per-8-hit bump)
    WOND.speed = lv.speed;
    WOND.launched = false;
    WOND.keys.left = WOND.keys.right = false;
    WOND.paddle.x = (WOND_W - WOND.paddle.w) / 2;
    WOND.paddle.y = WOND_H - 26;
    wondBuildTiles(lv);
    wondBuildStars();
    wondResetBall();
    wondBindInput();
    wondUpdateHud();
    WOND.raf = requestAnimationFrame(wondLoop);
  }

  // Stop the loop and unbind input. Safe to call any number of times.
  function stopTileBall(){
    if (WOND.raf){ cancelAnimationFrame(WOND.raf); WOND.raf = 0; }
    WOND.running = false;
    WOND.lastTs = 0;
    var h = WOND.handlers;
    if (h){
      if (h.canvas){
        h.canvas.removeEventListener('pointermove', h.move);
        h.canvas.removeEventListener('pointerdown', h.down);
      }
      document.removeEventListener('keydown', h.kd);
      document.removeEventListener('keyup', h.ku);
      WOND.handlers = null;
    }
  }

  function endTileBall(){
    if (WOND.over) return;
    WOND.over = true;
    var destroyed = WOND.tilesTotal - WOND.tilesLeft;
    var f = WOND.tilesTotal > 0 ? destroyed / WOND.tilesTotal : 0;
    stopTileBall();
    var tb = wondTB();
    var idx = WOND.levelIdx;
    var wasFirstClear = !tb.firstCleared[idx];
    var r = wondLevelReward(idx, f, wasFirstClear);
    applyWonderReward(r);
    var cleared = f >= 1;
    if (!tb.best[idx] || f > tb.best[idx]) tb.best[idx] = f;
    if (cleared) tb.firstCleared[idx] = true;
    WOND.runScore += destroyed * 5 + (cleared ? 300 * (idx + 1) : 0);
    if (typeof saveGame === 'function') saveGame();

    var lastLevel = idx + 1 >= WOND_LEVELS.length;
    var view = document.getElementById('wonderlandView');
    if (cleared && !lastLevel){
      if (view) view.innerHTML = wondResultHtml(f, destroyed, r, false);   // free-advance, run continues
      return;
    }
    // Run over — failed to clear, or just cleared the LAST level.
    var newHigh = (typeof wgRecordScore === 'function') ? wgRecordScore('tileBall', WOND.runScore, idx + 1) : false;
    if (view) view.innerHTML = wondResultHtml(f, destroyed, r, true, newHigh);
  }

  // ---------- Tile Ball: setup helpers ----------
  function wondBuildTiles(level){
    level = level || WOND_LEVELS[0];
    var cols = level.cols, rows = level.rows;
    var gap = 5, tileH = 18, marginX = 18;
    var tileW = (WOND_W - marginX * 2 - (cols - 1) * gap) / cols;
    var left = marginX, top = 38;
    var pal = WOND.colors;
    var rowColors = [pal.coral, pal.yellow, pal.sky, pal.chalk, pal.chalkDim, pal.coral];
    var toughColor = '#9aa7bd';                                 // armoured (2-hit) tile
    var checker = (level.pattern === 'checker' || level.pattern === 'toughcheck');
    var toughTop = (level.pattern === 'tough' || level.pattern === 'toughcheck');
    WOND.tiles = [];
    for (var r = 0; r < rows; r++){
      for (var c = 0; c < cols; c++){
        if (checker && ((r + c) % 2 === 1)) continue;           // leave a gap
        var armored = toughTop && (r < 2);                      // top two rows are armoured
        var base = rowColors[r % rowColors.length];
        WOND.tiles.push({
          x: left + c * (tileW + gap),
          y: top + r * (tileH + gap),
          w: tileW, h: tileH,
          baseColor: base,
          color: armored ? toughColor : base,
          hp: armored ? 2 : 1,
          alive: true
        });
      }
    }
    WOND.tilesTotal = WOND.tiles.length;
    WOND.tilesLeft = WOND.tiles.length;
    // One random non-armoured tile is a ⚾ power tile — breaking it grants an extra ball.
    var candidates = WOND.tiles.filter(function(t){ return t.hp === 1; });
    if (candidates.length) candidates[Math.floor(Math.random() * candidates.length)].power = true;
  }

  // A fixed constellation of faint chalk dots (deterministic — no flicker on replay).
  function wondBuildStars(){
    WOND.stars = [];
    for (var i = 0; i < 24; i++){
      WOND.stars.push({ x: (i * 97 + 31) % WOND_W, y: 170 + ((i * 53 + 11) % (WOND_H - 190)) });
    }
  }

  function wondResetBall(){
    var b = WOND.ball, p = WOND.paddle;
    WOND.launched = false;
    b.x = p.x + p.w / 2;
    b.y = p.y - b.r - 1;
    b.vx = 0;
    b.vy = 0;
  }

  function wondLaunch(){
    if (!WOND.running || WOND.over || WOND.launched) return;
    var b = WOND.ball;
    var vx = WOND.speed * (Math.random() * 0.8 - 0.4);        // slight random tilt
    b.vx = vx;
    b.vy = -Math.sqrt(Math.max(1, WOND.speed * WOND.speed - vx * vx));
    WOND.launched = true;
  }

  // Rescale velocity to a new speed, keeping direction. Capped at WOND_MAX_SPEED.
  function wondSetSpeed(s){
    var cap = (WOND.level && WOND.level.maxSpeed) ? WOND.level.maxSpeed : WOND_MAX_SPEED;
    WOND.speed = Math.min(s, cap, WOND_MAX_SPEED);
    var b = WOND.ball;
    var mag = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
    if (mag > 0){
      b.vx = b.vx / mag * WOND.speed;
      b.vy = b.vy / mag * WOND.speed;
    }
  }

  function wondCountHit(){
    WOND.hits++;
    if (WOND.hits % 8 === 0) wondSetSpeed(WOND.speed * 1.06); // "speeds up slightly every 8 hits"
  }

  // ---------- Tile Ball: input ----------
  function wondBindInput(){
    var canvas = WOND.canvas;
    // Pointer events cover mouse AND touch; CSS touch-action:none stops page scroll.
    var onPointerMove = function(e){
      var rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      var x = (e.clientX - rect.left) * (WOND_W / rect.width);
      WOND.paddle.x = wondClamp(x - WOND.paddle.w / 2, 0, WOND_W - WOND.paddle.w);
      if (!WOND.launched) WOND.ball.x = WOND.paddle.x + WOND.paddle.w / 2;
    };
    var onPointerDown = function(e){
      e.preventDefault();
      onPointerMove(e);
      wondLaunch();
    };
    var onKeyDown = function(e){
      if (e.key === 'ArrowLeft'){ WOND.keys.left = true; e.preventDefault(); }
      else if (e.key === 'ArrowRight'){ WOND.keys.right = true; e.preventDefault(); }
      else if (e.key === ' ' || e.key === 'Spacebar'){ wondLaunch(); e.preventDefault(); }
    };
    var onKeyUp = function(e){
      if (e.key === 'ArrowLeft') WOND.keys.left = false;
      else if (e.key === 'ArrowRight') WOND.keys.right = false;
    };
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    WOND.handlers = { canvas: canvas, move: onPointerMove, down: onPointerDown, kd: onKeyDown, ku: onKeyUp };
  }

  // ---------- Tile Ball: main loop ----------
  function wondLoop(ts){
    if (!WOND.running) return;
    WOND.raf = requestAnimationFrame(wondLoop);
    // Safety net: if another module stole the view without closeWonderland(),
    // kill the loop rather than simulate a game nobody can see.
    var view = document.getElementById('wonderlandView');
    if (!view || !view.classList.contains('active')){ stopTileBall(); return; }
    var step = 1;
    if (WOND.lastTs) step = Math.min((ts - WOND.lastTs) / (1000 / 60), 2.5);
    WOND.lastTs = ts;
    wondUpdate(step);
    if (WOND.running) wondDraw();
  }

  function wondUpdate(step){
    var p = WOND.paddle;
    var move = 7 * step;
    if (WOND.keys.left) p.x -= move;
    if (WOND.keys.right) p.x += move;
    p.x = wondClamp(p.x, 0, WOND_W - p.w);

    var b = WOND.ball;
    if (!WOND.launched){                       // ball rides the paddle until launch
      b.x = p.x + p.w / 2;
      b.y = p.y - b.r - 1;
      return;
    }
    // Continuous "faster and faster" ramp while the ball is in play (on top of the per-8-hit
    // bump from wondCountHit) — every ~2.5s of active play nudges the speed up a touch.
    WOND.elapsed = (WOND.elapsed || 0) + step;
    if (WOND.elapsed >= 150){ WOND.elapsed = 0; wondSetSpeed(WOND.speed * 1.03); }
    // Substep so a fast ball can't tunnel through a tile between frames.
    var speedNow = Math.sqrt(b.vx * b.vx + b.vy * b.vy) || WOND.speed;
    var sub = Math.max(1, Math.ceil((speedNow * step) / 6));
    for (var i = 0; i < sub; i++){
      if (!WOND.running || WOND.over) return;
      wondStepBall(step / sub);
    }
  }

  function wondStepBall(s){
    var b = WOND.ball, p = WOND.paddle;
    b.x += b.vx * s;
    b.y += b.vy * s;

    // Walls
    if (b.x - b.r < 0){ b.x = b.r; b.vx = Math.abs(b.vx); }
    if (b.x + b.r > WOND_W){ b.x = WOND_W - b.r; b.vx = -Math.abs(b.vx); }
    if (b.y - b.r < 0){ b.y = b.r; b.vy = Math.abs(b.vy); }

    // Paddle: bounce angle depends on where the ball lands (edges = sharper angle)
    if (b.vy > 0 && b.y + b.r >= p.y && b.y + b.r <= p.y + p.h + 8 &&
        b.x >= p.x - b.r && b.x <= p.x + p.w + b.r){
      var rel = wondClamp((b.x - (p.x + p.w / 2)) / (p.w / 2), -1, 1);
      var ang = rel * 1.05;                    // max ~60° from vertical
      b.vx = WOND.speed * Math.sin(ang);
      b.vy = -Math.abs(WOND.speed * Math.cos(ang));
      b.y = p.y - b.r - 0.1;
      wondCountHit();
    }

    // Tiles (at most one break per substep)
    for (var i = 0; i < WOND.tiles.length; i++){
      var t = WOND.tiles[i];
      if (!t.alive) continue;
      if (b.x + b.r > t.x && b.x - b.r < t.x + t.w && b.y + b.r > t.y && b.y - b.r < t.y + t.h){
        t.hp--;
        if (t.hp <= 0){
          t.alive = false; WOND.tilesLeft--;
          if (t.power && WOND.balls < WOND.maxBalls){
            WOND.balls++;
            if (typeof showToast === 'function') showToast('⚾ Extra ball!');
            if (typeof playSfx === 'function') playSfx('correct');
          }
        }
        else { t.color = t.baseColor; }                        // armoured tile cracks to its base colour
        // Reflect on the axis we came from (previous position was outside that band)
        var py = b.y - b.vy * s;
        if (py <= t.y - b.r || py >= t.y + t.h + b.r) b.vy = -b.vy; else b.vx = -b.vx;
        if (typeof playSfx === 'function') playSfx('battle-hit');
        wondCountHit();
        wondUpdateHud();
        if (WOND.tilesLeft <= 0){ endTileBall(); return; }
        break;
      }
    }

    // Floor: lose a ball
    if (b.y - b.r > WOND_H){
      WOND.balls--;
      wondUpdateHud();
      if (typeof playSfx === 'function') playSfx('wrong');
      if (WOND.balls <= 0){ endTileBall(); return; }
      wondResetBall();
    }
  }

  // ---------- Tile Ball: rendering ----------
  function wondUpdateHud(){
    var hud = document.getElementById('wondHud');
    if (!hud) return;
    var destroyed = WOND.tilesTotal - WOND.tilesLeft;
    var f = WOND.tilesTotal > 0 ? destroyed / WOND.tilesTotal : 0;
    hud.innerHTML =
      '<span class="wond-chip">🎚️ Level <b>' + (WOND.levelIdx + 1) + '</b></span>' +
      '<span class="wond-chip">🧱 Tiles left: <b>' + WOND.tilesLeft + '</b></span>' +
      '<span class="wond-chip">⚾ Balls: <b>' + WOND.balls + '</b></span>' +
      '<span class="wond-chip">🎁 Prize now: <b>' + wondTierLabel(f) + '</b></span>';
  }

  // Rounded-rect fill without relying on ctx.roundRect (older browsers).
  function wondRoundRect(c, x, y, w, h, r, fill){
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
    c.fillStyle = fill;
    c.fill();
  }

  function wondDraw(){
    var c = WOND.ctx2d;
    if (!c) return;
    var cols = WOND.colors, p = WOND.paddle, b = WOND.ball;
    // Chalkboard-dark backdrop + faint star dots
    c.fillStyle = '#142a1f';
    c.fillRect(0, 0, WOND_W, WOND_H);
    c.fillStyle = 'rgba(244,241,232,0.18)';
    for (var i = 0; i < WOND.stars.length; i++){
      c.fillRect(WOND.stars[i].x, WOND.stars[i].y, 2, 2);
    }
    // Tiles
    for (var j = 0; j < WOND.tiles.length; j++){
      var t = WOND.tiles[j];
      if (!t.alive) continue;
      wondRoundRect(c, t.x, t.y, t.w, t.h, 4, t.color);
      if (t.power){                                          // ⚾ extra-ball tile — glowing ring + icon
        c.save();
        c.strokeStyle = '#fff'; c.lineWidth = 2; c.globalAlpha = 0.85;
        c.strokeRect(t.x + 1, t.y + 1, t.w - 2, t.h - 2);
        c.globalAlpha = 1;
        c.font = (Math.min(t.w, t.h) - 4) + 'px serif';
        c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillText('⚾', t.x + t.w / 2, t.y + t.h / 2 + 1);
        c.restore();
      }
    }
    // Paddle + ball
    wondRoundRect(c, p.x, p.y, p.w, p.h, 6, cols.chalk);
    c.beginPath();
    c.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    c.fillStyle = cols.yellow;
    c.fill();
    // Launch hint
    if (!WOND.launched && !WOND.over){
      c.fillStyle = 'rgba(244,241,232,0.75)';
      c.font = '600 16px Quicksand, sans-serif';
      c.textAlign = 'center';
      c.fillText('Click, tap, or press Space to launch!', WOND_W / 2, WOND_H / 2 + 30);
    }
  }
