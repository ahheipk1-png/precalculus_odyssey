  // ---------- Save / Load (localStorage — persists across restarts, no server) ----------
  // Up to MAX_PROFILES named player profiles, single list stored under PROFILES_KEY.
  // SAVE_KEY is the old single-slot format (pre-profiles) — kept only for one-time migration.
  var SAVE_KEY = 'balanceQuestSave_v1';
  var PROFILES_KEY = 'balanceQuestProfiles_v1';
  var MAX_PROFILES = 10;
  var gameStarted = false;
  var activeProfileId = null;
  var activeProfileName = '';

  function loadAllProfiles(){
    try {
      var raw = localStorage.getItem(PROFILES_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) return [];
      // Defensive dedupe by id: if two entries ever share an id (historical corruption from an
      // older build), keep only the most-recently-saved one so a stale twin can't "come back".
      var byId = {};
      arr.forEach(function(p){
        if (!p || !p.id) return;
        if (!byId[p.id] || (p.savedAt || 0) >= (byId[p.id].savedAt || 0)) byId[p.id] = p;
      });
      return Object.keys(byId).map(function(k){ return byId[k]; });
    } catch (e) { return []; }
  }

  function saveAllProfiles(list){
    try { localStorage.setItem(PROFILES_KEY, JSON.stringify(list)); } catch (e) { /* storage unavailable/full */ }
  }

  function makeProfileId(){
    return 'p_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function migrateLegacySave(){
    try {
      var legacy = localStorage.getItem(SAVE_KEY);
      if (!legacy) return;
      var snap = JSON.parse(legacy);
      var list = loadAllProfiles();
      if (list.length < MAX_PROFILES) {
        snap.id = makeProfileId();
        snap.name = 'Player 1';
        list.push(snap);
        saveAllProfiles(list);
      }
      localStorage.removeItem(SAVE_KEY);
    } catch (e) { /* nothing salvageable — leave as-is */ }
  }

  function getSaveSnapshot(){
    return {
      id: activeProfileId,
      name: activeProfileName,
      level: state.level,
      score: state.score,
      coins: state.coins,
      currencies: state.currencies,
      chips: state.chips,
      schemaVersion: state.schemaVersion || 2,
      materials: state.materials,
      codex: state.codex,
      wonderPasses: state.wonderPasses,
      passEarns: state.passEarns,
      inventory: state.inventory,
      poisonArmed: state.poisonArmed,
      solveClock: state.solveClock,
      roomFails: state.roomFails,
      farm: state.farm,
      miniGames: state.miniGames,
      settings: state.settings,
      arenaStats: state.arenaStats,
      streak: state.streak,
      levelSolves: state.levelSolves,
      equippedWeapon: state.equippedWeapon,
      equippedShield: state.equippedShield,
      equippedArmor: state.equippedArmor,
      equippedShoes: state.equippedShoes,
      socketedChips: state.socketedChips,
      heroLvl: state.heroLvl,
      heroXp: state.heroXp,
      playerMaxHp: state.playerMaxHp,
      playerHp: state.playerHp,
      playerMaxMp: state.playerMaxMp,
      playerMp: state.playerMp,
      weapons: state.weapons,
      shields: state.shields,
      armor: state.armor,
      shoes: state.shoes,
      defeatedMonsters: state.defeatedMonsters,
      bossDefeated: state.bossDefeated,
      perfectArenas: state.perfectArenas,
      trophies: state.trophies,
      specialStore: state.specialStore,
      specialStoreOwned: state.specialStoreOwned,
      specialStoreAnnounced: state.specialStoreAnnounced,
      comebackUnlocked: state.comebackUnlocked,
      comebackCleared: state.comebackCleared,
      savedAt: Date.now()
    };
  }

  function saveGame(){
    if (!gameStarted || !activeProfileId) return;
    var list = loadAllProfiles();
    var idx = list.findIndex(function(p){ return p.id === activeProfileId; });
    var snap = getSaveSnapshot();
    if (idx === -1) list.push(snap); else list[idx] = snap;
    saveAllProfiles(list);
    // Cloud layer (cloud-save.js): debounced, event-based upload. No-op until the player
    // enables Cloud Save (creates an account). localStorage above stays the source of truth locally.
    if (window.Cloud && typeof window.Cloud.queueSave === 'function') window.Cloud.queueSave('save');
    // Account login & progress sync (cloud-auth.js): push the lightweight progress summary right now
    // instead of waiting for the 25s interval timer, so a second device sees fresh data sooner.
    // No-op internally if no active login session — safe to call unconditionally.
    if (typeof window.authPushProgress === 'function') window.authPushProgress();
  }

  // Rebuild a gear array from the config catalogue, overlaying a save's owned/upgradeLvl by id —
  // so newly-added config gear appears and saved progress is kept.
  function reconcileGear(configArr, savedArr){
    var byId = {};
    if (Array.isArray(savedArr)) savedArr.forEach(function(s){ if (s && s.id) byId[s.id] = s; });
    return (configArr || []).map(function(def){
      var g = Object.assign({}, def);
      var s = byId[def.id];
      if (s){ g.owned = !!s.owned; g.upgradeLvl = s.upgradeLvl || 0; }
      return g;
    });
  }
  // Save migration v1 (materials) -> v2 (currencies + chips). Non-destructive; never resets.
  function migrateSave(snap){
    if (snap.schemaVersion && snap.schemaVersion >= 2) return snap;
    var m = snap.materials || {};
    snap.currencies = snap.currencies || { gold: 0, silver: 0 };
    snap.currencies.gold   = (snap.currencies.gold   || 0) + (m.gold || 0) + (snap.gems || 0);
    snap.currencies.silver = (snap.currencies.silver || 0) + (m.silver || 0);
    snap.chips = snap.chips || {};
    if (m.essence) snap.chips.energy_core  = (snap.chips.energy_core  || 0) + m.essence;
    if (m.gem)     snap.chips.quantum_chip = (snap.chips.quantum_chip || 0) + m.gem;
    snap.materials = {};
    snap.gems = 0;
    snap.schemaVersion = 2;
    return snap;
  }

  function applySnapshotToState(snap){
    // An admin "Reset to beginning" writes an `_adminReset` marker into the cloud
    // save (functions/api/admin/save.js). When the player adopts that save, honour
    // it: wipe to a fresh start instead of loading the (zeroed) snapshot, then let
    // the normal save loop persist the clean state under the same profile id/name.
    if (snap && snap._adminReset){
      if (typeof resetPlayerState === 'function') resetPlayerState();
      return;
    }
    migrateSave(snap);
    state.level = snap.level;
    // Curriculum shrank 187 -> 65 arenas (Bible rebuild). Clamp any old save that was
    // parked past the new final arena so getArena() never returns null (which would blank
    // the board). Everything else (name/coins/gear/hero/farm/codex) is preserved as-is.
    var _max = (typeof CURRICULUM_MAX === 'number' && CURRICULUM_MAX > 0) ? CURRICULUM_MAX : 65;
    if (!(state.level >= 1)) state.level = 1;
    if (state.level > _max) state.level = _max;
    state.score = snap.score;
    state.coins = snap.coins;
    state.currencies = { gold: (snap.currencies && snap.currencies.gold) || 0, silver: (snap.currencies && snap.currencies.silver) || 0 };
    state.chips = snap.chips || {};
    state.schemaVersion = 2;
    state.materials = snap.materials || {};
    state.codex = (snap.codex && typeof snap.codex === 'object')
      ? { bodies: snap.codex.bodies || {}, fragments: snap.codex.fragments || {} }
      : { bodies: {}, fragments: {} };
    state.wonderPasses = snap.wonderPasses || 0;
    state.passEarns = snap.passEarns || {};
    state.inventory = snap.inventory || {};
    state.poisonArmed = !!snap.poisonArmed;
    state.solveClock = snap.solveClock || 0;
    state.roomFails = snap.roomFails || 0;
    state.farm = (snap.farm && typeof snap.farm === 'object')
      ? { plots: Array.isArray(snap.farm.plots) ? snap.farm.plots : [],
          animals: Array.isArray(snap.farm.animals) ? snap.farm.animals : [],
          houses: snap.farm.houses || 1 }
      : { plots: [], animals: [], houses: 1 };
    state.streak = snap.streak;
    state.levelSolves = snap.levelSolves;
    state.equippedWeapon = snap.equippedWeapon;
    state.equippedShield = snap.equippedShield;
    state.equippedArmor = snap.equippedArmor || 'cloth_tunic';
    state.equippedShoes = snap.equippedShoes || 'basic_boots';
    state.socketedChips = snap.socketedChips || {};
    state.heroLvl = snap.heroLvl;
    state.heroXp = snap.heroXp;
    state.playerMaxHp = snap.playerMaxHp;
    state.playerHp = snap.playerHp;
    state.playerMaxMp = snap.playerMaxMp;
    state.playerMp = snap.playerMp;
    state.weapons = reconcileGear(WEAPONS, snap.weapons);
    state.shields = reconcileGear(SHIELDS, snap.shields);
    state.armor   = reconcileGear(ARMOR, snap.armor);
    state.shoes   = reconcileGear(SHOES, snap.shoes);
    // Validate equipped ids against owned gear (old/partial saves may miss slots or point nowhere).
    function _validEquip(arr, id, def){ return (id && arr.some(function(x){ return x.id === id && x.owned; })) ? id : def; }
    state.equippedWeapon = _validEquip(state.weapons, state.equippedWeapon, 'wood_sword');
    state.equippedShield = _validEquip(state.shields, state.equippedShield, 'leather_buckler');
    state.equippedArmor  = _validEquip(state.armor,   state.equippedArmor,  'cloth_tunic');
    state.equippedShoes  = _validEquip(state.shoes,   state.equippedShoes,  'basic_boots');
    state.defeatedMonsters = snap.defeatedMonsters || {};
    state.miniGames = (snap.miniGames && typeof snap.miniGames === 'object') ? snap.miniGames : {};
    state.settings = (snap.settings && typeof snap.settings === 'object')
      ? { musicVol: (snap.settings.musicVol != null ? snap.settings.musicVol : 38), sfxVol: (snap.settings.sfxVol != null ? snap.settings.sfxVol : 72) }
      : { musicVol: 38, sfxVol: 72 };
    if (typeof applyAudioSettings === 'function') applyAudioSettings();
    state.arenaStats = (snap.arenaStats && typeof snap.arenaStats === 'object') ? snap.arenaStats : {};
    state.bossDefeated = snap.bossDefeated || {};
    state.perfectArenas = (snap.perfectArenas && typeof snap.perfectArenas === 'object') ? snap.perfectArenas : {};
    state.specialStore = (snap.specialStore && typeof snap.specialStore === 'object')
      ? { hp: snap.specialStore.hp || 0, mp: snap.specialStore.mp || 0, ap: snap.specialStore.ap || 0,
          dp: snap.specialStore.dp || 0, spd: snap.specialStore.spd || 0, level: snap.specialStore.level || 0 }
      : { hp: 0, mp: 0, ap: 0, dp: 0, spd: 0, level: 0 };
    state.specialStoreOwned = (snap.specialStoreOwned && typeof snap.specialStoreOwned === 'object')
      ? { hp: snap.specialStoreOwned.hp || 0, mp: snap.specialStoreOwned.mp || 0, ap: snap.specialStoreOwned.ap || 0,
          dp: snap.specialStoreOwned.dp || 0, spd: snap.specialStoreOwned.spd || 0, level: snap.specialStoreOwned.level || 0 }
      : { hp: 0, mp: 0, ap: 0, dp: 0, spd: 0, level: 0 };
    // Per-machine milestone-popup latch map. Migrate old boolean saves (a single "store open" flag)
    // via the store module's source-of-truth helper, seeding already-cleared milestones so upgrading
    // never spams retroactive CONGRATULATIONS popups. See specialStoreMigrateAnnounced (42-special-store.js).
    state.specialStoreAnnounced = (typeof specialStoreMigrateAnnounced === 'function')
      ? specialStoreMigrateAnnounced(snap.specialStoreAnnounced, snap.bossDefeated)
      : (snap.specialStoreAnnounced && typeof snap.specialStoreAnnounced === 'object' ? snap.specialStoreAnnounced : {});
    state.comebackUnlocked = !!snap.comebackUnlocked;
    state.comebackCleared = !!snap.comebackCleared;
    // Transient boss-visit flags never persist — a reload starts you outside the boss room, and
    // the Boss Gate button is re-derived from levelSolves/bossDefeated in updatePanelVisibility.
    state.bossGateUnlocked = false;
    state.bossRoomEntered = false;
    state.trophies = snap.trophies || [];
  }

  function resetPlayerState(){
    state.score = 0;
    state.level = 1;
    state.streak = 0;
    state.levelSolves = 0;
    state.coins = 0;
    state.currencies = { gold: 0, silver: 0 };
    state.chips = {};
    state.schemaVersion = 2;
    state.materials = {};
    state.codex = { bodies: {}, fragments: {} };
    state.wonderPasses = 5;   // 5 starting passes (player: "given 5 wonderland passes to start")
    state.passEarns = {};
    state.inventory = {};
    state.poisonArmed = false;
    state.solveClock = 0;
    state.roomFails = 0;
    state.farm = { plots: [], animals: [], houses: 1 };
    state.miniGames = {};
    state.settings = { musicVol: 38, sfxVol: 72 };
    if (typeof applyAudioSettings === 'function') applyAudioSettings();
    state.arenaStats = {};
    state.gatePending = false;
    state.bossGateUnlocked = false;
    state.bossRoomEntered = false;
    state.bossDefeated = {};
    state.perfectArenas = {};
    state.equippedWeapon = 'wood_sword';
    state.equippedShield = 'leather_buckler';
    state.equippedArmor = 'cloth_tunic';
    state.equippedShoes = 'basic_boots';
    state.socketedChips = {};
    state.heroLvl = 1;
    state.heroXp = 0;
    state.playerMaxHp = 100;
    state.playerHp = 100;
    state.playerMaxMp = 20;
    state.playerMp = 20;
    state.defeatedMonsters = {};
    state.trophies = [];
    state.specialStore = { hp: 0, mp: 0, ap: 0, dp: 0, spd: 0, level: 0 };
    state.specialStoreOwned = { hp: 0, mp: 0, ap: 0, dp: 0, spd: 0, level: 0 };
    state.specialStoreAnnounced = {};
    state.comebackUnlocked = false;
    state.comebackCleared = false;
    if (el.trophiesPanel) el.trophiesPanel.style.display = 'none';
    state.weapons = reconcileGear(WEAPONS, null);
    state.shields = reconcileGear(SHIELDS, null);
    state.armor   = reconcileGear(ARMOR, null);
    state.shoes   = reconcileGear(SHOES, null);

    el.shopView.classList.remove('active');
    el.battleView.classList.remove('active');
    el.equationView.classList.add('active');
    el.levelGateActions.style.display = 'none';
    el.eqActions.style.display = 'flex';
  }

  function escapeHtml(s){
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function updatePlayerNameTag(){
    if (!el.playerNameTag) return;
    if (activeProfileName) {
      el.playerNameTag.textContent = (state.testMode ? '🔓 TEST MODE — ' : '🙂 Playing as ') + activeProfileName;
      el.playerNameTag.hidden = false;
    } else {
      el.playerNameTag.hidden = true;
    }
  }

  function updateNewPlayerAvailability(){
    var atCap = loadAllProfiles().length >= MAX_PROFILES;
    if (el.newPlayerBtn) el.newPlayerBtn.disabled = atCap;
    if (el.newPlayerNameInput) el.newPlayerNameInput.disabled = atCap;
    if (el.newPlayerError) {
      if (atCap) {
        el.newPlayerError.hidden = false;
        el.newPlayerError.textContent = 'Max 10 players reached — delete one below to add a new player.';
      } else {
        el.newPlayerError.hidden = true;
      }
    }
  }

  function deleteProfile(id){
    // If we're deleting the profile that's currently "active" (e.g. it was just played this
    // session), null the active pointer and stop the game loop's autosave — otherwise a
    // safety-net saveGame() (interval / beforeunload) would re-push the deleted profile.
    if (id === activeProfileId) { activeProfileId = null; gameStarted = false; }
    saveAllProfiles(loadAllProfiles().filter(function(p){ return p.id !== id; }));
    renderSavedPlayersList();
    updateNewPlayerAvailability();
  }

  function continueAsProfile(snap){
    activeProfileId = snap.id;
    activeProfileName = snap.name || 'Player';
    applySnapshotToState(snap);
    if (el.startScreen) el.startScreen.hidden = true;
    startGame();
  }

  function formatRelativeTime(ts){
    if (!ts) return 'never saved';
    var diff = Date.now() - ts;
    if (diff < 0) diff = 0;
    var mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return mins + ' min' + (mins === 1 ? '' : 's') + ' ago';
    var hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + ' hour' + (hrs === 1 ? '' : 's') + ' ago';
    var days = Math.floor(hrs / 24);
    if (days < 7) return days + ' day' + (days === 1 ? '' : 's') + ' ago';
    try { return 'on ' + new Date(ts).toLocaleDateString(); } catch (e) { return days + ' days ago'; }
  }

  function renderSavedPlayersList(){
    if (!el.savedPlayersList) return;
    var list = loadAllProfiles().slice().sort(function(a, b){ return (b.savedAt || 0) - (a.savedAt || 0); });
    el.savedPlayersList.innerHTML = '';

    if (list.length === 0) {
      if (el.savedPlayersPanel) el.savedPlayersPanel.hidden = true;
      return;
    }
    if (el.savedPlayersPanel) el.savedPlayersPanel.hidden = false;
    if (el.savedPlayersHeading) {
      el.savedPlayersHeading.textContent = 'Saved Players (' + list.length + '/' + MAX_PROFILES + ')';
    }

    list.forEach(function(p){
      var card = document.createElement('div');
      card.className = 'saved-player-card';

      var info = document.createElement('div');
      info.className = 'saved-player-info';
      info.innerHTML = '<span class="saved-player-name">' + escapeHtml(p.name || 'Player') + '</span>' +
        '<span class="saved-player-stat">Arena ' + p.level + ' · Hero Lv.' + p.heroLvl + ' · ' + p.coins + ' 💵</span>' +
        '<span class="saved-player-time">Last saved ' + formatRelativeTime(p.savedAt) + '</span>';

      var actions = document.createElement('div');
      actions.className = 'saved-player-actions';

      var continueBtn = document.createElement('button');
      continueBtn.type = 'button';
      continueBtn.className = 'btn btn-primary';
      continueBtn.textContent = 'Continue';
      continueBtn.addEventListener('click', function(){ continueAsProfile(p); });

      var deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn btn-ghost';
      deleteBtn.textContent = '🗑';
      var deletePending = false;
      deleteBtn.addEventListener('click', function(){
        if (!deletePending) {
          deletePending = true;
          deleteBtn.textContent = 'Sure?';
          setTimeout(function(){ deletePending = false; deleteBtn.textContent = '🗑'; }, 3000);
          return;
        }
        deleteProfile(p.id);
      });

      actions.appendChild(continueBtn);
      actions.appendChild(deleteBtn);
      card.appendChild(info);
      card.appendChild(actions);
      el.savedPlayersList.appendChild(card);
    });
  }

