  // ============================================================================
  // Combat module 2/5: monster art/identity, buildMonster/buildSubBoss/
  // buildBlackHoleMonster generation, room rosters, gauntlet chains, lock reasons.
  // Split 2026-07-18 from 06-rpg-battle.js — see 06-gear-shop.js for the split note.
  // ============================================================================

  var HERO_ART_MARKUP = document.querySelector('#playerSprite .hero-character') ? document.querySelector('#playerSprite .hero-character').outerHTML : '';
  var ICE_MONSTER_ART_MARKUP = document.querySelector('#monsterSprite .ice-character') ? document.querySelector('#monsterSprite .ice-character').outerHTML : '';

  // Distinct art per monster. Every one of the 30 base monsters (rooms 1-10 × 3 ranks) gets its
  // own emoji creature; higher arenas reuse them by base id, so a fight always shows art that
  // matches the monster's identity — no more one-ice-creature-for-everyone.
  var MONSTER_ART = {
    r1_1: '👻', r1_2: '👺', r1_3: '👹',
    r2_1: '🪲', r2_2: '🐹', r2_3: '🗿',
    r3_1: '💀', r3_2: '☠️', r3_3: '🧛',
    r4_1: '🌪️', r4_2: '🧞', r4_3: '🏺',
    r5_1: '🪼', r5_2: '🦑', r5_3: '🐙',
    r6_1: '🦅', r6_2: '⛈️', r6_3: '🌀',
    r7_1: '👿', r7_2: '🧙', r7_3: '🐲',
    r8_1: '🥷', r8_2: '🦇', r8_3: '🦉',
    r9_1: '🐺', r9_2: '🌋', r9_3: '😈',
    r10_1: '💫', r10_2: '🪐', r10_3: '👑',
    // Gauntlet sub-bosses (module: 2-boss / 3-boss chained fights) — one pair per room, distinct
    // from the regular Easy/Elite/Boss art above so a chain never shows a repeated portrait.
    r1_g1: '🎃', r1_g2: '🧟',
    r2_g1: '🦂', r2_g2: '⛏️',
    r3_g1: '⚰️', r3_g2: '🧟‍♂️',
    r4_g1: '🐪', r4_g2: '🏜️',
    r5_g1: '🦈', r5_g2: '🐋',
    r6_g1: '⚡', r6_g2: '🌩️',
    r7_g1: '🔥', r7_g2: '🧨',
    r8_g1: '🌑', r8_g2: '🕷️',
    r9_g1: '🌡️', r9_g2: '☄️',
    r10_g1: '🌟', r10_g2: '🛸'
  };
  function _monsterBaseId(m){
    var room = Math.max(1, Number(m && m.room) || 1);
    var base = ((room - 1) % 10) + 1;                 // rooms 11-65 cycle the base 1-10 roster
    if (m && m.gauntletSlot) return 'r' + base + '_g' + m.gauntletSlot;
    return 'r' + base + '_' + ((m && m.rank) || 1);
  }
  // Now takes the monster OBJECT (was: difficulty string) so it can pick distinct art + tint
  // by the monster's Wu Xing element. Bosses/elites render larger.
  function getMonsterArtMarkup(monster) {
    var m = monster || {};
    var emoji = (m.blackHole && typeof BLACKHOLE_ART !== 'undefined')
      ? (BLACKHOLE_ART[(m.gauntletSlot || 1) - 1] || '⚫')
      : (MONSTER_ART[_monsterBaseId(m)] || '👾');
    var col = (typeof elementColor === 'function') ? elementColor(m.element || 'metal') : '#8fd6ff';
    var big = m.difficulty === 'Boss' ? 120 : (m.difficulty === 'Elite' ? 98 : 84);
    return '<div class="monster-emoji-art" style="--elcol:' + col + '">' +
             '<span class="monster-emoji-aura"></span>' +
             '<span class="monster-emoji-face" style="font-size:' + big + 'px">' + emoji + '</span>' +
           '</div>';
  }

  // Small Wu Xing element badge (icon + 中文 + name) used on the battle page and monster cards.
  function elementBadgeHtml(el){
    if (!el) return '';
    var col = (typeof elementColor === 'function') ? elementColor(el) : '#8fd6ff';
    var icon = (typeof elementIcon === 'function') ? elementIcon(el) : '';
    var cn = (typeof elementCn === 'function') ? elementCn(el) : '';
    var nm = (typeof ELEMENTS === 'object' && ELEMENTS[el]) ? ELEMENTS[el].name : el;
    return '<span class="el-badge" style="border-color:' + col + ';color:' + col + '">' +
      icon + ' ' + cn + ' ' + nm + '</span>';
  }

  function launchBattleProjectile(kind, fromEl, toEl) {
    var arena = document.querySelector('.arena-combatants');
    if (!arena || !fromEl || !toEl || reduceMotion) return;
    var a = arena.getBoundingClientRect();
    var f = fromEl.getBoundingClientRect();
    var t = toEl.getBoundingClientRect();
    var sx = f.left + f.width * .55 - a.left;
    var sy = f.top + f.height * .44 - a.top;
    var tx = t.left + t.width * .48 - a.left;
    var ty = t.top + t.height * .42 - a.top;
    var projectile = document.createElement('div');
    projectile.className = 'battle-projectile ' + kind;
    projectile.style.setProperty('--sx', sx + 'px');
    projectile.style.setProperty('--sy', sy + 'px');
    projectile.style.setProperty('--dx', (tx - sx) + 'px');
    projectile.style.setProperty('--dy', (ty - sy) + 'px');
    arena.appendChild(projectile);
    setTimeout(function(){ projectile.remove(); }, 560);
  }

  function battleImpactAt(targetEl) {
    var arena = document.querySelector('.arena-combatants');
    if (!arena || !targetEl || reduceMotion) return;
    var a = arena.getBoundingClientRect();
    var t = targetEl.getBoundingClientRect();
    var ring = document.createElement('div');
    ring.className = 'impact-ring';
    ring.style.left = (t.left + t.width * .5 - a.left) + 'px';
    ring.style.top = (t.top + t.height * .43 - a.top) + 'px';
    arena.appendChild(ring);
    arena.classList.remove('screen-shake');
    void arena.offsetWidth;
    arena.classList.add('screen-shake');
    setTimeout(function(){ ring.remove(); arena.classList.remove('screen-shake'); }, 520);
  }

  function resetCombatPoses() {
    ['attack-right','attack-left','hit-shake','casting','victory','defeated'].forEach(function(cls){
      el.playerSprite.classList.remove(cls);
      el.monsterSprite.classList.remove(cls);
    });
  }

  // Monster / Arena controllers
  // 3 monsters per room (Easy / Elite / Boss) — trimmed down from an earlier 6-tier roster
  // so a room's roster is a quick clear, not a grind, and content stays sustainable as more
  // rooms/topics get added.
  // Per-arena stat COEFFICIENTS (buildMonster multiplies each by the arena number). Retuned for the
  // multiplicative-gear economy (2026-07-16): the old boss DEF of arena×9 out-scaled weapon power so
  // even a maxed weapon did 1 damage to a late boss — a pre-existing softlock. DEF now scales gently
  // (boss arena×3.5) so a tier-appropriate weapon at +2 clears a boss in ~4-10 hits, an un-upgraded
  // one is a slog (upgrade incentive), and a maxed one is quick but never a one-shot. Verified by
  // simulation across arenas 3-65 (see rpg-combat-economy.md).
  var monsterRanks = [
    { difficulty: 'Easy',  hp: 10, mp: 20, attack: 2, defense: 0.6, reward: 20 },
    { difficulty: 'Elite', hp: 32, mp: 50, attack: 4, defense: 2,   reward: 75 },
    { difficulty: 'Boss',  hp: 70, mp: 80, attack: 7, defense: 3.5, reward: 140 }
  ];

  var monsterCatalog = [
    { id: 'r1_1', room: 1, rank: 1, name: 'Spooky Slime' },
    { id: 'r1_2', room: 1, rank: 2, name: 'Pencil Imp' },
    { id: 'r1_3', room: 1, rank: 3, name: 'Blackboard Behemoth' },
    { id: 'r2_1', room: 2, rank: 1, name: 'Cave Beetle' },
    { id: 'r2_2', room: 2, rank: 2, name: 'Crystal Mole' },
    { id: 'r2_3', room: 2, rank: 3, name: 'Granite Titan' },
    { id: 'r3_1', room: 3, rank: 1, name: 'Skeleton Sentry' },
    { id: 'r3_2', room: 3, rank: 2, name: 'Bone Alchemist' },
    { id: 'r3_3', room: 3, rank: 3, name: 'Crypt Overlord' },
    { id: 'r4_1', room: 4, rank: 1, name: 'Sand Devil' },
    { id: 'r4_2', room: 4, rank: 2, name: 'Mirage Mage' },
    { id: 'r4_3', room: 4, rank: 3, name: 'Pharaoh Warden' },
    { id: 'r5_1', room: 5, rank: 1, name: 'Abyssal Jellyfish' },
    { id: 'r5_2', room: 5, rank: 2, name: 'Tidal Knight' },
    { id: 'r5_3', room: 5, rank: 3, name: 'Leviathan Sage' },
    { id: 'r6_1', room: 6, rank: 1, name: 'Volt Eagle' },
    { id: 'r6_2', room: 6, rank: 2, name: 'Storm Caller' },
    { id: 'r6_3', room: 6, rank: 3, name: 'Cyclone Emperor' },
    { id: 'r7_1', room: 7, rank: 1, name: 'Fire Imp' },
    { id: 'r7_2', room: 7, rank: 2, name: 'Ash Witch' },
    { id: 'r7_3', room: 7, rank: 3, name: 'Inferno Monarch' },
    { id: 'r8_1', room: 8, rank: 1, name: 'Shadow Fiend' },
    { id: 'r8_2', room: 8, rank: 2, name: 'Moonlit Reaper' },
    { id: 'r8_3', room: 8, rank: 3, name: 'Eclipse Sovereign' },
    { id: 'r9_1', room: 9, rank: 1, name: 'Hellfire Hound' },
    { id: 'r9_2', room: 9, rank: 2, name: 'Lava Sentinel' },
    { id: 'r9_3', room: 9, rank: 3, name: 'Doomfire Regent' },
    { id: 'r10_1', room: 10, rank: 1, name: 'Star Wisp' },
    { id: 'r10_2', room: 10, rank: 2, name: 'Orbit Knight' },
    { id: 'r10_3', room: 10, rank: 3, name: 'Galaxy Final King' }
  ];

  // Stats come from the BAL designer curves (economy.config.js / docs/balance-design.md):
  // one shared power curve drives boss HP/DEF/Cash, a solved table drives boss ATK, and rank
  // multipliers scale Easy/Elite down from the boss line. XP scales with arena so hero level
  // keeps pace with the requiredHeroLvl gate all the way to arena 65 (old flat-100 XP soft-locked
  // straight-through players around arena 40). Speed feeds the new dodge roll.
  function buildMonster(entry) {
    var rank = monsterRanks[entry.rank - 1];
    var m = BAL.RANK_MULT[entry.rank - 1];
    var r = entry.room;
    return {
      id: entry.id,
      room: r,
      rank: entry.rank,
      name: entry.name,
      maxHp: Math.max(5, Math.round(BAL.bossHp(r) * m.hp)),
      maxMp: rank.mp + r * 2,
      attack: Math.max(1, Math.round(BAL.bossAtk(r) * m.atk)),
      defense: Math.max(0, Math.round(BAL.bossDef(r) * m.def)),
      speed: BAL.monsterSpeed(r),
      reward: Math.max(5, Math.round(BAL.bossCash(r) * m.cash)),
      xp: BAL.killXp(r, entry.rank),
      difficulty: rank.difficulty,
      element: getMonsterElement(entry),
      // Grows at half the arena pace so late arenas stay reachable without endless grinding.
      requiredHeroLvl: Math.ceil(entry.room / 2) + (entry.rank - 1)
    };
  }
  // Deterministic Wu Xing element per enemy robot (same for every player).
  function getMonsterElement(entry){
    if (typeof ELEMENT_ORDER === 'undefined') return 'metal';
    return ELEMENT_ORDER[(entry.room + entry.rank) % ELEMENT_ORDER.length];
  }

  function monsterKey(monster) {
    return monster.id;
  }

  // The 30-name catalog covers rooms 1-10; higher arenas CYCLE the roster with an
  // era suffix, and every stat/loot scales with the REAL arena number (65 arenas total).
  var MONSTER_ERAS = ['', ' Elite', ' Mega', ' Ultra', ' Cosmic', ' Omega', ' Astral'];
  function getRoomMonsters(room) {
    var base = ((room - 1) % 10) + 1;
    var eraIdx = Math.floor((room - 1) / 10);
    var era = (eraIdx < MONSTER_ERAS.length) ? MONSTER_ERAS[eraIdx] : ' Astral';   // '' is a valid era (rooms 1-10)
    return monsterCatalog.filter(function(m){ return m.room === base; }).map(function(entry){
      return buildMonster({
        id: 'r' + room + '_' + entry.rank,      // rooms 1-10 keep their original save keys
        room: room, rank: entry.rank,
        name: entry.name + era
      });
    });
  }

  function getRoomBoss(room) {
    return getRoomMonsters(room).find(function(m){ return m.rank === 3; });
  }

  // ---- Gauntlet sub-bosses: 2 brand-new monsters per room, fought back-to-back with no Hotel
  // access in between (module: monster-select "2-Boss"/"3-Boss Gauntlet" cards). They use the
  // already-verified Elite BAL curve (rank 2) so this adds new CONTENT without inventing a new,
  // unverified stat tier. Wu Xing element offsets (+4, +5≡+0) fall outside Easy/Elite/Boss's
  // (+1/+2/+3), so every arena's 5 monsters (Easy, Elite, Boss, 2 sub-bosses) cover all 5 elements
  // exactly once. rank:2 means they do NOT trigger the rank>=3 trophy/lore-fragment branch in
  // handleBattleVictory — only the real Boss (the 3rd link of the 3-chain) still does that, so the
  // arena-advance gate, trophies, and Star Log fragments are completely untouched by this feature.
  var gauntletCatalog = [
    { room: 1,  slot: 1, name: 'Chalk Wraith' },      { room: 1,  slot: 2, name: 'Detention Golem' },
    { room: 2,  slot: 1, name: 'Fossil Scorpion' },   { room: 2,  slot: 2, name: "Miner's Ghost" },
    { room: 3,  slot: 1, name: 'Grave Warden' },      { room: 3,  slot: 2, name: 'Plague Revenant' },
    { room: 4,  slot: 1, name: 'Dune Marauder' },     { room: 4,  slot: 2, name: 'Sphinx Riddler' },
    { room: 5,  slot: 1, name: 'Reef Shark King' },   { room: 5,  slot: 2, name: 'Whalebone Colossus' },
    { room: 6,  slot: 1, name: 'Thunder Wraith' },    { room: 6,  slot: 2, name: 'Squall Djinn' },
    { room: 7,  slot: 1, name: 'Ember Berserker' },   { room: 7,  slot: 2, name: 'Powderkeg Fiend' },
    { room: 8,  slot: 1, name: 'Umbral Stalker' },    { room: 8,  slot: 2, name: 'Widow Assassin' },
    { room: 9,  slot: 1, name: 'Magma Brute' },       { room: 9,  slot: 2, name: 'Meteor Warlord' },
    { room: 10, slot: 1, name: 'Nova Sentinel' },     { room: 10, slot: 2, name: 'Void Cruiser' }
  ];
  function buildSubBoss(entry) {
    var m = BAL.GAUNTLET_SUB_MULT;   // full Boss-tier — see economy.config.js for why
    var r = entry.room;
    return {
      id: 'r' + r + '_g' + entry.slot,
      room: r,
      rank: 2,   // stays 2 so handleBattleVictory's trophy/lore-fragment branch (rank>=3) fires
                 // only for the real Boss finale, not these — even though stats are Boss-tier.
      gauntletSlot: entry.slot,
      name: entry.name,
      maxHp: Math.max(5, Math.round(BAL.bossHp(r) * m.hp)),
      maxMp: monsterRanks[2].mp + r * 2,
      attack: Math.max(1, Math.round(BAL.bossAtk(r) * m.atk)),
      defense: Math.max(0, Math.round(BAL.bossDef(r) * m.def)),
      speed: BAL.monsterSpeed(r),
      reward: Math.max(5, Math.round(BAL.bossCash(r) * m.cash)),
      xp: BAL.killXp(r, 3),                     // full Boss XP payout — matches the stat tier
      difficulty: monsterRanks[2].difficulty,   // 'Boss' — bigger art, matches the real threat level
      element: ELEMENT_ORDER[(r + 3 + entry.slot) % ELEMENT_ORDER.length],
      requiredHeroLvl: Math.ceil(r / 2) + 2      // matches the real Boss's own gate formula
    };
  }
  function getGauntletSubBosses(room) {
    var base = ((room - 1) % 10) + 1;
    var eraIdx = Math.floor((room - 1) / 10);
    var era = (eraIdx < MONSTER_ERAS.length) ? MONSTER_ERAS[eraIdx] : ' Astral';
    return gauntletCatalog.filter(function(g){ return g.room === base; })
      .map(function(entry){ return buildSubBoss({ room: room, slot: entry.slot, name: entry.name + era }); })
      .sort(function(a, b){ return a.gauntletSlot - b.gauntletSlot; });
  }
  // size 2 = the two sub-bosses only; size 3 = sub-bosses + the arena's real Boss as the finale.
  function getGauntletChain(room, size) {
    var subs = getGauntletSubBosses(room);
    if (size === 2) return subs;
    var boss = getRoomBoss(room);
    return boss ? subs.concat([boss]) : subs;
  }

  // ---- Giant Black Hole (arena 66): a 10-monster gauntlet, each one harder than the last.
  var BLACKHOLE_NAMES = ['Event Horizon Wraith', 'Gravity Warden', 'Photon Serpent', 'Accretion Behemoth',
    'Singularity Shade', 'Tidal Leviathan', 'Void Colossus', 'Quasar Tyrant', 'Relativity Reaper',
    'Sagittarius A* — The Core'];
  var BLACKHOLE_ART = ['🌑','🕳️','☄️','🌀','👁️','🐙','🪐','💫','☠️','⚫'];
  // Monster i (1..10) scales from ~0.7× to ~1.5× the arena-65 boss line, so it starts brutal and
  // ends beyond anything in the linear game. Full boss-tier stats; last one is rank 3 (a trophy).
  function buildBlackHoleMonster(i) {
    var mult = 0.6 + 0.09 * i;   // i=1 → 0.69, i=10 → 1.50
    var r = 65;
    return {
      id: 'bh_' + i, room: 66, rank: (i === 10 ? 3 : 2), gauntletSlot: i, blackHole: true,
      name: BLACKHOLE_NAMES[i - 1] || ('Void Horror ' + i),
      maxHp: Math.max(5, Math.round(BAL.bossHp(r) * mult)),
      maxMp: monsterRanks[2].mp + r * 2,
      attack: Math.max(1, Math.round(BAL.bossAtk(r) * mult)),
      defense: Math.max(0, Math.round(BAL.bossDef(r) * mult)),
      speed: BAL.monsterSpeed(r),
      reward: Math.max(5, Math.round(BAL.bossCash(r) * mult)),
      xp: BAL.killXp(r, 3),
      difficulty: 'Boss',
      element: ELEMENT_ORDER[i % ELEMENT_ORDER.length],
      requiredHeroLvl: 1
    };
  }
  function getBlackHoleChain() {
    var chain = [];
    for (var i = 1; i <= 10; i++) chain.push(buildBlackHoleMonster(i));
    return chain;
  }
  function isBlackHoleArena(room) {
    var a = (typeof getArena === 'function') ? getArena(room) : null;
    return !!(a && a.special === 'blackhole');
  }

  function getMonsterLockReason(monster) {
    if (state.testMode) return '';   // admin/test account: every monster is unlocked (non-persistent, re-derived each session)
    if (monster.room > state.level) return 'Reach Arena ' + monster.room;
    if (state.heroLvl < monster.requiredHeroLvl) return 'Hero Lv. ' + monster.requiredHeroLvl;
    return '';
  }
  // Reads the REAL per-save defeated map for EVERYONE, including admin — a monster you've actually
  // beaten shows its cleared/greyed state and stops being re-clickable (user 2026-07-18: "I beat it
  // but no CLEARED banner and it's still clickable"). Admin keeps its OTHER conveniences —
  // getMonsterLockReason still bypasses the arena/hero-level gates, and the Boss Gate is always open
  // (setGateButton) — so admin can fight ahead-of-level foes, just not re-fight cleared ones.
  function isMonsterDefeated(key) {
    return !!(state.defeatedMonsters && state.defeatedMonsters[key]);
  }

