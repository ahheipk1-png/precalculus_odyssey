  // ---------- Item Store 🎒 ("Trader Nova's Supplies") ----------
  // A general store for consumables & alchemy ingredients. Loaded after 09-items.js (needs the
  // global ITEMS/ITEM_ORDER tables plus addItem/countItem/useItem) — it never defines items of
  // its own, so store prices/icons/descriptions always stay in sync with the one ITEMS table.
  //
  // Design decisions:
  // * The whole view is re-rendered into #itemStoreView on every open AND after every buy/use.
  //   The UI is small, state lives entirely in `state`, and a full re-render keeps counts, cash,
  //   disabled buttons and the backpack list correct with zero bookkeeping.
  // * Stock is a fixed whitelist (ISTR_STOCK). feed/fertilizer belong to the Farm's market and
  //   super_medicine/poison_vial are craft-only (price 0), so they are NOT sold here — but every
  //   owned item still shows in the Backpack section below the shelf.
  // * buyStoreItem(id, qty) is the testable transaction core: it validates via the PURE
  //   storeBuyQuote() (no mutation) and returns { ok, msg }. The click wrappers add the toast +
  //   re-render on top, so console tests don't spam toasts.
  // * Every cross-module call is guarded (typeof ... === 'function') so the store degrades
  //   gracefully if another module is missing or renamed.

  // The four items on Trader Nova's shelf (must exist in ITEMS with price > 0).
  var ISTR_STOCK = ['potion', 'ether', 'moon_herb', 'star_dew'];

  // PURE: the list of ids actually sellable right now (stocked + present in ITEMS + priced).
  function getStoreStock(){
    if (typeof ITEMS === 'undefined') return [];
    return ISTR_STOCK.filter(function(id){ return ITEMS[id] && ITEMS[id].price > 0; });
  }

  // PURE: price out a purchase WITHOUT mutating anything. Returns { ok, cost, msg }.
  // qty is clamped to a whole number >= 1 so button wiring can't produce fractional buys.
  function storeBuyQuote(id, qty){
    var n = Math.max(1, Math.floor(Number(qty) || 1));
    if (typeof ITEMS === 'undefined' || !ITEMS[id]) return { ok: false, cost: 0, msg: 'That item doesn’t exist.' };
    if (getStoreStock().indexOf(id) === -1) return { ok: false, cost: 0, msg: ITEMS[id].name + ' isn’t sold here.' };
    var cost = ITEMS[id].price * n;
    if ((state.coins || 0) < cost) {
      return { ok: false, cost: cost, msg: 'Not enough Cash! You need 💵' + cost + ' but have 💵' + state.coins + '.' };
    }
    return { ok: true, cost: cost, msg: 'Bought ' + n + '× ' + ITEMS[id].icon + ' ' + ITEMS[id].name + ' for 💵' + cost + '!' };
  }

  // The transaction: spend cash, add items, refresh HUD (updateStats also autosaves).
  function buyStoreItem(id, qty){
    var n = Math.max(1, Math.floor(Number(qty) || 1));
    var quote = storeBuyQuote(id, n);
    if (!quote.ok) return { ok: false, msg: quote.msg };
    state.coins -= quote.cost;
    if (typeof addItem === 'function') addItem(id, n);
    if (typeof updateStats === 'function') updateStats();
    if (typeof playSfx === 'function') playSfx('buy');
    return { ok: true, msg: quote.msg };
  }

  // ---------- View controllers ----------

  function openItemStore(){
    var view = document.getElementById('itemStoreView');
    if (!view) return;
    istrRenderView();
    // Deactivate EVERY view (equation, shop, battle, codex, and any future siblings), then ours.
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    view.classList.add('active');
    if (typeof playMusic === 'function') playMusic('shop');
  }

  function closeItemStore(){
    var view = document.getElementById('itemStoreView');
    if (view) view.classList.remove('active');
    if (typeof openMapHub === 'function') {
      openMapHub();
    } else {
      // Fallback when the Map Hub module isn't loaded: return to practice, like closeShop does.
      var eq = document.getElementById('equationView');
      if (eq) eq.classList.add('active');
      if (typeof playMusic === 'function') playMusic('practice');
    }
  }

  // ---------- Click wrappers (buttons call these; they toast + re-render) ----------

  function istrBuyClick(id, qty){
    var res = buyStoreItem(id, qty);
    if (typeof showToast === 'function') showToast(res.msg);
    if (!res.ok && typeof playSfx === 'function') playSfx('wrong');
    istrRenderView();
  }

  function istrUseClick(id){
    if (typeof useItem !== 'function') return;
    var res = useItem(id);
    if (typeof showToast === 'function') showToast(res.msg);
    if (res.ok) {
      if (typeof playSfx === 'function') playSfx('ui-click');
      if (typeof updateStats === 'function') updateStats();
    }
    istrRenderView();
  }

  // ---------- Rendering ----------
  // All item names/icons/descs come from the developer-authored ITEMS table (never user input),
  // so direct interpolation is safe; nothing user-derived is rendered in this view.

  function istrRenderView(){
    var view = document.getElementById('itemStoreView');
    if (!view) return;
    if (typeof ITEMS === 'undefined' || typeof ITEM_ORDER === 'undefined') {
      view.innerHTML = '<p class="istr-empty">The store is still unpacking its crates… (items module missing)</p>';
      return;
    }
    view.innerHTML =
      '<div class="istr-wrap">' +
        '<div class="istr-header">' +
          '<button class="btn btn-ghost istr-back" onclick="closeItemStore()" title="Back to Earth Hub — return to the map">← Back to Earth</button>' +
          '<h2 class="istr-title">🎒 Trader Nova’s Supplies</h2>' +
          '<p class="istr-tagline">“Potions, herbs and stardust — everything a space explorer needs!”</p>' +
          '<span class="istr-cash-chip" title="Your Cash">💵 ' + state.coins + '</span>' +
        '</div>' +
        '<div class="istr-shelf">' + istrShelfHtml() + '</div>' +
        '<h3 class="istr-section-title">🎒 Your Backpack</h3>' +
        '<div class="istr-backpack">' + istrBackpackHtml() + '</div>' +
      '</div>';
  }

  function istrShelfHtml(){
    var stock = getStoreStock();
    if (!stock.length) return '<p class="istr-empty">The shelves are empty today. Come back soon!</p>';
    return stock.map(function(id){
      var it = ITEMS[id];
      var owned = (typeof countItem === 'function') ? countItem(id) : (state.inventory[id] || 0);
      var canBuy1 = state.coins >= it.price;
      var canBuy5 = state.coins >= it.price * 5;
      var short = it.price - state.coins;
      return (
        '<div class="istr-card">' +
          (owned > 0 ? '<span class="istr-owned" title="How many you own">x' + owned + '</span>' : '') +
          '<span class="istr-icon">' + it.icon + '</span>' +
          '<span class="istr-name">' + it.name + '</span>' +
          '<span class="istr-desc">' + it.desc + '</span>' +
          '<div class="istr-buy-row">' +
            '<button class="btn btn-primary istr-buy" onclick="istrBuyClick(\'' + id + '\',1)"' +
              (canBuy1 ? '' : ' disabled') + ' title="' + (canBuy1 ? ('Buy 1× ' + it.name + ' for 💵' + it.price) : ('Not enough Cash — need 💵' + short + ' more')) + '">Buy 💵' + it.price + '</button>' +
            (canBuy5 ? '<button class="btn btn-ghost istr-buy5" onclick="istrBuyClick(\'' + id + '\',5)" title="Buy 5× ' + it.name + ' for 💵' + (it.price * 5) + '">×5 💵' + (it.price * 5) + '</button>' : '') +
          '</div>' +
          (canBuy1 ? '' : '<span class="istr-short">Need 💵' + short + ' more!</span>') +
        '</div>'
      );
    }).join('');
  }

  function istrBackpackHtml(){
    var rows = ITEM_ORDER.filter(function(id){
      return ((typeof countItem === 'function') ? countItem(id) : (state.inventory[id] || 0)) > 0;
    }).map(function(id){
      var it = ITEMS[id];
      var owned = (typeof countItem === 'function') ? countItem(id) : (state.inventory[id] || 0);
      var action;
      if (id === 'feed' || id === 'fertilizer') {
        action = '<span class="istr-note" title="Not used from here — bring it up at the Farm\'s market instead">Used at the Farm 🌾</span>';
      } else if (id === 'poison_vial' && state.poisonArmed) {
        action = '<span class="istr-note istr-armed" title="Will douse the next monster you fight in acid">☠️ prepared for next battle</span>';
      } else {
        action = '<button class="btn btn-ghost istr-use" onclick="istrUseClick(\'' + id + '\')" title="' + it.desc + '">Use</button>';
      }
      return (
        '<div class="istr-pack-row">' +
          '<span class="istr-pack-icon">' + it.icon + '</span>' +
          '<span class="istr-pack-name">' + it.name + ' <b class="istr-pack-count" title="How many you own">x' + owned + '</b></span>' +
          action +
        '</div>'
      );
    });
    if (!rows.length) return '<p class="istr-empty">Your backpack is empty. Grab a potion for the road!</p>';
    return rows.join('');
  }
