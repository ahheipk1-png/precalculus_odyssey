// ---------------------------------------------------------------------------
// Global cursor-following tooltip system (Phase 4).
// One reusable #gameTooltip element for the WHOLE game. Any element with a
// `data-tooltip="..."` attribute gets an explaining tooltip that follows the
// cursor (mouse), appears near the element on keyboard focus, and shows on a
// touch long-press. It also AUTO-UPGRADES existing native `title="..."`
// attributes: on first hover/focus the title is moved into data-tooltip and the
// title removed, so the browser's own (unstyled, non-following) tooltip never
// shows and every existing tooltip in the game gets the nicer treatment for free.
//
// Text is rendered with textContent (escaped) by default. For trusted rich
// markup, use `data-tooltip-html="1"` alongside data-tooltip.
// ---------------------------------------------------------------------------
(function setupGlobalTooltip(){
  if (window.__gameTooltipReady) return;
  window.__gameTooltipReady = true;

  var OFFSET_X = 14, OFFSET_Y = 18;   // cursor -> tooltip corner
  var MARGIN = 8;                     // keep this far from the viewport edge
  var SHOW_DELAY = 320;               // ms before the tooltip appears
  var TOUCH_HIDE = 2600;              // ms a touch-triggered tooltip stays up

  var tip = document.getElementById('gameTooltip');
  if (!tip){
    tip = document.createElement('div');
    tip.id = 'gameTooltip';
    tip.className = 'game-tooltip';
    tip.setAttribute('role', 'tooltip');
    tip.setAttribute('aria-hidden', 'true');
    tip.hidden = true;
    (document.body || document.documentElement).appendChild(tip);
  }

  var current = null;        // the element whose tooltip is showing/pending
  var showTimer = null;
  var touchTimer = null;
  var lastX = 0, lastY = 0;  // last known pointer position

  // Pull the tooltip text for an element, upgrading a native title on the way.
  function textFor(node){
    if (!node || node.nodeType !== 1) return null;
    var t = node.getAttribute('data-tooltip');
    if (t == null){
      var title = node.getAttribute('title');
      if (title && title.trim()){
        t = title;
        node.setAttribute('data-tooltip', title);   // upgrade + suppress native
        node.removeAttribute('title');
      }
    }
    return (t && String(t).trim()) ? t : null;
  }

  // Nearest ancestor (incl. self) that carries a tooltip source.
  function resolveTarget(node){
    for (var n = node; n && n !== document; n = n.parentNode){
      if (n.nodeType !== 1) continue;
      if (n.hasAttribute && (n.hasAttribute('data-tooltip') ||
          (n.hasAttribute('title') && n.getAttribute('title').trim()))){
        return n;
      }
    }
    return null;
  }

  function fill(node){
    var txt = textFor(node);
    if (!txt) return false;
    if (node.getAttribute('data-tooltip-html') === '1'){ tip.innerHTML = txt; }
    else { tip.textContent = txt; }
    return true;
  }

  function place(x, y){
    // Measure, then clamp inside the viewport (flip to the other side if needed).
    var r = tip.getBoundingClientRect();
    var vw = window.innerWidth, vh = window.innerHeight;
    var px = x + OFFSET_X, py = y + OFFSET_Y;
    if (px + r.width + MARGIN > vw) px = x - OFFSET_X - r.width;   // flip left
    if (px < MARGIN) px = MARGIN;
    if (py + r.height + MARGIN > vh) py = y - OFFSET_Y - r.height; // flip up
    if (py < MARGIN) py = MARGIN;
    tip.style.left = Math.round(px) + 'px';
    tip.style.top = Math.round(py) + 'px';
  }

  function reveal(){
    tip.hidden = false;
    tip.setAttribute('aria-hidden', 'false');
    tip.classList.add('visible');
  }

  function hide(){
    if (showTimer){ clearTimeout(showTimer); showTimer = null; }
    if (touchTimer){ clearTimeout(touchTimer); touchTimer = null; }
    current = null;
    tip.classList.remove('visible');
    tip.setAttribute('aria-hidden', 'true');
    tip.hidden = true;
  }

  // Schedule showing for `node`, positioned at (x,y) — or near the element rect
  // when there's no pointer (keyboard focus).
  function schedule(node, x, y, atRect){
    if (showTimer){ clearTimeout(showTimer); showTimer = null; }
    current = node;
    showTimer = setTimeout(function(){
      showTimer = null;
      if (current !== node || !node.isConnected){ return; }
      if (!fill(node)) return;
      reveal();
      if (atRect){
        var b = node.getBoundingClientRect();
        place(b.left + b.width / 2, b.bottom + 2);
      } else {
        place(x, y);
      }
    }, SHOW_DELAY);
  }

  // ---- Mouse ---------------------------------------------------------------
  document.addEventListener('mouseover', function(e){
    var node = resolveTarget(e.target);
    if (!node){ return; }
    if (node === current){ return; }
    lastX = e.clientX; lastY = e.clientY;
    schedule(node, e.clientX, e.clientY, false);
  }, true);

  document.addEventListener('mousemove', function(e){
    lastX = e.clientX; lastY = e.clientY;
    if (!current) return;
    if (!tip.hidden){ place(e.clientX, e.clientY); }
  }, true);

  document.addEventListener('mouseout', function(e){
    if (!current) return;
    // Hide when leaving the current target (and not entering a child of it).
    var to = e.relatedTarget;
    if (to && current.contains && current.contains(to)) return;
    hide();
  }, true);

  // ---- Keyboard focus ------------------------------------------------------
  document.addEventListener('focusin', function(e){
    var node = resolveTarget(e.target);
    if (!node) return;
    schedule(node, 0, 0, true);
  });
  document.addEventListener('focusout', function(){ hide(); });

  // ---- Touch (long-press / tap) -------------------------------------------
  document.addEventListener('touchstart', function(e){
    var node = resolveTarget(e.target);
    if (!node){ hide(); return; }
    var t = e.touches && e.touches[0];
    if (!t) return;
    schedule(node, t.clientX, t.clientY, false);
    if (touchTimer) clearTimeout(touchTimer);
    touchTimer = setTimeout(hide, SHOW_DELAY + TOUCH_HIDE);
  }, { passive: true });

  // ---- Global safety: hide on scroll / escape / page hide ------------------
  window.addEventListener('scroll', hide, true);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') hide(); });
  window.addEventListener('blur', hide);

  // Expose a tiny API so other code can add tooltips programmatically.
  window.GameTooltip = {
    set: function(node, text){ if (node) { node.setAttribute('data-tooltip', text); node.removeAttribute('title'); } },
    hide: hide
  };
})();
