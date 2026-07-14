  // ============================================================================
  // Story, Astronomy & Codex (Star Log) — Precalculus Odyssey
  // ----------------------------------------------------------------------------
  // Classic script sharing the one global scope (see other js/ modules). Loaded
  // AFTER 09-items.js and BEFORE 05-render.js so render/battle can call into it,
  // and BEFORE 07-main.js which calls initLore() at boot.
  //
  // Three layers per chapter: a STORY beat, a real STAR SYSTEM, and a math band.
  // Chapter 1 ("Balance Quest") is themed as the Sol System — each of its 10
  // rooms is a real Sol body with real, kid-friendly astronomy facts + stylized
  // ("manga-ized") SVG art. Defeating a room's boss (rank 3) recovers a memory
  // fragment: many guardians were never evil — just misidentifying us.
  //
  // Unlocks live in state.codex = { bodies:{room:true}, fragments:{room:true} }
  // (persisted via the 4-place rule in 03-save.js). Only Chapter 1 exists in
  // code today, so unlocks are keyed by the flat room/level number.
  // ============================================================================

  // STORY, BODIES, BODY_ORDER and CHAPTER_LORE now live in game/config/story.config.js
  // + planets.config.js (loaded first). This module keeps the RENDER LOGIC (planet art,
  // codex/atlas/narration views, unlock helpers) that reads those config globals.

  // ---------------------------------------------------------------------------
  // Stylized planet / star art (hand-built SVG, zero external assets)
  // ---------------------------------------------------------------------------
  function planetSVG(room, ctx) {
    var b = BODIES[room];
    if (!b) return '';
    var uid = (b.art || 'p') + '-' + (ctx || 'p');
    var art = PLANET_ART[b.art] || PLANET_ART.moon;
    return '<svg class="planet-art" viewBox="0 0 100 100" role="img" aria-label="' +
      escapeHtmlSafe(b.name) + '">' + art(uid) + '</svg>';
  }

  function starSVG(ctx) {
    var uid = 'sun-' + (ctx || 'p');
    return '<svg class="planet-art star-art" viewBox="0 0 100 100" role="img" aria-label="The Sun">' +
      PLANET_ART.sun(uid) + '</svg>';
  }

  // Each entry returns the inner SVG markup (defs + sphere + features) for a uid.
  var PLANET_ART = {
    _sphere: function(uid, stops, features, opts){
      opts = opts || {};
      var r = opts.r || 37;
      var glow = opts.glow ? '<circle cx="50" cy="50" r="' + (r+9) + '" fill="' + opts.glow + '" opacity="0.22"/>' : '';
      return '<defs>' +
        '<radialGradient id="g-' + uid + '" cx="38%" cy="33%" r="72%">' + stops + '</radialGradient>' +
        '<clipPath id="c-' + uid + '"><circle cx="50" cy="50" r="' + r + '"/></clipPath>' +
        '</defs>' + glow +
        '<circle cx="50" cy="50" r="' + r + '" fill="url(#g-' + uid + ')"/>' +
        '<g clip-path="url(#c-' + uid + ')">' + features + '</g>' +
        '<circle cx="50" cy="50" r="' + r + '" fill="none" stroke="rgba(0,0,0,0.20)" stroke-width="1.3"/>' +
        '<ellipse cx="37" cy="32" rx="12" ry="8" fill="#ffffff" opacity="0.16"/>';
    },
    earth: function(uid){
      return PLANET_ART._sphere(uid,
        '<stop offset="0" stop-color="#a9dcff"/><stop offset="55%" stop-color="#3d84c6"/><stop offset="100%" stop-color="#123a63"/>',
        '<path d="M16 58 Q34 46 52 56 Q62 64 50 74 Q30 82 18 70 Z" fill="#57b45a" opacity="0.92"/>' +
        '<path d="M58 26 Q78 24 84 42 Q74 54 60 48 Q50 38 58 26 Z" fill="#5cbf63" opacity="0.9"/>' +
        '<path d="M40 80 Q54 74 70 82 Q60 90 44 88 Z" fill="#4aa254" opacity="0.85"/>' +
        '<path d="M20 40 Q40 33 60 40" stroke="#ffffff" stroke-width="4" fill="none" opacity="0.32" stroke-linecap="round"/>' +
        '<path d="M52 62 Q68 58 82 64" stroke="#ffffff" stroke-width="3.5" fill="none" opacity="0.28" stroke-linecap="round"/>');
    },
    moon: function(uid){
      return PLANET_ART._sphere(uid,
        '<stop offset="0" stop-color="#efeff2"/><stop offset="55%" stop-color="#b9bac0"/><stop offset="100%" stop-color="#6d6e77"/>',
        '<circle cx="40" cy="42" r="7" fill="#9a9ba3" opacity="0.7"/>' +
        '<circle cx="62" cy="55" r="9" fill="#94959d" opacity="0.65"/>' +
        '<circle cx="55" cy="34" r="4.5" fill="#9a9ba3" opacity="0.7"/>' +
        '<circle cx="34" cy="62" r="5.5" fill="#8f9099" opacity="0.6"/>' +
        '<circle cx="68" cy="38" r="3.5" fill="#9a9ba3" opacity="0.6"/>');
    },
    mars: function(uid){
      return PLANET_ART._sphere(uid,
        '<stop offset="0" stop-color="#f0ab74"/><stop offset="55%" stop-color="#c65a34"/><stop offset="100%" stop-color="#6f2913"/>',
        '<ellipse cx="50" cy="17" rx="15" ry="6" fill="#f5f0ea" opacity="0.85"/>' +
        '<path d="M28 50 Q42 44 52 52 Q46 60 32 58 Z" fill="#8a3315" opacity="0.55"/>' +
        '<path d="M60 62 Q72 58 78 66 Q68 72 58 68 Z" fill="#8a3315" opacity="0.5"/>' +
        '<circle cx="42" cy="66" r="4" fill="#7c2c11" opacity="0.5"/>');
    },
    venus: function(uid){
      return PLANET_ART._sphere(uid,
        '<stop offset="0" stop-color="#fbeec0"/><stop offset="55%" stop-color="#e2b969"/><stop offset="100%" stop-color="#a9772f"/>',
        '<path d="M14 40 Q50 32 86 40" stroke="#d8a856" stroke-width="5" fill="none" opacity="0.5"/>' +
        '<path d="M14 54 Q50 46 86 54" stroke="#c9963f" stroke-width="6" fill="none" opacity="0.45"/>' +
        '<path d="M18 66 Q50 60 82 66" stroke="#d8a856" stroke-width="5" fill="none" opacity="0.4"/>');
    },
    mercury: function(uid){
      return PLANET_ART._sphere(uid,
        '<stop offset="0" stop-color="#d8c7b3"/><stop offset="55%" stop-color="#9c8776"/><stop offset="100%" stop-color="#574a41"/>',
        '<circle cx="44" cy="46" r="8" fill="#7f6f61" opacity="0.55"/>' +
        '<circle cx="62" cy="58" r="6" fill="#7f6f61" opacity="0.5"/>' +
        '<circle cx="56" cy="36" r="4" fill="#8b7a6b" opacity="0.5"/>' +
        '<circle cx="36" cy="60" r="4.5" fill="#77685b" opacity="0.5"/>',
        { r: 32 });
    },
    jupiter: function(uid){
      return PLANET_ART._sphere(uid,
        '<stop offset="0" stop-color="#f6e2c4"/><stop offset="55%" stop-color="#d59a5f"/><stop offset="100%" stop-color="#8f4f27"/>',
        '<path d="M8 34 Q50 28 92 34 L92 42 Q50 36 8 42 Z" fill="#b9773f" opacity="0.5"/>' +
        '<path d="M8 48 Q50 42 92 48 L92 57 Q50 51 8 57 Z" fill="#e6c290" opacity="0.5"/>' +
        '<path d="M8 62 Q50 56 92 62 L92 70 Q50 64 8 70 Z" fill="#a9682f" opacity="0.5"/>' +
        '<ellipse cx="64" cy="58" rx="9" ry="6" fill="#c94f34" opacity="0.8"/>');
    },
    europa: function(uid){
      return PLANET_ART._sphere(uid,
        '<stop offset="0" stop-color="#f6f9ff"/><stop offset="55%" stop-color="#d3e0f2"/><stop offset="100%" stop-color="#9fb4cf"/>',
        '<path d="M14 40 Q50 46 86 38" stroke="#b98a6a" stroke-width="1.6" fill="none" opacity="0.7"/>' +
        '<path d="M16 54 Q50 48 84 58" stroke="#a9694a" stroke-width="1.8" fill="none" opacity="0.65"/>' +
        '<path d="M22 66 Q50 62 78 70" stroke="#b98a6a" stroke-width="1.4" fill="none" opacity="0.6"/>' +
        '<path d="M40 22 L48 78" stroke="#c79a7a" stroke-width="1.2" fill="none" opacity="0.5"/>');
    },
    saturn: function(uid){
      // Ring drawn as a tilted ellipse crossing the sphere (reads clearly as Saturn).
      return '<g transform="rotate(-16 50 50)">' +
        '<ellipse cx="50" cy="50" rx="52" ry="15" fill="none" stroke="#e6cf95" stroke-width="7" opacity="0.85"/>' +
        '<ellipse cx="50" cy="50" rx="52" ry="15" fill="none" stroke="#b99a55" stroke-width="2" opacity="0.7"/>' +
        '</g>' +
        PLANET_ART._sphere(uid,
          '<stop offset="0" stop-color="#f8ecc6"/><stop offset="55%" stop-color="#e0c079"/><stop offset="100%" stop-color="#a2793a"/>',
          '<path d="M12 44 Q50 38 88 44" stroke="#cba85f" stroke-width="4" fill="none" opacity="0.45"/>' +
          '<path d="M16 58 Q50 52 84 58" stroke="#cba85f" stroke-width="4" fill="none" opacity="0.4"/>',
          { r: 30 }) +
        '<g transform="rotate(-16 50 50)"><path d="M2 50 A52 15 0 0 0 98 50" fill="none" stroke="#e6cf95" stroke-width="7" opacity="0.85"/></g>';
    },
    titan: function(uid){
      return PLANET_ART._sphere(uid,
        '<stop offset="0" stop-color="#f6d795"/><stop offset="55%" stop-color="#d68a2f"/><stop offset="100%" stop-color="#7f4713"/>',
        '<path d="M12 46 Q50 40 88 46" stroke="#e6a552" stroke-width="6" fill="none" opacity="0.4"/>' +
        '<path d="M16 60 Q50 55 84 60" stroke="#c07622" stroke-width="6" fill="none" opacity="0.35"/>',
        { glow: '#f0b85a' });
    },
    neptune: function(uid){
      return PLANET_ART._sphere(uid,
        '<stop offset="0" stop-color="#9ec8f5"/><stop offset="55%" stop-color="#2f6fd0"/><stop offset="100%" stop-color="#143d86"/>',
        '<path d="M14 42 Q50 36 86 42" stroke="#bcd8fb" stroke-width="3.5" fill="none" opacity="0.4"/>' +
        '<path d="M16 58 Q50 52 84 58" stroke="#7fb0ee" stroke-width="3" fill="none" opacity="0.35"/>' +
        '<ellipse cx="60" cy="46" rx="9" ry="6" fill="#0f2f6a" opacity="0.7"/>' +
        '<path d="M50 66 Q62 62 74 66" stroke="#ffffff" stroke-width="2.5" fill="none" opacity="0.4"/>');
    },
    sun: function(uid){
      return '<defs><radialGradient id="g-' + uid + '" cx="50%" cy="50%" r="55%">' +
        '<stop offset="0" stop-color="#fff8d4"/><stop offset="45%" stop-color="#ffd24a"/><stop offset="100%" stop-color="#ff8a1e"/>' +
        '</radialGradient></defs>' +
        '<circle cx="50" cy="50" r="46" fill="#ff8a1e" opacity="0.25"/>' +
        '<circle cx="50" cy="50" r="34" fill="url(#g-' + uid + ')"/>' +
        '<circle cx="50" cy="50" r="34" fill="none" stroke="#ffcf5e" stroke-width="1.5" opacity="0.6"/>';
    }
  };

  // Local escape helper (03-save.js defines escapeHtml at boot; guard for load order).
  function escapeHtmlSafe(s){
    if (typeof escapeHtml === 'function') return escapeHtml(String(s));
    return String(s).replace(/[&<>"]/g, function(c){
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c];
    });
  }

  // ---------------------------------------------------------------------------
  // Codex unlock helpers (state.codex, 4-place persisted)
  // ---------------------------------------------------------------------------
  function ensureCodex(){
    if (!state.codex || typeof state.codex !== 'object') state.codex = { bodies: {}, fragments: {} };
    if (!state.codex.bodies) state.codex.bodies = {};
    if (!state.codex.fragments) state.codex.fragments = {};
    return state.codex;
  }
  function unlockBody(room){
    if (!BODIES[room]) return false;
    var c = ensureCodex();
    if (c.bodies[room]) return false;
    c.bodies[room] = true;
    return true;
  }
  function isBodyUnlocked(room){ return !!ensureCodex().bodies[room]; }
  // Returns the fragment object when it exists (and marks it unlocked); null otherwise.
  function unlockMemoryFragment(room){
    var lore = CHAPTER_LORE['balance-quest'];
    var frag = lore && lore.memoryFragments[room];
    if (!frag) return null;
    ensureCodex().fragments[room] = true;
    return frag;
  }
  function isFragmentUnlocked(room){ return !!ensureCodex().fragments[room]; }

  // ---------------------------------------------------------------------------
  // Astronomy card (slim panel at the top of the equation view)
  // ---------------------------------------------------------------------------
  // Map a curriculum body name to one of the hand-drawn Sol arts (else a generic disc).
  var _ARTBYNAME = { 'Earth':'earth','The Moon':'moon','Mars':'mars','Venus':'venus','Mercury':'mercury','Jupiter':'jupiter','Europa':'europa','Saturn':'saturn','Titan':'titan','Neptune':'neptune' };
  function _astroDisc(name, ctx){
    // A simple animated disc, tinted deterministically from the name (for bodies with no art).
    var h = 0; for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
    var c1 = 'hsl(' + h + ',60%,62%)', c2 = 'hsl(' + ((h + 40) % 360) + ',55%,38%)';
    var gid = 'ad' + ctx;
    return '<svg class="planet-art" viewBox="0 0 100 100"><defs><radialGradient id="' + gid + '" cx="38%" cy="35%">' +
      '<stop offset="0%" stop-color="' + c1 + '"/><stop offset="100%" stop-color="' + c2 + '"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="42" fill="url(#' + gid + ')"/></svg>';
  }
  function updateAstroCard(){
    if (!el.astroCard) return;
    // Hidden during arena play (user preference) — the planet name + system already show in the top
    // stat tile, and full astronomy lives in the Star Atlas "About this planet". Body is still
    // unlocked below so the codex/atlas fills in. To re-enable the in-arena card, remove this block.
    el.astroCard.hidden = true; el.astroCard.innerHTML = '';
    var _ar = (typeof getArena === 'function') ? getArena(state.level) : null;
    if (_ar && typeof unlockBody === 'function') { try { unlockBody(state.level); } catch (e) {} }
    return;
    /* eslint-disable no-unreachable */
    var arena = (typeof getArena === 'function') ? getArena(state.level) : null;
    if (!arena || !arena.body) { el.astroCard.innerHTML = ''; el.astroCard.hidden = true; return; }
    var b = arena.body;
    if (typeof unlockBody === 'function') { try { unlockBody(state.level); } catch (e) {} }
    var art = (typeof bodyArtSVG === 'function')
      ? bodyArtSVG(b, 'astro' + state.level, (typeof ASTRO !== 'undefined' ? ASTRO[state.level] : null))
      : (_ARTBYNAME[b.name] ? planetSVG(_ARTBYNAME[b.name], 'astro') : _astroDisc(b.name, 'astro'));
    var sys = (typeof STAR_SYSTEMS !== 'undefined') ? STAR_SYSTEMS.filter(function(s){ return s.id === arena.systemId; })[0] : null;
    el.astroCard.hidden = false;
    el.astroCard.innerHTML =
      '<div class="astro-art">' + art + '</div>' +
      '<div class="astro-info">' +
        '<div class="astro-name">' + escapeHtmlSafe(b.name) +
          ' <span class="astro-kind">' + escapeHtmlSafe(b.kind) + (b.real ? '' : ' · imagined') + '</span></div>' +
        '<div class="astro-facts">' +
          '<span>' + escapeHtmlSafe(b.fact || '') + '</span>' +
          (sys ? '<span>System: <b>' + escapeHtmlSafe(sys.name) + '</b></span>' : '') +
        '</div>' +
      '</div>' +
      '<button type="button" class="astro-more" onclick="openCodex(\'atlas\')" title="Open the Star Atlas">Star Log →</button>';
  }

  // ---------------------------------------------------------------------------
  // Codex / Star Log view
  // ---------------------------------------------------------------------------
  var currentCodexTab = 'story';
  var loreReturnView = null;

  function openCodex(tab){
    var active = document.querySelector('.view-container.active');
    loreReturnView = active || el.equationView;
    el.equationView.classList.remove('active');
    if (el.shopView) el.shopView.classList.remove('active');
    if (el.battleView) el.battleView.classList.remove('active');
    if (el.codexView) el.codexView.classList.add('active');
    setCodexTab(typeof tab === 'string' ? tab : currentCodexTab);
    if (typeof playMusic === 'function') playMusic('shop');
  }
  function closeCodex(){
    if (el.codexView) el.codexView.classList.remove('active');
    (loreReturnView || el.equationView).classList.add('active');
    loreReturnView = null;
    if (typeof playMusic === 'function') playMusic('practice');
  }
  function setCodexTab(tab){
    currentCodexTab = (tab === 'atlas') ? 'atlas' : 'story';
    document.querySelectorAll('.codex-tab').forEach(function(btn){
      btn.classList.toggle('active', btn.getAttribute('data-tab') === currentCodexTab);
    });
    renderCodex(currentCodexTab);
  }
  function renderCodex(tab){
    if (!el.codexBody) return;
    el.codexBody.innerHTML = (tab === 'atlas') ? renderStarAtlas() : renderStoryTab();
  }

  function renderStoryTab(){
    var lore = CHAPTER_LORE['balance-quest'];
    var html = '';
    html += '<section class="codex-section">' +
      '<h3 class="codex-h">The Story So Far</h3>' +
      '<p class="codex-lead">' + STORY.openingNarration.slice(0, 5).map(escapeHtmlSafe).join('<br><br>') + '</p>' +
      '<button type="button" class="btn btn-ghost codex-replay" onclick="showOpeningNarration()">▶ Replay full intro</button>' +
      '</section>';

    html += '<section class="codex-section">' +
      '<h3 class="codex-h">Chapter 1 — ' + escapeHtmlSafe(lore.storyTitle) + '</h3>' +
      '<p class="codex-text">' + escapeHtmlSafe(lore.intro) + '</p>' +
      '<p class="codex-hook">' + escapeHtmlSafe(lore.hook) + '</p>' +
      '</section>';

    var frags = BODY_ORDER.map(function(room){
      var frag = lore.memoryFragments[room];
      var unlocked = isFragmentUnlocked(room);
      if (unlocked){
        return '<div class="frag-card unlocked">' +
          '<div class="frag-title">' + escapeHtmlSafe(frag.title) + '</div>' +
          '<div class="frag-boss">Recovered from ' + escapeHtmlSafe(frag.boss) + ' · ' + escapeHtmlSafe(BODIES[room].name) + '</div>' +
          '<div class="frag-text">' + escapeHtmlSafe(frag.text) + '</div>' +
          '</div>';
      }
      return '<div class="frag-card locked">' +
        '<div class="frag-title">🔒 Sealed Memory</div>' +
        '<div class="frag-boss">Defeat the boss of Arena ' + room + ' (' + escapeHtmlSafe(BODIES[room].name) + ') to recover it.</div>' +
        '</div>';
    }).join('');

    var count = BODY_ORDER.filter(isFragmentUnlocked).length;
    html += '<section class="codex-section">' +
      '<h3 class="codex-h">Memory Fragments <span class="codex-count">' + count + ' / ' + BODY_ORDER.length + '</span></h3>' +
      '<p class="codex-sub">Every boss looks like an enemy — until you solve enough to hear its memory. Many guardians were never evil.</p>' +
      '<div class="frag-grid">' + frags + '</div>' +
      '</section>';
    return html;
  }

  function renderStarAtlas(){
    var html = '';
    html += '<section class="codex-section atlas-star">' +
      '<div class="atlas-star-art">' + starSVG('atlas') + '</div>' +
      '<div class="atlas-star-info">' +
        '<h3 class="codex-h">The Sun</h3>' +
        '<p class="codex-text">The star at the heart of the Sol System — our home system. It holds 99.8% of all the mass around it, and every planet in Chapter 1 orbits it.</p>' +
        '<div class="astro-facts"><span>Type: <b>Yellow dwarf star</b></span><span>Surface: <b>about 5,500°C</b></span><span>Age: <b>4.6 billion years</b></span></div>' +
      '</div></section>';

    var unlockedCount = BODY_ORDER.filter(isBodyUnlocked).length;
    html += '<h3 class="codex-h">Planets of the Sol System <span class="codex-count">' + unlockedCount + ' / ' + BODY_ORDER.length + ' visited</span></h3>';
    html += '<div class="atlas-grid">';
    html += BODY_ORDER.map(function(room){
      var b = BODIES[room];
      if (!isBodyUnlocked(room)){
        return '<div class="atlas-card locked"><div class="atlas-art dim">' + planetSVG(room, 'atlas' + room) + '</div>' +
          '<div class="atlas-name">🔒 Arena ' + room + '</div>' +
          '<div class="atlas-kind">Reach this planet to chart it</div></div>';
      }
      var factsHtml = b.facts.map(function(f){
        return '<li><span>' + escapeHtmlSafe(f[0]) + '</span><b>' + escapeHtmlSafe(f[1]) + '</b></li>';
      }).join('');
      return '<div class="atlas-card unlocked" style="--astro-accent:' + b.accent + '">' +
        '<div class="atlas-art">' + planetSVG(room, 'atlas' + room) + '</div>' +
        '<div class="atlas-name">' + escapeHtmlSafe(b.name) + '</div>' +
        '<div class="atlas-kind">' + escapeHtmlSafe(b.kind) + '</div>' +
        '<div class="atlas-blurb">' + escapeHtmlSafe(b.blurb) + '</div>' +
        '<ul class="atlas-facts">' + factsHtml + '</ul>' +
        '<div class="atlas-fun">✨ ' + escapeHtmlSafe(b.fun) + '</div>' +
        '</div>';
    }).join('');
    html += '</div>';
    return html;
  }

  // ---------------------------------------------------------------------------
  // Opening narration overlay (skippable star-field crawl for new players)
  // ---------------------------------------------------------------------------
  function showOpeningNarration(){
    if (!el.narrationOverlay || !el.narrationText) return;
    el.narrationText.innerHTML = STORY.openingNarration.map(function(p, i){
      var cls = (i === STORY.openingNarration.length - 1) ? 'narration-p narration-final' : 'narration-p';
      return '<p class="' + cls + '">' + escapeHtmlSafe(p) + '</p>';
    }).join('');
    el.narrationOverlay.hidden = false;
    if (typeof playMusic === 'function') playMusic('practice');
  }
  function hideOpeningNarration(){
    if (el.narrationOverlay) el.narrationOverlay.hidden = true;
  }

  // ---------------------------------------------------------------------------
  // Boot wiring (called from 07-main.js)
  // ---------------------------------------------------------------------------
  // A brief "arriving at a new planet" splash: the planet zooms in over a star-field,
  // naming the planet + its star system. Fired on advance / travel / worm-hole (not on
  // every problem). Skippable by click; auto-dismisses.
  function showPlanetArrival(level){
    // Prefer the 187-arena curriculum (getArena) — the real body for THIS arena. Fall back to the
    // legacy Sol chapter/BODIES map only if the curriculum isn't loaded. (The old path indexed
    // BODIES by room-in-chapter, so e.g. arena 119 wrongly showed Saturn.)
    var arena = (typeof getArena === 'function') ? getArena(level) : null;
    var b, system, artHtml;
    if (arena && arena.body) {
      b = arena.body;
      var sys = (typeof STAR_SYSTEMS !== 'undefined')
        ? STAR_SYSTEMS.filter(function(s){ return s.id === arena.systemId; })[0] : null;
      system = (sys && (sys.name || sys.title)) || 'the galaxy';
      artHtml = (typeof bodyArtSVG === 'function')
        ? bodyArtSVG(b, 'arrival', (typeof ASTRO !== 'undefined' ? ASTRO[level] : null))
        : planetSVG(b.art || 'moon', 'arrival');
    } else {
      if (typeof getChapterForLevel !== 'function') return;
      var loc = getChapterForLevel(level);
      b = BODIES[loc.roomInChapter];
      if (!b) return;
      system = (loc.chapter && loc.chapter.system) || 'the Sol System';
      artHtml = planetSVG(loc.roomInChapter, 'arrival');
    }
    var board = document.querySelector('.board');
    if (!board) return;
    var prev = document.getElementById('planetArrival'); if (prev) prev.remove();
    var ov = document.createElement('div');
    ov.id = 'planetArrival';
    ov.className = 'planet-arrival';
    ov.style.setProperty('--pa-accent', b.accent || '#6ec1e4');
    ov.innerHTML =
      '<div class="pa-stars" aria-hidden="true"></div>' +
      '<div class="pa-inner">' +
        '<div class="pa-kicker">✦ Now entering ✦</div>' +
        '<div class="pa-art">' + artHtml + '</div>' +
        '<div class="pa-planet">Arena ' + level + ' · ' + escapeHtmlSafe(b.name) + '</div>' +
        '<div class="pa-kind">' + escapeHtmlSafe(b.kind || '') + '</div>' +
        '<div class="pa-system">★ ' + escapeHtmlSafe(system) + '</div>' +
      '</div>';
    board.appendChild(ov);
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var remove = function(){ if (!ov.parentNode) return; ov.classList.add('pa-out'); setTimeout(function(){ if (ov.parentNode) ov.remove(); }, 420); };
    ov.addEventListener('click', remove);
    setTimeout(remove, reduce ? 1000 : 2400);
  }

  function initLore(){
    ensureCodex();
    // Header + view controls use inline onclick in index.html; nothing required here
    // beyond making sure the codex state exists. Kept as a hook for future wiring.
  }
