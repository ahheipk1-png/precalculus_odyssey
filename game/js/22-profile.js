  // ============================================================================
  // Player Profile / Inventory / Equipment view (#profileView). Globally reachable
  // via the 🎒 Profile header button (openProfile). Tabs: Stats · Gear · Inventory.
  // Reuses window.rpgActions for equip/upgrade/sell and 09-items useItem for
  // consumables. Read-only stat views + equip controls; buying is at the shops.
  // ============================================================================
  var _profTab = 'stats';
  var _profReturn = null;

  function openProfile(tab){
    var active = document.querySelector('.view-container.active');
    _profReturn = active || el.equationView;
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    var pv = document.getElementById('profileView');
    if (pv) pv.classList.add('active');
    setProfileTab(typeof tab === 'string' ? tab : _profTab);
    if (typeof playMusic === 'function') playMusic('shop');
  }
  function closeProfile(){
    var pv = document.getElementById('profileView');
    if (pv) pv.classList.remove('active');
    (_profReturn || el.equationView).classList.add('active');
    _profReturn = null;
    if (typeof playMusic === 'function') playMusic('practice');
  }
  function setProfileTab(tab){
    _profTab = tab;
    document.querySelectorAll('#profileView .prof-tab').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-tab') === tab); });
    var body = document.getElementById('profileBody');
    if (!body) return;
    body.innerHTML = tab === 'gear' ? profGearHtml() : (tab === 'inventory' ? profInvHtml() : profStatsHtml());
  }

  function _bar(cur, max, color){
    var pct = Math.max(0, Math.min(100, (cur / (max || 1)) * 100));
    return '<div class="prof-bar"><div class="prof-bar-fill" style="width:' + pct + '%;background:' + color + '"></div></div>';
  }

  // A small "worth" caption under a tradeable currency: what the holding is worth in Cash at the
  // current Trading Room spot price, plus the spot rate itself.
  function _worthLine(good, qty){
    if (typeof currencySpot !== 'function') return '';
    var spot = currencySpot(good);
    var worth = (typeof currencyWorth === 'function') ? currencyWorth(good, qty) : Math.round(spot * qty);
    return '<small class="prof-worth">≈ 💵' + worth.toLocaleString() + '<em>@' + spot + '/ea</em></small>';
  }

  function profStatsHtml(){
    var ap = getPlayerAp(), dp = getPlayerDp();
    var spd = (typeof getPlayerSpeed === 'function') ? getPlayerSpeed() : 0;
    var maxHp = (typeof getEffectiveMaxHp === 'function') ? getEffectiveMaxHp() : state.playerMaxHp;
    var xpNeed = state.heroLvl * 100;
    var elw = (typeof getPlayerElement === 'function') ? getPlayerElement() : 'metal';
    var elIcon = (typeof elementIcon === 'function') ? elementIcon(elw) : '';
    var c = state.currencies || { gold: 0, silver: 0 };
    var chips = (typeof chipTotal === 'function') ? chipTotal() : 0;
    return '' +
      '<div class="prof-card">' +
        '<h3 class="prof-h">' + escapeHtml(activeProfileName || 'Solver') + ' <span class="prof-lvl">Lv. ' + state.heroLvl + '</span></h3>' +
        '<div class="prof-line">XP <span>' + state.heroXp + ' / ' + xpNeed + '</span></div>' + _bar(state.heroXp, xpNeed, 'var(--sky)') +
        '<div class="prof-line">HP <span>' + state.playerHp + ' / ' + maxHp + '</span></div>' + _bar(state.playerHp, maxHp, '#ff6b6b') +
        '<div class="prof-line">MP <span>' + state.playerMp + ' / ' + state.playerMaxMp + '</span></div>' + _bar(state.playerMp, state.playerMaxMp, '#6ec1e4') +
      '</div>' +
      '<div class="prof-grid">' +
        '<div class="prof-stat"><span>⚔️ Attack</span><b>' + ap + '</b></div>' +
        '<div class="prof-stat"><span>🛡️ Defense</span><b>' + dp + '</b></div>' +
        '<div class="prof-stat"><span>💨 Speed</span><b>' + spd + '</b></div>' +
        '<div class="prof-stat"><span>' + elIcon + ' Element</span><b>' + (ELEMENTS[elw] ? ELEMENTS[elw].name : elw) + '</b></div>' +
      '</div>' +
      '<h4 class="prof-sub">Currencies <small class="prof-sub-note">🥇🥈 valued at the live Trading Room spot price</small></h4>' +
      '<div class="prof-grid">' +
        '<div class="prof-stat"><span>💵 Cash</span><b>' + state.coins + '</b></div>' +
        '<div class="prof-stat"><span>🥇 Gold</span><b>' + (c.gold || 0) + '</b>' + _worthLine('gold', c.gold || 0) + '</div>' +
        '<div class="prof-stat"><span>🥈 Silver</span><b>' + (c.silver || 0) + '</b>' + _worthLine('silver', c.silver || 0) + '</div>' +
        '<div class="prof-stat"><span>🧩 Chips</span><b>' + chips + '</b></div>' +
      '</div>';
  }

  function _equipSlot(label, item, type){
    if (!item) return '<div class="prof-slot"><span class="prof-slot-lbl">' + label + '</span><span class="prof-slot-empty">— none —</span></div>';
    var art = (typeof gearArtSVG === 'function') ? gearArtSVG(item, 'prof') : '';
    var elIcon = (typeof elementIcon === 'function') ? elementIcon(item.element) : '';
    return '<div class="prof-slot ' + (typeof rarityFrameClass === 'function' ? rarityFrameClass(item) : '') + '">' +
      '<span class="prof-slot-lbl">' + label + '</span>' +
      '<div class="prof-slot-art">' + art + '</div>' +
      '<div class="prof-slot-info"><b>' + item.name + (item.upgradeLvl > 0 ? (' +' + item.upgradeLvl) : '') + ' ' + elIcon + '</b>' +
      '<small>' + (typeof rarityLabel === 'function' ? rarityLabel(item) : '') + '</small></div></div>';
  }

  function _ownedRow(type, item, equippedId){
    var equipped = item.id === equippedId;
    var elIcon = (typeof elementIcon === 'function') ? elementIcon(item.element) : '';
    var btn = equipped ? '<button class="shop-btn" disabled>Equipped</button>'
      : '<button class="shop-btn shop-btn-equip" onclick="window.rpgActions.equip(\'' + type + '\',\'' + item.id + '\');profRefresh();">Equip</button>';
    return '<div class="prof-owned ' + (typeof rarityFrameClass === 'function' ? rarityFrameClass(item) : '') + '">' +
      '<div class="prof-owned-art">' + ((typeof gearArtSVG === 'function') ? gearArtSVG(item, 'own' + item.id) : '') + '</div>' +
      '<span class="prof-owned-name">' + item.name + (item.upgradeLvl > 0 ? (' +' + item.upgradeLvl) : '') + ' ' + elIcon + '</span>' + btn + '</div>';
  }

  function profGearHtml(){
    var w = findGear(state.weapons, state.equippedWeapon), s = findGear(state.shields, state.equippedShield),
        a = findGear(state.armor || [], state.equippedArmor), sh = findGear(state.shoes || [], state.equippedShoes);
    var html = '<h4 class="prof-sub">Equipped</h4>' +
      _equipSlot('Weapon', w, 'weapon') + _equipSlot('Shield', s, 'shield') +
      _equipSlot('Armor', a, 'armor') + _equipSlot('Shoes', sh, 'shoes');
    var groups = [['weapon', state.weapons, state.equippedWeapon, 'Weapons'], ['shield', state.shields, state.equippedShield, 'Shields'],
                  ['armor', state.armor || [], state.equippedArmor, 'Armor'], ['shoes', state.shoes || [], state.equippedShoes, 'Shoes']];
    groups.forEach(function(gr){
      var owned = gr[1].filter(function(it){ return it.owned; });
      if (!owned.length) return;
      html += '<h4 class="prof-sub">' + gr[3] + ' owned</h4><div class="prof-owned-grid">' +
        owned.map(function(it){ return _ownedRow(gr[0], it, gr[2]); }).join('') + '</div>';
    });
    html += '<p class="prof-hint">Buy & upgrade gear at the ⚔️ Weapon Store on Earth.</p>';
    return html;
  }

  function profInvHtml(){
    var html = '<h4 class="prof-sub">Consumables</h4><div class="prof-inv-grid">';
    var any = false;
    (typeof ITEM_ORDER !== 'undefined' ? ITEM_ORDER : []).forEach(function(id){
      var n = (typeof countItem === 'function') ? countItem(id) : 0;
      if (n <= 0) return;
      any = true;
      var it = ITEMS[id];
      var usable = ['potion', 'ether', 'super_medicine', 'poison_vial'].indexOf(id) !== -1;
      var btn = usable ? '<button class="shop-btn" onclick="profUse(\'' + id + '\')">Use</button>' : '<span class="prof-inv-note">🌾 Farm</span>';
      html += '<div class="prof-inv-item"><span class="prof-inv-icon">' + it.icon + '</span><span class="prof-inv-name">' + it.name + ' ×' + n + '</span>' + btn + '</div>';
    });
    if (!any) html += '<p class="prof-hint">No consumables yet — buy some at the 🎒 Item Store or synthesize at the 🧪 Laboratory.</p>';
    html += '</div>';
    // Chips
    html += '<h4 class="prof-sub">AI Chips 🧩</h4><div class="prof-inv-grid">';
    var anyChip = false;
    (typeof CHIP_ORDER !== 'undefined' ? CHIP_ORDER : []).forEach(function(id){
      var n = (state.chips && state.chips[id]) || 0; if (n <= 0) return; anyChip = true;
      html += '<div class="prof-inv-item"><span class="prof-inv-icon">' + CHIPS[id].icon + '</span><span class="prof-inv-name">' + CHIPS[id].name + ' ×' + n + '</span></div>';
    });
    if (!anyChip) html += '<p class="prof-hint">Defeat robot enemies to collect AI chips (upgrade your gear).</p>';
    html += '</div>';
    // Spells
    html += '<h4 class="prof-sub">Spells ✨</h4><div class="prof-inv-grid">';
    (typeof SPELLS !== 'undefined' ? SPELLS : []).forEach(function(sp){
      html += '<div class="prof-inv-item"><span class="prof-inv-icon">' + sp.icon + '</span><span class="prof-inv-name">' + sp.name + '</span><span class="prof-inv-note">' + sp.manaCost + ' MP</span></div>';
    });
    html += '</div>';
    return html;
  }

  function profUse(id){
    if (typeof useItem !== 'function') return;
    var r = useItem(id);
    if (typeof showToast === 'function') showToast(r.msg);
    if (r.ok && typeof updateStats === 'function') updateStats();
    setProfileTab('inventory');
  }
  function profRefresh(){ setProfileTab(_profTab); if (typeof updateStats === 'function') updateStats(); }
