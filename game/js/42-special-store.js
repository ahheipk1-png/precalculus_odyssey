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
  //   (06-rpg-battle.js / 21-catalogue.js) via specialStoreBonus(id) — same pattern as
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

  // One machine per stat. `gain` intentionally matches the existing per-hero-level bonus
  // (heroStatBonus / addHeroXp) so the tooltip's "worth one hero level" claim stays true if that
  // formula ever changes — update both places together.
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
      desc: 'Permanently raises your Speed by 1 (better dodge & crit chance) — the same boost as one hero level.' }
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
  function specialStoreCount(id){ return (state.specialStore && state.specialStore[id]) || 0; }
  function specialStoreCost(id){ return SPECIAL_STORE_BASE_COST + SPECIAL_STORE_COST_STEP * specialStoreCount(id); }
  // The live additive bonus a stat function should add — see getPlayerAp/getPlayerDp
  // (06-rpg-battle.js) and getPlayerSpeed (21-catalogue.js). HP/MP don't use this (see file header).
  function specialStoreBonus(id){
    var m = specialStoreMachine(id);
    return m ? specialStoreCount(id) * m.gain : 0;
  }

  // The transaction (console-testable). Returns { ok, msg }.
  function specialStoreBuy(id){
    if (!specialStoreUnlocked()) return { ok: false, msg: 'The Odyssey Forge isn’t open yet.' };
    var m = specialStoreMachine(id);
    if (!m) return { ok: false, msg: 'Unknown machine.' };
    if (!state.specialStore) state.specialStore = { hp: 0, mp: 0, ap: 0, dp: 0, spd: 0 };
    var n = specialStoreCount(id);
    if (n >= SPECIAL_STORE_MAX_PURCHASES) return { ok: false, msg: m.name + ' is already maxed at ' + SPECIAL_STORE_MAX_PURCHASES + '!' };
    var cost = specialStoreCost(id);
    if ((state.coins || 0) < cost) {
      return { ok: false, msg: 'Not enough Cash — ' + m.name + ' costs 💵 ' + cost + ' and you have 💵 ' + (state.coins || 0) + '.' };
    }
    state.coins -= cost;
    state.specialStore[id] = n + 1;
    // HP/MP have no live "effective stat" reader in combat (see file header) — bump the base
    // directly, exactly like a hero level-up (05-render.js addHeroXp): grant the new capacity AND
    // the current value, so the purchase is felt immediately, not just as extra headroom.
    if (id === 'hp'){ state.playerMaxHp += m.gain; state.playerHp = Math.min(state.playerMaxHp, state.playerHp + m.gain); }
    if (id === 'mp'){ state.playerMaxMp += m.gain; state.playerMp = Math.min(state.playerMaxMp, state.playerMp + m.gain); }
    if (typeof updateStats === 'function') updateStats();
    if (typeof saveGame === 'function') saveGame();
    return { ok: true, msg: '⚙️ ' + m.name + ' installed! +' + m.gain + ' ' + m.statLabel + ' — permanent.' };
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
      var n = specialStoreCount(m.id);
      var maxed = n >= SPECIAL_STORE_MAX_PURCHASES;
      var cost = specialStoreCost(m.id);
      var afford = (state.coins || 0) >= cost;
      var short = cost - (state.coins || 0);
      var btnTitle = maxed ? (m.name + ' is already maxed — every hero has a limit!')
        : (afford ? ('Buy ' + m.name + ' for 💵' + cost + ' — ' + m.desc) : ('Not enough Cash — need 💵' + short + ' more'));
      return (
        '<div class="istr-card sstr-card">' +
          '<span class="istr-owned sstr-count" title="Machines installed so far (max ' + SPECIAL_STORE_MAX_PURCHASES + ')">×' + n + '</span>' +
          '<span class="istr-icon">' + m.icon + '</span>' +
          '<span class="istr-name">' + m.name + '</span>' +
          '<span class="istr-desc" title="' + m.desc + '">' + m.desc + '</span>' +
          '<div class="istr-buy-row">' +
            '<button class="btn btn-primary istr-buy" onclick="sstrBuyClick(\'' + m.id + '\')"' +
              ((maxed || !afford) ? ' disabled' : '') + ' title="' + btnTitle + '">' +
              (maxed ? 'MAXED ' + SPECIAL_STORE_MAX_PURCHASES + '/' + SPECIAL_STORE_MAX_PURCHASES : 'Buy 💵' + cost) +
            '</button>' +
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
