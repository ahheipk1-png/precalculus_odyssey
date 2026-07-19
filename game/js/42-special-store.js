  // ---------- Special Item Store 🏭 ("The Odyssey Forge") ----------
  // A late-game building that appears after the player clears Arena 44's boss. Sells 5 stat
  // "machines" — one per core stat (HP/MP/AP/DP/Speed) — plus the premium Ascension Core; each
  // purchase permanently grants the same flat boost as ONE hero level (see heroStatBonus/addHeroXp),
  // stacking indefinitely (capped at SPECIAL_STORE_MAX_PURCHASES per stat) at an ever-rising Cash
  // price. The machines UNLOCK PROGRESSIVELY, not all at once — one new machine every 4 arenas
  // (HP@44, MP@48, Speed@52, DP@56, AP@60, Ascension Core@64), each with its own CONGRATULATIONS
  // milestone popup. See SPECIAL_STORE_MACHINES / specialStoreMachineUnlocked / specialStoreMaybeAnnounce.
  //
  // Design decisions:
  // * Same view-controller shape as 20-item-store.js (whole view re-rendered on open + after every
  //   buy — no incremental DOM bookkeeping) and reuses its istr- CSS classes for the shelf/card
  //   layout (special-store.css only adds what's genuinely different: the violet "special" theme
  //   + a purchase-count badge).
  // * AP/DP/Speed bonuses are additive terms read live by getPlayerAp/getPlayerDp/getPlayerSpeed
  //   (06-gear-shop.js / 21-catalogue.js) via specialStoreBonus(id) — same pattern as
  //   socketBonusTotal, so a purchase is felt in combat immediately, no separate "effective stat"
  //   plumbing needed. HP/MP have no such live-bonus layer in this codebase (combat reads
  //   state.playerMaxHp/playerMaxMp directly) so those two machines bump the base stat directly,
  //   mirroring exactly how addHeroXp's level-up bonus works (05-render.js).
  // * The building itself is HIDDEN on the Earth Hub map until unlocked (15-map.js filters
  //   WMAP_SPOTS through specialStoreUnlocked()) — it doesn't just render disabled, it doesn't
  //   exist yet, so there's nothing to be curious about before Arena 44.
  // * The per-milestone "new machine unlocked!" celebrations fire from openMapHub() (15-map.js) the
  //   first time the hub renders after each milestone boss falls; state.specialStoreAnnounced is a
  //   per-machine map latching each popup off once shown.

  var SPECIAL_STORE_UNLOCK_ARENA = 44;   // clearing this arena's boss reveals the store
  var SPECIAL_STORE_MAX_PURCHASES = 999; // per-stat purchase cap
  var SPECIAL_STORE_BASE_COST = 10000;   // first purchase of any machine
  var SPECIAL_STORE_COST_STEP = 1000;    // +1000 Cash per purchase already made of that machine

  // The Ascension Core (user 2026-07-18: "add a special item to level up... make it 100,000 and
  // add 10,000, 20,000, 30,000 for more levels") is far more valuable than any single stat machine
  // — it grants a WHOLE hero level — so it runs its OWN, steeper price ladder instead of the shared
  // flat one above: 100000, then +10000, +20000, +30000, ... (the STEP ITSELF grows by 10000 each
  // purchase). See specialStoreCost's id==='level' branch for the exact formula.
  var SPECIAL_STORE_LEVEL_BASE_COST = 100000;
  var SPECIAL_STORE_LEVEL_COST_STEP = 10000;

  // One machine per stat, plus the Ascension Core (a whole hero level at once). `gain`
  // intentionally matches the existing per-hero-level bonus (heroStatBonus / addHeroXp) so the
  // tooltip's "worth one hero level" claim stays true if that formula ever changes — update both
  // places together.
  //
  // PROGRESSIVE UNLOCK (user 2026-07-18: "instead of letting player buy all special items at arena
  // 44, we should do it progressively... i think it is more fun this way"): each machine has an
  // `unlock` arena. Clearing that arena's boss reveals the machine (specialStoreMachineUnlocked)
  // AND fires its own CONGRATULATIONS milestone popup (specialStoreMaybeAnnounce). The building
  // itself appears at 44 (the HP machine's unlock = the store opening). Listed here in unlock order
  // so the shelf reads as a top-to-bottom progression; locked machines still show as 🔒 teasers.
  // The Ascension Core (Level Up) is the premium capstone (a whole level, priced far higher) — it
  // unlocks at Arena 64, one step past the final stat milestone (AP@60), rather than at the opening.
  var SPECIAL_STORE_MACHINES = [
    { id: 'hp',  icon: '❤️', name: 'Vitality Chamber', statLabel: 'Max HP', gain: 20, unlock: 44,
      desc: 'Permanently raises your maximum HP by 20 — the same boost as one hero level.' },
    { id: 'mp',  icon: '💧', name: 'Mana Reactor',      statLabel: 'Max MP', gain: 10, unlock: 48,
      desc: 'Permanently raises your maximum MP by 10 — the same boost as one hero level.' },
    { id: 'spd', icon: '💨', name: 'Velocity Core',     statLabel: 'Speed',  gain: 1,  unlock: 52,
      desc: 'Permanently raises your Speed by 1 (better dodge & crit chance) — the same boost as one hero level.' },
    { id: 'dp',  icon: '🛡️', name: 'Aegis Forge',       statLabel: 'DP',     gain: 1,  unlock: 56,
      desc: 'Permanently raises your Defense by 1 — the same boost as one hero level.' },
    { id: 'ap',  icon: '⚔️', name: 'Power Amplifier',   statLabel: 'AP',     gain: 2,  unlock: 60,
      desc: 'Permanently raises your Attack Power by 2 — the same boost as one hero level.' },
    { id: 'level', icon: '🌟', name: 'Ascension Core(Level Up)', statLabel: 'Hero Level', gain: 1, unlock: 64,
      desc: 'Instantly grants one full hero level — the same HP/MP/AP/DP/Speed boost as leveling up through XP.' }
  ];

  function specialStoreMachine(id){
    for (var i = 0; i < SPECIAL_STORE_MACHINES.length; i++) if (SPECIAL_STORE_MACHINES[i].id === id) return SPECIAL_STORE_MACHINES[i];
    return null;
  }

  // PURE: the STORE (building on the map) opens once Arena 44's boss is beaten — that's also the HP
  // machine's unlock, so "store open" == "at least one machine available". Permanent (bossDefeated
  // never clears). Admin test accounts see everything immediately (Star Atlas testUnlockAll convention).
  function specialStoreUnlocked(){
    return !!(state.bossDefeated && state.bossDefeated[SPECIAL_STORE_UNLOCK_ARENA]) || !!state.testMode;
  }
  // PURE: a single MACHINE is unlocked once its own milestone arena's boss is beaten (progressive
  // unlock — see SPECIAL_STORE_MACHINES). Test accounts see all machines at once.
  function specialStoreMachineUnlocked(m){
    if (!m) return false;
    if (state.testMode) return true;
    return !!(state.bossDefeated && state.bossDefeated[m.unlock]);
  }
  // Source of truth for migrating the old boolean `specialStoreAnnounced` (one shared "store is
  // open" latch) to the new per-machine map { hp:true, mp:true, ... } (one latch per milestone
  // popup). Called from applySnapshotToState (03-save.js). Given a saved value + that save's
  // bossDefeated map, returns the per-machine announced-map. Any milestone whose boss was ALREADY
  // cleared in the loaded save is seeded as already-announced, so upgrading an existing save never
  // spams retroactive CONGRATULATIONS popups for arenas the player conquered long ago.
  function specialStoreMigrateAnnounced(saved, bossDefeated){
    var out = {};
    var isMap = saved && typeof saved === 'object';
    for (var i = 0; i < SPECIAL_STORE_MACHINES.length; i++){
      var m = SPECIAL_STORE_MACHINES[i];
      out[m.id] = isMap ? !!saved[m.id] : !!(bossDefeated && bossDefeated[m.unlock]);
    }
    return out;
  }
  // "Installed" = the count actually contributing its stat bonus right now. Matches the Item
  // Store's buy-then-use pattern (user 2026-07-18: "just add a use button beloew each of them") —
  // Buy only ACQUIRES a machine into your uninstalled stockpile; Use INSTALLS one, applying its
  // permanent bonus. Both counts share one price/cap ladder (see specialStoreTotalCount).
  function specialStoreCount(id){ return (state.specialStore && state.specialStore[id]) || 0; }
  function specialStoreOwned(id){ return (state.specialStoreOwned && state.specialStoreOwned[id]) || 0; }
  function specialStoreTotalCount(id){ return specialStoreCount(id) + specialStoreOwned(id); }
  // The Ascension Core prices its k-th purchase (k=1,2,3,...) as 100000 + 10000·(1+2+...+(k-1)) —
  // i.e. the price climbs by 10000, then 20000, then 30000, ... each additional purchase (100000 →
  // 110000 → 130000 → 160000 → 200000 → ...). Every other machine keeps the flat shared ladder.
  function specialStoreCost(id){
    if (id === 'level'){
      var t = specialStoreTotalCount(id);
      return SPECIAL_STORE_LEVEL_BASE_COST + SPECIAL_STORE_LEVEL_COST_STEP * t * (t + 1) / 2;
    }
    return SPECIAL_STORE_BASE_COST + SPECIAL_STORE_COST_STEP * specialStoreTotalCount(id);
  }
  // The live additive bonus a stat function should add — see getPlayerAp/getPlayerDp
  // (06-gear-shop.js) and getPlayerSpeed (21-catalogue.js). HP/MP don't use this (see file header).
  // Only INSTALLED machines count — an unused one in the stockpile grants nothing yet.
  function specialStoreBonus(id){
    var m = specialStoreMachine(id);
    return m ? specialStoreCount(id) * m.gain : 0;
  }

  // Buy: acquire one machine into the uninstalled stockpile. Does NOT apply any bonus yet — see
  // specialStoreUseMachine for that. Console-testable; returns { ok, msg }.
  function specialStoreBuy(id){
    if (!specialStoreUnlocked()) return { ok: false, msg: 'The Odyssey Forge isn’t open yet.' };
    var m = specialStoreMachine(id);
    if (!m) return { ok: false, msg: 'Unknown machine.' };
    if (!specialStoreMachineUnlocked(m)) return { ok: false, msg: '🔒 ' + m.name + ' unlocks after you clear Arena ' + m.unlock + '!' };
    if (!state.specialStore) state.specialStore = { hp: 0, mp: 0, ap: 0, dp: 0, spd: 0, level: 0 };
    if (!state.specialStoreOwned) state.specialStoreOwned = { hp: 0, mp: 0, ap: 0, dp: 0, spd: 0, level: 0 };
    var total = specialStoreTotalCount(id);
    if (total >= SPECIAL_STORE_MAX_PURCHASES) return { ok: false, msg: m.name + ' is already maxed at ' + SPECIAL_STORE_MAX_PURCHASES + '!' };
    var cost = specialStoreCost(id);
    if ((state.coins || 0) < cost) {
      return { ok: false, msg: 'Not enough Cash — ' + m.name + ' costs 💵 ' + cost + ' and you have 💵 ' + (state.coins || 0) + '.' };
    }
    state.coins -= cost;
    state.specialStoreOwned[id] = specialStoreOwned(id) + 1;
    if (typeof updateStats === 'function') updateStats();
    if (typeof saveGame === 'function') saveGame();
    return { ok: true, msg: '📦 ' + m.name + ' acquired! Hit Use to install it — permanent, one-way.' };
  }

  // Use: install ONE owned-but-uninstalled machine, applying its permanent bonus. Console-testable;
  // returns { ok, msg }.
  function specialStoreUseMachine(id){
    var m = specialStoreMachine(id);
    if (!m) return { ok: false, msg: 'Unknown machine.' };
    if (specialStoreOwned(id) < 1) return { ok: false, msg: 'You don’t have a ' + m.name + ' to install — buy one first!' };
    state.specialStoreOwned[id] = specialStoreOwned(id) - 1;
    state.specialStore[id] = specialStoreCount(id) + 1;
    var msg = '⚙️ ' + m.name + ' installed! +' + m.gain + ' ' + m.statLabel + ' — permanent.';
    // HP/MP have no live "effective stat" reader in combat (see file header) — bump the base
    // directly, exactly like a hero level-up (05-render.js addHeroXp): grant the new capacity AND
    // the current value, so installing it is felt immediately, not just as extra headroom.
    if (id === 'hp'){ state.playerMaxHp += m.gain; state.playerHp = Math.min(state.playerMaxHp, state.playerHp + m.gain); }
    else if (id === 'mp'){ state.playerMaxMp += m.gain; state.playerMp = Math.min(state.playerMaxMp, state.playerMp + m.gain); }
    // Ascension Core: grants a WHOLE hero level via the shared helper (05-render.js) — HP/MP
    // capacity + AP/DP/Speed (derived live from heroLvl) all move together, exactly like an
    // XP-driven level-up. grantHeroLevels shows its own "+1 HERO LEVELS!" toast on top of this one.
    else if (id === 'level'){ if (typeof grantHeroLevels === 'function') grantHeroLevels(m.gain); msg = '🌟 ' + m.name + ' activated!'; }
    if (typeof updateStats === 'function') updateStats();
    if (typeof saveGame === 'function') saveGame();
    return { ok: true, msg: msg };
  }

  // ---------- View controllers (mirrors openItemStore/closeItemStore) ----------

  function openSpecialStore(){
    var view = document.getElementById('specialStoreView');
    if (!view) return;
    sstrRenderView();
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    view.classList.add('active');
    if (typeof playMusic === 'function') playMusic('shop');
  }

  function closeSpecialStore(){
    var view = document.getElementById('specialStoreView');
    if (view) view.classList.remove('active');
    if (typeof openMapHub === 'function') { openMapHub(); return; }
    var eq = document.getElementById('equationView');
    if (eq) eq.classList.add('active');
    if (typeof playMusic === 'function') playMusic('practice');
  }

  function sstrBuyClick(id){
    var res = specialStoreBuy(id);
    if (typeof showToast === 'function') showToast(res.msg);
    if (res.ok) {
      if (typeof playSfx === 'function') playSfx('buy');
    } else if (typeof playSfx === 'function') playSfx('wrong');
    sstrRenderView();
  }

  function sstrUseClick(id){
    var res = specialStoreUseMachine(id);
    if (typeof showToast === 'function') showToast(res.msg);
    if (res.ok) {
      if (typeof playSfx === 'function') playSfx('weapon-upgrade');
      if (typeof burst === 'function') burst(8);
    } else if (typeof playSfx === 'function') playSfx('wrong');
    sstrRenderView();
  }

  // ---------- Rendering ----------

  function sstrRenderView(){
    var view = document.getElementById('specialStoreView');
    if (!view) return;
    view.innerHTML =
      '<div class="istr-wrap sstr-wrap">' +
        '<div class="istr-header">' +
          '<button class="btn btn-ghost istr-back" onclick="closeSpecialStore()" title="Back to Earth Hub — return to the map">← Back to Earth</button>' +
          '<h2 class="istr-title sstr-title">🏭 The Odyssey Forge</h2>' +
          '<p class="istr-tagline">“Permanent power, forged one machine at a time — for those who’ve proven themselves.”</p>' +
          '<span class="istr-cash-chip" title="Your Cash">💵 ' + state.coins + '</span>' +
        '</div>' +
        '<div class="istr-shelf sstr-shelf">' + sstrShelfHtml() + '</div>' +
      '</div>';
  }

  function sstrShelfHtml(){
    return SPECIAL_STORE_MACHINES.map(function(m){
      // Locked (milestone arena not yet cleared): show a greyed 🔒 teaser card instead of Buy/Use,
      // so the player can see what's coming and which arena unlocks it.
      if (!specialStoreMachineUnlocked(m)){
        return (
          '<div class="istr-card sstr-card sstr-locked" title="Unlocks after you clear Arena ' + m.unlock + '">' +
            '<span class="istr-icon sstr-lock-icon">🔒</span>' +
            '<span class="istr-name">' + m.name + '</span>' +
            '<span class="istr-desc">' + m.desc + '</span>' +
            '<span class="sstr-lock-note">🔒 Unlocks at Arena ' + m.unlock + '</span>' +
          '</div>'
        );
      }
      var installed = specialStoreCount(m.id);
      var owned = specialStoreOwned(m.id);
      var total = installed + owned;
      var maxed = total >= SPECIAL_STORE_MAX_PURCHASES;
      var cost = specialStoreCost(m.id);
      var afford = (state.coins || 0) >= cost;
      var short = cost - (state.coins || 0);
      var buyTitle = maxed ? (m.name + ' is already maxed — every hero has a limit!')
        : (afford ? ('Buy ' + m.name + ' for 💵' + cost + ' — ' + m.desc) : ('Not enough Cash — need 💵' + short + ' more'));
      var useTitle = owned > 0 ? ('Install one ' + m.name + ' — permanently applies +' + m.gain + ' ' + m.statLabel + '.')
        : 'Buy one first — nothing to install yet.';
      return (
        '<div class="istr-card sstr-card">' +
          '<span class="istr-owned sstr-count" title="Installed so far (max ' + SPECIAL_STORE_MAX_PURCHASES + ')">×' + installed + '</span>' +
          '<span class="istr-icon">' + m.icon + '</span>' +
          '<span class="istr-name">' + m.name + '</span>' +
          '<span class="istr-desc" title="' + m.desc + '">' + m.desc + '</span>' +
          (owned > 0 ? '<span class="sstr-stock" title="Bought but not yet installed">📦 ' + owned + ' waiting to install</span>' : '') +
          '<div class="istr-buy-row">' +
            '<button class="btn btn-primary istr-buy" onclick="sstrBuyClick(\'' + m.id + '\')"' +
              ((maxed || !afford) ? ' disabled' : '') + ' title="' + buyTitle + '">' +
              (maxed ? 'MAXED ' + SPECIAL_STORE_MAX_PURCHASES + '/' + SPECIAL_STORE_MAX_PURCHASES : 'Buy 💵' + cost) +
            '</button>' +
          '</div>' +
          '<div class="istr-buy-row">' +
            '<button class="btn btn-ghost sstr-use" onclick="sstrUseClick(\'' + m.id + '\')"' +
              (owned > 0 ? '' : ' disabled') + ' title="' + useTitle + '">Use' + (owned > 0 ? ' (' + owned + ')' : '') + '</button>' +
          '</div>' +
          (!maxed && !afford ? '<span class="istr-short">Need 💵' + short + ' more!</span>' : '') +
        '</div>'
      );
    }).join('');
  }

  // ---------- Per-milestone celebration ----------
  // Called by openMapHub() (15-map.js) after every render. Fires a CONGRATULATIONS popup ONCE per
  // milestone machine — the first Earth Hub visit after that machine's arena boss falls (44 opens
  // the store + HP, then 48/52/56/60 each add one machine). `state.specialStoreAnnounced` is a
  // per-machine latch map { hp:true, mp:true, ... }. Shows the lowest-arena un-announced machine,
  // then chains to any others on close (only relevant when several milestones are pending at once,
  // e.g. a deep/migrated save loaded past multiple of them). Big overlay (reuses the .gameover-* modal
  // shell — same pattern as the "Boss Gate Open!" notice) + confetti burst.
  function specialStoreMaybeAnnounce(){
    if (!specialStoreUnlocked()) return;
    if (!state.specialStoreAnnounced || typeof state.specialStoreAnnounced !== 'object') state.specialStoreAnnounced = {};
    // Admin/test accounts have everything unlocked from the start — seed all latches without any
    // popups so they aren't spammed with six celebrations on their first hub visit.
    if (state.testMode){
      var changed = false;
      SPECIAL_STORE_MACHINES.forEach(function(m){ if (!state.specialStoreAnnounced[m.id]){ state.specialStoreAnnounced[m.id] = true; changed = true; } });
      if (changed && typeof saveGame === 'function') saveGame();
      return;
    }
    // The lowest-arena machine that's unlocked but whose milestone popup hasn't shown yet.
    var next = null;
    for (var i = 0; i < SPECIAL_STORE_MACHINES.length; i++){
      var m = SPECIAL_STORE_MACHINES[i];
      if (specialStoreMachineUnlocked(m) && !state.specialStoreAnnounced[m.id]){
        if (!next || m.unlock < next.unlock) next = m;
      }
    }
    if (!next) return;
    state.specialStoreAnnounced[next.id] = true;
    if (typeof saveGame === 'function') saveGame();
    specialStoreShowAnnounce(next);
  }

  function specialStoreShowAnnounce(m){
    var opensStore = (m.unlock === SPECIAL_STORE_UNLOCK_ARENA);   // Arena 44 = the Forge itself opening
    var body = opensStore
      ? ('You’ve conquered Arena ' + m.unlock + ' — the <b>Odyssey Forge</b> is open! Its first machine, the <b>' + m.name + '</b> (+' + m.gain + ' ' + m.statLabel + '), is ready on the Earth Hub map. Clear more arenas to unlock a new machine every 4 arenas!')
      : ('You’ve conquered Arena ' + m.unlock + ' — a new Odyssey Forge machine is online: the <b>' + m.name + '</b> (+' + m.gain + ' ' + m.statLabel + ')! Visit the Earth Hub map to install it.');
    var ov = document.createElement('div');
    ov.id = 'specialStoreAnnounceOverlay';
    ov.className = 'gameover-overlay sstr-announce-overlay';
    ov.innerHTML =
      '<div class="gameover-card sstr-announce-card">' +
        '<div class="gameover-emoji sstr-announce-emoji">' + m.icon + '✨</div>' +
        '<h2 class="gameover-title sstr-announce-title">CONGRATULATIONS!</h2>' +
        '<p class="gameover-text sstr-announce-text">' + body + '</p>' +
        '<button class="btn btn-primary" type="button" onclick="specialStoreCloseAnnounce()">Awesome! 🎉</button>' +
      '</div>';
    ov.addEventListener('click', function(e){ if (e.target === ov) specialStoreCloseAnnounce(); });
    document.body.appendChild(ov);
    if (typeof playSfx === 'function') playSfx('victory');
    if (typeof burst === 'function') burst(24);
  }
  function specialStoreCloseAnnounce(){
    var o = document.getElementById('specialStoreAnnounceOverlay');
    if (o && o.parentNode) o.parentNode.removeChild(o);
    // Chain: if several milestones are pending at once (e.g. a deep/migrated save loaded past
    // multiple of them), show the next popup. A no-op in the normal one-milestone-at-a-time case.
    specialStoreMaybeAnnounce();
  }
