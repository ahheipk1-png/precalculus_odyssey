  // ============================================================================
  // Alchemy Lab 🧪 (view: #alchemyView, prefix: alch-) — Precalculus Odyssey
  // ----------------------------------------------------------------------------
  // Classic script sharing the one global scope (see other js/ modules). Uses
  // the 09-items.js economy: ITEMS/countItem/spendItem/addItem/useItem for
  // ingredients & products, MATERIALS/spendMaterials for monster drops. Every
  // cross-module call is guarded (`typeof x === 'function'`) so a missing or
  // late-loading module degrades gracefully instead of throwing.
  //
  // The lab turns Item-Store ingredients (🌿 Moon Herb, ✨ Star Dew) plus
  // monster-drop materials (🫀 Essence, 🥈 Silver) into the two craft-only
  // consumables already defined in ITEMS with price 0 (💊 Super Medicine,
  // ☠️ Poison Vial). Design decisions:
  //   • canCraft() is PURE — it only READS state — so it is console-testable
  //     and doubles as the driver for the Mix buttons' disabled state.
  //   • craftRecipe() re-checks canCraft() itself, so the ~0.9s cauldron-brew
  //     animation can safely defer the actual spend until the bubbling ends
  //     (nothing else can change inventory while the lab view is up, and the
  //     re-check makes it safe even if something did).
  //   • The whole view re-renders via innerHTML on open and after every state
  //     change — no `el` caching for lab elements (the container starts empty;
  //     index.html only provides <div id="alchemyView" class="view-container">).
  //   • updateStats() (guarded) runs after every craft/use — it refreshes the
  //     HUD and autosaves; this module never touches localStorage itself.
  // ============================================================================

  // ---------- Recipes ----------
  // items: ingredient id -> count (state.inventory), materials: id -> count
  // (state.materials). Amounts tuned to feel earnable: one shop trip + one or
  // two battles per brew.
  var ALCHEMY_RECIPES = {
    super_medicine: {
      product: 'super_medicine',
      icon: '💊',
      name: 'Super Medicine',
      desc: 'Fully restores HP &amp; MP.',
      items: { moon_herb: 2, star_dew: 1 },
      materials: { energy_core: 1 }
    },
    poison_vial: {
      product: 'poison_vial',
      icon: '⚗️',
      name: 'Acid Vial',
      desc: 'Douses the next monster in acid — it corrodes for 3 rounds.',
      items: { moon_herb: 1 },
      materials: { energy_core: 2, robotic_alloy: 1 }
    }
  };
  var ALCHEMY_ORDER = ['super_medicine', 'poison_vial'];

  // ---------- Small read-only lookups (with fallbacks if 09-items.js moved) ----------
  function alchItemCount(id){
    if (typeof countItem === 'function') return countItem(id);
    return (state.inventory && state.inventory[id]) || 0;
  }
  function alchMatCount(id){
    return (state.chips && state.chips[id]) || 0;
  }
  function alchItemLabel(id){
    var def = (typeof ITEMS !== 'undefined' && ITEMS[id]) ? ITEMS[id] : null;
    return def ? def.icon + ' ' + def.name : id;
  }
  function alchMatLabel(id){
    var def = (typeof CHIPS !== 'undefined' && CHIPS[id]) ? CHIPS[id] : null;
    return def ? def.icon + ' ' + def.name : id;
  }

  // ---------- PURE: can this recipe be brewed right now? ----------
  // Returns { ok, missing: [human-readable strings] } and never writes state.
  function canCraft(recipeId){
    var r = ALCHEMY_RECIPES[recipeId];
    if (!r) return { ok: false, missing: ['Unknown recipe "' + recipeId + '"'] };
    var missing = [];
    Object.keys(r.items).forEach(function(id){
      var have = alchItemCount(id), need = r.items[id];
      if (have < need) missing.push(alchItemLabel(id) + ' ×' + (need - have) + ' more');
    });
    Object.keys(r.materials).forEach(function(id){
      var have = alchMatCount(id), need = r.materials[id];
      if (have < need) missing.push(alchMatLabel(id) + ' ×' + (need - have) + ' more');
    });
    return { ok: missing.length === 0, missing: missing };
  }

  // ---------- Brew: spend ingredients + materials, gain 1 product ----------
  // Returns { ok, msg }; the caller shows the toast. Safe to call directly from
  // the console — it validates via canCraft() before spending anything.
  function craftRecipe(recipeId){
    var r = ALCHEMY_RECIPES[recipeId];
    if (!r) return { ok: false, msg: 'Unknown recipe.' };
    var check = canCraft(recipeId);
    if (!check.ok) return { ok: false, msg: 'Missing: ' + check.missing.join(', ') };
    Object.keys(r.items).forEach(function(id){
      if (typeof spendItem === 'function') spendItem(id, r.items[id]);
      else state.inventory[id] = (state.inventory[id] || 0) - r.items[id];
    });
    if (typeof spendMaterials === 'function') spendMaterials(r.materials);
    else Object.keys(r.materials).forEach(function(id){ state.materials[id] = (state.materials[id] || 0) - r.materials[id]; });
    if (typeof addItem === 'function') addItem(r.product, 1);
    else state.inventory[r.product] = (state.inventory[r.product] || 0) + 1;
    if (typeof updateStats === 'function') updateStats(); // HUD refresh + autosave
    return { ok: true, msg: 'Brewed 1 ' + r.icon + ' ' + r.name.replace('&amp;', '&') + '!' };
  }

  // ---------- View open/close (same toggle pattern as openShop) ----------
  function openAlchemy(){
    var view = document.getElementById('alchemyView');
    if (!view) return;
    renderAlchemy();
    document.querySelectorAll('.view-container.active').forEach(function(v){ v.classList.remove('active'); });
    view.classList.add('active');
    if (typeof playSfx === 'function') playSfx('machine');   // AI-chip mixing machine powers up
    if (typeof playMusic === 'function') playMusic('shop');
  }

  function closeAlchemy(){
    var view = document.getElementById('alchemyView');
    if (view) view.classList.remove('active');
    if (typeof openMapHub === 'function') { openMapHub(); return; }
    // Fallback if the map hub module isn't loaded: return to the practice board.
    var eq = document.getElementById('equationView');
    if (eq) eq.classList.add('active');
    if (typeof playMusic === 'function') playMusic('practice');
  }

  // ---------- Render ----------
  // No user-derived strings are interpolated below — everything comes from this
  // module's own constant data (escapeHtml() would be used otherwise, rule 9).
  function renderAlchemy(){
    var view = document.getElementById('alchemyView');
    if (!view) return;

    // Ingredient shelf: the four things the cauldron eats, with live counts.
    var jars = [
      { icon: '🌿', name: 'Moon Herb', count: alchItemCount('moon_herb') },
      { icon: '✨', name: 'Star Dew',  count: alchItemCount('star_dew') },
      { icon: '🔋', name: 'Energy Core',   count: alchMatCount('energy_core') },
      { icon: '🔩', name: 'Robotic Alloy', count: alchMatCount('robotic_alloy') }
    ];
    var jarHtml = jars.map(function(j){
      return '<div class="alch-jar"><span class="alch-jar-icon">' + j.icon + '</span>' +
        '<span class="alch-jar-count">' + j.count + '</span>' +
        '<span class="alch-jar-name">' + j.name + '</span></div>';
    }).join('');

    // Recipe cards.
    var cardsHtml = ALCHEMY_ORDER.map(function(rid){
      var r = ALCHEMY_RECIPES[rid];
      var check = canCraft(rid);
      var rows = '';
      Object.keys(r.items).forEach(function(id){
        rows += alchNeedRow(alchItemLabel(id), alchItemCount(id), r.items[id]);
      });
      Object.keys(r.materials).forEach(function(id){
        rows += alchNeedRow(alchMatLabel(id), alchMatCount(id), r.materials[id]);
      });
      return '<div class="alch-card">' +
        '<div class="alch-card-head">' +
          '<span class="alch-card-icon">' + r.icon + '</span>' +
          '<div><div class="alch-card-name">' + r.name + '</div>' +
          '<div class="alch-card-desc">' + r.desc + '</div></div>' +
        '</div>' +
        '<ul class="alch-needs">' + rows + '</ul>' +
        '<button class="btn btn-primary alch-mix-btn" onclick="alchMix(\'' + rid + '\')"' +
          (check.ok ? '' : ' disabled') + '>🧪 Mix!</button>' +
        (check.ok ? '' : '<div class="alch-missing">Need: ' + check.missing.join(', ') + '</div>') +
        '</div>';
    }).join('');

    // Current stock of the two brews, each with a Use button.
    var stockHtml = ALCHEMY_ORDER.map(function(rid){
      var r = ALCHEMY_RECIPES[rid];
      var n = alchItemCount(r.product);
      return '<div class="alch-stock-row">' +
        '<span class="alch-stock-icon">' + r.icon + '</span>' +
        '<span class="alch-stock-name">' + r.name + '</span>' +
        '<span class="alch-stock-count">×' + n + '</span>' +
        '<button class="btn btn-ghost alch-use-btn" onclick="alchUse(\'' + r.product + '\')"' +
          (n > 0 ? '' : ' disabled') + '>Use</button>' +
        '</div>';
    }).join('');

    view.innerHTML =
      '<div class="alch-lab">' +
        '<div class="alch-header">' +
          '<button class="btn btn-ghost alch-back" onclick="closeAlchemy()">← Back to Earth</button>' +
          '<h2 class="alch-title">🧪 Laboratory</h2>' +
          '<p class="alch-tagline">Something is always bubbling…</p>' +
        '</div>' +
        '<div class="alch-scene">' +
          '<div class="alch-shelf">' +
            '<div class="alch-shelf-jars">' + jarHtml + '</div>' +
            '<div class="alch-shelf-board"></div>' +
          '</div>' +
          '<div class="alch-cauldron-zone">' +
            '<div class="alch-pop" id="alchPop" aria-hidden="true"></div>' +
            '<div class="alch-cauldron" id="alchCauldron">' +
              '<span class="alch-bubble alch-b1"></span>' +
              '<span class="alch-bubble alch-b2"></span>' +
              '<span class="alch-bubble alch-b3"></span>' +
              '<span class="alch-bubble alch-b4"></span>' +
              '<span class="alch-bubble alch-b5"></span>' +
              '<div class="alch-liquid"></div>' +
              '<div class="alch-pot"></div>' +
            '</div>' +
            '<div class="alch-fire">🔥</div>' +
          '</div>' +
        '</div>' +
        '<div class="alch-recipes">' + cardsHtml + '</div>' +
        '<div class="alch-stock">' +
          '<h3 class="alch-sub">🎒 Your Brews</h3>' + stockHtml +
        '</div>' +
        '<div class="alch-hint">🌿 Moon Herb &amp; ✨ Star Dew are sold at the Item Store; ' +
          '🫀 Essence and 🥈 Silver drop from monsters.</div>' +
      '</div>';
  }

  // One have/need line inside a recipe card (green when enough, coral when short).
  function alchNeedRow(label, have, need){
    var ok = have >= need;
    return '<li class="alch-need ' + (ok ? 'alch-ok' : 'alch-short') + '">' +
      '<span class="alch-need-label">' + label + '</span>' +
      '<span class="alch-need-count">' + have + ' / ' + need + '</span></li>';
  }

  // ---------- Button handlers ----------
  // Mix: bubble hard for ~0.9s, THEN craft (craftRecipe re-validates), pop the
  // product out of the cauldron and toast. A flag ignores clicks mid-brew.
  var alchBrewing = false;
  function alchMix(recipeId){
    if (alchBrewing) return;
    var check = canCraft(recipeId);
    if (!check.ok){
      if (typeof showToast === 'function') showToast('Not enough ingredients! Need: ' + check.missing.join(', '));
      return;
    }
    alchBrewing = true;
    var cauldron = document.getElementById('alchCauldron');
    if (cauldron) cauldron.classList.add('alch-brewing');
    if (typeof playSfx === 'function') playSfx('upgrade');
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(function(){
      alchBrewing = false;
      var res = craftRecipe(recipeId); // spends + adds + updateStats (autosave)
      if (typeof showToast === 'function') showToast(res.msg);
      renderAlchemy(); // refresh counts & button states (also drops .alch-brewing)
      if (res.ok){
        var pop = document.getElementById('alchPop');
        var r = ALCHEMY_RECIPES[recipeId];
        if (pop && r){
          pop.textContent = r.icon;
          pop.classList.remove('alch-pop-go');
          void pop.offsetWidth; // restart the CSS animation
          pop.classList.add('alch-pop-go');
        }
      }
    }, reduced ? 60 : 900);
  }

  // Use one of the brewed products (delegates the effect to useItem in 09-items.js).
  function alchUse(itemId){
    if (typeof useItem !== 'function'){
      if (typeof showToast === 'function') showToast('Items can’t be used right now.');
      return;
    }
    var res = useItem(itemId);
    if (typeof showToast === 'function') showToast(res.msg);
    if (typeof updateStats === 'function') updateStats(); // HUD refresh + autosave
    renderAlchemy();
  }
