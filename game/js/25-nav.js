  // ============================================================================
  // Navigation: the Star Atlas (#starAtlasView) — star systems → planets drill-
  // down, reusing STAR_SYSTEMS (config) + BODIES/planetSVG (14-lore). Plus
  // goToEarth() (global "Back to Earth" with a combat-retreat confirm). Reachable
  // from the 🪐 Atlas / 🌍 Earth header buttons.
  // ============================================================================
  var _atlasSystem = null;
  var _atlasFromArena = false;   // opened via the Planet tile while playing a planet arena?
  var _atlasReturnView = null;   // the view to restore on "← Back to Planet"

  function openStarAtlas(fromArena){
    _atlasFromArena = !!fromArena;
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    var av = document.getElementById('starAtlasView');
    if (av) av.classList.add('active');
    renderStarAtlas();
    if (typeof playMusic === 'function') playMusic('shop');
  }
  function closeStarAtlas(){
    var av = document.getElementById('starAtlasView');
    if (av) av.classList.remove('active');
    goToEarth(true);
  }

  function _currentSystemId(){
    // The player's current star system = the system hosting their arena (curriculum).
    if (typeof getArena === 'function'){
      var a = getArena(state.level);
      if (a && a.systemId) return a.systemId;
    }
    if (typeof getChapterForLevel === 'function'){
      var ch = getChapterForLevel(state.level).chapter;
      var s = (typeof STAR_SYSTEMS !== 'undefined') ? STAR_SYSTEMS.filter(function(x){ return x.chapterId === ch.id; })[0] : null;
      return s ? s.id : 'sol';
    }
    return 'sol';
  }

  function renderStarAtlas(){
    var av = document.getElementById('starAtlasView');
    if (!av) return;
    if (_atlasSystem){ av.innerHTML = _atlasPlanetsHtml(_atlasSystem); return; }
    var cur = _currentSystemId();
    // TEST MODE (admin) unlocks every star system so the tester can browse them all.
    var testUnlockAll = !!state.testMode;
    // Hidden systems (Galaxy Center) only appear once galaxyUnlocked() — all 65 arenas perfect, or admin.
    var galaxyOn = (typeof galaxyUnlocked === 'function') && galaxyUnlocked();
    var cards = (typeof STAR_SYSTEMS !== 'undefined' ? STAR_SYSTEMS : []).filter(function(s){
      return !s.hidden || galaxyOn;
    }).map(function(s){
      var here = s.id === cur;
      var unlocked = s.unlocked || testUnlockAll || (s.hidden && galaxyOn);
      var star = (typeof starSVG === 'function' && s.id === 'sol') ? starSVG('atlas-' + s.id) : '<div class="atlas-star-dot" style="background:radial-gradient(circle,#fff,#ffb347)"></div>';
      // Maths topic (world title) + arena range for this system, e.g. "Numbers · Arena 1–24".
      // Math theme for this system, from `chapters` (worlds.config.js) — the old MATH_WORLDS global
      // this referenced never existed, so the topic label was always empty.
      var world = (typeof chapters !== 'undefined') ? chapters.filter(function(c){ return c.worldId === s.worldId; })[0] : null;
      var topic = world ? world.subtitle : '';
      var range = (s.arenaStart != null) ? ('Arena ' + s.arenaStart + '–' + s.arenaEnd) : '';
      return '<div class="atlas-sys ' + (unlocked ? 'unlocked' : 'locked') + (here ? ' here' : '') + '"' +
        (unlocked ? ' onclick="atlasOpenSystem(\'' + s.id + '\')"' : '') + '>' +
        '<div class="atlas-sys-star">' + star + '</div>' +
        '<div class="atlas-sys-name">' + s.name + (here ? ' <span class="atlas-here">◉ you are here</span>' : '') + '</div>' +
        '<div class="atlas-sys-topic">📚 ' + topic + (topic && range ? ' · ' : '') + range + '</div>' +
        '<div class="atlas-sys-meta">' + (s.distanceLy != null ? ('📏 ' + s.distanceLy + ' ly · ') : '') + '🪐 ' + s.planets + ' planets</div>' +
        '<div class="atlas-sys-star-name">⭐ ' + s.star + '</div>' +
        '<div class="atlas-sys-fact">' + s.fact + '</div>' +
        '<div class="atlas-sys-status">' + (s.unlocked ? '✅ Travelable' : (testUnlockAll ? '🔓 Test-mode preview (not charted yet)' : '🔒 Unlocks in a future chapter')) + '</div>' +
      '</div>';
    }).join('');
    av.innerHTML =
      '<div class="rpg-header"><h2 class="rpg-title">🪐 Star Atlas</h2>' +
      '<button class="btn btn-ghost" onclick="goToEarth(true)">← Back to Earth</button></div>' +
      '<p class="atlas-intro">The nearby universe. Travel to a star system, then choose a planet to solve on. Only the Sol System is charted so far.</p>' +
      '<div class="atlas-sys-grid">' + cards + '</div>';
  }

  function atlasOpenSystem(id){ _atlasSystem = id; renderStarAtlas(); }
  function atlasBackToSystems(){ _atlasSystem = null; renderStarAtlas(); }

  // Open the Star Atlas straight to the current planet's star-system page (its planet list + facts) —
  // used by the Planet stat tile so a tap shows "where am I" info without hunting through the atlas.
  function openPlanetInfo(){
    _atlasReturnView = document.querySelector('.view-container.active') || (typeof el !== 'undefined' ? el.equationView : null);
    _atlasSystem = _currentSystemId();
    openStarAtlas(true);
  }

  // Return from the atlas straight back to the planet arena the player was in (no re-travel).
  function atlasBackToPlanet(){
    _atlasFromArena = false;
    var av = document.getElementById('starAtlasView'); if (av) av.classList.remove('active');
    document.querySelectorAll('.view-container.active').forEach(function(v){ v.classList.remove('active'); });
    var back = _atlasReturnView || (typeof el !== 'undefined' ? el.equationView : null);
    if (back) back.classList.add('active');
    _atlasReturnView = null;
    if (typeof playMusic === 'function') playMusic('practice');
  }

  function _atlasPlanetsHtml(sysId){
    var sys = (typeof STAR_SYSTEMS !== 'undefined') ? STAR_SYSTEMS.filter(function(x){ return x.id === sysId; })[0] : null;
    var name = sys ? sys.name : sysId;
    // If the player opened this from a planet arena, the header button returns them to that planet
    // (rather than to the systems list) — "back to planet" navigation.
    var curArena = (typeof getArena === 'function') ? getArena(state.level) : null;
    var backBtn = _atlasFromArena
      ? '<button class="btn btn-ghost" onclick="atlasBackToPlanet()">← Back to Arena ' + state.level +
          ((curArena && curArena.body) ? ' · ' + curArena.body.name : '') + '</button>'
      : '<button class="btn btn-ghost" onclick="atlasBackToSystems()">← All systems</button>';
    var html = '<div class="rpg-header"><h2 class="rpg-title">🪐 ' + name + '</h2>' + backBtn + '</div>';
    var arenas = (typeof arenasForSystem === 'function') ? arenasForSystem(sysId) : [];
    if (!arenas.length){
      return html + '<p class="atlas-intro">This system is not charted yet.</p>';
    }
    if (sys && sys.superEarth) html += '<p class="atlas-intro">⭐ ' + name + ' — ' + sys.fact + ' Highlight: <b>' + sys.superEarth + '</b>.</p>';
    else if (sys) html += '<p class="atlas-intro">⭐ ' + name + ' — ' + sys.fact + '</p>';
    html += '<div class="atlas-planet-grid">' + arenas.map(function(a){
      return _atlasArenaCard(a);
    }).join('') + '</div>';
    return html;
  }

  var _ATLAS_STYLE = { numeric:'⚖️ Balance', formula:'🔤 Rearrange', mcThenMorph:'🔀 Choose & Morph', mcOnly:'✔️ Identify', directInput:'🔢 Compute', graph:'📈 Graph', comingSoon:'🔒 Soon' };
  var _ATLAS_ART = { 'Earth':'earth','The Moon':'moon','Mars':'mars','Venus':'venus','Mercury':'mercury','Jupiter':'jupiter','Europa':'europa','Saturn':'saturn','Titan':'titan','Neptune':'neptune' };
  function _atlasArenaCard(a){
    var current = a.n === state.level;
    var isEarth = a.n === 1;
    var playable = (typeof ARENA_GENS !== 'undefined') && !!ARENA_GENS[a.n];
    var b = a.body || { name: 'Arena ' + a.n, kind: '', fact: '', real: true };
    var accent = _bodyAccent(b);
    var art = (typeof bodyArtSVG === 'function')
      ? bodyArtSVG(b, 'atlasnav' + a.n, (typeof ASTRO !== 'undefined' ? ASTRO[a.n] : null))
      : '<div style="width:100%;height:100%;border-radius:50%;background:radial-gradient(circle at 38% 35%,' + accent + ',' + _shade(accent, -0.4) + ')"></div>';
    var onclk = isEarth ? 'atlasEarthChoice()' : ('atlasTravel(' + a.n + ')');
    var label = 'Enter';
    // Green shiny star (top-right) if this arena was cleared with a PERFECT (0-mistake) run.
    var perfect = !!(state.perfectArenas && state.perfectArenas[a.n]);
    // A text ★ (not the 🌟 emoji) so CSS can paint it a true shiny GREEN — emoji glyphs ignore
    // CSS color and always render yellow (user 2026-07-18: "make sure the star shiny green").
    var starBadge = perfect ? '<div class="atlas-perfect-star" title="Perfect clear — no mistakes!">★</div>' : '';
    return '<div class="atlas-planet ' + (current ? 'current' : '') + (perfect ? ' perfect' : '') + (b.real ? '' : ' imagined') + '" style="--astro-accent:' + accent + '">' +
      starBadge +
      '<div class="atlas-planet-art">' + art + '</div>' +
      '<div class="atlas-planet-name">Arena ' + a.n + ' · ' + b.name + '</div>' +
      '<div class="atlas-planet-kind">' + b.kind + (b.real ? '' : ' · imagined') + '</div>' +
      '<div class="atlas-planet-topic">' + a.topic + '</div>' +
      '<div class="atlas-planet-style">' + (_ATLAS_STYLE[a.mechanic] || a.mechanic) + (playable ? '' : ' · soon') + '</div>' +
      '<div class="atlas-planet-btns">' +
        '<button class="btn btn-primary atlas-enter" onclick="' + onclk + '">' + label + '</button>' +
        '<button class="btn btn-ghost atlas-about" onclick="atlasShowBodyInfo(' + a.n + ')">ℹ️ About this ' + _bodyNoun(b) + '</button>' +
      '</div>' +
    '</div>';
  }

  // Composition → colour (planets/comets/moons/stars/stations get distinct hues).
  function _bodyAccent(b){
    var s = ((b.kind || '') + ' ' + (b.name || '')).toLowerCase();
    if (b.real === false || /station|companion|beacon|waypoint|outpost|imagined/.test(s)) return '#9aa4b2';
    if (/comet/.test(s)) return '#7fe3ff';
    if (/black hole|galactic|archive core/.test(s)) return '#b56cff';
    if (/white dwarf|supergiant|blue-white|north star|fast-spinning|brightest|our star|\bsun\b|\bstar\b/.test(s)) return '#ffd66b';
    if (/gas giant|hot jupiter|jupiter|ice giant|neptune-like|saturn/.test(s)) return '#e0a06a';
    if (/ice|icy|water|ocean|europa|enceladus|titan|triton/.test(s)) return '#9fd8ff';
    if (/dwarf planet|asteroid|ceres|vesta|pluto|eris/.test(s)) return '#c2b199';
    if (/super-earth|earth|rocky|habitable|mars|mercury|venus|moon/.test(s)) return '#6fcf8f';
    return '#8bb7ff';
  }
  // Darken/lighten a hex colour by frac (-1..1).
  function _shade(hex, frac){
    var m = /^#?([0-9a-f]{6})$/i.exec(hex); if (!m) return hex;
    var num = parseInt(m[1], 16), r = (num >> 16) & 255, g = (num >> 8) & 255, bl = num & 255;
    function adj(c){ return Math.max(0, Math.min(255, Math.round(c + 255 * frac))); }
    return 'rgb(' + adj(r) + ',' + adj(g) + ',' + adj(bl) + ')';
  }
  function _bodyNoun(b){
    var s = ((b.kind || '')).toLowerCase();
    if (b.real === false || /station|beacon|waypoint|outpost/.test(s)) return 'station';
    if (/comet/.test(s)) return 'comet';
    if (/moon/.test(s)) return 'moon';
    if (/star|dwarf|supergiant|black hole|galactic/.test(s)) return 'star';
    return 'planet';
  }

  // Real NASA / public-domain photographs of the Sol-System bodies, bundled LOCALLY under
  // game/assets/bodies/ (downloaded from Wikimedia Commons, ~640px JPEGs — no external URLs,
  // works offline). Keyed by a normalised body name; only bodies we actually have a photo for
  // appear here, so distant exoplanets, stars, black holes and imagined worlds get NO button.
  // Bump BODY_PHOTO_VER if you ever replace an image so browsers don't serve a stale cache.
  var BODY_PHOTO_BASE = 'assets/bodies/';
  var BODY_PHOTO_VER = '1';
  var BODY_PHOTOS = {
    'the sun': 'sun.jpg', 'mercury': 'mercury.jpg', 'venus': 'venus.jpg', 'earth': 'earth.jpg',
    'the moon': 'moon.jpg', 'mars': 'mars.jpg', 'phobos': 'phobos.jpg', 'deimos': 'deimos.jpg',
    'ceres': 'ceres.jpg', 'vesta': 'vesta.jpg', 'jupiter': 'jupiter.jpg', 'io': 'io.jpg',
    'europa': 'europa.jpg', 'ganymede': 'ganymede.jpg', 'callisto': 'callisto.jpg', 'saturn': 'saturn.jpg',
    'titan': 'titan.jpg', 'enceladus': 'enceladus.jpg', 'uranus': 'uranus.jpg', 'neptune': 'neptune.jpg',
    'triton': 'triton.jpg', 'pluto': 'pluto.jpg', 'halleys comet': 'halley.jpg'
  };
  function _bodyPhotoKey(name){ return String(name || '').toLowerCase().replace(/[’']/g, '').replace(/\s+/g, ' ').trim(); }
  // Local photo path for a body, or '' if we have no real photo for it (imagined bodies never get one).
  function bodyPhotoUrl(b){
    if (!b || b.real === false) return '';
    var f = BODY_PHOTOS[_bodyPhotoKey(b.name)];
    return f ? (BODY_PHOTO_BASE + f + '?v=' + BODY_PHOTO_VER) : '';
  }

  // "About this planet" info modal — real astronomy for the body.
  function atlasShowBodyInfo(n){
    var a = (typeof getArena === 'function') ? getArena(n) : null; if (!a) return;
    var b = a.body || {};
    var sys = (typeof STAR_SYSTEMS !== 'undefined') ? STAR_SYSTEMS.filter(function(s){ return s.id === a.systemId; })[0] : null;
    var accent = _bodyAccent(b);
    var art = (typeof bodyArtSVG === 'function')
      ? bodyArtSVG(b, 'bodyinfo' + n, (typeof ASTRO !== 'undefined' ? ASTRO[n] : null))
      : '<div style="width:100%;height:100%;border-radius:50%;background:radial-gradient(circle at 38% 35%,' + accent + ',' + _shade(accent, -0.4) + ')"></div>';
    // Real astronomy stats (astro.config.js), if authored for this body.
    var A = (typeof ASTRO !== 'undefined' && ASTRO[n]) ? ASTRO[n] : {};
    var typeStr = A.type || (_bodyNoun(b).charAt(0).toUpperCase() + _bodyNoun(b).slice(1));
    var tl = typeStr.toLowerCase();
    // Parent label: a moon orbits a planet; a planet orbits its star; stars/black holes have none.
    var parentLabel = /moon/.test(tl) ? 'Parent planet' : (/star|black hole|dwarf star/.test(tl) ? null : 'Star it orbits');
    var esc = (typeof escapeHtmlSafe === 'function') ? escapeHtmlSafe : function(x){ return x; };
    function row(label, val){ return val ? '<div><span>' + label + '</span><b>' + esc(String(val)) + '</b></div>' : ''; }
    // Extra facts keyed by body name; real bodies with no data get an honest "not yet known".
    var X = (typeof ASTRO_EXTRA !== 'undefined' && ASTRO_EXTRA[_bodyPhotoKey(b.name)]) || {};
    var unknown = (b.real !== false) ? 'Not yet known — light-years away, telescopes are still checking!' : null;
    var rows =
      row('Type', typeStr + (b.real === false ? ' · imagined' : '')) +
      (parentLabel ? row(parentLabel, A.parent) : '') +
      row('Diameter', A.diameter) +
      row('Mass', A.mass) +
      row('Temperature', A.temperature) +
      row('Made of', A.composition) +
      row('Most abundant', X.elements || unknown) +
      row('Water?', X.water || unknown) +
      row('Atmosphere', X.atmosphere || unknown) +
      row('Distance from Earth', A.distanceLy ? (A.distanceLy + (/^[0-9]/.test(String(A.distanceLy)) ? ' light-years' : '')) : '') +
      row('Region', sys ? sys.name : null) +
      row('Arena', '#' + n + ' · ' + (_ATLAS_STYLE[a.mechanic] || a.mechanic)) +
      row('Topic', a.topic);
    var m = document.getElementById('bodyInfoModal');
    if (!m){ m = document.createElement('div'); m.id = 'bodyInfoModal'; m.className = 'body-info-modal'; document.body.appendChild(m); }
    m.innerHTML =
      '<div class="bim-backdrop" onclick="atlasCloseBodyInfo()"></div>' +
      '<div class="bim-card" style="--astro-accent:' + accent + '">' +
        '<button class="bim-close" onclick="atlasCloseBodyInfo()">✕</button>' +
        '<div class="bim-art">' + art + '</div>' +
        (bodyPhotoUrl(b) ? '' : '<div class="bim-artlabel">🎨 Artist’s impression — no real photo exists yet</div>') +
        '<h2 class="bim-name">' + esc(b.name) + '</h2>' +
        '<div class="bim-kind">' + esc(b.kind || '') + (b.real === false ? ' · imagined' : ' · real astronomy') + '</div>' +
        '<p class="bim-fact">' + esc(b.fact || '') + '</p>' +
        '<div class="bim-rows">' + rows + '</div>' +
        (bodyPhotoUrl(b) ? '<button class="btn btn-ghost bim-photo" onclick="atlasShowPhoto(' + n + ')" data-tooltip="See a real photograph of ' + esc(b.name) + '.">📷 See real photo</button>' : '') +
        '<button class="btn btn-primary bim-enter" onclick="atlasCloseBodyInfo();' + (n === 1 ? 'atlasEarthChoice()' : 'atlasTravel(' + n + ')') + '">Enter</button>' +
      '</div>';
    m.classList.add('open');
  }
  function atlasCloseBodyInfo(){ var m = document.getElementById('bodyInfoModal'); if (m) m.classList.remove('open'); }

  // Real-photo lightbox — a real NASA/public-domain photograph of the body, over the info modal.
  function atlasShowPhoto(n){
    var a = (typeof getArena === 'function') ? getArena(n) : null; if (!a) return;
    var b = a.body || {};
    var url = bodyPhotoUrl(b);
    if (!url) return;
    var esc = (typeof escapeHtmlSafe === 'function') ? escapeHtmlSafe : function(x){ return x; };
    var lb = document.getElementById('bodyPhotoLightbox');
    if (!lb){ lb = document.createElement('div'); lb.id = 'bodyPhotoLightbox'; lb.className = 'body-photo-lb'; document.body.appendChild(lb); }
    lb.innerHTML =
      '<div class="bpl-backdrop" onclick="atlasClosePhoto()"></div>' +
      '<div class="bpl-card">' +
        '<button class="bpl-close" onclick="atlasClosePhoto()" aria-label="Close photo">✕</button>' +
        '<div class="bpl-imgwrap"><div class="bpl-loading">Loading photo…</div></div>' +
        '<div class="bpl-cap"><b>' + esc(b.name) + '</b> — real photograph · NASA / Wikimedia Commons (public domain)</div>' +
      '</div>';
    lb.classList.add('open');
    // Load the image via JS so we can show a graceful fallback if it ever fails.
    var wrap = lb.querySelector('.bpl-imgwrap');
    var img = new Image();
    img.className = 'bpl-img';
    img.alt = 'Real photograph of ' + b.name;
    img.onload = function(){ if (wrap){ wrap.innerHTML = ''; wrap.appendChild(img); } };
    img.onerror = function(){ if (wrap) wrap.innerHTML = '<p class="bpl-fail">Sorry — couldn’t load the photo right now. Please check your connection and try again.</p>'; };
    img.src = url;
  }
  function atlasClosePhoto(){ var lb = document.getElementById('bodyPhotoLightbox'); if (lb) lb.classList.remove('open'); }
  window.atlasShowPhoto = atlasShowPhoto;
  window.atlasClosePhoto = atlasClosePhoto;

  // Travel to a planet: jump state.level there (like a Worm Hole) with the warp FX.
  function atlasTravel(room){
    _atlasSystem = null;
    var doJump = function(){
      state.level = room; state.streak = 0; state.levelSolves = 0; state.roomFails = 0; state.gatePending = false;
      state.bossGateUnlocked = false; state.bossRoomEntered = false;
      document.querySelectorAll('.view-container.active').forEach(function(v){ v.classList.remove('active'); });
      el.equationView.classList.add('active');
      el.levelGateActions.style.display = 'none'; el.eqActions.style.display = 'flex';
      if (typeof updatePanelVisibility === 'function') updatePanelVisibility();
      if (typeof updateStats === 'function') updateStats();
      if (typeof updateLevelProgress === 'function') updateLevelProgress(0);
      if (typeof renderScene === 'function') renderScene();
      if (typeof setControlsEnabled === 'function') setControlsEnabled(true);
      if (typeof loadProblem === 'function') loadProblem();
      if (typeof showToast === 'function') showToast('🚀 Travelled to Arena ' + room + '!');
      if (typeof showPlanetArrival === 'function') showPlanetArrival(room);
    };
    if (typeof playWarpFx === 'function') playWarpFx(doJump); else doJump();
  }

  // Earth is both Planet 1 (playable) AND the home hub (shops, farm, trading). Clicking it asks
  // which the player wants: the arena (solve/fight) or shopping (the Earth map hub).
  function atlasEarthChoice(){
    var toArena = window.confirm(
      '🌍 Earth — your home base.\n\n' +
      'OK  →  ⚔️ Enter the Arena (play Planet 1, Earth)\n' +
      'Cancel  →  🛒 Go Shopping (Weapon Store, Item Store, Farm, Trading…)'
    );
    if (toArena) { atlasTravel(1); }
    else if (typeof openMapHub === 'function') { _atlasSystem = null; openMapHub(); }
    else { atlasTravel(1); }
  }

  // Global "Back to Earth". During combat, confirm (and reset the enemy's HP).
  function goToEarth(silent){
    if (typeof activeCombat !== 'undefined' && activeCombat){
      if (!window.confirm('Return to Earth and retreat from this battle? The enemy’s health will reset.')) return;
      activeCombat = null;
    }
    if (typeof openMapHub === 'function') openMapHub();
    else { document.querySelectorAll('.view-container.active').forEach(function(v){ v.classList.remove('active'); }); el.equationView.classList.add('active'); if (typeof loadProblem === 'function') loadProblem(); }
  }
