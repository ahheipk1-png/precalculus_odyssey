  // ============================================================================
  // ✈️ SKY SQUADRON 194X — 10-level vertical-scrolling 194X-style campaign
  // shooter (module 54). The game itself was supplied by the user as a complete
  // standalone HTML page; ALL of its game logic below (LEVELS configs, enemy
  // formations, boss patterns, pilot XP/leveling, powerups, graze mechanic,
  // particles, WebAudio SFX, canvas art) is that code, essentially verbatim,
  // wrapped in an IIFE so its many generic names (player, keys, bullets, wave…)
  // can't collide with this shared-global-scope codebase. Only the SHELL was
  // adapted to the Wonderland conventions (same treatment as 53-cloudberry.js):
  //   - openSkySquadron() → gameWelcome() free leaderboard/Play screen; Play
  //     charges 1 Wonderland Pass via wonderPlay like every other Arcade game.
  //   - _ssqStartRun() → a2Shell() topbar+canvas+touch-pad chrome; the original
  //     page's DOM HUD (score cards, health/special/XP bars, combo, message
  //     overlay, pause panel) is now drawn ON the canvas, so no new CSS at all.
  //   - Input via a2Keys()/A2.raf with the a2Active() loop guard — leaving
  //     mid-run can't leak keydown/keyup listeners or a stray rAF loop (the
  //     documented key-leak bug class; see docs/world-and-hubs.md).
  //   - The original's virtual joystick is replaced with the shared .a2-pad
  //     D-pad + Blast/Pause buttons (matches every other A2 canvas game).
  //   - endGame() → wgRecordScore()/a2Result() for the leaderboard + the
  //     standard Cash/materials reward, replacing the page's own overlays.
  //   - localStorage high score → wgMini('skySquadron') (cloud-saved).
  //   - WebAudio tone()/noise() SFX are gated on the game's SFX volume setting.
  // ============================================================================
  (function () {
  "use strict";

  var SSQ_ID = "skySquadron";

  var canvas = null;
  var ctx = null;

  // Fixed logical canvas (vertical shooter) — .a2-canvas CSS scales it to fit.
  var W = 640, H = 800;
  var dpr = 1;   // kept for the boss-health-bar setTransform below (identity)

  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rand = (a, b) => a + Math.random() * (b - a);
  const chance = p => Math.random() < p;
  const dist2 = (a, b) => {
    const dx = a.x - b.x, dy = a.y - b.y;
    return dx * dx + dy * dy;
  };

  // `phase` = the original's `state` string, renamed so the GLOBAL save `state`
  // (needed for the SFX-mute check) stays reachable inside this closure.
  let phase = "menu";
  let running = false;
  let last = 0;
  let time = 0;
  let score = 0;
  let best = 0;
  let kills = 0;
  let wave = 1;
  let waveTimer = 0;
  let waveDuration = 24;
  let spawnTimer = 0;
  let bossActive = false;
  let screenShake = 0;
  let slowMotion = 0;
  let flash = 0;
  let combo = 1;
  let comboTimer = 0;
  let formationIndex = 0;
  let levelPhase = "combat";
  let levelTransitionTimer = 0;
  let gameWon = false;
  let pilotLevel = 1;
  let xp = 0;
  let xpToNext = 320;
  let specialWarningTimer = 0;

  const SPECIAL_COST = 50;

  const LEVELS = [
    { name:"DAWN PATROL", subtitle:"Warm-up formations over the outer islands", boss:"Copper Hawk", duration:22, spawnInterval:4.4, difficulty:1, hpScale:.88, speedScale:.92, bulletScale:.84, bossHp:165, bossFire:1.18, bossMove:.62, bossPattern:0, clearBonus:1800, repair:24, patterns:[0,1,4], palette:["#174d68","#0a6480","#07506a","#b9efff","#5ab2ce"], bossColors:["#b87345","#6f352a","#ffd17a"] },
    { name:"ISLAND RUN", subtitle:"Fast scouts attack through a narrow island chain", boss:"Sea Viper", duration:24, spawnInterval:4.0, difficulty:2, hpScale:1, speedScale:1, bulletScale:.94, bossHp:215, bossFire:1.08, bossMove:.72, bossPattern:1, clearBonus:2300, repair:22, patterns:[1,0,2,4], palette:["#0c5771","#087d8f","#07536d","#c6fbff","#47c1ce"], bossColors:["#477f83","#254650","#9af4dd"] },
    { name:"STORM FRONT", subtitle:"Heavy bombers emerge beneath dark cloud cover", boss:"Thunder Ox", duration:25, spawnInterval:3.7, difficulty:3, hpScale:1.12, speedScale:1.07, bulletScale:1.02, bossHp:275, bossFire:.98, bossMove:.82, bossPattern:2, clearBonus:2900, repair:22, patterns:[2,0,5,1], palette:["#273d4b","#345664","#1c3847","#b9d6dd","#688f9d"], bossColors:["#606c78","#303945","#ffd665"] },
    { name:"CORAL AMBUSH", subtitle:"Ace pilots weave through bright tropical waters", boss:"Reef Mantis", duration:26, spawnInterval:3.5, difficulty:4, hpScale:1.24, speedScale:1.13, bulletScale:1.10, bossHp:335, bossFire:.91, bossMove:.92, bossPattern:3, clearBonus:3500, repair:20, patterns:[3,4,1,6], palette:["#0e6471","#0c96a0","#075d77","#d2ffff","#57d7d0"], bossColors:["#7b557d","#3c2949","#ffcf68"] },
    { name:"CARRIER STRIKE", subtitle:"Break the armored air wing guarding the fleet", boss:"Iron Albatross", duration:27, spawnInterval:3.25, difficulty:5, hpScale:1.38, speedScale:1.18, bulletScale:1.16, bossHp:405, bossFire:.85, bossMove:1.02, bossPattern:4, clearBonus:4300, repair:20, patterns:[5,2,6,0,3], palette:["#244f63","#326d78","#183c52","#c5eff4","#679fac"], bossColors:["#505c68","#252d37","#ff765f"] },
    { name:"SUNSET SIEGE", subtitle:"Enemy squadrons descend from the burning horizon", boss:"Ember Falcon", duration:28, spawnInterval:3.05, difficulty:6, hpScale:1.52, speedScale:1.24, bulletScale:1.23, bossHp:485, bossFire:.79, bossMove:1.10, bossPattern:5, clearBonus:5200, repair:18, patterns:[4,3,6,2,1], palette:["#714354","#b15b55","#5e3247","#ffd5a3","#dc8872"], bossColors:["#9d4439","#53252d","#ffd45f"] },
    { name:"NIGHT RAIDERS", subtitle:"Survive coordinated attacks under moonless skies", boss:"Black Scorpion", duration:29, spawnInterval:2.85, difficulty:7, hpScale:1.68, speedScale:1.30, bulletScale:1.31, bossHp:580, bossFire:.73, bossMove:1.18, bossPattern:6, clearBonus:6200, repair:18, patterns:[6,3,5,4,1], palette:["#08182c","#102c49","#071829","#77a7cf","#315b7c"], bossColors:["#39334e","#171726","#9ce7ff"] },
    { name:"IRON TEMPEST", subtitle:"Dense armored formations close every escape route", boss:"Steel Kraken", duration:30, spawnInterval:2.65, difficulty:8, hpScale:1.86, speedScale:1.36, bulletScale:1.39, bossHp:690, bossFire:.68, bossMove:1.26, bossPattern:7, clearBonus:7400, repair:16, patterns:[5,6,2,3,4], palette:["#26323d","#46535c","#202b35","#c8d4d9","#74868e"], bossColors:["#64707c","#292f38","#ffbc55"] },
    { name:"CRIMSON SKY", subtitle:"Elite aces launch the empire's final counterattack", boss:"Scarlet Dragon", duration:31, spawnInterval:2.45, difficulty:9, hpScale:2.05, speedScale:1.43, bulletScale:1.48, bossHp:820, bossFire:.63, bossMove:1.34, bossPattern:8, clearBonus:8800, repair:16, patterns:[3,6,5,4,2,1], palette:["#572b3b","#8c3b45","#3b2032","#ffc5b3","#b9656a"], bossColors:["#b0383c","#5b1f2c","#ffd36b"] },
    { name:"FINAL ARMADA", subtitle:"Destroy the supreme commander and end the air war", boss:"Grand Leviathan", duration:33, spawnInterval:2.20, difficulty:10, hpScale:2.28, speedScale:1.52, bulletScale:1.58, bossHp:1000, bossFire:.56, bossMove:1.42, bossPattern:9, clearBonus:15000, repair:0, patterns:[6,5,3,2,4,1,0], palette:["#1c1739","#3c285c","#17132d","#c9b9ff","#765fa8"], bossColors:["#7a3f92","#351c51","#fff08b"] }
  ];
  const TOTAL_LEVELS = LEVELS.length;

  function currentLevel() {
    return LEVELS[clamp(wave - 1, 0, TOTAL_LEVELS - 1)];
  }

  const keys = new Set();
  // The original virtual joystick fed this; the a2-pad D-pad uses `keys`
  // directly instead, so this stays permanently zero (updatePlayer is verbatim).
  let pointerMove = { x: 0, y: 0, active: false };
  let specialPressed = false;

  const bullets = [];
  const enemyBullets = [];
  const enemies = [];
  const particles = [];
  const powerups = [];
  const clouds = [];
  const islands = [];
  const trails = [];
  const floaters = [];

  const player = {
    x: W / 2,
    y: H * 0.78,
    vx: 0,
    vy: 0,
    radius: 18,
    speed: 330,
    hp: 100,
    maxHp: 100,
    fireTimer: 0,
    fireRate: 0.14,
    weapon: 1,
    weaponTimer: 0,
    special: 100,
    maxSpecial: 100,
    shield: 0,
    rapidTimer: 0,
    invuln: 0,
    tilt: 0
  };

  // Lightweight WebAudio effects generated in real time — gated on the game's
  // Settings SFX volume so muting Sound mutes this game too.
  function _sfxOn(){
    try {
      return !(typeof state === "object" && state && state.settings && Number(state.settings.sfxVol) === 0);
    } catch (e) { return true; }
  }
  let audio = null;
  function initAudio() {
    if (audio) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audio = new AC();
  }

  function tone(freq, duration = 0.06, type = "square", volume = 0.025, endFreq = null) {
    if (!audio || !_sfxOn()) return;
    const now = audio.currentTime;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain).connect(audio.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  function noise(duration = 0.12, volume = 0.035) {
    if (!audio || !_sfxOn()) return;
    const count = Math.floor(audio.sampleRate * duration);
    const buffer = audio.createBuffer(1, count, audio.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < count; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / count);
    const source = audio.createBufferSource();
    const gain = audio.createGain();
    const filter = audio.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1200;
    source.buffer = buffer;
    gain.gain.value = volume;
    source.connect(filter).connect(gain).connect(audio.destination);
    source.start();
  }

  function resetGame() {
    score = 0;
    kills = 0;
    wave = 1;
    waveTimer = 0;
    waveDuration = LEVELS[0].duration;
    spawnTimer = 0.8;
    bossActive = false;
    levelPhase = "combat";
    levelTransitionTimer = 0;
    gameWon = false;
    screenShake = 0;
    slowMotion = 0;
    flash = 0;
    combo = 1;
    comboTimer = 0;
    formationIndex = 0;
    specialPressed = false;
    pilotLevel = 1;
    xp = 0;
    xpToNext = 320;
    specialWarningTimer = 0;
    msg = null;

    bullets.length = 0;
    enemyBullets.length = 0;
    enemies.length = 0;
    particles.length = 0;
    powerups.length = 0;
    trails.length = 0;
    floaters.length = 0;

    player.x = W / 2;
    player.y = H * 0.80;
    player.vx = 0;
    player.vy = 0;
    player.speed = 330;
    player.maxHp = 100;
    player.hp = player.maxHp;
    player.fireRate = 0.14;
    player.maxSpecial = 100;
    player.special = 100;
    player.fireTimer = 0;
    player.weapon = 1;
    player.weaponTimer = 0;
    player.shield = 0;
    player.rapidTimer = 0;
    player.invuln = 1.8;
    beginLevel(1, true);
  }

  function setPaused(paused) {
    if (phase !== "playing" && phase !== "paused") return;
    phase = paused ? "paused" : "playing";
    if (!paused) last = performance.now();
  }

  function endGame(victory = false) {
    phase = "gameover";
    running = false;
    gameWon = victory;
    var lvlReached = victory ? TOTAL_LEVELS : wave;
    var newHigh = (typeof wgRecordScore === "function") ? wgRecordScore(SSQ_ID, score, lvlReached) : false;
    var frac = victory ? 1 : Math.max(0.05, Math.min(0.95, (wave - 1) / TOTAL_LEVELS));
    a2Result(
      "✈️ Sky Squadron 194X",
      (victory ? "CAMPAIGN COMPLETE!" : "Aircraft Lost") + (newHigh ? " 🏆" : ""),
      "Score <b>" + score.toLocaleString() + "</b> · reached level <b>" + wave + " / " + TOTAL_LEVELS + "</b> · destroyed <b>" + kills + "</b>" +
        (victory
          ? "<br>All ten commanders have been defeated — the island chain is secure."
          : "<br>Mission failed during " + currentLevel().name + ". Graze enemy bullets to charge your blast, and grab first-aid boxes and shields."),
      frac, "openSkySquadron"
    );
    if (victory) {
      tone(392, .25, "sine", .04, 523);
      a2Later(() => tone(523, .28, "sine", .04, 784), 180);
    } else {
      tone(150, .35, "sawtooth", .045, 45);
    }
  }

  // The original's DOM message overlay, drawn on canvas instead.
  let msg = null;
  function showMessage(title, subtitle, duration = 1400) {
    msg = { title: title, sub: subtitle || "", until: time + duration / 1000 };
  }

  function gainXp(amount) {
    xp += amount;
    while (xp >= xpToNext) {
      xp -= xpToNext;
      pilotLevel++;
      xpToNext = Math.round(xpToNext * 1.30 + 45);

      player.maxHp += 10;
      player.hp = Math.min(player.maxHp, player.hp + 35);
      player.speed += 9;
      player.fireRate = Math.max(0.082, player.fireRate - 0.007);
      player.maxSpecial += 5;
      player.special = Math.min(player.maxSpecial, player.special + SPECIAL_COST);
      if (pilotLevel % 2 === 0) {
        player.weapon = Math.min(4, Math.max(player.weapon, 2));
        player.weaponTimer = Math.max(player.weaponTimer, 20);
      }

      score += pilotLevel * 400;
      player.invuln = Math.max(player.invuln, 1.4);
      flash = Math.max(flash, 0.42);
      screenShake = Math.max(screenShake, 10);
      emit(player.x, player.y, "#ffe785", 38, 250, 5, 1.0);
      showMessage(`PILOT LEVEL ${pilotLevel}`, "+HP  +SPEED  +FIRE RATE", 1800);
      tone(440, 0.32, "sine", 0.05, 980);
    }
  }

  function addScore(value, x, y) {
    const total = Math.round(value * combo);
    score += total;
    if (score > best) best = score;
    floaters.push({ x, y, text: `+${total}`, life: 0.8, maxLife: 0.8 });
  }

  function spawnCloud(initial = false) {
    clouds.push({
      x: rand(-100, W + 100),
      y: initial ? rand(-100, H) : -120,
      size: rand(55, 140),
      speed: rand(18, 50),
      alpha: rand(0.06, 0.18)
    });
  }

  function spawnIsland(initial = false) {
    const size = rand(70, 180);
    islands.push({
      x: rand(-size * 0.2, W - size * 0.8),
      y: initial ? rand(-200, H) : -size * 1.8,
      size,
      speed: rand(55, 85),
      seed: Math.random() * 1000,
      side: chance(0.5) ? -1 : 1
    });
  }

  for (let i = 0; i < 9; i++) spawnCloud(true);
  for (let i = 0; i < 5; i++) spawnIsland(true);

  function emit(x, y, color, count, speed = 150, size = 3, life = 0.5) {
    for (let i = 0; i < count; i++) {
      const a = rand(0, TAU);
      const s = rand(speed * 0.25, speed);
      particles.push({
        x, y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        size: rand(size * 0.45, size),
        life: rand(life * 0.55, life),
        maxLife: life,
        color,
        drag: rand(1.5, 3.5)
      });
    }
  }

  function trail(x, y, color, size = 6, life = 0.28) {
    trails.push({ x, y, color, size, life, maxLife: life });
  }

  function shootPlayer() {
    const level = player.weapon;
    const speed = 660;
    const spawn = (angle, ox, oy, damage = 1) => {
      bullets.push({
        x: player.x + ox,
        y: player.y + oy,
        vx: Math.sin(angle) * speed,
        vy: -Math.cos(angle) * speed,
        radius: level >= 4 ? 4 : 3,
        damage,
        life: 1.6,
        color: level >= 4 ? "#8ffaff" : "#ffd66e"
      });
    };

    if (level === 1) {
      spawn(0, 0, -24, 1);
    } else if (level === 2) {
      spawn(-0.035, -8, -18, 1);
      spawn(0.035, 8, -18, 1);
    } else if (level === 3) {
      spawn(-0.11, -12, -14, 1);
      spawn(0, 0, -25, 1.2);
      spawn(0.11, 12, -14, 1);
    } else {
      spawn(-0.18, -14, -12, 1);
      spawn(-0.05, -6, -22, 1.25);
      spawn(0.05, 6, -22, 1.25);
      spawn(0.18, 14, -12, 1);
    }
    tone(level >= 4 ? 520 : 420, 0.035, "square", 0.012, 680);
  }

  function enemyShoot(e, mode = "aimed") {
    if (enemyBullets.length > 150) return;
    const aim = Math.atan2(player.y - e.y, player.x - e.x);
    const level = currentLevel();
    const speed = (145 + wave * 4) * level.bulletScale;

    const add = (angle, mult = 1, radius = 4) => {
      enemyBullets.push({
        x: e.x,
        y: e.y + e.radius * 0.5,
        vx: Math.cos(angle) * speed * mult,
        vy: Math.sin(angle) * speed * mult,
        radius,
        life: 7,
        color: e.boss ? "#ff806b" : "#ffbf69",
        grazed: false
      });
    };

    if (mode === "spread") {
      for (let i = -2; i <= 2; i++) add(Math.PI / 2 + i * 0.16, 0.95);
    } else if (mode === "wide") {
      for (let i = -4; i <= 4; i++) add(Math.PI / 2 + i * 0.13, 0.90, 3.6);
    } else if (mode === "ring") {
      const n = 12 + Math.min(8, wave);
      for (let i = 0; i < n; i++) add((i / n) * TAU, 0.76, 3.6);
    } else if (mode === "spiral") {
      const n = 7, base = e.volley * 0.25;
      for (let i = 0; i < n; i++) add(base + (i / n) * TAU, 0.82, 3.5);
    } else if (mode === "cross") {
      for (let i = 0; i < 4; i++) {
        add(e.volley * 0.16 + i * Math.PI / 2, 0.88, 3.8);
        add(e.volley * 0.16 + i * Math.PI / 2 + 0.17, 0.72, 3.2);
      }
    } else {
      add(aim, 1);
      if (wave >= 5 && !e.boss) {
        add(aim - 0.12, 0.9, 3.4);
        add(aim + 0.12, 0.9, 3.4);
      }
    }
  }

  function spawnEnemy(type = "fighter", x = rand(60, W - 60), y = -50, extra = {}) {
    const level = currentLevel();
    const configs = {
      fighter: { hp: (3 + wave * .22) * level.hpScale, radius: 16, speed: (100 + wave * 3) * level.speedScale, score: 100 + wave * 12 },
      scout:   { hp: (2 + wave * .12) * level.hpScale, radius: 13, speed: (150 + wave * 4) * level.speedScale, score: 130 + wave * 14 },
      bomber:  { hp: (13 + wave * .8) * level.hpScale, radius: 27, speed: (65 + wave * 1.5) * level.speedScale, score: 420 + wave * 28 },
      ace:     { hp: (8 + wave * .55) * level.hpScale, radius: 19, speed: (115 + wave * 2.5) * level.speedScale, score: 300 + wave * 24 }
    };
    const c = configs[type];
    enemies.push({
      type,
      x, y,
      baseX: x,
      hp: c.hp,
      maxHp: c.hp,
      radius: c.radius,
      speed: c.speed,
      score: c.score,
      age: 0,
      phase: rand(0, TAU),
      shootTimer: rand(0.5, 1.8),
      rot: Math.PI,
      boss: false,
      ...extra
    });
  }

  function spawnFormation() {
    const level = currentLevel();
    const pattern = level.patterns[formationIndex++ % level.patterns.length];
    const difficulty = level.difficulty;
    if (pattern === 0) {
      const count = 5 + Math.min(5, Math.ceil(difficulty * .65));
      for (let i=0;i<count;i++) { const t=i/(count-1); spawnEnemy("fighter",lerp(W*.14,W*.86,t),-50-Math.abs(i-count/2)*22,{phase:t*Math.PI}); }
    } else if (pattern === 1) {
      const side=chance(.5)?-1:1;
      for (let i=0;i<6+Math.ceil(difficulty*.65);i++) spawnEnemy(i%3===0?"scout":"fighter",side<0?-30-i*18:W+30+i*18,-30-i*25,{entrySide:side});
    } else if (pattern === 2) {
      const bombers=difficulty>=7?2:1;
      for(let b=0;b<bombers;b++) spawnEnemy("bomber",W*(bombers===1?.5:.34+b*.32),-70-b*55);
      for(let i=0;i<4+Math.ceil(difficulty*.55);i++) spawnEnemy("fighter",W*.22+(i%2)*W*.56,-80-i*38);
    } else if (pattern === 3) {
      for(let i=0;i<4+Math.ceil(difficulty*.7);i++) spawnEnemy("ace",W*(.18+(i%3)*.32),-60-i*45,{phase:i*.8});
    } else if (pattern === 4) {
      const count=8+Math.ceil(difficulty*.7);
      for(let i=0;i<count;i++) spawnEnemy(i%4===0?"scout":"fighter",W*.5+Math.sin(i*.8)*W*.31,-60-i*34,{phase:i*.65});
    } else if (pattern === 5) {
      const rows=difficulty>=8?3:2;
      for(let row=0;row<rows;row++) { const count=2+(difficulty>=6?1:0); for(let i=0;i<count;i++) spawnEnemy("bomber",W*(.25+i*(.5/Math.max(1,count-1))),-90-row*105,{phase:i*1.7+row}); }
    } else if (pattern === 6) {
      spawnEnemy("bomber",W*.5,-90);
      const count=6+Math.ceil(difficulty*.5);
      for(let i=0;i<count;i++){const side=i%2===0?-1:1,lane=Math.floor(i/2);spawnEnemy(i%3===0?"ace":"fighter",W*.5+side*(90+lane*44),-60-lane*52,{phase:i*.72});}
    }
  }

  function spawnBoss() {
    const level=currentLevel();
    bossActive=true; levelPhase="boss"; enemyBullets.length=0; enemies.length=0;
    const hp=level.bossHp;
    enemies.push({type:"boss",x:W/2,y:-120,baseX:W/2,hp,maxHp:hp,radius:66+wave*1.2,speed:52,score:6000+wave*900,age:0,phase:0,shootTimer:1.25,rot:Math.PI,boss:true,state:"enter",volley:0,bossName:level.boss,bossPattern:level.bossPattern,bossFire:level.bossFire,bossMove:level.bossMove,bossColors:level.bossColors});
    showMessage(`LEVEL ${wave} BOSS`,level.boss,2200); tone(90,.8,"sawtooth",.035,45);
  }

  function spawnPowerup(x, y) {
    const roll = Math.random();
    const type =
      roll < 0.24 ? "weapon" :
      roll < 0.46 ? "medkit" :
      roll < 0.64 ? "energy" :
      roll < 0.78 ? "rank" :
      roll < 0.90 ? "shield" : "rapid";

    powerups.push({
      type, x, y, vy: 78, radius: type === "medkit" ? 16 : 14, age: 0
    });
  }

  function activateSpecial() {
    if (phase !== "playing") return;
    if (player.special < SPECIAL_COST) {
      if (specialWarningTimer <= 0) {
        showMessage("BLAST NOT READY", `Need ${SPECIAL_COST} energy`, 800);
        specialWarningTimer = 0.8;
        tone(115, 0.08, "square", 0.022, 80);
      }
      return;
    }
    player.special -= SPECIAL_COST;
    player.invuln = Math.max(player.invuln, 1.3);
    flash = 0.85;
    slowMotion = 0.35;
    screenShake = 18;

    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      emit(e.x, e.y, "#9ffcff", e.boss ? 18 : 10, 260, 4, 0.7);
      if (e.boss) {
        e.hp -= 35;
        if (e.hp <= 0) destroyEnemy(e, i);
      } else {
        destroyEnemy(e, i);
      }
    }
    for (const b of enemyBullets) emit(b.x, b.y, "#bdf8ff", 2, 80, 2, 0.3);
    enemyBullets.length = 0;

    tone(160, 0.55, "sawtooth", 0.055, 780);
  }

  function destroyEnemy(e, index) {
    const wasBoss = e.boss;
    addScore(e.score, e.x, e.y);
    kills++;
    gainXp(e.boss ? 700 : Math.max(30, Math.round(e.score * 0.22)));
    combo = Math.min(9, combo + 1);
    comboTimer = 2.5;
    player.special = Math.min(player.maxSpecial, player.special + (e.boss ? 40 : 4.5));
    screenShake = Math.max(screenShake, e.boss ? 24 : 5);

    emit(e.x, e.y, e.boss ? "#ffd17a" : "#ff9d67", e.boss ? 80 : 18, e.boss ? 420 : 230, e.boss ? 7 : 4, e.boss ? 1.2 : 0.65);
    emit(e.x, e.y, "#fff4c2", e.boss ? 30 : 7, e.boss ? 340 : 190, 3, 0.45);
    noise(e.boss ? 0.55 : 0.11, e.boss ? 0.11 : 0.035);

    if (e.boss) {
      bossActive = false;
      enemyBullets.length = 0;
      score += currentLevel().clearBonus;
      player.hp = Math.min(player.maxHp, player.hp + 8);
      player.special = Math.min(player.maxSpecial, player.special + 25);
    } else if (chance(e.type === "bomber" ? 0.58 : e.type === "ace" ? 0.28 : 0.17)) {
      spawnPowerup(e.x, e.y);
    }

    enemies.splice(index, 1);
    if (wasBoss) completeLevel();
  }

  function beginLevel(levelNumber, firstLevel = false) {
    wave=clamp(levelNumber,1,TOTAL_LEVELS); const level=currentLevel();
    waveTimer=0; waveDuration=level.duration; spawnTimer=firstLevel?.9:1.2; formationIndex=0; bossActive=false; levelPhase="combat"; levelTransitionTimer=0; enemyBullets.length=0; enemies.length=0;
    if(!firstLevel){player.invuln=Math.max(player.invuln,2);player.hp=Math.min(player.maxHp,player.hp+10);}
    showMessage(`LEVEL ${wave}: ${level.name}`,level.subtitle,2300); tone(260+wave*18,.20,"sine",.035,480+wave*22);
  }

  function completeLevel() {
    const level=currentLevel(); bossActive=false; enemyBullets.length=0; enemies.length=0; levelTransitionTimer=3;
    player.hp=Math.min(player.maxHp,player.hp+level.repair); player.special=Math.min(player.maxSpecial,player.special+SPECIAL_COST); if(wave%2===0) player.shield=Math.min(3,player.shield+1);
    if(wave>=TOTAL_LEVELS){levelPhase="victory";score+=25000;showMessage("FINAL ARMADA DESTROYED","The island chain is secure",2600);} else {levelPhase="transition";const next=LEVELS[wave];showMessage(`LEVEL ${wave} CLEARED`,`Next: ${next.name}`,2600);}
  }

  function damagePlayer(amount) {
    if (player.invuln > 0) return;

    if (player.shield > 0) {
      player.shield--;
      player.invuln = 0.55;
      screenShake = 7;
      emit(player.x, player.y, "#7de7ff", 24, 220, 4, 0.65);
      showMessage("SHIELD BLOCK", `${player.shield} charge${player.shield === 1 ? "" : "s"} remaining`, 700);
      tone(720, 0.12, "sine", 0.035, 280);
      return;
    }

    player.hp -= amount;
    player.invuln = 1.1;
    combo = 1;
    comboTimer = 0;
    screenShake = 14;
    flash = 0.35;
    emit(player.x, player.y, "#ff8b74", 28, 270, 4, 0.75);
    noise(0.22, 0.06);

    if (player.hp <= 0) {
      player.hp = 0;
      emit(player.x, player.y, "#ffd08a", 90, 430, 7, 1.2);
      endGame();
    }
  }

  function updateBackground(dt) {
    for (const c of clouds) {
      c.y += c.speed * dt;
      c.x += Math.sin(time * 0.18 + c.size) * 3 * dt;
    }
    for (let i = clouds.length - 1; i >= 0; i--) {
      if (clouds[i].y > H + clouds[i].size) clouds.splice(i, 1);
    }
    if (clouds.length < 10 && chance(dt * 0.8)) spawnCloud();

    for (const island of islands) island.y += island.speed * dt;
    for (let i = islands.length - 1; i >= 0; i--) {
      if (islands[i].y > H + islands[i].size * 2) islands.splice(i, 1);
    }
    if (islands.length < 6 && chance(dt * 0.38)) spawnIsland();
  }

  function updatePlayer(dt) {
    let mx = 0, my = 0;
    if (keys.has("ArrowLeft") || keys.has("KeyA")) mx -= 1;
    if (keys.has("ArrowRight") || keys.has("KeyD")) mx += 1;
    if (keys.has("ArrowUp") || keys.has("KeyW")) my -= 1;
    if (keys.has("ArrowDown") || keys.has("KeyS")) my += 1;

    mx += pointerMove.x;
    my += pointerMove.y;

    const len = Math.hypot(mx, my) || 1;
    if (Math.abs(mx) + Math.abs(my) > 0.01) {
      mx /= len; my /= len;
    }

    const targetVx = mx * player.speed;
    const targetVy = my * player.speed;
    player.vx = lerp(player.vx, targetVx, 1 - Math.exp(-dt * 10));
    player.vy = lerp(player.vy, targetVy, 1 - Math.exp(-dt * 10));

    player.x += player.vx * dt;
    player.y += player.vy * dt;
    player.x = clamp(player.x, 28, W - 28);
    player.y = clamp(player.y, Math.max(100, H * 0.15), H - 40);

    player.tilt = lerp(player.tilt, clamp(player.vx / player.speed, -1, 1) * 0.32, 1 - Math.exp(-dt * 9));
    player.invuln = Math.max(0, player.invuln - dt);
    player.rapidTimer = Math.max(0, player.rapidTimer - dt);
    specialWarningTimer = Math.max(0, specialWarningTimer - dt);
    player.weaponTimer = Math.max(0, player.weaponTimer - dt);
    if (player.weaponTimer <= 0 && player.weapon > 1) {
      player.weapon = Math.max(1, player.weapon - 1);
      player.weaponTimer = player.weapon > 1 ? 8 : 0;
    }

    player.fireTimer -= dt;
    if (player.fireTimer <= 0) {
      shootPlayer();
      const rapidMultiplier = player.rapidTimer > 0 ? 0.52 : 1;
      player.fireTimer = Math.max(0.052, (player.fireRate - (player.weapon - 1) * 0.012) * rapidMultiplier);
    }

    trail(player.x - 8, player.y + 23, "#bfeeff", rand(4, 8), 0.2);
    trail(player.x + 8, player.y + 23, "#bfeeff", rand(4, 8), 0.2);

    if (specialPressed) {
      activateSpecial();
      specialPressed = false;
    }
  }

  function updateEnemies(dt) {
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      e.age += dt;
      e.shootTimer -= dt;

      if (e.boss) {
        if (e.state === "enter") {
          e.y += 90 * dt;
          if (e.y >= 110) {
            e.y = 110;
            e.state = "fight";
          }
        } else {
          const movement=e.bossMove||1;
          e.x=W/2+Math.sin(e.age*(.58+movement*.14))*W*Math.min(.36,.22+movement*.06);
          e.y=105+Math.sin(e.age*(1.05+movement*.20))*(18+movement*8);
          if(e.shootTimer<=0){
            e.volley++; let mode="aimed";
            switch(e.bossPattern){
              case 0: mode=e.volley%3===0?"spread":"aimed"; break;
              case 1: mode=e.volley%3===0?"ring":"aimed"; break;
              case 2: mode=e.volley%2===0?"wide":"aimed"; break;
              case 3: mode=e.volley%3===0?"spiral":"spread"; break;
              case 4: mode=e.volley%2===0?"ring":"wide"; break;
              case 5: mode=e.volley%3===0?"cross":"aimed"; break;
              case 6: mode=e.volley%2===0?"spiral":"aimed"; break;
              case 7: mode=e.volley%3===0?"cross":"wide"; break;
              case 8: mode=e.volley%3===0?"ring":e.volley%2===0?"spiral":"aimed"; break;
              case 9: mode=e.volley%4===0?"cross":e.volley%3===0?"ring":e.volley%2===0?"wide":"spiral"; break;
            }
            enemyShoot(e,mode); if(wave>=8&&e.volley%4===0) enemyShoot(e,"aimed"); e.shootTimer=Math.max(.42,e.bossFire||.9);
          }
        }
      } else {
        if (e.entrySide) {
          e.x += -e.entrySide * e.speed * 0.75 * dt;
          e.y += e.speed * 0.72 * dt;
          e.x += Math.sin(e.age * 2.2 + e.phase) * 55 * dt;
        } else if (e.type === "scout") {
          e.y += e.speed * dt;
          e.x += Math.sin(e.age * 4.0 + e.phase) * 115 * dt;
        } else if (e.type === "ace") {
          e.y += e.speed * 0.70 * dt;
          e.x += Math.sin(e.age * 2.8 + e.phase) * 165 * dt;
        } else if (e.type === "bomber") {
          e.y += e.speed * dt;
          e.x = e.baseX + Math.sin(e.age * 1.1 + e.phase) * W * 0.18;
        } else {
          e.y += e.speed * dt;
          e.x += Math.sin(e.age * 1.8 + e.phase) * 75 * dt;
        }

        if (e.shootTimer <= 0 && e.y > 40 && e.y < H * 0.7) {
          enemyShoot(e, e.type === "bomber" && chance(0.45) ? "spread" : "aimed");
          e.shootTimer = rand(1.2, 2.5) * Math.max(0.55, 1 - wave * 0.025);
        }
      }

      e.rot = Math.PI + clamp((e.x - e.baseX) / 240, -0.28, 0.28);
      e.baseX = lerp(e.baseX, e.x, 0.04);

      if (e.y > H + 130 || e.x < -180 || e.x > W + 180) {
        enemies.splice(i, 1);
        continue;
      }

      if (dist2(e, player) < (e.radius + player.radius * 0.85) ** 2) {
        if (!e.boss) {
          damagePlayer(e.type === "bomber" ? 28 : 18);
          destroyEnemy(e, i);
        } else {
          damagePlayer(30);
        }
      }
    }
  }

  function updateProjectiles(dt) {
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
      trail(b.x, b.y + 6, b.color, b.radius * 1.6, 0.12);
      if (b.life <= 0 || b.y < -30 || b.x < -30 || b.x > W + 30) {
        bullets.splice(i, 1);
        continue;
      }

      let hit = false;
      for (let j = enemies.length - 1; j >= 0; j--) {
        const e = enemies[j];
        if (dist2(b, e) < (b.radius + e.radius * 0.72) ** 2) {
          e.hp -= b.damage;
          hit = true;
          emit(b.x, b.y, "#fff0a6", e.boss ? 3 : 2, 70, 2, 0.22);
          if (e.hp <= 0) destroyEnemy(e, j);
          break;
        }
      }
      if (hit) bullets.splice(i, 1);
    }

    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      const b = enemyBullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
      trail(b.x, b.y, b.color, b.radius * 1.25, 0.18);

      if (b.life <= 0 || b.y < -50 || b.y > H + 50 || b.x < -50 || b.x > W + 50) {
        enemyBullets.splice(i, 1);
        continue;
      }

      const d = Math.sqrt(dist2(b, player));
      if (d < b.radius + player.radius * 0.72) {
        damagePlayer(11);
        enemyBullets.splice(i, 1);
        continue;
      }

      if (!b.grazed && d < b.radius + player.radius + 18) {
        b.grazed = true;
        player.special = Math.min(player.maxSpecial, player.special + 2.2);
        floaters.push({ x: player.x, y: player.y - 26, text: "GRAZE", life: 0.55, maxLife: 0.55 });
        tone(840, 0.025, "sine", 0.018, 1100);
      }
    }
  }

  function updatePowerups(dt) {
    for (let i = powerups.length - 1; i >= 0; i--) {
      const p = powerups[i];
      p.age += dt;
      p.y += p.vy * dt;
      p.x += Math.sin(p.age * 3.2) * 28 * dt;

      if (dist2(p, player) < (p.radius + player.radius) ** 2) {
        if (p.type === "weapon") {
          player.weapon = Math.min(4, Math.floor(player.weapon) + 1);
          player.weaponTimer = 22;
          showMessage("WEAPON UPGRADED", `Firepower level ${Math.floor(player.weapon)}`, 1100);
        } else if (p.type === "medkit") {
          const healed = Math.min(45, player.maxHp - player.hp);
          player.hp = Math.min(player.maxHp, player.hp + 45);
          showMessage("FIRST-AID BOX", healed > 0 ? `Hull repaired +${healed}` : "Hull already at maximum", 1100);
        } else if (p.type === "energy") {
          player.special = Math.min(player.maxSpecial, player.special + SPECIAL_COST);
          showMessage("BLAST ENERGY", "+1 blast charge", 1100);
        } else if (p.type === "rank") {
          gainXp(Math.max(120, Math.round(xpToNext * 0.48)));
          showMessage("RANK STAR", "Large experience bonus", 1100);
        } else if (p.type === "shield") {
          player.shield = Math.min(3, player.shield + 1);
          showMessage("ARMOR SHIELD", `${player.shield} hit charge${player.shield === 1 ? "" : "s"}`, 1100);
        } else if (p.type === "rapid") {
          player.rapidTimer = Math.max(player.rapidTimer, 14);
          showMessage("RAPID FIRE", "Double firing speed for 14 seconds", 1100);
        }
        addScore(250, p.x, p.y);
        emit(p.x, p.y, "#9ef4d1", 20, 170, 4, 0.7);
        tone(420, 0.16, "sine", 0.04, 880);
        powerups.splice(i, 1);
        continue;
      }

      if (p.y > H + 30) powerups.splice(i, 1);
    }
  }

  function updateEffects(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= dt;
      p.vx *= Math.exp(-p.drag * dt);
      p.vy *= Math.exp(-p.drag * dt);
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.life <= 0) particles.splice(i, 1);
    }

    for (let i = trails.length - 1; i >= 0; i--) {
      trails[i].life -= dt;
      if (trails[i].life <= 0) trails.splice(i, 1);
    }

    for (let i = floaters.length - 1; i >= 0; i--) {
      const f = floaters[i];
      f.life -= dt;
      f.y -= 34 * dt;
      if (f.life <= 0) floaters.splice(i, 1);
    }

    comboTimer -= dt;
    if (comboTimer <= 0 && combo > 1) {
      combo = Math.max(1, combo - 1);
      comboTimer = combo > 1 ? 0.35 : 0;
    }

    screenShake = Math.max(0, screenShake - dt * 38);
    flash = Math.max(0, flash - dt * 2.8);
    slowMotion = Math.max(0, slowMotion - dt);
  }

  function updateCampaign(dt) {
    if(levelPhase==="transition"||levelPhase==="victory"){
      levelTransitionTimer-=dt;
      if(levelTransitionTimer<=0){if(levelPhase==="victory")endGame(true);else beginLevel(wave+1);}
      return;
    }
    if(bossActive||levelPhase==="boss") return;
    const level=currentLevel(); waveTimer+=dt; spawnTimer-=dt;
    if(spawnTimer<=0){spawnFormation();spawnTimer=level.spawnInterval;}
    if(waveTimer>=waveDuration){waveTimer=waveDuration;spawnBoss();}
  }

  function update(dt) {
    time += dt;
    updateBackground(dt);

    if (phase !== "playing") return;

    const simDt = slowMotion > 0 ? dt * 0.35 : dt;
    updatePlayer(simDt);
    updateEnemies(simDt);
    updateProjectiles(simDt);
    updatePowerups(simDt);
    updateEffects(dt);
    updateCampaign(simDt);
  }

  function roundedPoly(points, fill, stroke = null, lineWidth = 1) {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i][0], points[i][1]);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  }

  function drawOcean() {
    const palette=currentLevel().palette;
    const g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,palette[0]); g.addColorStop(.52,palette[1]); g.addColorStop(1,palette[2]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.globalAlpha = 0.14;
    ctx.lineWidth = 1;
    for (let y = -40; y < H + 40; y += 22) {
      const yy = y + (time * 62) % 22;
      ctx.strokeStyle = y % 44 === 0 ? palette[3] : palette[4];
      ctx.beginPath();
      for (let x = -40; x < W + 40; x += 24) {
        const waveY = yy + Math.sin(x * 0.024 + time * 1.1) * 2.5;
        if (x === -40) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.stroke();
    }
    ctx.restore();
    if(wave===3||wave===7||wave===8){
      ctx.save();ctx.globalAlpha=wave===7?.17:.11;ctx.strokeStyle="#d9f3ff";ctx.lineWidth=1;
      for(let i=0;i<44;i++){const x=(i*73+time*260)%(W+100)-50,y=(i*137+time*430)%(H+120)-60;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-9,y+28);ctx.stroke();}
      ctx.restore();
    }
    const vignette = ctx.createRadialGradient(W / 2, H * 0.42, 50, W / 2, H * 0.42, Math.max(W, H) * 0.72);
    vignette.addColorStop(0, "rgba(255,255,255,0)");
    vignette.addColorStop(1, "rgba(0,7,12,0.42)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);
  }

  function drawIsland(island) {
    const { x, y, size, seed } = island;
    ctx.save();
    ctx.translate(x + size * 0.5, y + size * 0.5);
    ctx.rotate(Math.sin(seed) * 0.18);
    ctx.translate(-size * 0.5, -size * 0.5);

    ctx.globalAlpha = 0.28;
    ctx.fillStyle = "#02141b";
    ctx.beginPath();
    ctx.ellipse(size * 0.58, size * 0.62, size * 0.48, size * 0.26, 0.12, 0, TAU);
    ctx.fill();

    ctx.globalAlpha = 1;
    const pts = [];
    const count = 15;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * TAU;
      const r = size * (0.35 + 0.09 * Math.sin(i * 2.3 + seed) + 0.045 * Math.sin(i * 5.1));
      pts.push([size * 0.5 + Math.cos(a) * r, size * 0.5 + Math.sin(a) * r * 0.68]);
    }
    roundedPoly(pts, "#d4c281");
    ctx.save();
    ctx.translate(size * 0.5, size * 0.5);
    ctx.scale(0.82, 0.62);
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.35, 0, TAU);
    const g = ctx.createRadialGradient(-size * 0.12, -size * 0.10, 5, 0, 0, size * 0.36);
    g.addColorStop(0, "#6d985b");
    g.addColorStop(0.58, "#3b744b");
    g.addColorStop(1, "#23543b");
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = "#214a37";
    for (let i = 0; i < 18; i++) {
      const a = i * 2.4 + seed;
      const r = size * rand(0.05, 0.28);
      ctx.beginPath();
      ctx.arc(size * 0.5 + Math.cos(a) * r, size * 0.5 + Math.sin(a) * r * 0.6, size * rand(0.018, 0.04), 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawCloud(c) {
    ctx.save();
    ctx.globalAlpha = c.alpha;
    ctx.fillStyle = "#e9fbff";
    const x = c.x, y = c.y, s = c.size;
    ctx.beginPath();
    ctx.ellipse(x, y, s * 0.42, s * 0.18, 0, 0, TAU);
    ctx.ellipse(x - s * 0.26, y + s * 0.02, s * 0.30, s * 0.15, 0, 0, TAU);
    ctx.ellipse(x + s * 0.28, y + s * 0.03, s * 0.30, s * 0.15, 0, 0, TAU);
    ctx.ellipse(x - s * 0.05, y - s * 0.12, s * 0.27, s * 0.20, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  function drawPlane(x, y, scale, rotation, scheme, isPlayer = false, damage = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    // soft shadow
    ctx.save();
    ctx.translate(5, 8);
    ctx.globalAlpha = 0.18;
    roundedPoly([
      [0, -26], [-6, -8], [-31, 1], [-30, 8], [-7, 5],
      [-9, 23], [0, 18], [9, 23], [7, 5], [30, 8], [31, 1], [6, -8]
    ], "#000");
    ctx.restore();

    const body = scheme.body;
    const wing = scheme.wing;
    const trim = scheme.trim;

    roundedPoly([
      [0, -29], [-5, -10], [-34, 0], [-32, 8], [-7, 5],
      [-9, 22], [0, 17], [9, 22], [7, 5], [32, 8], [34, 0], [5, -10]
    ], wing, scheme.edge, 1);

    roundedPoly([
      [0, -32], [-6, -12], [-5, 17], [0, 29], [5, 17], [6, -12]
    ], body, scheme.edge, 1);

    ctx.fillStyle = trim;
    ctx.beginPath();
    ctx.moveTo(-4, -15);
    ctx.lineTo(4, -15);
    ctx.lineTo(3, 5);
    ctx.lineTo(-3, 5);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = scheme.glass;
    ctx.beginPath();
    ctx.ellipse(0, -4, 4.4, 8, 0, 0, TAU);
    ctx.fill();

    if (isPlayer) {
      ctx.fillStyle = "#f7e7c0";
      ctx.beginPath();
      ctx.arc(-20, 3, 4.5, 0, TAU);
      ctx.arc(20, 3, 4.5, 0, TAU);
      ctx.fill();

      ctx.fillStyle = "#173b69";
      ctx.beginPath();
      ctx.arc(-20, 3, 2.5, 0, TAU);
      ctx.arc(20, 3, 2.5, 0, TAU);
      ctx.fill();
    }

    if (damage > 0.55) {
      ctx.fillStyle = "rgba(35,25,20,.65)";
      ctx.beginPath();
      ctx.arc(-8, 7, 4, 0, TAU);
      ctx.arc(10, -1, 3, 0, TAU);
      ctx.fill();
    }

    // propeller
    ctx.strokeStyle = "rgba(225,249,255,.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-13, -31);
    ctx.lineTo(13, -31);
    ctx.stroke();

    ctx.restore();
  }

  function drawBoss(e) {
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(Math.sin(e.age * 0.8) * 0.025);

    ctx.globalAlpha = 0.24;
    ctx.fillStyle = "#001018";
    ctx.beginPath();
    ctx.ellipse(7, 14, 78, 42, 0, 0, TAU);
    ctx.fill();
    ctx.globalAlpha = 1;

    const wingGradient = ctx.createLinearGradient(-72, 0, 72, 0);
    wingGradient.addColorStop(0, "#39495b");
    wingGradient.addColorStop(0.5, "#748391");
    wingGradient.addColorStop(1, "#39495b");
    roundedPoly([
      [0, -42], [-18, -18], [-78, -2], [-80, 20], [-23, 12],
      [-16, 38], [0, 30], [16, 38], [23, 12], [80, 20], [78, -2], [18, -18]
    ], wingGradient, "#17212a", 2);

    const colors=e.bossColors||["#9a4c46","#5b2b34","#ffc96b"];
    const bodyGradient=ctx.createLinearGradient(0,-45,0,46);
    bodyGradient.addColorStop(0,colors[0]);bodyGradient.addColorStop(.55,colors[1]);bodyGradient.addColorStop(1,"#211725");
    roundedPoly([
      [0, -55], [-14, -22], [-12, 23], [0, 48], [12, 23], [14, -22]
    ], bodyGradient, "#1d1018", 2);

    ctx.fillStyle = colors[2];
    for (const sx of [-45, 45]) {
      ctx.beginPath();
      ctx.arc(sx, 8, 9, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#42202b";
      ctx.beginPath();
      ctx.arc(sx, 8, 4, 0, TAU);
      ctx.fill();
      ctx.fillStyle = colors[2];
    }

    ctx.fillStyle = "#9adcf2";
    ctx.beginPath();
    ctx.ellipse(0, -13, 7, 14, 0, 0, TAU);
    ctx.fill();

    // Boss health
    const bw = Math.min(W * 0.62, 520);
    const ratio = clamp(e.hp / e.maxHp, 0, 1);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.fillStyle="rgba(235,248,255,.92)";ctx.font="800 12px system-ui";ctx.textAlign="center";ctx.fillText(e.bossName||"COMMANDER",W/2,104);
    ctx.fillStyle = "rgba(1,8,12,.75)";
    ctx.fillRect((W - bw) / 2, 112, bw, 12);
    ctx.fillStyle = "#ff685e";
    ctx.fillRect((W - bw) / 2 + 2, 114, (bw - 4) * ratio, 8);
    ctx.strokeStyle = "rgba(255,255,255,.25)";
    ctx.strokeRect((W - bw) / 2, 112, bw, 12);
    ctx.restore();
  }

  function drawPlayer() {
    if (phase === "gameover" && player.hp <= 0) return;
    ctx.save();

    if (player.shield > 0) {
      ctx.save();
      ctx.globalAlpha = 0.35 + Math.sin(time * 5) * 0.08;
      ctx.strokeStyle = "#8cecff";
      ctx.lineWidth = 3;
      ctx.shadowBlur = 16;
      ctx.shadowColor = "#61d9ff";
      ctx.beginPath();
      ctx.arc(player.x, player.y, 31 + player.shield * 2, 0, TAU);
      ctx.stroke();
      ctx.restore();
    }

    if (player.invuln > 0 && Math.floor(player.invuln * 14) % 2 === 0) ctx.globalAlpha = 0.35;
    drawPlane(
      player.x, player.y, 1,
      player.tilt,
      { body: "#dfe9ed", wing: "#3b6f92", trim: "#d64945", edge: "#173247", glass: "#76c9ed" },
      true,
      1 - player.hp / player.maxHp
    );
    ctx.restore();
  }

  function drawEnemy(e) {
    if (e.boss) return drawBoss(e);

    const schemes = {
      fighter: { body: "#d0d2c5", wing: "#68715f", trim: "#d96545", edge: "#263028", glass: "#89b9bf" },
      scout:   { body: "#d9b65f", wing: "#7b5a38", trim: "#c4493b", edge: "#312116", glass: "#9bd0d3" },
      bomber:  { body: "#88929b", wing: "#414b56", trim: "#c85f4b", edge: "#1b2228", glass: "#8fcbe0" },
      ace:     { body: "#d7d8dd", wing: "#6f486a", trim: "#f1c44c", edge: "#2f2030", glass: "#9ed9ea" }
    };
    const scale = e.type === "bomber" ? 1.5 : e.type === "scout" ? 0.82 : 1;
    drawPlane(e.x, e.y, scale, e.rot, schemes[e.type], false, 1 - e.hp / e.maxHp);

    if (e.type === "bomber" || e.type === "ace") {
      const ratio = clamp(e.hp / e.maxHp, 0, 1);
      ctx.fillStyle = "rgba(0,0,0,.45)";
      ctx.fillRect(e.x - 18, e.y - e.radius - 12, 36, 4);
      ctx.fillStyle = e.type === "ace" ? "#efc85d" : "#ff7d65";
      ctx.fillRect(e.x - 18, e.y - e.radius - 12, 36 * ratio, 4);
    }
  }

  function drawProjectile(b, enemy = false) {
    ctx.save();
    ctx.shadowBlur = enemy ? 10 : 12;
    ctx.shadowColor = b.color;
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  function drawPowerup(p) {
    const colors = {
      weapon: "#f9c847",
      medkit: "#f3f7f9",
      energy: "#43b6e9",
      rank: "#ffd85f",
      shield: "#65dcff",
      rapid: "#ff9c50"
    };
    const glows = {
      weapon: "#ffe77b",
      medkit: "#ff7770",
      energy: "#70d9ff",
      rank: "#fff29c",
      shield: "#8cecff",
      rapid: "#ffc178"
    };

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.shadowBlur = 18;
    ctx.shadowColor = glows[p.type];

    if (p.type === "medkit") {
      // A clearly recognizable first-aid box.
      ctx.rotate(Math.sin(p.age * 2.2) * 0.08);
      ctx.fillStyle = "#f4f7f8";
      ctx.strokeStyle = "#c94f4a";
      ctx.lineWidth = 3;
      ctx.fillRect(-15, -12, 30, 24);
      ctx.strokeRect(-15, -12, 30, 24);
      ctx.fillStyle = "#d94e48";
      ctx.fillRect(-4, -9, 8, 18);
      ctx.fillRect(-10, -3, 20, 6);
      ctx.strokeStyle = "#c94f4a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -13, 6, Math.PI, TAU);
      ctx.stroke();
    } else {
      ctx.rotate(p.age * 2.2);
      ctx.fillStyle = colors[p.type];
      ctx.beginPath();
      const sides = p.type === "shield" ? 6 : 8;
      for (let i = 0; i < sides * 2; i++) {
        const a = i * Math.PI / sides;
        const outer = p.type === "rank" ? (i % 2 === 0 ? 15 : 7) : (i % 2 === 0 ? 14 : 10);
        const px = Math.cos(a) * outer;
        const py = Math.sin(a) * outer;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      ctx.rotate(-p.age * 2.2);
      ctx.fillStyle = "#08202b";
      ctx.font = "900 13px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const icon = {
        weapon: "W",
        energy: "E",
        rank: "LV",
        shield: "S",
        rapid: "R"
      }[p.type];
      ctx.fillText(icon, 0, 0);
    }

    ctx.restore();
  }

  function drawEffects() {
    for (const t of trails) {
      ctx.save();
      ctx.globalAlpha = clamp(t.life / t.maxLife, 0, 1) * 0.7;
      ctx.fillStyle = t.color;
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.size * (t.life / t.maxLife), 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = clamp(p.life / p.maxLife, 0, 1);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      ctx.restore();
    }

    ctx.save();
    ctx.font = "800 14px system-ui";
    ctx.textAlign = "center";
    for (const f of floaters) {
      ctx.globalAlpha = clamp(f.life / f.maxLife, 0, 1);
      ctx.fillStyle = f.text === "GRAZE" ? "#a8edff" : "#fff2a2";
      ctx.fillText(f.text, f.x, f.y);
    }
    ctx.restore();
  }

  // The original page's DOM HUD (score/level/high-score cards, the three status
  // bars, combo chip, message overlay, pause panel), redrawn on the canvas.
  function drawHudBar(x, y, w, h, ratio, color) {
    ctx.fillStyle = "rgba(3,10,16,.62)";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = color;
    ctx.fillRect(x + 1, y + 1, (w - 2) * clamp(ratio, 0, 1), h - 2);
    ctx.strokeStyle = "rgba(153,226,255,.28)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + .5, y + .5, w - 1, h - 1);
  }

  function drawHud() {
    ctx.save();
    ctx.textBaseline = "alphabetic";
    ctx.font = "800 15px system-ui";
    ctx.fillStyle = "rgba(238,250,255,.92)";
    ctx.textAlign = "left";
    ctx.fillText("SCORE " + String(score).padStart(6, "0"), 10, 22);
    ctx.textAlign = "right";
    ctx.fillText("BEST " + String(best).padStart(6, "0"), W - 10, 22);
    ctx.textAlign = "center";
    ctx.fillText("LEVEL " + wave + "/" + TOTAL_LEVELS, W / 2, 22);
    ctx.font = "700 10px system-ui";
    ctx.fillStyle = "#aee8ff";
    ctx.fillText(currentLevel().name + " · PILOT LV " + pilotLevel, W / 2, 36);

    drawHudBar(10, 30, 170, 7, player.hp / player.maxHp, "#ff8b62");
    drawHudBar(10, 40, 170, 7, player.special / player.maxSpecial, "#49c8ff");
    drawHudBar(10, 50, 170, 7, xp / xpToNext, "#b581ff");

    ctx.textAlign = "left";
    ctx.font = "800 11px system-ui";
    ctx.fillStyle = "#9ffcff";
    ctx.fillText("💥×" + Math.floor(player.special / SPECIAL_COST), 186, 38);
    if (player.shield > 0) {
      ctx.fillStyle = "#8cecff";
      ctx.fillText("🛡×" + player.shield, 186, 52);
    }
    if (combo > 1) {
      ctx.fillStyle = "#fff4b0";
      ctx.fillText("COMBO ×" + combo, 240, 38);
    }
    ctx.restore();
  }

  function drawMessage() {
    if (!msg) return;
    var remain = msg.until - time;
    if (remain <= 0) { msg = null; return; }
    ctx.save();
    ctx.globalAlpha = Math.min(1, remain / 0.3);
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0,0,0,.6)";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 34px system-ui";
    ctx.fillText(msg.title, W / 2, H * 0.24);
    ctx.font = "700 13px system-ui";
    ctx.fillStyle = "#d9eef7";
    ctx.fillText(msg.sub, W / 2, H * 0.24 + 26);
    ctx.restore();
  }

  function draw() {
    const shakeX = screenShake ? rand(-screenShake, screenShake) : 0;
    const shakeY = screenShake ? rand(-screenShake, screenShake) : 0;

    ctx.save();
    ctx.translate(shakeX, shakeY);

    drawOcean();
    for (const island of islands) drawIsland(island);
    for (const c of clouds) drawCloud(c);
    drawEffects();
    for (const p of powerups) drawPowerup(p);
    for (const b of bullets) drawProjectile(b, false);
    for (const b of enemyBullets) drawProjectile(b, true);
    for (const e of enemies) drawEnemy(e);
    drawPlayer();

    ctx.restore();

    if (flash > 0) {
      ctx.save();
      ctx.globalAlpha = flash * 0.6;
      ctx.fillStyle = "#d5fbff";
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    drawHud();
    drawMessage();

    if (phase === "paused") {
      ctx.save();
      ctx.fillStyle = "rgba(1,7,11,.62)";
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 40px system-ui";
      ctx.fillText("PAUSED", W / 2, H / 2 - 8);
      ctx.font = "700 14px system-ui";
      ctx.fillStyle = "#d9eef7";
      ctx.fillText("Press P (or the ⏸ button) to resume", W / 2, H / 2 + 22);
      ctx.restore();
    }
  }

  function loop(now) {
    // Tier-3 self-check: the shared #wonderlandView must still be active AND
    // still contain OUR canvas (a2Result swaps the view's innerHTML without
    // deactivating it, so the canvas check is what actually ends the loop).
    if (!a2Active() || !document.getElementById("ssqCanvas")) { a2StopAll(); return; }
    if (!running) return;
    A2.raf = requestAnimationFrame(loop);
    let dt = Math.min(0.033, (now - last) / 1000 || 0);
    last = now;
    update(dt);
    draw();
  }

  function _ssqKeyDown(e) {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"].includes(e.code)) e.preventDefault();

    if (e.code === "Space" && !e.repeat) {
      specialPressed = true;
    } else {
      keys.add(e.code);
    }

    if (e.code === "Escape" || e.code === "KeyP") {
      if (phase === "playing") setPaused(true);
      else if (phase === "paused") setPaused(false);
    }
  }

  function _ssqKeyUp(e) { keys.delete(e.code); }

  // Auto-pause when the tab is hidden mid-run (registered ONCE at load; the
  // guards make it a no-op unless this game is the live A2 game).
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && running && phase === "playing" && document.getElementById("ssqCanvas")) setPaused(true);
  });

  function _ssqBodyHtml() {
    return (
      '<div class="wond-hud"><span class="wond-chip">✈️ 10 missions, 10 boss commanders — graze enemy bullets to charge your blast!</span></div>' +
      a2KeyLegend('Move: WASD/Arrows · Blast: Space · Pause: P — firing is automatic') +
      '<div class="wond-canvas-wrap"><canvas id="ssqCanvas" class="a2-canvas" style="--cw:' + W + ';--ch:' + H + '" width="' + W + '" height="' + H + '" aria-label="Sky Squadron 194X"></canvas></div>' +
      '<div class="a2-pad"><div>' +
        '<button type="button" class="btn btn-secondary" onpointerdown="_ssqTouchKey(\'ArrowLeft\',1)" onpointerup="_ssqTouchKey(\'ArrowLeft\',0)" onpointercancel="_ssqTouchKey(\'ArrowLeft\',0)" onpointerleave="_ssqTouchKey(\'ArrowLeft\',0)">◀</button>' +
        '<button type="button" class="btn btn-secondary" onpointerdown="_ssqTouchKey(\'ArrowUp\',1)" onpointerup="_ssqTouchKey(\'ArrowUp\',0)" onpointercancel="_ssqTouchKey(\'ArrowUp\',0)" onpointerleave="_ssqTouchKey(\'ArrowUp\',0)">▲</button>' +
        '<button type="button" class="btn btn-secondary" onpointerdown="_ssqTouchKey(\'ArrowDown\',1)" onpointerup="_ssqTouchKey(\'ArrowDown\',0)" onpointercancel="_ssqTouchKey(\'ArrowDown\',0)" onpointerleave="_ssqTouchKey(\'ArrowDown\',0)">▼</button>' +
        '<button type="button" class="btn btn-secondary" onpointerdown="_ssqTouchKey(\'ArrowRight\',1)" onpointerup="_ssqTouchKey(\'ArrowRight\',0)" onpointercancel="_ssqTouchKey(\'ArrowRight\',0)" onpointerleave="_ssqTouchKey(\'ArrowRight\',0)">▶</button>' +
      '</div><div>' +
        '<button type="button" class="btn btn-primary" onclick="_ssqBlast()" data-tooltip="Screen-clearing blast — costs 50 energy; graze bullets and grab E orbs to recharge.">💥 Blast</button>' +
        '<button type="button" class="btn btn-secondary" onclick="_ssqPauseToggle()">⏸ Pause</button>' +
      '</div></div>'
    );
  }

  function _ssqStartRun() {
    a2Shell('✈️ Sky Squadron 194X', 'openWonderland()', _ssqBodyHtml(),
      'A 10-level 194X island campaign — break formations, collect W/E/LV/S/R power-ups and first-aid boxes, and defeat a different commander at the end of every mission.');
    canvas = document.getElementById('ssqCanvas');
    ctx = canvas.getContext('2d');
    initAudio();
    if (audio && audio.state === "suspended") audio.resume();
    best = (typeof wgMini === 'function') ? (wgMini(SSQ_ID).highScore || 0) : 0;
    a2Keys(_ssqKeyDown, _ssqKeyUp);
    resetGame();
    phase = "playing";
    running = true;
    last = performance.now();
    A2.raf = requestAnimationFrame(loop);
  }

  function openSkySquadron() {
    gameWelcome(SSQ_ID, '✈️', 'Sky Squadron 194X',
      'Fly a complete 10-level 194X island campaign! Break enemy formations, dodge spread/ring/spiral bullet patterns, level up your pilot, and defeat a different boss commander at the end of every mission — from the Copper Hawk all the way to the Grand Leviathan.',
      '_ssqStartRun');
  }

  window.openSkySquadron = openSkySquadron;
  window._ssqStartRun = _ssqStartRun;
  window._ssqTouchKey = function (code, down) { if (down) keys.add(code); else keys.delete(code); };
  window._ssqBlast = function () { if (running && phase === "playing") specialPressed = true; };
  window._ssqPauseToggle = function () {
    if (phase === "playing") setPaused(true);
    else if (phase === "paused") setPaused(false);
  };
  })();
