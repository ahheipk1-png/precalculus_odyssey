  // ============================================================================
  // Farm 🌾 — Precalculus Odyssey (module 18)
  // ----------------------------------------------------------------------------
  // Classic script sharing the one global scope (see other js/ modules). Load it
  // AFTER 09-items.js (ITEMS/addItem/spendItem/countItem) and 13-audio.js; the
  // view lives in an initially-empty <div id="farmView" class="view-container">
  // that index.html provides — openFarm() rebuilds the whole UI on every open.
  //
  // THE CLOCK: no real-time timers. state.solveClock (total problems ever solved,
  // incremented in 05-render.js on every correct answer) is the farm's clock —
  // "1 room of practice" = 9 solves. Crops/animals mature by comparing solveClock
  // deltas, so the farm grows exactly as fast as the player practices math.
  //
  // PERSISTED SHAPE (state.farm is wholesale-saved by 03-save.js):
  //   state.farm = { plots: [plot|null, ...], animals: [...], houses: 1 }
  //   plot   = { crop: 'apple', plantedAt: <solveClock>, fert: false }
  //   animal = { type: 'sheep', boughtAt: <solveClock>, fed: false, fedAt: <solveClock> }
  // We extend the shape with plots as a FIXED-LENGTH array (null = empty plot,
  // length = plots owned) plus animal.fedAt (growth counts from FEEDING, not
  // buying). ensureFarmShape() normalizes old/partial saves defensively.
  //
  // Money is Cash 💵 (state.coins). All coin/inventory writes are followed by a
  // guarded updateStats() — it refreshes the HUD and autosaves; we NEVER touch
  // localStorage ourselves. Every cross-module call is typeof-guarded so the
  // module also survives being loaded standalone.
  // ============================================================================

  // ---------- Tuning constants ----------
  var FARM_ROOM_SOLVES   = 9;   // "1 room of practice" = 9 solves
  var FARM_FERT_SOLVES   = 9;   // fertilized crop matures this many solves after planting
  var FARM_SLOW_SOLVES   = 27;  // unfertilized crop (3 rooms — fertilizer is worth it!)
  var FARM_ANIMAL_SOLVES = 9;   // animal matures this many solves after being FED
  var FARM_START_PLOTS   = 6;
  var FARM_MAX_PLOTS     = 12;
  var FARM_PLOT_COST     = 80;
  var FARM_MAX_HOUSES    = 4;
  var FARM_HOUSE_COST    = 120;
  var FARM_HOUSE_CAP     = 4;   // animals per Animal House

  // ---------- Data tables ----------
  var FARM_CROPS = {
    apple:     { name: 'Apple',      icon: '🍎', seed: 20, sell: 45 },
    orange:    { name: 'Orange',     icon: '🍊', seed: 25, sell: 55 },
    rice:      { name: 'Rice',       icon: '🍚', seed: 12, sell: 26 },
    wheat:     { name: 'Wheat',      icon: '🌾', seed: 10, sell: 22 },
    corn:      { name: 'Corn',       icon: '🌽', seed: 15, sell: 34 },
    coffee:    { name: 'Coffee',     icon: '☕', seed: 30, sell: 70 },
    sugarcane: { name: 'Sugarcane',  icon: '🎋', seed: 18, sell: 40 }
  };
  var FARM_CROP_ORDER = ['wheat', 'rice', 'corn', 'sugarcane', 'apple', 'orange', 'coffee'];

  var FARM_ANIMALS = {
    chicken: { name: 'Chicken', icon: '🐔', buy: 30, sell: 70 },
    duck:    { name: 'Duck',    icon: '🦆', buy: 35, sell: 82 },
    sheep:   { name: 'Sheep',   icon: '🐑', buy: 50, sell: 115 },
    pig:     { name: 'Pig',     icon: '🐖', buy: 65, sell: 150 },
    cow:     { name: 'Cow',     icon: '🐄', buy: 90, sell: 210 }
  };
  var FARM_ANIMAL_ORDER = ['chicken', 'duck', 'sheep', 'pig', 'cow'];

  // Market panel toggle — pure UI state, intentionally NOT persisted.
  var farmMarketOpen = false;

  // ---------- Shape guard ----------
  // Normalizes state.farm from any save (missing fields, old shapes). plots is a
  // fixed-length array where null = an empty-but-owned plot; plotCount is derived
  // and stored so bought plots persist even while empty.
  function ensureFarmShape(){
    if (!state.farm || typeof state.farm !== 'object') state.farm = { plots: [], animals: [], houses: 1 };
    var f = state.farm;
    if (!Array.isArray(f.plots)) f.plots = [];
    if (!Array.isArray(f.animals)) f.animals = [];
    f.houses = Math.min(FARM_MAX_HOUSES, Math.max(1, f.houses || 1));
    f.plotCount = Math.min(FARM_MAX_PLOTS, Math.max(FARM_START_PLOTS, f.plotCount || 0, f.plots.length));
    while (f.plots.length < f.plotCount) f.plots.push(null);
    return f;
  }

  // ---------- Small internal helpers ----------
  function farmClock(){ return state.solveClock || 0; }
  function farmCountItem(id){ return (typeof countItem === 'function') ? countItem(id) : 0; }
  function farmItemPrice(id, fallback){
    return (typeof ITEMS !== 'undefined' && ITEMS[id] && ITEMS[id].price) ? ITEMS[id].price : fallback;
  }
  function farmAnimalCapacity(){ return ensureFarmShape().houses * FARM_HOUSE_CAP; }
  function farmUsedPlots(){
    return ensureFarmShape().plots.filter(function(p){ return !!p; }).length;
  }
  function farmFirstEmptyPlot(){
    var plots = ensureFarmShape().plots;
    for (var i = 0; i < plots.length; i++){ if (!plots[i]) return i; }
    return -1;
  }
  function farmPlural(n){ return n === 1 ? 'problem' : 'problems'; }

  // ---------- PURE progress helpers (unit-testable from the console) ----------
  // Both accept an optional `clock` so tests don't need to poke state.solveClock:
  //   cropProgress({crop:'apple', plantedAt:0, fert:true}, 9)  -> { ready:true, remain:0, ... }
  //   animalProgress({type:'cow', boughtAt:0, fed:false}, 99)  -> { ready:false, remain:Infinity, hungry:true }
  function cropProgress(plot, clock){
    var c = (typeof clock === 'number') ? clock : farmClock();
    if (!plot || !plot.crop) return { ready: false, remain: Infinity, elapsed: 0, need: Infinity };
    var need = plot.fert ? FARM_FERT_SOLVES : FARM_SLOW_SOLVES;
    var elapsed = Math.max(0, c - (plot.plantedAt || 0));
    var remain = Math.max(0, need - elapsed);
    return { ready: remain === 0, remain: remain, elapsed: elapsed, need: need };
  }
  function animalProgress(a, clock){
    var c = (typeof clock === 'number') ? clock : farmClock();
    if (!a || !a.type) return { ready: false, remain: Infinity, hungry: false, elapsed: 0, need: FARM_ANIMAL_SOLVES };
    if (!a.fed) return { ready: false, remain: Infinity, hungry: true, elapsed: 0, need: FARM_ANIMAL_SOLVES };
    // Growth counts from FEEDING; fedAt falls back to boughtAt for older saves.
    var fedAt = (typeof a.fedAt === 'number') ? a.fedAt : (a.boughtAt || 0);
    var elapsed = Math.max(0, c - fedAt);
    var remain = Math.max(0, FARM_ANIMAL_SOLVES - elapsed);
    return { ready: remain === 0, remain: remain, hungry: false, elapsed: elapsed, need: FARM_ANIMAL_SOLVES };
  }

  // ---------- Shared "the deed is done" plumbing ----------
  // Success: buy-beep + HUD refresh (updateStats also autosaves). Failure: sad beep.
  // Either way: toast the message and re-render the farm if it's on screen.
  function farmAfterAction(res, sfxName){
    if (res.ok) {
      if (typeof playSfx === 'function') playSfx(sfxName || 'buy');
      if (typeof updateStats === 'function') updateStats();
    } else {
      if (typeof playSfx === 'function') playSfx('wrong');
    }
    if (typeof showToast === 'function') showToast(res.msg);
    farmRerenderIfOpen();
    return res;
  }

  // ---------- Actions (wired to buttons; each returns { ok, msg }) ----------

  // farmBuy(kind, id) — the one market entry point.
  // kind: 'seed' | 'animal' | 'feed' | 'fert' | 'plot' | 'house'
  // Buying a seed plants it straight into the first empty plot (no seed inventory —
  // deliberately simple for kids: buy = plant).
  function farmBuy(kind, id){
    var f = ensureFarmShape();
    var res = { ok: false, msg: 'Hmm, the market doesn’t sell that.' };

    if (kind === 'seed') {
      var crop = FARM_CROPS[id];
      var slot = farmFirstEmptyPlot();
      if (!crop)                       res = { ok: false, msg: 'Unknown seed.' };
      else if (slot < 0)               res = { ok: false, msg: 'All plots are busy! Harvest a crop or buy a new plot.' };
      else if (state.coins < crop.seed) res = { ok: false, msg: 'Not enough Cash 💵 — ' + crop.name + ' seeds cost ' + crop.seed + '.' };
      else {
        state.coins -= crop.seed;
        f.plots[slot] = { crop: id, plantedAt: farmClock(), fert: false };
        res = { ok: true, msg: crop.icon + ' ' + crop.name + ' planted in plot ' + (slot + 1) + '! Solve problems to grow it.' };
      }

    } else if (kind === 'animal') {
      var an = FARM_ANIMALS[id];
      if (!an)                                          res = { ok: false, msg: 'Unknown animal.' };
      else if (f.animals.length >= farmAnimalCapacity()) res = { ok: false, msg: 'Animal houses are full! Buy another 🏠 at the market.' };
      else if (state.coins < an.buy)                     res = { ok: false, msg: 'Not enough Cash 💵 — a ' + an.name.toLowerCase() + ' costs ' + an.buy + '.' };
      else {
        state.coins -= an.buy;
        f.animals.push({ type: id, boughtAt: farmClock(), fed: false });
        res = { ok: true, msg: an.icon + ' A young ' + an.name.toLowerCase() + ' joined the farm! Feed it so it can grow up.' };
      }

    } else if (kind === 'feed' || kind === 'fert') {
      var itemId = (kind === 'feed') ? 'feed' : 'fertilizer';
      var price = farmItemPrice(itemId, 15);
      var label = (kind === 'feed') ? '🌾 Animal Feed' : '🪴 Fertilizer';
      if (typeof addItem !== 'function')  res = { ok: false, msg: 'The market stall isn’t open yet.' };
      else if (state.coins < price)       res = { ok: false, msg: 'Not enough Cash 💵 — ' + label + ' costs ' + price + '.' };
      else {
        state.coins -= price;
        addItem(itemId, 1);
        res = { ok: true, msg: label + ' bought! You have ' + farmCountItem(itemId) + '.' };
      }

    } else if (kind === 'plot') {
      if (f.plotCount >= FARM_MAX_PLOTS)      res = { ok: false, msg: 'Your farm already has the maximum ' + FARM_MAX_PLOTS + ' plots!' };
      else if (state.coins < FARM_PLOT_COST)  res = { ok: false, msg: 'Not enough Cash 💵 — a new plot costs ' + FARM_PLOT_COST + '.' };
      else {
        state.coins -= FARM_PLOT_COST;
        f.plotCount += 1;
        f.plots.push(null);
        res = { ok: true, msg: '🟫 New plot cleared! You now have ' + f.plotCount + ' plots.' };
      }

    } else if (kind === 'house') {
      if (f.houses >= FARM_MAX_HOUSES)         res = { ok: false, msg: 'You already have the maximum ' + FARM_MAX_HOUSES + ' animal houses!' };
      else if (state.coins < FARM_HOUSE_COST)  res = { ok: false, msg: 'Not enough Cash 💵 — an Animal House costs ' + FARM_HOUSE_COST + '.' };
      else {
        state.coins -= FARM_HOUSE_COST;
        f.houses += 1;
        res = { ok: true, msg: '🏠 New Animal House built! Room for ' + farmAnimalCapacity() + ' animals now.' };
      }
    }

    return farmAfterAction(res, 'buy');
  }

  // Harvest a mature crop: plot pays its sell price and becomes empty again.
  function farmHarvest(plotIndex){
    var f = ensureFarmShape();
    var plot = f.plots[plotIndex];
    var res;
    if (!plot) res = { ok: false, msg: 'Nothing is planted there.' };
    else {
      var p = cropProgress(plot);
      var crop = FARM_CROPS[plot.crop] || { name: plot.crop, icon: '🌿', sell: 0 };
      if (!p.ready) res = { ok: false, msg: crop.name + ' isn’t ripe yet — solve ' + p.remain + ' more ' + farmPlural(p.remain) + '!' };
      else {
        state.coins += crop.sell;
        f.plots[plotIndex] = null;
        res = { ok: true, msg: crop.icon + ' Harvested ' + crop.name + '! +' + crop.sell + ' 💵' };
      }
    }
    return farmAfterAction(res, 'buy');
  }

  // Feed a hungry animal (spends 1 'feed' from the inventory). Growth starts NOW.
  function farmFeed(animalIndex){
    var f = ensureFarmShape();
    var a = f.animals[animalIndex];
    var res;
    if (!a) res = { ok: false, msg: 'No animal there.' };
    else {
      var p = animalProgress(a);
      var info = FARM_ANIMALS[a.type] || { name: a.type, icon: '🐾' };
      if (p.ready)      res = { ok: false, msg: info.name + ' is all grown up — you can sell it!' };
      else if (a.fed)   res = { ok: false, msg: info.name + ' is already fed! Solve ' + p.remain + ' more ' + farmPlural(p.remain) + '.' };
      else if (typeof spendItem !== 'function' || !spendItem('feed')) {
        res = { ok: false, msg: 'No feed! 🌾 Buy Animal Feed at the market.' };
      } else {
        a.fed = true;
        a.fedAt = farmClock();
        res = { ok: true, msg: info.icon + ' Yum! Solve ' + FARM_ANIMAL_SOLVES + ' problems and your ' + info.name.toLowerCase() + ' will grow up.' };
      }
    }
    return farmAfterAction(res, 'ui-click');
  }

  // Fertilize a growing crop (spends 1 'fertilizer'): 27-solve crop becomes a 9-solve
  // crop, counted from PLANTING — so late fertilizing can even ripen it instantly.
  function farmFertilize(plotIndex){
    var f = ensureFarmShape();
    var plot = f.plots[plotIndex];
    var res;
    if (!plot) res = { ok: false, msg: 'Nothing is planted there.' };
    else {
      var p = cropProgress(plot);
      var crop = FARM_CROPS[plot.crop] || { name: plot.crop, icon: '🌿' };
      if (plot.fert)   res = { ok: false, msg: crop.name + ' is already fertilized!' };
      else if (p.ready) res = { ok: false, msg: crop.name + ' is already ripe — harvest it!' };
      else if (typeof spendItem !== 'function' || !spendItem('fertilizer')) {
        res = { ok: false, msg: 'No fertilizer! 🪴 Buy some at the market.' };
      } else {
        plot.fert = true;
        var after = cropProgress(plot);
        res = { ok: true, msg: after.ready
          ? '🪴 Fertilized! ' + crop.icon + ' ' + crop.name + ' shot up — it’s ready to harvest!'
          : '🪴 Fertilized! Only ' + after.remain + ' more ' + farmPlural(after.remain) + ' until ' + crop.name + ' is ripe.' };
      }
    }
    return farmAfterAction(res, 'ui-click');
  }

  // Sell a grown animal: pays its sell price and frees the stall.
  function farmSellAnimal(animalIndex){
    var f = ensureFarmShape();
    var a = f.animals[animalIndex];
    var res;
    if (!a) res = { ok: false, msg: 'No animal there.' };
    else {
      var p = animalProgress(a);
      var info = FARM_ANIMALS[a.type] || { name: a.type, icon: '🐾', sell: 0 };
      if (p.hungry)      res = { ok: false, msg: info.name + ' is still little — feed it first! 🍽️' };
      else if (!p.ready) res = { ok: false, msg: info.name + ' is still growing — solve ' + p.remain + ' more ' + farmPlural(p.remain) + '!' };
      else {
        state.coins += info.sell;
        f.animals.splice(animalIndex, 1);
        res = { ok: true, msg: info.icon + ' Sold your ' + info.name.toLowerCase() + ' for ' + info.sell + ' 💵!' };
      }
    }
    return farmAfterAction(res, 'buy');
  }

  // ---------- View controllers ----------
  function openFarm(){
    ensureFarmShape();
    farmMarketOpen = false;
    renderFarmView();
    // Toggle views exactly like openShop: hide every other active view, show ours.
    // Belt & braces: the three classic views by id, plus any .view-container.
    ['equationView', 'shopView', 'battleView'].forEach(function(vid){
      var n = document.getElementById(vid);
      if (n) n.classList.remove('active');
    });
    document.querySelectorAll('.view-container.active').forEach(function(v){ v.classList.remove('active'); });
    var view = document.getElementById('farmView');
    if (view) view.classList.add('active');
    if (typeof playMusic === 'function') playMusic('practice');
  }

  function closeFarm(){
    var view = document.getElementById('farmView');
    if (view) view.classList.remove('active');
    if (typeof openMapHub === 'function') { openMapHub(); return; }
    // Fallback when no map hub exists yet: return to the practice board.
    var eq = document.getElementById('equationView');
    if (eq) eq.classList.add('active');
    if (typeof playMusic === 'function') playMusic('practice');
  }

  function farmGoMarket(open){
    farmMarketOpen = !!open;
    if (typeof playSfx === 'function') playSfx('ui-click');
    renderFarmView();
  }

  function farmRerenderIfOpen(){
    var view = document.getElementById('farmView');
    if (view && view.classList.contains('active')) renderFarmView();
  }

  // ---------- Rendering ----------
  // The whole UI is rebuilt into #farmView on every open/action. Buttons use
  // inline onclick with our global functions, so re-rendering never orphans
  // listeners. No `el` cache reliance — getElementById at call time (rule 3).
  function renderFarmView(){
    var view = document.getElementById('farmView');
    if (!view) return;
    var f = ensureFarmShape();
    var cap = farmAnimalCapacity();

    var marketBtn = farmMarketOpen
      ? '<button class="btn btn-primary farm-market-btn" onclick="farmGoMarket(false)">🌱 Back to Farm</button>'
      : '<button class="btn btn-primary farm-market-btn" onclick="farmGoMarket(true)">🛒 Go to Market</button>';

    var html =
      '<div class="farm-wrap">' +
        '<div class="farm-topbar">' +
          '<button class="btn btn-ghost farm-back-btn" onclick="closeFarm()">← Back to Earth</button>' +
          '<h2 class="farm-title">' + (farmMarketOpen ? '🛒 Farmers’ Market' : '🌾 Odyssey Farm') + '</h2>' +
          marketBtn +
        '</div>' +
        '<div class="farm-strip">' +
          '<span class="farm-chip farm-chip-cash">💵 ' + state.coins + '</span>' +
          '<span class="farm-chip" title="Animal Feed">🌾 ' + farmCountItem('feed') + ' feed</span>' +
          '<span class="farm-chip" title="Fertilizer">🪴 ' + farmCountItem('fertilizer') + ' fertilizer</span>' +
          '<span class="farm-chip" title="Plots in use">🟫 ' + farmUsedPlots() + '/' + f.plotCount + ' plots</span>' +
          '<span class="farm-chip" title="Animal capacity">🏠 ' + f.animals.length + '/' + cap + ' animals</span>' +
        '</div>' +
        (farmMarketOpen ? farmRenderMarket() : farmRenderYard()) +
      '</div>';

    view.innerHTML = html;
  }

  // A tiny solves-progress bar (elapsed / need).
  function farmBar(elapsed, need){
    var pct = need > 0 ? Math.min(100, Math.round((elapsed / need) * 100)) : 0;
    return '<div class="farm-bar"><div class="farm-bar-fill" style="width:' + pct + '%"></div></div>';
  }

  // ----- The farm yard (default panel): crops + animals -----
  function farmRenderYard(){
    var f = ensureFarmShape();
    var out = '';

    // First-visit onboarding: nothing planted and no animals yet.
    if (farmUsedPlots() === 0 && f.animals.length === 0) {
      out += '<div class="farm-onboard">👩‍🌾 Welcome to your farm! Buy your first seed at the ' +
             '<strong>🛒 Market</strong> — then every math problem you solve makes your crops grow. ' +
             '<strong>9 solves</strong> = 1 planet of practice!</div>';
    }

    // Crops
    out += '<h3 class="farm-h">🪴 Crops</h3><div class="farm-grid">';
    f.plots.forEach(function(plot, i){ out += farmRenderPlotCard(plot, i); });
    out += '</div>';

    // Animals
    out += '<h3 class="farm-h">🏠 Animals <span class="farm-h-sub">' + f.animals.length + '/' + farmAnimalCapacity() + ' stalls</span></h3>';
    out += '<div class="farm-grid">';
    f.animals.forEach(function(a, i){ out += farmRenderAnimalCard(a, i); });
    for (var s = f.animals.length; s < farmAnimalCapacity(); s++){
      out += '<div class="farm-card farm-empty">' +
               '<div class="farm-card-icon">🏠</div>' +
               '<div class="farm-card-name">Empty Stall</div>' +
               '<button class="btn btn-ghost farm-mini" onclick="farmGoMarket(true)">🛒 Buy animals</button>' +
             '</div>';
    }
    out += '</div>';

    out += '<p class="farm-note">⏰ Farm time = math practice! Everything grows while you solve problems on your Odyssey.</p>';
    return out;
  }

  function farmRenderPlotCard(plot, i){
    if (!plot) {
      return '<div class="farm-card farm-empty">' +
               '<div class="farm-card-icon">🟫</div>' +
               '<div class="farm-card-name">Empty Plot</div>' +
               '<button class="btn btn-ghost farm-mini" onclick="farmGoMarket(true)">🛒 Buy seeds</button>' +
             '</div>';
    }
    var crop = FARM_CROPS[plot.crop] || { name: plot.crop, icon: '🌿', sell: 0 };
    var p = cropProgress(plot);

    if (p.ready) {
      return '<div class="farm-card farm-ready">' +
               '<div class="farm-card-icon">' + crop.icon + '</div>' +
               '<div class="farm-card-name">' + crop.name + '</div>' +
               '<div class="farm-status farm-status-ready">Ready to harvest!</div>' +
               '<button class="btn btn-primary farm-mini" onclick="farmHarvest(' + i + ')">Harvest +' + crop.sell + ' 💵</button>' +
             '</div>';
    }

    // Growing: 🌱 for the first third, 🌿 after that, crop icon when ready.
    var stageIcon = (p.elapsed / p.need) < 0.34 ? '🌱' : '🌿';
    var fertBit;
    if (plot.fert) {
      fertBit = '<div class="farm-fert-tag">🪴 fertilized</div>';
    } else if (farmCountItem('fertilizer') > 0) {
      fertBit = '<button class="btn btn-ghost farm-mini" onclick="farmFertilize(' + i + ')">🪴 Fertilize (faster!)</button>';
    } else {
      fertBit = '<button class="btn btn-ghost farm-mini" disabled title="Buy fertilizer at the market">🪴 Fertilize</button>' +
                '<div class="farm-why">No fertilizer — get some at the market</div>';
    }
    return '<div class="farm-card">' +
             '<div class="farm-card-icon">' + stageIcon + '</div>' +
             '<div class="farm-card-name">' + crop.name + '</div>' +
             farmBar(p.elapsed, p.need) +
             '<div class="farm-status">Solve ' + p.remain + ' more ' + farmPlural(p.remain) + '!</div>' +
             fertBit +
           '</div>';
  }

  function farmRenderAnimalCard(a, i){
    var info = FARM_ANIMALS[a.type] || { name: a.type, icon: '🐾', sell: 0 };
    var p = animalProgress(a);

    if (p.ready) {
      return '<div class="farm-card farm-ready">' +
               '<div class="farm-card-icon">' + info.icon + '</div>' +
               '<div class="farm-card-name">' + info.name + '</div>' +
               '<div class="farm-status farm-status-ready">All grown up!</div>' +
               '<button class="btn btn-primary farm-mini" onclick="farmSellAnimal(' + i + ')">Sell +' + info.sell + ' 💵</button>' +
             '</div>';
    }
    if (p.hungry) {
      var canFeed = farmCountItem('feed') > 0;
      return '<div class="farm-card farm-hungry">' +
               '<div class="farm-card-icon">' + info.icon + '</div>' +
               '<div class="farm-card-name">Young ' + info.name + '</div>' +
               '<div class="farm-status farm-status-hungry">Hungry! 🍽️</div>' +
               '<button class="btn btn-primary farm-mini"' + (canFeed ? '' : ' disabled title="Buy Animal Feed at the market"') +
                 ' onclick="farmFeed(' + i + ')">🌾 Feed</button>' +
               (canFeed ? '' : '<div class="farm-why">No feed — get some at the market</div>') +
             '</div>';
    }
    return '<div class="farm-card">' +
             '<div class="farm-card-icon">' + info.icon + '</div>' +
             '<div class="farm-card-name">Young ' + info.name + '</div>' +
             farmBar(p.elapsed, p.need) +
             '<div class="farm-status">Growing… solve ' + p.remain + ' more ' + farmPlural(p.remain) + '!</div>' +
           '</div>';
  }

  // ----- The market panel (inside the farm view) -----
  // Every card is a farmBuy() button; when a purchase is impossible the button is
  // disabled AND a one-line reason is shown (kids shouldn't have to guess).
  function farmMarketCard(icon, name, sub, priceLabel, onclickStr, reason){
    return '<div class="farm-card farm-shopcard' + (reason ? ' farm-cant' : '') + '">' +
             '<div class="farm-card-icon">' + icon + '</div>' +
             '<div class="farm-card-name">' + name + '</div>' +
             '<div class="farm-card-sub">' + sub + '</div>' +
             '<button class="btn btn-primary farm-mini"' + (reason ? ' disabled' : '') + ' onclick="' + onclickStr + '">' + priceLabel + '</button>' +
             (reason ? '<div class="farm-why">' + reason + '</div>' : '') +
           '</div>';
  }

  function farmRenderMarket(){
    var f = ensureFarmShape();
    var noPlot = farmFirstEmptyPlot() < 0;
    var noCap = f.animals.length >= farmAnimalCapacity();
    var out = '<p class="farm-note">Everything is paid in Cash 💵. Seeds are planted straight into your first empty plot!</p>';

    // Seeds
    out += '<h3 class="farm-h">🌱 Seeds</h3><div class="farm-grid">';
    FARM_CROP_ORDER.forEach(function(id){
      var c = FARM_CROPS[id];
      var reason = noPlot ? 'No empty plots' : (state.coins < c.seed ? 'Not enough Cash' : '');
      out += farmMarketCard(c.icon, c.name, 'Sells for ' + c.sell + ' 💵',
        'Plant · ' + c.seed + ' 💵', "farmBuy('seed','" + id + "')", reason);
    });
    out += '</div>';

    // Animals
    out += '<h3 class="farm-h">🐾 Young Animals</h3><div class="farm-grid">';
    FARM_ANIMAL_ORDER.forEach(function(id){
      var a = FARM_ANIMALS[id];
      var reason = noCap ? 'Animal houses are full' : (state.coins < a.buy ? 'Not enough Cash' : '');
      out += farmMarketCard(a.icon, a.name, 'Sells grown for ' + a.sell + ' 💵',
        'Buy · ' + a.buy + ' 💵', "farmBuy('animal','" + id + "')", reason);
    });
    out += '</div>';

    // Supplies
    var feedPrice = farmItemPrice('feed', 15);
    var fertPrice = farmItemPrice('fertilizer', 15);
    out += '<h3 class="farm-h">🎒 Farm Supplies</h3><div class="farm-grid">';
    out += farmMarketCard('🌾', 'Animal Feed', 'You have ' + farmCountItem('feed') + ' · grows an animal in ' + FARM_ANIMAL_SOLVES + ' solves',
      'Buy · ' + feedPrice + ' 💵', "farmBuy('feed')", state.coins < feedPrice ? 'Not enough Cash' : '');
    out += farmMarketCard('🪴', 'Fertilizer', 'You have ' + farmCountItem('fertilizer') + ' · crop ripens in ' + FARM_FERT_SOLVES + ' solves instead of ' + FARM_SLOW_SOLVES,
      'Buy · ' + fertPrice + ' 💵', "farmBuy('fert')", state.coins < fertPrice ? 'Not enough Cash' : '');
    out += '</div>';

    // Expansions
    out += '<h3 class="farm-h">🔨 Expand the Farm</h3><div class="farm-grid">';
    var plotReason = f.plotCount >= FARM_MAX_PLOTS ? 'Max plots reached!' : (state.coins < FARM_PLOT_COST ? 'Not enough Cash' : '');
    out += farmMarketCard('🟫', 'Extra Plot', 'You have ' + f.plotCount + '/' + FARM_MAX_PLOTS + ' plots',
      'Buy · ' + FARM_PLOT_COST + ' 💵', "farmBuy('plot')", plotReason);
    var houseReason = f.houses >= FARM_MAX_HOUSES ? 'Max houses reached!' : (state.coins < FARM_HOUSE_COST ? 'Not enough Cash' : '');
    out += farmMarketCard('🏠', 'Animal House', 'You have ' + f.houses + '/' + FARM_MAX_HOUSES + ' · each holds ' + FARM_HOUSE_CAP + ' animals',
      'Build · ' + FARM_HOUSE_COST + ' 💵', "farmBuy('house')", houseReason);
    out += '</div>';

    return out;
  }
