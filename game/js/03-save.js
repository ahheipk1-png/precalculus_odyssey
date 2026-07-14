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
      trophies: state.trophies,
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
    migrateSave(snap);
    state.level = snap.level;
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
    state.bossDefeated = snap.bossDefeated || {};
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
    state.wonderPasses = 0;
    state.passEarns = {};
    state.inventory = {};
    state.poisonArmed = false;
    state.solveClock = 0;
    state.roomFails = 0;
    state.farm = { plots: [], animals: [], houses: 1 };
    state.miniGames = {};
    state.gatePending = false;
    state.bossGateUnlocked = false;
    state.bossRoomEntered = false;
    state.bossDefeated = {};
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

