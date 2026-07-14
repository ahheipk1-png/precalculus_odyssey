  // ---------- Victory Treasure Chest (module prefix: chst-) ----------
  // PURE PRESENTATION overlay shown after a monster is beaten. The caller has ALREADY credited
  // the materials + cash before calling showVictoryChest(loot, cashReward) — this module never
  // touches `state`, never saves, never calls updateStats. It only celebrates.
  //
  // Flow: showVictoryChest() appends a full-screen overlay to .board and drops in a hand-drawn
  // SVG chest ("Tap to open!") -> tapping pops the lid (playSfx('chest-open'), sparkle burst)
  // -> reward chips (💵 + one per material) fly out one by one -> a "Collect! ✨" button, a tap
  // on the backdrop, or an ~6s timer dismisses it.
  //
  // Re-entrant by design: every show (and every hide) removes the previous overlay and cancels
  // all pending timers, so back-to-back battles can never stack chests or leak timeouts.
  // Under prefers-reduced-motion the JS skips its stagger timers and reveals everything at once;
  // chest.css backs that up by disabling the animations themselves.

  var chstOverlayEl = null;  // the live overlay element (null when hidden)
  var chstOpened = false;    // has the CURRENT chest been tapped open yet?
  var chstTimers = [];       // pending setTimeout ids — cleared on hide (re-entrancy safety)

  // Local escape helper: prefer the global escapeHtml, fall back to a tiny replace so this file
  // never throws even if load order changes. (Icons/labels are game data, not user input, but
  // rule 9 says escape anything we interpolate — cheap insurance.)
  function chstEsc(s){
    if (typeof escapeHtml === 'function') return escapeHtml(String(s));
    return String(s).replace(/[&<>"']/g, function(c){
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function chstReducedMotion(){
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  // setTimeout wrapper that registers the id so hideVictoryChest can cancel everything.
  function chstLater(fn, ms){
    var id = setTimeout(fn, ms);
    chstTimers.push(id);
    return id;
  }

  // PURE helper (unit-testable from the console): turn a loot roll + cash reward into the list
  // of { icon, label } chips the chest spits out. Cash first, then materials in MATERIAL_ORDER
  // (unknown/future loot keys are appended at the end with a ❔ icon rather than dropped).
  // loot shape: { chips: {chipId:n}, gold:n, silver:n }. Cash first, then gold/silver, then chips.
  function chestRewardChips(loot, cashReward){
    var chips = [];
    if (typeof cashReward === 'number' && cashReward > 0) chips.push({ icon: '💵', label: '+' + cashReward });
    loot = loot || {};
    if (loot.gold)   chips.push({ icon: '🥇', label: '+' + loot.gold });
    if (loot.silver) chips.push({ icon: '🥈', label: '+' + loot.silver });
    var CH = (typeof CHIPS === 'object' && CHIPS) ? CHIPS : {};
    var order = (typeof CHIP_ORDER !== 'undefined' && CHIP_ORDER.slice) ? CHIP_ORDER.slice() : [];
    var cm = loot.chips || {};
    order.forEach(function(k){ var n = cm[k]; if (n > 0) chips.push({ icon: (CH[k] && CH[k].icon) || '🧩', label: '+' + n }); });
    return chips;
  }

  // The chest itself: a chunky hand-drawn-style inline SVG using the chalkboard design tokens.
  // The lid is a separate <g class="chst-lid"> that chest.css rotates open around a hinge at
  // viewBox point (22,52) when the overlay gains the .chst-open class. The golden glow ellipse
  // sits UNDER the lid and fades in on open.
  function chstChestSvg(){
    return '' +
      '<svg class="chst-svg" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        // treasure glow, revealed when the lid opens
        '<ellipse class="chst-glow" cx="70" cy="52" rx="42" ry="12" fill="var(--yellow)"/>' +
        '<circle class="chst-glow" cx="54" cy="50" r="6" fill="var(--yellow)"/>' +
        '<circle class="chst-glow" cx="72" cy="47" r="7" fill="var(--yellow)"/>' +
        '<circle class="chst-glow" cx="89" cy="50" r="5" fill="var(--yellow)"/>' +
        // chest body
        '<rect x="20" y="52" width="100" height="52" rx="10" fill="var(--wood)" stroke="var(--wood-dark)" stroke-width="4"/>' +
        '<rect x="38" y="54" width="10" height="48" rx="3" fill="var(--wood-dark)" opacity="0.55"/>' +
        '<rect x="92" y="54" width="10" height="48" rx="3" fill="var(--wood-dark)" opacity="0.55"/>' +
        // lock plate + keyhole
        '<rect x="61" y="64" width="18" height="20" rx="5" fill="var(--yellow)" stroke="var(--wood-dark)" stroke-width="3"/>' +
        '<circle cx="70" cy="71" r="3" fill="var(--wood-dark)"/>' +
        '<rect x="68.4" y="72" width="3.2" height="7" rx="1.5" fill="var(--wood-dark)"/>' +
        // the lid (rotated open via CSS)
        '<g class="chst-lid">' +
          '<path d="M 20 52 L 20 38 Q 20 14 70 14 Q 120 14 120 38 L 120 52 Z" fill="var(--wood)" stroke="var(--wood-dark)" stroke-width="4" stroke-linejoin="round"/>' +
          '<rect x="38" y="24" width="10" height="26" rx="3" fill="var(--wood-dark)" opacity="0.55"/>' +
          '<rect x="92" y="24" width="10" height="26" rx="3" fill="var(--wood-dark)" opacity="0.55"/>' +
          '<rect x="16" y="46" width="108" height="9" rx="4.5" fill="var(--wood-dark)"/>' +
          '<rect x="63" y="46" width="14" height="13" rx="4" fill="var(--yellow)" stroke="var(--wood-dark)" stroke-width="3"/>' +
        '</g>' +
      '</svg>';
  }

  // 12 sparkle spans flung outward from the lid on open. Each gets a random-ish direction via
  // CSS custom props (--dx/--dy/--delay) consumed by the chst-spark-fly keyframes in chest.css.
  function chstSpawnSparks(layer){
    if (!layer) return;
    var glyphs = ['✨', '⭐', '✦', '🌟'];
    for (var i = 0; i < 12; i++){
      var s = document.createElement('span');
      s.className = 'chst-spark';
      s.textContent = glyphs[i % glyphs.length];
      var ang = (Math.PI * 2 * i) / 12 + Math.random() * 0.5;
      var dist = 60 + Math.random() * 70;
      s.style.setProperty('--dx', Math.round(Math.cos(ang) * dist) + 'px');
      s.style.setProperty('--dy', Math.round(Math.sin(ang) * dist - 30) + 'px');
      s.style.setProperty('--delay', (Math.random() * 0.15).toFixed(2) + 's');
      layer.appendChild(s);
    }
  }

  // Main entry, called by the battle flow AFTER rewards are credited. loot is a MATERIALS-keyed
  // count map (some keys absent), cashReward a number. Presentation only — see header comment.
  function showVictoryChest(loot, cashReward){
    hideVictoryChest(); // re-entrancy: kill any chest from the previous battle first

    var board = document.querySelector('.board');
    if (!board) return;

    var chips = chestRewardChips(loot, cashReward);
    var chipsHtml = chips.map(function(c){
      return '<span class="chst-chip">' +
               '<span class="chst-chip-icon">' + chstEsc(c.icon) + '</span>' +
               '<span class="chst-chip-label">' + chstEsc(c.label) + '</span>' +
             '</span>';
    }).join('');

    var overlay = document.createElement('div');
    overlay.className = 'chst-overlay';
    overlay.innerHTML =
      '<div class="chst-stage">' +
        '<div class="chst-title">Victory! 🏆</div>' +
        '<div class="chst-chest" role="button" tabindex="0" aria-label="Open the treasure chest">' +
          chstChestSvg() +
          '<div class="chst-spark-layer"></div>' +
        '</div>' +
        '<div class="chst-prompt">Tap to open! 👆</div>' +
        '<div class="chst-chips" aria-live="polite">' + chipsHtml + '</div>' +
        '<button type="button" class="btn btn-primary chst-collect">Collect! ✨</button>' +
      '</div>';

    // One handler covers both phases: any tap opens a closed chest; after opening, only taps on
    // the backdrop (the overlay/stage itself, not chips or buttons) dismiss.
    overlay.addEventListener('click', function(e){
      if (!chstOpened){ chstOpenChest(); return; }
      if (e.target === overlay || (e.target.classList && e.target.classList.contains('chst-stage'))){
        hideVictoryChest();
      }
    });
    // keyboard support: Enter/Space on the focused chest opens it
    var chestEl = overlay.querySelector('.chst-chest');
    if (chestEl){
      chestEl.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
          e.preventDefault();
          chstOpenChest();
        }
      });
    }
    var collectBtn = overlay.querySelector('.chst-collect');
    if (collectBtn){
      collectBtn.addEventListener('click', function(e){
        e.stopPropagation();
        hideVictoryChest();
      });
    }

    chstOverlayEl = overlay;
    chstOpened = false;
    board.appendChild(overlay);
    if (chestEl && chestEl.focus){ try { chestEl.focus({ preventScroll: true }); } catch (err) { /* older browsers */ } }
  }

  // Lid pop + sparkles + staggered chip reveal + collect button + 6s auto-dismiss.
  function chstOpenChest(){
    if (!chstOverlayEl || chstOpened) return;
    chstOpened = true;
    chstOverlayEl.classList.add('chst-open');
    if (typeof playSfx === 'function') playSfx('chest-open');

    var reduced = chstReducedMotion();
    if (!reduced) chstSpawnSparks(chstOverlayEl.querySelector('.chst-spark-layer'));

    var chipEls = chstOverlayEl.querySelectorAll('.chst-chip');
    var collectBtn = chstOverlayEl.querySelector('.chst-collect');
    var showCollect = function(){ if (collectBtn) collectBtn.classList.add('chst-show'); };

    if (reduced){
      // no animation: everything appears at once
      for (var i = 0; i < chipEls.length; i++) chipEls[i].classList.add('chst-in');
      showCollect();
    } else {
      // rewards fly out one by one, then the collect button pops in
      var delay = 350; // let the lid finish popping first
      for (var j = 0; j < chipEls.length; j++){
        (function(elm, d){ chstLater(function(){ elm.classList.add('chst-in'); }, d); })(chipEls[j], delay);
        delay += 280;
      }
      chstLater(showCollect, delay);
    }

    chstLater(hideVictoryChest, 6000); // auto-dismiss ~6s post-open
  }

  // Remove the overlay (if any) and cancel every pending timer. Safe to call at any time,
  // any number of times — showVictoryChest leans on this for re-entrancy.
  function hideVictoryChest(){
    chstTimers.forEach(function(id){ clearTimeout(id); });
    chstTimers = [];
    if (chstOverlayEl && chstOverlayEl.parentNode) chstOverlayEl.parentNode.removeChild(chstOverlayEl);
    chstOverlayEl = null;
    chstOpened = false;
  }
