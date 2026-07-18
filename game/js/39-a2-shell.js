  // ============================================================================
  // Wonderland arcade — wave 2 (module 39): the SHARED A2 shell only. Split
  // 2026-07-18 out of the old single 39-puzzles.js for maintainability — the
  // actual games now live in their own sibling files, all built on this shell:
  //   📦 Cargo Bay + ❄️ Glacier Push (Sokoban)  — 39b-cargo-glacier.js
  //   🏯 Forbidden City (Shikinjou)              — 39c-forbidden-city.js
  //   🔗 Circuit Loop (tile connect)             — 39d-circuit-loop.js
  //   🗼 Sky Stacker (timing/stack)               — 39e-sky-stacker.js
  // This file (39) MUST load before all four — classic script, global scope,
  // so it just needs to precede them in index.html, which it does numerically.
  // Every game above is entered through wonderPlay() (1 Wonderland Pass) and
  // pays a gold chest of materials scaled by performance.
  // ============================================================================

  var A2 = { raf: 0, timers: [], kd: null, ku: null };

  function a2StopAll(){
    if (A2.raf){ cancelAnimationFrame(A2.raf); A2.raf = 0; }
    for (var i = 0; i < A2.timers.length; i++){ clearTimeout(A2.timers[i]); clearInterval(A2.timers[i]); }
    A2.timers = [];
    if (A2.kd){ document.removeEventListener('keydown', A2.kd); A2.kd = null; }
    if (A2.ku){ document.removeEventListener('keyup', A2.ku); A2.ku = null; }
    if (typeof a2DragCancel === 'function') a2DragCancel();
  }
  function a2Later(fn, ms){ var id = setTimeout(fn, ms); A2.timers.push(id); return id; }
  function a2Every(fn, ms){ var id = setInterval(fn, ms); A2.timers.push(id); return id; }
  function a2Keys(kd, ku){
    if (A2.kd) document.removeEventListener('keydown', A2.kd);
    if (A2.ku) document.removeEventListener('keyup', A2.ku);
    A2.kd = kd || null; A2.ku = ku || null;
    if (kd) document.addEventListener('keydown', kd);
    if (ku) document.addEventListener('keyup', ku);
  }
  function a2View(){ return document.getElementById('wonderlandView'); }
  function a2Active(){ var v = a2View(); return !!(v && v.classList.contains('active')); }

  // Small "⌨️ Controls: …" badge so keyboard shortcuts are always visible near the HUD.
  function a2KeyLegend(text){ return '<div class="a2-keylegend">⌨️ ' + text + '</div>'; }

  // ---- Shared POINTER-based drag-and-drop --------------------------------------------------
  // Native HTML5 draggable/ondragstart/ondrop does NOT fire on touch devices — that's why
  // pieces felt "not draggable" before. Pointer events unify mouse, touch and pen, so this
  // works everywhere. One drag at a time; onDrop(el, payload) receives the element under the
  // pointer at release (matched via [data-dropzone]) and whatever payload a2DragStart was given.
  // onHover(dz|null) is an OPTIONAL per-game preview hook, called every pointer move with the
  // dropzone under the cursor (or null when off any zone / on release). Games whose dragged piece
  // spans MORE than the single cell under the pointer (Block Forge) use it to highlight the piece's
  // full multi-cell footprint, so the drop preview matches the size of the block being dragged.
  var A2_DRAG = { ghost: null, payload: null, onDrop: null, onHover: null };
  function a2DragStart(e, payload, ghostHtml, onDrop, onHover){
    if (e.cancelable) e.preventDefault();
    a2DragCancel();
    var g = document.createElement('div');
    g.className = 'a2-drag-ghost';
    g.innerHTML = ghostHtml;
    document.body.appendChild(g);
    A2_DRAG.ghost = g; A2_DRAG.payload = payload; A2_DRAG.onDrop = onDrop; A2_DRAG.onHover = onHover || null;
    _a2DragMove(e);
    document.addEventListener('pointermove', _a2DragMove);
    document.addEventListener('pointerup', _a2DragEnd);
    document.addEventListener('pointercancel', _a2DragEnd);
  }
  function _a2DragMove(e){
    if (!A2_DRAG.ghost) return;
    A2_DRAG.ghost.style.left = e.clientX + 'px';
    A2_DRAG.ghost.style.top = e.clientY + 'px';
    var el = document.elementFromPoint(e.clientX, e.clientY);
    var dz = el && el.closest ? el.closest('[data-dropzone]') : null;
    var prev = document.querySelector('.a2-drop-hover');
    if (prev && prev !== dz) prev.classList.remove('a2-drop-hover');
    if (dz) dz.classList.add('a2-drop-hover');
    if (A2_DRAG.onHover) A2_DRAG.onHover(dz);
  }
  function _a2DragEnd(e){
    document.removeEventListener('pointermove', _a2DragMove);
    document.removeEventListener('pointerup', _a2DragEnd);
    document.removeEventListener('pointercancel', _a2DragEnd);
    var el = document.elementFromPoint(e.clientX, e.clientY);
    var dz = el && el.closest ? el.closest('[data-dropzone]') : null;
    var payload = A2_DRAG.payload, onDrop = A2_DRAG.onDrop;
    a2DragCancel();
    if (dz && onDrop) onDrop(dz, payload);
  }
  function a2DragCancel(){
    if (A2_DRAG.ghost && A2_DRAG.ghost.parentNode) A2_DRAG.ghost.parentNode.removeChild(A2_DRAG.ghost);
    A2_DRAG.ghost = null;
    var prev = document.querySelector('.a2-drop-hover'); if (prev) prev.classList.remove('a2-drop-hover');
    if (A2_DRAG.onHover) A2_DRAG.onHover(null);              // let the game wipe its footprint preview
    A2_DRAG.payload = null; A2_DRAG.onDrop = null; A2_DRAG.onHover = null;
    document.removeEventListener('pointermove', _a2DragMove);
    document.removeEventListener('pointerup', _a2DragEnd);
    document.removeEventListener('pointercancel', _a2DragEnd);
  }

  // Standard game screen: topbar + body (+ tip line).
  function a2Shell(title, quitFn, bodyHtml, tip){
    if (typeof wgStopAll === 'function') wgStopAll();
    var v = a2View(); if (!v) return null;
    document.querySelectorAll('.view-container').forEach(function(x){ x.classList.remove('active'); });
    v.classList.add('active');
    v.innerHTML = '<div class="wond-board wond-game">' +
      (typeof agTopBar === 'function' ? agTopBar(title, quitFn) : '') +
      bodyHtml +
      (tip ? '<p class="wond-tip">' + tip + '</p>' : '') +
    '</div>';
    return v;
  }

  // Pay out for a finished run. frac 0..1 = performance; >=0.5 opens the gold chest overlay.
  function a2Reward(frac){
    frac = Math.max(0, Math.min(1, frac || 0));
    var loot = { gold: Math.round(1 + 3 * frac), silver: Math.round(2 + 4 * frac),
                 chips: (frac >= 0.99) ? { cpu: 1, energy_core: 2 } : { energy_core: 1 } };
    var arena = (typeof state === 'object' && state) ? (state.level || 1) : 1;
    var cash = (typeof BAL !== 'undefined') ? BAL.wonderCash(arena, frac) : Math.round(20 + 80 * frac);
    if (typeof state === 'object' && state) state.coins = (state.coins || 0) + cash;
    if (typeof addMaterials === 'function') addMaterials(loot);
    if (typeof updateStats === 'function') updateStats();
    if (typeof saveGame === 'function') saveGame();
    if (frac >= 0.5 && typeof showVictoryChest === 'function') showVictoryChest(loot, cash);
    else if (typeof showToast === 'function') showToast('🎁 Prize: 💵' + cash + ' + materials — win for the gold chest!');
    return { loot: loot, cash: cash };
  }

  // Standard result screen. replayName = global launcher name (charged via wonderPlay).
  // `replayName` is that game's own FREE welcome-screen opener (gameWelcome-based) — calling it
  // directly (not through wonderPlay) means "Play Again" never double-charges; the pass is only
  // spent when the player clicks Play on the welcome screen itself. Every a2Result caller's
  // openX() must be a welcome screen for this to be correct — see docs/world-and-hubs.md.
  function a2Result(title, headline, detailHtml, frac, replayName){
    a2StopAll();
    var v = a2View(); if (!v) return;
    v.innerHTML = '<div class="wond-board">' +
      '<div class="wond-head"><h2 class="wond-title">' + headline + '</h2>' +
      '<p class="wond-sub">' + title + '</p></div>' +
      '<div class="wond-result-card"><div class="wond-result-label">' + detailHtml + '</div></div>' +
      '<div class="wond-footer">' +
        '<button type="button" class="btn btn-primary" onclick="' + replayName + '()">↻ Play Again</button>' +
        '<button type="button" class="btn btn-ghost" onclick="openWonderland()">← Lobby</button>' +
      '</div></div>';
    a2Reward(frac);
  }

