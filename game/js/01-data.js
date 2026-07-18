  // Test/dev account: logging in as "admin" (case-insensitive) turns on test mode — one question
  // per room + effectively-infinite coins/gems + every star system unlocked. The admin account is
  // both the admin dashboard owner AND the test account. See 07-main.js (sets state.testMode) and
  // 05-render.js (effects). Kept exempt from single-login too (see TEST_USERNAMES in _shared.js).
  var TEST_NAMES = ['ADMIN'];

  // Single source of truth for the Boss Gate requirement: the player must answer this many
  // questions correctly in an arena before the Boss Gate opens (question ARENA_GOAL is the
  // arena finale). All progress labels, dots, and gate logic route through this — never a
  // bare literal. See handleSolved / updateLevelProgress (05-render.js).
  var ARENA_GOAL = 10;

  var state = {
    level: 1,
    score: 0,
    coins: 0,          // "Cash 💵" — the spendable currency (internal name kept)
    currencies: { gold: 0, silver: 0 }, // tradeable metals (Trading Room). See economy.config.js.
    chips: {},         // AI chips/components (id -> count) — spent to upgrade gear. See economy.config.js.
    gems: 0,           // retired; migrated to gold + a quantum chip on load
    materials: {},     // legacy (pre-chips); kept empty for back-compat / migration
    schemaVersion: 2,  // save-migration version (see migrateSave in 03-save.js)
    codex: { bodies: {}, fragments: {} }, // Star Log: unlocked astronomy bodies + boss memory fragments. See 14-lore.js.
    wonderPasses: 0,   // Wonderland entry tickets (earned by finishing rooms; see awardWonderPasses in 09-items.js)
    passEarns: {},     // level -> { first: bool, perfects: n } — drives the diminishing pass schedule
    inventory: {},     // consumables/ingredients: item id -> count (see ITEMS in 09-items.js)
    poisonArmed: false,// a Poison Vial was used — the NEXT battle's monster takes poison damage
    solveClock: 0,     // total problems ever solved — the farm's growth clock ("1 planet of practice" = 9 solves)
    roomFails: 0,      // wrong answers in the CURRENT room (stats + perfect-run bonus only — no game over). Perfect room = 0.
    farm: { plots: [], animals: [], houses: 1 }, // see 18-farm.js
    miniGames: {},     // Wonderland mini-game progress: id -> { unlockedCount, firstCleared, best, plays, highScore }. See 17-wonderland.js / 34-wonder-shell.js.
    settings: { musicVol: 38, sfxVol: 72 }, // volume 0-100, adjustable in the Settings panel; saved to profile/cloud. See 13-audio.js.
    arenaStats: {},    // per-arena performance for the admin dashboard: arenaN -> { solves, fails, stars3 }.
    testMode: false,
    streak: 0,
    levelSolves: 0,
    maxLevel: 10,
    mode: 'numeric',
    problem: null,
    eq: null,
    bracketEq: null,
    bracketCorrect: null,
    movesTaken: 0,
    currentOp: '+',
    locked: false,
    resetPending: false,
    gatePending: false,
    // Boss Gate state model (see section 9 / Phase 3). bossGateUnlocked = temporary access this
    // visit; bossRoomEntered = player stepped into the boss room; bossDefeated = PERSISTENT map of
    // arenaN -> true for bosses actually beaten. levelSolves is the arenaQuestionsCompleted counter.
    bossGateUnlocked: false,
    bossRoomEntered: false,
    bossDefeated: {},
    perfectArenas: {},   // arenaN -> true for arenas cleared with ZERO wrong answers (green star; all 65 → Galaxy Center)
    equippedWeapon: 'wood_sword',
    equippedShield: 'leather_buckler',
    equippedArmor: 'cloth_tunic',
    equippedShoes: 'basic_boots',
    socketedChips: {}, // gearId -> [chipId, ...] installed AI chips
    heroLvl: 1,
    heroXp: 0,
    playerMaxHp: 100,
    playerHp: 100,
    playerMaxMp: 20,
    playerMp: 20,
    // Gear is built from the config catalogue (game/config/gear.config.js); a save
    // stores each item's owned/upgradeLvl, reconciled with the catalogue on load so
    // new config gear appears automatically. Shallow copies so config stays pristine.
    weapons: WEAPONS.map(function(g){ return Object.assign({}, g); }),
    shields: SHIELDS.map(function(g){ return Object.assign({}, g); }),
    armor:   ARMOR.map(function(g){ return Object.assign({}, g); }),
    shoes:   SHOES.map(function(g){ return Object.assign({}, g); }),
    defeatedMonsters: {},
    trophies: [],
    // Special Item Store (unlocks after clearing Arena 44 — see js/42-special-store.js): INSTALLED
    // machine counts per stat (hp/mp/ap/dp/spd) — these actually grant their stat bonus.
    specialStore: { hp: 0, mp: 0, ap: 0, dp: 0, spd: 0 },
    // Bought but not yet installed (Buy acquires; Use installs — matches the Item Store's
    // buy-then-use pattern). Same 5 keys; installed + owned share one price/cap ladder.
    specialStoreOwned: { hp: 0, mp: 0, ap: 0, dp: 0, spd: 0 },
    specialStoreAnnounced: false   // has the one-time "Special Item Store is open!" modal fired yet
  };
  // levelTitles, formulaBank, sceneCaptions \u2192 game/config/rooms.config.js (loaded first).
  // The `chapters` registry \u2192 game/config/worlds.config.js. The chapter room-range
  // computation + getChapterForLevel() below stay here (logic that reads the config).
  (function computeChapterRoomRanges(){
    var cursor = 1;
    chapters.forEach(function(ch, i){
      ch.chapterIndex = i;
      ch.startRoom = cursor;
      ch.endRoom = cursor + ch.roomCount - 1;
      cursor = ch.endRoom + 1;
    });
  })();
  state.maxLevel = chapters[chapters.length - 1].endRoom;

  function getChapterForLevel(level){
    for (var i = 0; i < chapters.length; i++){
      if (level <= chapters[i].endRoom) return { chapter: chapters[i], roomInChapter: level - chapters[i].startRoom + 1 };
    }
    var last = chapters[chapters.length - 1];
    return { chapter: last, roomInChapter: last.roomCount };
  }

