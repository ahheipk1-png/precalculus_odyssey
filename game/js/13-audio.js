  // ---------- Audio: context-switched background music + SFX placeholders ----------
  // Music WAV loops live in game/sound/ (inside the deploy root, referenced as `sound/…` relative
  // to index.html — works locally and on Cloudflare Pages where game/ IS the site root). Some SFX
  // are real samples (SFX_FILES); others fall back to WebAudio-oscillator beeps.
  var AUDIO = {
    muted: (function(){ try { return localStorage.getItem('po_muted') === '1'; } catch(e){ return false; } })(),
    musicVol: 0.38,
    sfxVol: 0.72,
    tracks: {
      practice: 'sound/generic_background_loop.wav',
      shop:     'sound/weapon_room_loop.wav',
      arena:    'sound/arena_room_loop.wav',
      battle:   'sound/battle_music_loop.wav'
    },
    current: 'practice',   // which context we're in (music resumes to this after unmute/gesture)
    audioEl: null,
    ctx: null,
    started: false         // becomes true after the first user gesture (autoplay policy)
  };

  function initAudioEl(){
    if (AUDIO.audioEl) return;
    var a = document.createElement('audio');
    // Loop MANUALLY (not a.loop) so we can insert a 1.5s gap between iterations.
    a.loop = false; a.preload = 'auto'; a.volume = AUDIO.musicVol;
    a.id = 'bgMusic';
    a.addEventListener('ended', onTrackEnded);
    document.body.appendChild(a);
    AUDIO.audioEl = a;
  }

  // When a track finishes, wait 1.5s (a breath between loops), then replay it.
  function onTrackEnded(){
    clearTimeout(AUDIO.gapTimer);
    if (AUDIO.muted || !AUDIO.started) return;
    AUDIO.gapTimer = setTimeout(function(){
      if (AUDIO.muted || !AUDIO.audioEl) return;
      try { AUDIO.audioEl.currentTime = 0; var p = AUDIO.audioEl.play(); if (p && p.catch) p.catch(function(){}); } catch (e) {}
    }, 1500);
  }

  // Switch the background loop by context ('practice' | 'shop' | 'arena' | 'battle').
  function playMusic(key){
    if (key) AUDIO.current = key;
    if (AUDIO.muted || AUDIO.musicVol <= 0 || !AUDIO.started) return;   // deferred until gesture / silent if vol 0
    initAudioEl();
    var src = AUDIO.tracks[AUDIO.current];
    if (!src) return;
    if (AUDIO.audioEl.getAttribute('data-key') !== AUDIO.current) {
      clearTimeout(AUDIO.gapTimer);   // cancel a pending loop-gap for the previous track
      AUDIO.audioEl.src = src;
      AUDIO.audioEl.setAttribute('data-key', AUDIO.current);
    }
    AUDIO.audioEl.volume = AUDIO.musicVol;
    var p = AUDIO.audioEl.play();
    if (p && p.catch) p.catch(function(){ /* autoplay blocked until a gesture */ });
  }

  // ---------- Real one-shot SFX samples (Sound Pack) ----------
  // Event name -> WAV under sound/. These are recorded one-shots that fade to silence and are
  // NEVER looped. Any event NOT in this map falls through to the oscillator BEEP placeholder below,
  // so every existing playSfx() call keeps working.
  var SFX_FILES = {
    'battle-hit':      'sound/attack_impact.wav',                 // generic melee/energy impact
    'victory':         'sound/battle_victory_fanfare.wav',        // short celebration: battle won
    'planet-complete': 'sound/planet_complete_celebration.wav',   // longer celebration: planet finished
    'weapon-upgrade':  'sound/weapon_upgrade.wav',                // successful weapon/gear upgrade
    'machine':         'sound/machine_activate.wav',              // chip machines / terminals / star gates / stations
    'warp':            'sound/machine_activate.wav',              // wormhole = a star-gate activation
    'equip-light':     'sound/metal_equip_light_weapon.wav',      // sword, dagger, bow, spear, staff
    'equip-heavy':     'sound/metal_equip_heavy_armor.wav',       // heavy weapon, shield, armor, boots
    'equip-scifi':     'sound/metal_equip_scifi_lock.wav'         // AI / plasma / quantum gear
  };

  // Cache one <audio> per file; play a clone each time so rapid repeats (combat hits) get their own
  // playhead and never cut each other off. Samples are one-shots, so loop stays off.
  var _sfxCache = {};
  function playSfxFile(url){
    if (AUDIO.muted || AUDIO.sfxVol <= 0) return;
    try {
      var base = _sfxCache[url];
      if (!base) { base = new Audio(url); base.preload = 'auto'; _sfxCache[url] = base; }
      var node = base.cloneNode();
      node.volume = AUDIO.sfxVol;
      var p = node.play();
      if (p && p.catch) p.catch(function(){});   // autoplay may be blocked until the first gesture
    } catch (e) { /* audio unavailable — ignore */ }
  }

  // Choose the equip sample by gear kind: futuristic AI gear -> sci-fi lock; shields/armor/boots
  // -> heavy metal; everything else (a common sword) -> light metal.
  function playEquipSfx(item){
    var name = 'equip-light';
    if (item) {
      var scifi = { archive: 1, stellar: 1, rift: 1, odyssey: 1 };
      if (item.rarity && scifi[item.rarity]) {
        name = 'equip-scifi';
      } else if (item.category === 'shield' || item.category === 'armor' ||
                 item.category === 'shoes') {
        name = 'equip-heavy';
      }
    }
    playSfx(name);
  }

  // Placeholder SFX: a short shaped tone per named event. Real files can replace these 1:1.
  var SFX = {
    'solve-correct': { f: 660, t: 0.14, type: 'triangle' },
    'wrong':         { f: 170, t: 0.18, type: 'sawtooth' },
    'buy':           { f: 520, t: 0.09, type: 'square' },
    'upgrade':       { f: 800, t: 0.18, type: 'triangle' },
    'loot':          { f: 900, t: 0.11, type: 'sine' },
    'battle-hit':    { f: 300, t: 0.07, type: 'square' },
    'victory':       { f: 740, t: 0.34, type: 'triangle' },
    'defeat':        { f: 140, t: 0.45, type: 'sawtooth' },
    'warp':          { f: 520, t: 0.4,  type: 'sine' },
    'chest-open':    { f: 980, t: 0.24, type: 'sine' },
    'ui-click':      { f: 440, t: 0.05, type: 'sine' }
  };
  function playSfx(name){
    if (AUDIO.muted || AUDIO.sfxVol <= 0) return;
    // Back-compat aliases: many minigames call the short names, which weren't defined
    // in either map (so they were silent). Map them to the real keys.
    if (name === 'correct') name = 'solve-correct';
    else if (name === 'click') name = 'ui-click';
    if (SFX_FILES[name]) { playSfxFile(SFX_FILES[name]); return; }   // real sample if we have one
    var spec = SFX[name];
    if (!spec) return;
    try {
      if (!AUDIO.ctx) AUDIO.ctx = new (window.AudioContext || window.webkitAudioContext)();
      var ctx = AUDIO.ctx, now = ctx.currentTime;
      var osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = spec.type;
      osc.frequency.setValueAtTime(spec.f, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, 0.16 * AUDIO.sfxVol), now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + spec.t);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now + spec.t + 0.03);
    } catch (e) { /* audio unavailable — ignore */ }
  }

  // Browsers block audio until the user interacts. Start on the first gesture, then play the
  // current context's music.
  function startAudioOnGesture(){
    if (AUDIO.started) return;
    AUDIO.started = true;
    try { if (AUDIO.ctx && AUDIO.ctx.resume) AUDIO.ctx.resume(); } catch (e) {}
    // Warm the one-shot sample cache so the first combat hit / equip doesn't lag on a cold fetch.
    try {
      for (var k in SFX_FILES) {
        var u = SFX_FILES[k];
        if (!_sfxCache[u]) { var a = new Audio(u); a.preload = 'auto'; _sfxCache[u] = a; }
      }
    } catch (e) {}
    playMusic(AUDIO.current);
  }
  document.addEventListener('pointerdown', startAudioOnGesture, { once: false });
  document.addEventListener('keydown', startAudioOnGesture, { once: false });

  function toggleMute(){
    AUDIO.muted = !AUDIO.muted;
    try { localStorage.setItem('po_muted', AUDIO.muted ? '1' : '0'); } catch (e) {}
    if (el.muteBtn) el.muteBtn.textContent = AUDIO.muted ? '🔇 Sound' : '🔊 Sound';
    if (AUDIO.muted) {
      clearTimeout(AUDIO.gapTimer);
      if (AUDIO.audioEl) AUDIO.audioEl.pause();
    } else {
      AUDIO.started = true;
      playMusic(AUDIO.current);
    }
  }
  // Reflect the saved mute preference on the button once the DOM is wired (07-main caches el.muteBtn).
  function initMuteBtn(){
    if (el.muteBtn) el.muteBtn.textContent = AUDIO.muted ? '🔇 Sound' : '🔊 Sound';
  }

  // ---------- Settings panel: music + SFX volume (0-100), saved to the profile/cloud ----------
  // Reads state.settings into AUDIO's 0-1 volumes and applies them live.
  function applyAudioSettings(){
    var s = (typeof state === 'object' && state && state.settings) ? state.settings : { musicVol: 38, sfxVol: 72 };
    AUDIO.musicVol = Math.max(0, Math.min(100, s.musicVol || 0)) / 100;
    AUDIO.sfxVol   = Math.max(0, Math.min(100, s.sfxVol   || 0)) / 100;
    if (AUDIO.audioEl) AUDIO.audioEl.volume = AUDIO.musicVol;
    if (AUDIO.musicVol <= 0 && AUDIO.audioEl) AUDIO.audioEl.pause();
  }
  function setMusicVol(pct){
    pct = Math.max(0, Math.min(100, Math.round(+pct || 0)));
    if (!state.settings) state.settings = { musicVol: 38, sfxVol: 72 };
    state.settings.musicVol = pct;
    AUDIO.musicVol = pct / 100;
    if (AUDIO.audioEl) AUDIO.audioEl.volume = AUDIO.musicVol;
    if (pct > 0 && !AUDIO.muted){ AUDIO.started = true; playMusic(AUDIO.current); }
    else if (AUDIO.audioEl){ AUDIO.audioEl.pause(); }
    var l = document.getElementById('musicVolLabel'); if (l) l.textContent = pct + '%';
  }
  function setSfxVol(pct){
    pct = Math.max(0, Math.min(100, Math.round(+pct || 0)));
    if (!state.settings) state.settings = { musicVol: 38, sfxVol: 72 };
    state.settings.sfxVol = pct;
    AUDIO.sfxVol = pct / 100;
    var l = document.getElementById('sfxVolLabel'); if (l) l.textContent = pct + '%';
  }
  // Persist once the slider is released (not on every drag tick).
  function saveSettings(){ if (typeof saveGame === 'function') saveGame(); }

  function openSettings(){
    closeSettings();
    var s = (state && state.settings) ? state.settings : { musicVol: 38, sfxVol: 72 };
    var ov = document.createElement('div');
    ov.id = 'settingsOverlay';
    ov.className = 'settings-overlay';
    ov.innerHTML =
      '<div class="settings-card">' +
        '<h2 class="settings-title">⚙️ Settings</h2>' +
        '<div class="settings-row">' +
          '<label>🎵 Music volume <b id="musicVolLabel">' + s.musicVol + '%</b></label>' +
          '<input type="range" min="0" max="100" value="' + s.musicVol + '" class="settings-slider" ' +
            'oninput="setMusicVol(this.value)" onchange="saveSettings()" aria-label="Music volume">' +
        '</div>' +
        '<div class="settings-row">' +
          '<label>🔊 Sound effects <b id="sfxVolLabel">' + s.sfxVol + '%</b></label>' +
          '<input type="range" min="0" max="100" value="' + s.sfxVol + '" class="settings-slider" ' +
            'oninput="setSfxVol(this.value)" onchange="saveSettings(); playSfx(\'ui-click\')" aria-label="Sound effects volume">' +
        '</div>' +
        '<p class="settings-note">Set a volume to 0 to silence it. Your settings are saved to your account.</p>' +
        '<button type="button" class="btn btn-primary" onclick="closeSettings()" data-tooltip="Close settings.">Done</button>' +
      '</div>';
    ov.addEventListener('click', function(e){ if (e.target === ov) closeSettings(); });
    document.body.appendChild(ov);
  }
  function closeSettings(){ var ov = document.getElementById('settingsOverlay'); if (ov) ov.parentNode.removeChild(ov); }
