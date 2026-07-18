  // ---------- Item Store 🎒 ("Trader Nova's Supplies") ----------
  // A general store for consumables & alchemy ingredients. Loaded after 09-items.js (needs the
  // global ITEMS/ITEM_ORDER tables plus addItem/countItem/useItem) — it never defines items of
  // its own, so store prices/icons/descriptions always stay in sync with the one ITEMS table.
  //
  // Design decisions:
  // * ONE unified card shelf (no separate "Backpack" list — removed 2026-07-18, user: "remove this
  //   table and add the missing one to the list above and provide ways to use them like special
  //   items"). Every card shows what you own, a Buy row (if it's sold — `ISTR_STOCK`) or a
  //   craft-only note, and a Use row (if `useItem()` has a real effect for it — `ISTR_USABLE`) or
  //   an ingredient note. feed/fertilizer are Farm-market items with their own UI there and are
  //   deliberately NOT shown here at all (the "except the ones that can only be used in farm"
  //   exclusion) — they never had a Buy or Use action that made sense in this store anyway.
  // * The whole view is re-rendered into #itemStoreView on every open AND after every buy/use.
  //   The UI is small, state lives entirely in `state`, and a full re-render keeps counts, cash
  //   and disabled buttons correct with zero bookkeeping.
  // * buyStoreItem(id, qty) is the testable transaction core: it validates via the PURE
  //   storeBuyQuote() (no mutation) and returns { ok, msg }. The click wrappers add the toast +
  //   re-render on top, so console tests don't spam toasts.
  // * Every cross-module call is guarded (typeof ... === 'function') so the store degrades
  //   gracefully if another module is missing or renamed.

  // Every item this store's shelf shows a card for (Farm-only feed/fertilizer excluded on purpose).
  var ISTR_SHELF = ['potion', 'ether', 'moon_herb', 'star_dew', 'super_medicine', 'poison_vial'];
  // The subset actually sold here (must exist in ITEMS with price > 0) — the rest are craft-only.
  var ISTR_STOCK = ['potion', 'ether', 'moon_herb', 'star_dew'];
  // The subset useItem() has a REAL effect for — these get a working Use button. Everything else
  // on the shelf (moon_herb/star_dew) is a pure Laboratory ingredient with no direct "use" of its
  // own, so it gets an informational note instead (matching how feed/fertilizer used to read
  // "Used at the Farm" — same idea, different destination).
  var ISTR_USABLE = ['potion', 'ether', 'super_medicine', 'poison_vial'];

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
    } else if (typeof playSfx === 'function') playSfx('wrong');
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
      '</div>';
  }

  function istrShelfHtml(){
    return ISTR_SHELF.map(function(id){
      var it = ITEMS[id];
      if (!it) return '';
      var owned = (typeof countItem === 'function') ? countItem(id) : (state.inventory[id] || 0);
      var sold = it.price > 0;   // craft-only items (price 0) have no Buy row
      var canBuy1 = sold && state.coins >= it.price;
      var canBuy5 = sold && state.coins >= it.price * 5;
      var short = it.price - state.coins;

      var buyRow = sold
        ? ('<div class="istr-buy-row">' +
            '<button class="btn btn-primary istr-buy" onclick="istrBuyClick(\'' + id + '\',1)"' +
              (canBuy1 ? '' : ' disabled') + ' title="' + (canBuy1 ? ('Buy 1× ' + it.name + ' for 💵' + it.price) : ('Not enough Cash — need 💵' + short + ' more')) + '">Buy 💵' + it.price + '</button>' +
            (canBuy5 ? '<button class="btn btn-ghost istr-buy5" onclick="istrBuyClick(\'' + id + '\',5)" title="Buy 5× ' + it.name + ' for 💵' + (it.price * 5) + '">×5 💵' + (it.price * 5) + '</button>' : '') +
          '</div>' +
          (canBuy1 ? '' : '<span class="istr-short">Need 💵' + short + ' more!</span>'))
        : '<span class="istr-note" title="Not sold — brewed at the Alchemy Lab from ingredients + chips">🧪 Craft-only — visit the Laboratory</span>';

      var useRow;
      if (ISTR_USABLE.indexOf(id) !== -1) {
        if (id === 'poison_vial' && state.poisonArmed) {
          useRow = '<span class="istr-note istr-armed" title="Will douse the next monster you fight in acid">☠️ prepared for next battle</span>';
        } else {
          useRow = '<button class="btn btn-ghost istr-use" onclick="istrUseClick(\'' + id + '\')"' +
            (owned > 0 ? '' : ' disabled') + ' title="' + (owned > 0 ? it.desc : ('You don’t have any ' + it.name + ' — buy or craft one first.')) + '">Use</button>';
        }
      } else {
        // Pure Laboratory ingredient (moon_herb/star_dew) — no direct "use" of its own; it's
        // consumed automatically by the Alchemy Lab's recipes, same idea as the old
        // "Used at the Farm" note for feed/fertilizer, just a different destination.
        useRow = '<span class="istr-note" title="Not used from here — spent automatically when you Mix a recipe at the Laboratory">Used at the Laboratory 🧪</span>';
      }

      return (
        '<div class="istr-card">' +
          (owned > 0 ? '<span class="istr-owned" title="How many you own">x' + owned + '</span>' : '') +
          '<span class="istr-icon">' + it.icon + '</span>' +
          '<span class="istr-name">' + it.name + '</span>' +
          '<span class="istr-desc">' + it.desc + '</span>' +
          buyRow +
          '<div class="istr-buy-row">' + useRow + '</div>' +
        '</div>'
      );
    }).join('');
  }
