  // ---------- Special Item Store 🏭 ("The Odyssey Forge") ----------
  // A late-game building that only appears after the player clears Arena 44's boss. Sells 5
  // "machines" — one per core stat (HP/MP/AP/DP/Speed) — each purchase permanently grants the
  // same flat boost as ONE hero level (see heroStatBonus/addHeroXp), stacking indefinitely
  // (capped at SPECIAL_STORE_MAX_PURCHASES per stat) at an ever-rising Cash price.
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
  // * The one-time "Special Item Store is open!" celebration fires from openMapHub() (15-map.js)
  //   the first time the hub renders after unlock; state.specialStoreAnnounced latches it off.

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
  var SPECIAL_STORE_MACHINES = [
    { id: 'hp',  icon: '❤️', name: 'Vitality Chamber', statLabel: 'Max HP', gain: 20,
      desc: 'Permanently raises your maximum HP by 20 — the same boost as one hero level.' },
    { id: 'mp',  icon: '💧', name: 'Mana Reactor',      statLabel: 'Max MP', gain: 10,
      desc: 'Permanently raises your maximum MP by 10 — the same boost as one hero level.' },
    { id: 'ap',  icon: '⚔️', name: 'Power Amplifier',   statLabel: 'AP',     gain: 2,
      desc: 'Permanently raises your Attack Power by 2 — the same boost as one hero level.' },
    { id: 'dp',  icon: '🛡️', name: 'Aegis Forge',       statLabel: 'DP',     gain: 1,
      desc: 'Permanently raises your Defense by 1 — the same boost as one hero level.' },
    { id: 'spd', icon: '💨', name: 'Velocity Core',     statLabel: 'Speed',  gain: 1,
      desc: 'Permanently raises your Speed by 1 (better dodge & crit chance) — the same boost as one hero level.' },
    { id: 'level', icon: '🌟', name: 'Ascension Core',  statLabel: 'Hero Level', gain: 1,
      desc: 'Instantly grants one full hero level — the same HP/MP/AP/DP/Speed boost as leveling up through XP.' }
  ];

  function specialStoreMachine(id){
    for (var i = 0; i < SPECIAL_STORE_MACHINES.length; i++) if (SPECIAL_STORE_MACHINES[i].id === id) return SPECIAL_STORE_MACHINES[i];
    return null;
  }

  // PURE: unlocked once Arena 44's boss is beaten (permanent — bossDefeated never clears). Admin
  // test accounts see it immediately, matching the Star Atlas's testUnlockAll convention.
  function specialStoreUnlocked(){
    return !!(state.bossDefeated && state.bossDefeated[SPECIAL_STORE_UNLOCK_ARENA]) || !!state.testMode;
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

  // ---------- First-visit celebration ----------
  // Called by openMapHub() (15-map.js) after every render. Fires exactly once: the first Earth
  // Hub visit after Arena 44's boss falls. A big overlay (reuses the .gameover-* modal classes —
  // see the "Boss Gate Open!" notice in index.html for the same pattern) + a confetti burst.
  function specialStoreMaybeAnnounce(){
    if (!specialStoreUnlocked() || state.specialStoreAnnounced) return;
    state.specialStoreAnnounced = true;
    if (typeof saveGame === 'function') saveGame();
    var ov = document.createElement('div');
    ov.id = 'specialStoreAnnounceOverlay';
    ov.className = 'gameover-overlay sstr-announce-overlay';
    ov.innerHTML =
      '<div class="gameover-card sstr-announce-card">' +
        '<div class="gameover-emoji sstr-announce-emoji">🏭✨</div>' +
        '<h2 class="gameover-title sstr-announce-title">CONGRATULATIONS!</h2>' +
        '<p class="gameover-text sstr-announce-text">You’ve conquered Arena 44 — the <b>Special Item Store</b> is open! ' +
          'Head to the Odyssey Forge on the Earth Hub map for permanent, stackable HP/MP/AP/DP/Speed upgrades.</p>' +
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
  }
