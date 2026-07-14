  // ============================================================================
  // 30-bodyart.js — universal planet / moon / star / comet sphere art.
  // ----------------------------------------------------------------------------
  // Every body across all 187 arenas renders as a shaded 3D sphere themed to its
  // REAL composition/type (from curriculum `body` + `ASTRO[n]`). Fixes the old
  // blank cards (planetSVG looked up BODIES by the wrong key) AND the flat 2D
  // fallback circle. Reuses the hand-drawn Sol art (PLANET_ART, 14-lore.js) for
  // the 10 Sol bodies that have it; classifies everything else into an archetype.
  // Self-contained SVG, zero external assets. Exposes window.bodyArtSVG.
  // ============================================================================
  (function(){
    function esc(s){ return (typeof escapeHtmlSafe === 'function') ? escapeHtmlSafe(String(s)) : String(s); }

    // lighten (frac>0) / darken (frac<0) a #rrggbb colour
    function shade(hex, frac){
      var m = /^#?([0-9a-f]{6})$/i.exec(hex || ''); if (!m) return hex || '#888';
      var n = parseInt(m[1], 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
      function adj(c){ return Math.max(0, Math.min(255, Math.round(frac > 0 ? c + (255 - c) * frac : c * (1 + frac)))); }
      function hx(c){ return ('0' + adj(c).toString(16)).slice(-2); }
      return '#' + hx(r) + hx(g) + hx(b);
    }
    function stops(mid){
      return '<stop offset="0" stop-color="' + shade(mid, 0.42) + '"/>' +
             '<stop offset="55%" stop-color="' + mid + '"/>' +
             '<stop offset="100%" stop-color="' + shade(mid, -0.5) + '"/>';
    }
    // Core shaded sphere: 3D radial gradient (light top-left), clipped surface features,
    // dark limb, and a specular glint.
    function sphere(uid, mid, features, opts){
      opts = opts || {}; var r = opts.r || 37;
      var glow = opts.glow ? '<circle cx="50" cy="50" r="' + (r + 11) + '" fill="' + opts.glow + '" opacity="0.25"/>' : '';
      return '<defs><radialGradient id="G' + uid + '" cx="37%" cy="31%" r="78%">' + stops(mid) + '</radialGradient>' +
        '<clipPath id="C' + uid + '"><circle cx="50" cy="50" r="' + r + '"/></clipPath></defs>' + glow +
        '<circle cx="50" cy="50" r="' + r + '" fill="url(#G' + uid + ')"/>' +
        '<g clip-path="url(#C' + uid + ')">' + (features || '') + '</g>' +
        '<circle cx="50" cy="50" r="' + r + '" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="1.3"/>' +
        '<ellipse cx="36" cy="30" rx="11" ry="7" fill="#ffffff" opacity="0.18"/>';
    }

    // ---- surface-feature generators (colours derived from the body's mid tone) ----
    function bands(mid){
      var d = shade(mid, -0.24), l = shade(mid, 0.26);
      return '<path d="M6 35 Q50 29 94 35 L94 42 Q50 36 6 42 Z" fill="' + d + '" opacity="0.55"/>' +
             '<path d="M6 47 Q50 42 94 47 L94 55 Q50 50 6 55 Z" fill="' + l + '" opacity="0.5"/>' +
             '<path d="M6 59 Q50 54 94 59 L94 67 Q50 62 6 67 Z" fill="' + d + '" opacity="0.5"/>';
    }
    function craters(mid){
      var d = shade(mid, -0.3), l = shade(mid, 0.18);
      return '<circle cx="42" cy="44" r="7" fill="' + d + '" opacity="0.5"/>' +
             '<circle cx="42" cy="44" r="7" fill="none" stroke="' + l + '" stroke-width="1" opacity="0.4"/>' +
             '<circle cx="61" cy="57" r="6" fill="' + d + '" opacity="0.45"/>' +
             '<circle cx="56" cy="34" r="3.5" fill="' + d + '" opacity="0.45"/>' +
             '<circle cx="34" cy="61" r="4.5" fill="' + d + '" opacity="0.4"/>';
    }
    function patches(mid){
      var d = shade(mid, -0.26);
      return '<path d="M24 46 Q40 40 50 50 Q44 60 30 57 Z" fill="' + d + '" opacity="0.45"/>' +
             '<path d="M58 60 Q70 55 78 64 Q68 71 58 66 Z" fill="' + d + '" opacity="0.4"/>' +
             '<ellipse cx="50" cy="18" rx="14" ry="5" fill="#f5f0ea" opacity="0.5"/>';
    }
    function cracks(mid){
      var d = shade(mid, -0.34);
      return '<path d="M14 42 Q50 46 86 40" stroke="' + d + '" stroke-width="1.6" fill="none" opacity="0.6"/>' +
             '<path d="M16 56 Q50 50 84 60" stroke="' + d + '" stroke-width="1.5" fill="none" opacity="0.55"/>' +
             '<path d="M40 20 L46 80" stroke="' + d + '" stroke-width="1.1" fill="none" opacity="0.4"/>';
    }
    function continents(){
      return '<path d="M16 58 Q34 46 52 56 Q62 64 50 74 Q30 82 18 70 Z" fill="#4fae5a" opacity="0.9"/>' +
             '<path d="M58 26 Q78 24 84 42 Q74 54 60 48 Q50 38 58 26 Z" fill="#57bf62" opacity="0.88"/>' +
             '<path d="M40 78 Q54 73 68 80 Q58 88 44 86 Z" fill="#47a352" opacity="0.82"/>' +
             '<path d="M22 40 Q40 34 58 40" stroke="#ffffff" stroke-width="4" fill="none" opacity="0.3" stroke-linecap="round"/>' +
             '<path d="M52 64 Q68 60 82 66" stroke="#ffffff" stroke-width="3.5" fill="none" opacity="0.26" stroke-linecap="round"/>';
    }
    function lavaCracks(){
      return '<path d="M18 40 Q40 50 34 68" stroke="#ffde59" stroke-width="2.4" fill="none" opacity="0.85"/>' +
             '<path d="M58 28 Q54 50 70 64" stroke="#ff8a3d" stroke-width="2.2" fill="none" opacity="0.8"/>' +
             '<path d="M30 30 Q46 44 60 40" stroke="#ffb347" stroke-width="1.8" fill="none" opacity="0.7"/>' +
             '<circle cx="45" cy="53" r="5" fill="#ffcf4a" opacity="0.5"/>';
    }
    function spot(mid){ return '<ellipse cx="63" cy="57" rx="9" ry="6" fill="' + shade(mid, -0.32) + '" opacity="0.7"/>'; }

    // ---- special (non-accent-sphere) renderers ----
    function ring(uid, mid, features){
      var rc = shade(mid, 0.22), rc2 = shade(mid, -0.15);
      return '<g transform="rotate(-16 50 50)">' +
          '<ellipse cx="50" cy="50" rx="52" ry="15" fill="none" stroke="' + rc + '" stroke-width="7" opacity="0.85"/>' +
          '<ellipse cx="50" cy="50" rx="52" ry="15" fill="none" stroke="' + rc2 + '" stroke-width="2" opacity="0.7"/>' +
        '</g>' + sphere(uid, mid, features, { r: 30 }) +
        '<g transform="rotate(-16 50 50)"><path d="M2 50 A52 15 0 0 0 98 50" fill="none" stroke="' + rc + '" stroke-width="7" opacity="0.9"/></g>';
    }
    // Irregular (non-spherical) rocky/icy body — small worlds that gravity never rounded.
    // AST_PATH ≈ a lumpy r32 rock centred on 50,50; COMET_PATH ≈ a small r14 nucleus near 42,50.
    var AST_PATH = 'M18 48 L26 30 L42 24 L58 27 L74 34 L82 50 L76 66 L60 76 L44 74 L28 68 L20 58 Z';
    var COMET_PATH = 'M30 50 L34 41 L42 37 L51 40 L56 47 L54 57 L46 62 L37 60 L31 55 Z';
    function irregular(uid, mid, pathD, features){
      return '<defs><radialGradient id="G' + uid + '" cx="37%" cy="31%" r="82%">' + stops(mid) + '</radialGradient>' +
        '<clipPath id="C' + uid + '"><path d="' + pathD + '"/></clipPath></defs>' +
        '<path d="' + pathD + '" fill="url(#G' + uid + ')"/>' +
        '<g clip-path="url(#C' + uid + ')">' + (features || '') + '</g>' +
        '<path d="' + pathD + '" fill="none" stroke="rgba(0,0,0,0.28)" stroke-width="1.3" stroke-linejoin="round"/>' +
        '<ellipse cx="40" cy="36" rx="9" ry="5" fill="#ffffff" opacity="0.15"/>';
    }
    // Comet: what you SEE is the glowing coma (head) + a long dust/ion tail streaming away — not a
    // sphere. A tiny bright nucleus sits in the coma; the tail fans out and fades toward upper-right.
    function cometArt(uid){
      return '<defs>' +
          '<radialGradient id="H' + uid + '" cx="50%" cy="50%" r="50%">' +
            '<stop offset="0" stop-color="#ffffff" stop-opacity="1"/>' +
            '<stop offset="34%" stop-color="#dff6ff" stop-opacity="0.9"/>' +
            '<stop offset="100%" stop-color="#8fdcff" stop-opacity="0"/>' +
          '</radialGradient>' +
          '<linearGradient id="T' + uid + '" x1="0%" y1="0%" x2="100%" y2="0%">' +
            '<stop offset="0" stop-color="#d4f2ff" stop-opacity="0.8"/>' +
            '<stop offset="100%" stop-color="#d4f2ff" stop-opacity="0"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<path d="M33 50 L99 16 L99 38 L33 58 Z" fill="url(#T' + uid + ')"/>' +
        '<path d="M38 52 L95 26 M40 54 L93 42" stroke="#eafcff" stroke-width="1" opacity="0.45" stroke-linecap="round"/>' +
        '<circle cx="33" cy="53" r="22" fill="url(#H' + uid + ')"/>' +
        '<circle cx="33" cy="53" r="6" fill="#ffffff" opacity="0.95"/>' +
        '<circle cx="32" cy="52" r="2.6" fill="#eafcff"/>';
    }
    // Ellipsoid (non-spherical) body — for tidally-stretched hot Jupiters / puffy planets pulled out
    // of round by their star's gravity. rx > ry reads as a squashed / stretched world.
    function ellipsoid(uid, mid, features, opts){
      opts = opts || {}; var rx = opts.rx || 42, ry = opts.ry || 31;
      var glow = opts.glow ? '<ellipse cx="50" cy="50" rx="' + (rx + 9) + '" ry="' + (ry + 8) + '" fill="' + opts.glow + '" opacity="0.22"/>' : '';
      return '<defs><radialGradient id="G' + uid + '" cx="37%" cy="31%" r="80%">' + stops(mid) + '</radialGradient>' +
        '<clipPath id="C' + uid + '"><ellipse cx="50" cy="50" rx="' + rx + '" ry="' + ry + '"/></clipPath></defs>' + glow +
        '<ellipse cx="50" cy="50" rx="' + rx + '" ry="' + ry + '" fill="url(#G' + uid + ')"/>' +
        '<g clip-path="url(#C' + uid + ')">' + (features || '') + '</g>' +
        '<ellipse cx="50" cy="50" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="1.3"/>' +
        '<ellipse cx="34" cy="34" rx="11" ry="6" fill="#ffffff" opacity="0.16"/>';
    }
    // Star. `oblate` flattens it (fast rotators like Altair bulge at the equator).
    function starArt(uid, mid, oblate){
      var rx = oblate ? 36 : 33, ry = oblate ? 27 : 33;
      return '<defs><radialGradient id="G' + uid + '" cx="50%" cy="50%" r="55%">' +
          '<stop offset="0" stop-color="#fffdf0"/><stop offset="45%" stop-color="' + mid + '"/><stop offset="100%" stop-color="' + shade(mid, -0.32) + '"/>' +
        '</radialGradient></defs>' +
        '<ellipse cx="50" cy="50" rx="' + (rx + 13) + '" ry="' + (ry + 13) + '" fill="' + mid + '" opacity="0.22"/>' +
        '<ellipse cx="50" cy="50" rx="' + (rx + 7) + '" ry="' + (ry + 7) + '" fill="' + mid + '" opacity="0.18"/>' +
        '<ellipse cx="50" cy="50" rx="' + rx + '" ry="' + ry + '" fill="url(#G' + uid + ')"/>' +
        '<ellipse cx="50" cy="50" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="' + shade(mid, 0.3) + '" stroke-width="1.5" opacity="0.6"/>';
    }
    function blackholeArt(uid){
      return '<defs><radialGradient id="G' + uid + '" cx="50%" cy="50%" r="60%">' +
          '<stop offset="0" stop-color="#000000"/><stop offset="52%" stop-color="#160e2e"/><stop offset="72%" stop-color="#b56cff"/><stop offset="100%" stop-color="#37205e"/>' +
        '</radialGradient></defs>' +
        '<ellipse cx="50" cy="50" rx="46" ry="15" fill="none" stroke="#d9a0ff" stroke-width="4" opacity="0.7"/>' +
        '<ellipse cx="50" cy="50" rx="46" ry="15" fill="none" stroke="#ffd36b" stroke-width="1.5" opacity="0.6"/>' +
        '<circle cx="50" cy="50" r="25" fill="url(#G' + uid + ')"/>' +
        '<circle cx="50" cy="50" r="17" fill="#000000"/>';
    }
    function stationArt(uid){
      var mid = '#9aa4b2', d = shade(mid, -0.34), l = shade(mid, 0.22);
      return sphere(uid, mid,
        '<rect x="16" y="46" width="68" height="8" fill="' + d + '" opacity="0.6"/>' +
        '<circle cx="50" cy="50" r="9" fill="' + l + '" opacity="0.55"/>' +
        '<circle cx="50" cy="50" r="9" fill="none" stroke="' + d + '" stroke-width="1.5" opacity="0.6"/>' +
        '<path d="M50 13 L50 87 M13 50 L87 50" stroke="' + d + '" stroke-width="1" opacity="0.4"/>' +
        '<circle cx="38" cy="40" r="2" fill="#8fd8ff" opacity="0.9"/>' +
        '<circle cx="62" cy="60" r="2" fill="#ffd36b" opacity="0.9"/>');
    }

    // archetype -> renderer(uid, mid)
    var ARCH = {
      earthlike: function(u, m){ return sphere(u, m || '#3f83c4', continents()); },
      ocean:     function(u, m){ return sphere(u, m || '#2f7fd0', cracks(m || '#2f7fd0')); },
      rocky:     function(u, m){ return sphere(u, m || '#b0714a', craters(m || '#b0714a')); },
      dusty:     function(u, m){ return sphere(u, m || '#c1542f', patches(m || '#c1542f')); },
      desert:    function(u, m){ return sphere(u, m || '#d9b96a', bands(m || '#d9b96a')); },
      ice:       function(u, m){ return sphere(u, m || '#bfe3ff', cracks(m || '#bfe3ff'), { glow: 'rgba(180,230,255,0.5)' }); },
      gasGiant:  function(u, m){ return sphere(u, m || '#d99b63', bands(m || '#d99b63') + spot(m || '#d99b63')); },
      hotJupiter:function(u, m){ m = m || '#e08a4a'; return ellipsoid(u, m, bands(m) + spot(m), { rx: 43, ry: 30, glow: '#ff7a3a' }); },
      iceGiant:  function(u, m){ return sphere(u, m || '#4a78c8', bands(m || '#4a78c8')); },
      ringed:    function(u, m){ m = m || '#e0c079'; return ring(u, m, bands(m)); },
      lava:      function(u, m){ return sphere(u, m || '#c33b1c', lavaCracks(), { glow: '#ff6a2a' }); },
      dwarf:     function(u, m){ return sphere(u, m || '#b7a487', craters(m || '#b7a487'), { r: 31 }); },
      asteroid:  function(u, m){ return irregular('a' + u, m || '#9a8d7c', AST_PATH, craters(m || '#9a8d7c')); },
      comet:     function(u){ return cometArt(u); },
      star:      function(u, m){ return starArt(u, m || '#ffcf5e'); },
      starOblate:function(u, m){ return starArt(u, m || '#ffcf5e', true); },
      blackhole: function(u){ return blackholeArt(u); },
      station:   function(u){ return stationArt(u); }
    };

    function parseTemp(t){
      if (!t) return NaN;
      var m = /-?\d[\d,]*/.exec(String(t).replace(/\s/g, ''));
      return m ? parseFloat(m[0].replace(/,/g, '')) : NaN;
    }

    // classify a body -> [archetypeKey, midColour]
    function classify(body, astro){
      var kind = (body.kind || '').toLowerCase();
      var name = (body.name || '').toLowerCase();
      var type = ((astro && astro.type) || '').toLowerCase();
      var comp = ((astro && astro.composition) || '').toLowerCase();
      var s = kind + ' ' + name + ' ' + type;
      var temp = parseTemp(astro && astro.temperature);

      if (body.real === false || /station|beacon|outpost|waypoint|array|archive core/.test(s)) return ['station', null];
      if (/comet/.test(s)) return ['comet', null];
      if (/black hole|galactic cent|sagittarius/.test(s)) return ['blackhole', null];
      if (/\bstar\b|\bsun\b|dwarf star|supergiant|main.?sequence|brown dwarf|white dwarf/.test(s)){
        var sc = '#ffcf5e';
        if (/white dwarf/.test(s)) sc = '#dbe6ff';
        else if (/blue|o-type|b-type/.test(s) || (temp && temp > 9000)) sc = '#bcd2ff';
        else if (/red dwarf|red giant|m-type|m dwarf/.test(s) || (temp && temp < 4000 && temp > 0)) sc = '#ff8a5a';
        // Fast rotators (e.g. Altair) bulge at the equator → oblate.
        if (/fast.?spin|fast.?rotat/.test(s)) return ['starOblate', sc];
        return ['star', sc];
      }
      // Tidally stretched / inflated close-in giants — pulled out of round by their star's gravity.
      if (/hot jupiter|puffy/.test(kind)) return ['hotJupiter', '#e08a4a'];
      // Named Sol bodies without hand-drawn art, but with a distinctive look:
      if (name === 'io') return ['lava', '#e6c84f'];                 // sulfur volcanism
      if (/uranus/.test(name)) return ['iceGiant', '#8fd8dc'];
      if (/ganymede|callisto/.test(name)) return ['rocky', '#9a8f7e'];
      if (/enceladus|triton|mimas|dione|rhea|tethys/.test(name)) return ['ice', '#dbeeff'];
      if (/pluto|eris|makemake|haumea/.test(name)) return ['dwarf', '#c9b7a0'];  // rounded dwarf planets
      if (/ceres/.test(name)) return ['dwarf', '#b7a487'];                       // roundest asteroid-belt body
      if (/vesta|pallas|hygiea/.test(name)) return ['asteroid', '#b7a487'];      // irregular asteroids
      if (/phobos|deimos/.test(name)) return ['asteroid', '#8a7d6e'];            // tiny lumpy moons

      if (/ring/.test(s) || /saturn/.test(name)) return ['ringed', '#e0c079'];

      // composition / temperature driven
      if (/sulfur|lava|molten|magma/.test(comp) || (temp && temp > 1000)) return ['lava', '#c33b1c'];
      if (/hydrogen|helium/.test(comp) || /gas giant|hot jupiter|jupiter-like/.test(s)){
        if (/methane/.test(comp) || /ice giant|neptune/.test(s)) return ['iceGiant', '#4a78c8'];
        return ['gasGiant', '#d99b63'];
      }
      if (/ice giant|neptune-like|neptune/.test(s)) return ['iceGiant', '#4a78c8'];
      if (/methane/.test(comp)) return ['iceGiant', '#7fb0ee'];
      if (/^ice|ice and|frozen|water ice|ice,/.test(comp) || /ice world|icy/.test(s) || (temp && temp < -80)) return ['ice', '#bfe3ff'];
      if (/earth/.test(name)) return ['earthlike', '#3f83c4'];
      if (/ocean|water world/.test(s) || (/habitable/.test(s) && temp >= -20 && temp <= 60)) return ['ocean', '#2f7fd0'];

      if (/gas giant/.test(kind)) return ['gasGiant', '#d99b63'];
      if (/ice giant/.test(kind)) return ['iceGiant', '#4a78c8'];
      if (/asteroid/.test(kind)) return ['asteroid', '#b7a487'];   // irregular (unless named above)
      if (/dwarf planet/.test(kind)) return ['dwarf', '#b7a487'];  // large enough to be round

      // hot rocky worlds read as hazy/desert; cold ones as icy
      if (temp && temp > 400) return ['desert', '#d9b96a'];
      if (temp && temp < -50) return ['ice', '#cfe6ff'];

      // rocky default — red/rusty if the description hints at it, else warm brown
      if (/red|rust|dusty|iron/.test(comp + ' ' + name)) return ['dusty', '#c1542f'];
      if (/moon/.test(kind)) return ['rocky', '#9a8f7e'];
      return ['rocky', '#b0714a'];
    }

    // Sol bodies that DO have bespoke hand-drawn art in PLANET_ART (14-lore.js).
    var SOL_ART = { 'Earth': 'earth', 'The Moon': 'moon', 'Mars': 'mars', 'Venus': 'venus',
      'Mercury': 'mercury', 'Jupiter': 'jupiter', 'Europa': 'europa', 'Saturn': 'saturn',
      'Titan': 'titan', 'Neptune': 'neptune', 'The Sun': 'sun', 'Sun': 'sun' };

    // PUBLIC: render any body as a shaded sphere SVG. `ctx` makes gradient ids unique per instance.
    window.bodyArtSVG = function(body, ctx, astro){
      body = body || {};
      var uid = String(ctx || 'x').replace(/[^a-zA-Z0-9]/g, '') || 'x';
      var open = '<svg class="planet-art" viewBox="0 0 100 100" role="img" aria-label="' + esc(body.name || 'body') + '">';
      var key = SOL_ART[body.name];
      if (key && typeof PLANET_ART !== 'undefined' && PLANET_ART[key]){
        try { return open + PLANET_ART[key](key + uid) + '</svg>'; } catch (e) { /* fall through */ }
      }
      var ca = classify(body, astro || {});
      var render = ARCH[ca[0]] || ARCH.rocky;
      return open + render('a' + uid, ca[1]) + '</svg>';
    };
  })();
