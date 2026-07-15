  // ============================================================================
  // Catalogue art + Wu Xing element logic (reads config/gear + config/elements).
  //  - weaponSVG(category, element, upgradeLvl): deterministic stylized SVG per
  //    category, element-tinted, with Base→+1→+2→+3 glow/aura/burst decorations.
  //  - gearArtSVG(item): dispatches weapons→weaponSVG, plus shield/shoe/armor art.
  //  - elementMultiplier(atk, def): Wu Xing damage matchup (real generating +
  //    overcoming cycles, not a flat rock-paper-scissors). Used in combat (06).
  //  - getPlayerSpeed / armor helpers.
  // No emoji as final weapon art — all vector.
  // ============================================================================

  function elementColor(el){ return (ELEMENTS[el] && ELEMENTS[el].color) || '#c9d1d9'; }
  function elementIcon(el){ return el === 'all' ? '🌈' : ((ELEMENTS[el] && ELEMENTS[el].icon) || '❔'); }
  function elementCn(el){ return el === 'all' ? '五' : ((ELEMENTS[el] && ELEMENTS[el].cn) || ''); }

  // Wu Xing matchup multiplier (attacker element vs defender element).
  function elementMultiplier(atk, def){
    if (!atk || !def) return 1;
    if (atk === 'all') return WUXING_MULT.support;    // Prism: strong vs everything
    if (def === 'all') return WUXING_MULT.neutral;
    if (WUXING_OVERCOMES[atk] === def) return WUXING_MULT.over;    // super effective (克)
    if (WUXING_OVERCOMES[def] === atk) return WUXING_MULT.under;   // resisted
    if (WUXING_GENERATES[atk] === def) return WUXING_MULT.support; // generating (生) — slight bonus
    return WUXING_MULT.neutral;
  }
  // Plain-language combat-log note for a matchup.
  function elementMatchupNote(atk, def){
    var m = elementMultiplier(atk, def);
    if (m >= WUXING_MULT.over) return 'Super effective! (' + elementCn(atk) + ' overcomes ' + elementCn(def) + ')';
    if (m <= WUXING_MULT.under) return 'Resisted… (' + elementCn(def) + ' overcomes ' + elementCn(atk) + ')';
    if (m > 1) return 'Elemental boost (' + elementCn(atk) + ' feeds ' + elementCn(def) + ')';
    return '';
  }

  // ---- Deterministic weapon art ----------------------------------------------
  // Each category returns the "business end" markup drawn in a 0..100 box; a shared
  // wrapper adds the element-tinted gradient + upgrade glow/aura/particles/runes.
  var _catArt = {
    sword: function(g){
      return '<path d="M50 8 L57 20 L54 66 L50 74 L46 66 L43 20 Z" fill="url(#'+g+')" stroke="#2b2f36" stroke-width="1.5"/>' +
             '<rect x="38" y="70" width="24" height="6" rx="2" fill="#6b4f30" stroke="#2b2f36" stroke-width="1"/>' +
             '<rect x="47" y="76" width="6" height="16" rx="2" fill="#6b4f30" stroke="#2b2f36" stroke-width="1"/>' +
             '<circle cx="50" cy="94" r="4" fill="url(#'+g+')" stroke="#2b2f36" stroke-width="1"/>' +
             '<path d="M50 12 L50 64" stroke="#fff" stroke-width="1.4" opacity="0.5"/>';
    },
    bow: function(g){
      return '<path d="M32 12 Q78 50 32 88" fill="none" stroke="url(#'+g+')" stroke-width="7" stroke-linecap="round"/>' +
             '<path d="M32 12 Q70 50 32 88" fill="none" stroke="#2b2f36" stroke-width="1.5"/>' +
             '<line x1="32" y1="12" x2="32" y2="88" stroke="#e8e8ea" stroke-width="1.5" opacity="0.8"/>' +
             '<path d="M30 50 L84 50" stroke="url(#'+g+')" stroke-width="3"/>' +
             '<path d="M84 50 L76 45 M84 50 L76 55" stroke="url(#'+g+')" stroke-width="3" fill="none"/>';
    },
    spear: function(g){
      return '<path d="M50 6 L58 26 L52 34 L50 40 L48 34 L42 26 Z" fill="url(#'+g+')" stroke="#2b2f36" stroke-width="1.5"/>' +
             '<rect x="47" y="34" width="6" height="60" rx="3" fill="#6b4f30" stroke="#2b2f36" stroke-width="1"/>' +
             '<path d="M50 10 L50 32" stroke="#fff" stroke-width="1.2" opacity="0.5"/>';
    },
    staff: function(g){
      return '<rect x="47" y="30" width="6" height="64" rx="3" fill="#6b4f30" stroke="#2b2f36" stroke-width="1"/>' +
             '<circle cx="50" cy="24" r="15" fill="url(#'+g+')" stroke="#2b2f36" stroke-width="1.5"/>' +
             '<circle cx="45" cy="19" r="4" fill="#fff" opacity="0.6"/>';
    },
    heavy: function(g){
      return '<rect x="45" y="20" width="10" height="74" rx="4" fill="#6b4f30" stroke="#2b2f36" stroke-width="1"/>' +
             '<path d="M26 16 H74 A6 6 0 0 1 80 22 V40 A6 6 0 0 1 74 46 H26 A6 6 0 0 1 20 40 V22 A6 6 0 0 1 26 16 Z" fill="url(#'+g+')" stroke="#2b2f36" stroke-width="1.5"/>' +
             '<path d="M28 24 H72" stroke="#fff" stroke-width="1.4" opacity="0.4"/>';
    }
  };

  function weaponSVG(category, element, lvl, ctx){
    lvl = lvl || 0;
    var uid = 'g-' + (category || 'x') + '-' + (element || 'x') + '-' + (ctx || 'c') + '-' + lvl;
    var col = elementColor(element);
    var isAll = element === 'all';
    var stops = isAll
      ? '<stop offset="0" stop-color="#57b45a"/><stop offset="25%" stop-color="#f0705e"/><stop offset="50%" stop-color="#e0b24a"/><stop offset="75%" stop-color="#c9d1d9"/><stop offset="100%" stop-color="#5aa9ff"/>'
      : '<stop offset="0" stop-color="#ffffff"/><stop offset="35%" stop-color="' + col + '"/><stop offset="100%" stop-color="#2a2f36"/>';
    var art = (_catArt[category] || _catArt.sword)(uid);
    // Upgrade decorations
    var glow = '', aura = '', parts = '', runes = '';
    if (lvl >= 1) glow = '<circle cx="50" cy="46" r="42" fill="' + col + '" opacity="0.10"/>';
    if (lvl >= 2) {
      aura = '<circle cx="50" cy="46" r="40" fill="none" stroke="' + col + '" stroke-width="2" opacity="0.5"/>';
      parts = '<circle cx="20" cy="30" r="2.5" fill="' + col + '"/><circle cx="82" cy="40" r="2" fill="' + col + '"/><circle cx="26" cy="80" r="2" fill="' + col + '"/><circle cx="78" cy="78" r="2.5" fill="' + col + '"/>';
    }
    if (lvl >= 3) {
      runes = '<circle cx="50" cy="46" r="46" fill="none" stroke="' + col + '" stroke-width="1.5" opacity="0.7" stroke-dasharray="4 5"/>' +
              '<text x="50" y="99" text-anchor="middle" font-size="10" fill="' + col + '">' + elementCn(element) + '</text>';
    }
    return '<svg class="gear-art gear-lvl' + lvl + '" viewBox="0 0 100 104" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + (category || 'weapon') + '">' +
      '<defs><linearGradient id="' + uid + '" x1="0" y1="0" x2="1" y2="1">' + stops + '</linearGradient></defs>' +
      glow + aura + art + parts + runes + '</svg>';
  }

  // Shield / shoe / armor art (simpler element-tinted shapes).
  function _plainGearSVG(kind, element, lvl, ctx){
    lvl = lvl || 0;
    var uid = 'p-' + kind + '-' + element + '-' + (ctx || 'c') + '-' + lvl;
    var col = elementColor(element);
    var stops = '<stop offset="0" stop-color="#ffffff"/><stop offset="40%" stop-color="' + col + '"/><stop offset="100%" stop-color="#2a2f36"/>';
    var body;
    if (kind === 'shield') body = '<path d="M50 12 L82 22 V52 Q82 82 50 94 Q18 82 18 52 V22 Z" fill="url(#'+uid+')" stroke="#2b2f36" stroke-width="2"/><path d="M50 20 L50 88 M28 30 H72" stroke="#fff" stroke-width="1.4" opacity="0.4"/>';
    else if (kind === 'shoes') body = '<path d="M22 58 H58 Q74 58 78 72 L82 84 Q84 92 74 92 H30 Q22 92 22 84 Z" fill="url(#'+uid+')" stroke="#2b2f36" stroke-width="2"/><path d="M22 58 L22 40 Q22 34 30 34 L42 34 L44 58 Z" fill="url(#'+uid+')" stroke="#2b2f36" stroke-width="2"/>';
    else body = '<path d="M30 20 L50 14 L70 20 L72 60 Q72 84 50 92 Q28 84 28 60 Z" fill="url(#'+uid+')" stroke="#2b2f36" stroke-width="2"/><path d="M50 16 L50 88" stroke="#fff" stroke-width="1.4" opacity="0.4"/>';
    var glow = lvl >= 1 ? '<circle cx="50" cy="52" r="44" fill="' + col + '" opacity="0.10"/>' : '';
    var aura = lvl >= 2 ? '<circle cx="50" cy="52" r="42" fill="none" stroke="' + col + '" stroke-width="2" opacity="0.5"/>' : '';
    var runes = lvl >= 3 ? '<circle cx="50" cy="52" r="47" fill="none" stroke="' + col + '" stroke-width="1.5" opacity="0.7" stroke-dasharray="4 5"/>' : '';
    return '<svg class="gear-art gear-lvl' + lvl + '" viewBox="0 0 100 104" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + kind + '">' +
      '<defs><linearGradient id="' + uid + '" x1="0" y1="0" x2="1" y2="1">' + stops + '</linearGradient></defs>' +
      glow + aura + body + runes + '</svg>';
  }

  // One entry point the shop/profile use for any gear item.
  function gearArtSVG(item, ctx){
    if (!item) return '';
    var lvl = item.upgradeLvl || 0;
    if (item.category === 'shield') return _plainGearSVG('shield', item.element, lvl, ctx);
    if (item.category === 'shoes')  return _plainGearSVG('shoes', item.element, lvl, ctx);
    if (item.category === 'armor')  return _plainGearSVG('armor', item.element, lvl, ctx);
    return weaponSVG(item.category || 'sword', item.element, lvl, ctx);
  }

  function rarityFrameClass(item){ return 'rar-' + (item && item.rarity ? item.rarity : 'common'); }
  function rarityLabel(item){ return (GEAR_RARITY[item.rarity] && GEAR_RARITY[item.rarity].label) || 'Common'; }

  // Equipped-gear stat helpers (armor + shoes join weapon/shield).
  function findGear(arr, id){ for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i]; return null; }
  function getEquippedArmor(){ return findGear(state.armor || [], state.equippedArmor); }
  function getEquippedShoes(){ return findGear(state.shoes || [], state.equippedShoes); }
  function getPlayerSpeed(){
    var s = getEquippedShoes();
    var base = s ? (s.speed + s.upgradeLvl * 2) : 0;
    var w = findGear(state.weapons || [], state.equippedWeapon);
    var hero = (typeof heroStatBonus === 'function') ? heroStatBonus('speed') : 0;
    return base + hero + (w && w.speed ? Math.round(w.speed / 2) : 0) + socketBonusTotal('speed');
  }
  function getArmorDefense(){ var a = getEquippedArmor(); return a ? (a.defense + a.upgradeLvl * 2) : 0; }
  function getArmorHpBonus(){ var a = getEquippedArmor(); return a ? (a.hp || 0) : 0; }

  // Sum a stat across all chips socketed into the equipped weapon (Phase 4 socketing).
  function socketBonusTotal(stat){
    var w = state.equippedWeapon, list = (state.socketedChips && state.socketedChips[w]) || [];
    var t = 0;
    list.forEach(function(cid){ var b = (typeof CHIP_BONUS !== 'undefined' && CHIP_BONUS[cid]) || {}; if (b[stat]) t += b[stat]; });
    return t;
  }
