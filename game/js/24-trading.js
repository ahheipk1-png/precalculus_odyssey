  // ============================================================================
  // Trading Room (#tradingView) — exchange Cash ⇄ Gold ⇄ Silver at FLUCTUATING
  // prices. Buy/sell, holdings, a price-history sparkline, a transaction log, and
  // a "Refresh Prices" that only moves prices when you answer a review question
  // correctly (per the design). Prices/history/log are per-session (not persisted);
  // holdings ARE the persisted state.currencies. Reachable from the Earth hub.
  // ============================================================================
  var _trPrices = null, _trHist = null, _trTx = null, _trReview = null;

  function _trInit(){
    if (_trPrices) return;
    _trPrices = { gold: TRADING.base.gold, silver: TRADING.base.silver };
    _trHist = { gold: [TRADING.base.gold], silver: [TRADING.base.silver] };
    _trTx = [];
  }

  // Current market spot price (Cash per unit) for a good — used by the Profile to value
  // holdings. Falls back to the base price if the Trading Room hasn't been opened yet.
  function currencySpot(good){
    return (_trPrices && _trPrices[good]) || (TRADING.base && TRADING.base[good]) || 0;
  }
  function currencyWorth(good, qty){ return Math.round(currencySpot(good) * (qty || 0)); }
  function _trClamp(good, v){
    var b = TRADING.base[good];
    return Math.max(Math.round(b * TRADING.minMult), Math.min(Math.round(b * TRADING.maxMult), v));
  }
  // Move prices on a correct review answer: mostly small drift, occasional jump/dump.
  function _trDrift(){
    TRADING.goods.forEach(function(g){
      var roll = rand(1, 100);
      var factor;
      if (roll <= 8) factor = 1 + (rand(15, 35) / 100);      // spike up
      else if (roll <= 16) factor = 1 - (rand(12, 28) / 100); // dump
      else factor = 1 + ((rand(0, 200) - 100) / 1000) * (1 + TRADING.drift * 3); // small drift
      _trPrices[g] = _trClamp(g, Math.round(_trPrices[g] * factor));
      _trHist[g].push(_trPrices[g]);
      if (_trHist[g].length > 20) _trHist[g].shift();
    });
  }

  function openTrading(){
    _trInit();
    document.querySelectorAll('.view-container').forEach(function(v){ v.classList.remove('active'); });
    var tv = document.getElementById('tradingView');
    if (tv) tv.classList.add('active');
    renderTrading();
    if (typeof playSfx === 'function') playSfx('machine');   // trading terminal powers up
    if (typeof playMusic === 'function') playMusic('shop');
  }
  function closeTrading(){
    var tv = document.getElementById('tradingView');
    if (tv) tv.classList.remove('active');
    if (typeof openMapHub === 'function') openMapHub();
    else { el.equationView.classList.add('active'); if (typeof playMusic === 'function') playMusic('practice'); }
  }

  function _spark(arr, color){
    if (!arr || arr.length < 2) return '';
    var w = 120, h = 30, min = Math.min.apply(null, arr), max = Math.max.apply(null, arr), rng = (max - min) || 1;
    var pts = arr.map(function(v, i){ return (i / (arr.length - 1) * w).toFixed(1) + ',' + (h - (v - min) / rng * h).toFixed(1); }).join(' ');
    return '<svg class="tr-spark" title="Price trend over the last ' + arr.length + ' refreshes" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none"><polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="2"/></svg>';
  }

  function _tradeRow(g){
    var meta = CURRENCIES[g], price = _trPrices[g], hist = _trHist[g];
    var prev = hist.length > 1 ? hist[hist.length - 2] : price;
    var chg = price - prev, chgPct = prev ? Math.round(chg / prev * 100) : 0;
    var chgCls = chg > 0 ? 'tr-up' : (chg < 0 ? 'tr-down' : '');
    var have = (state.currencies && state.currencies[g]) || 0;
    return '<div class="tr-row">' +
      '<div class="tr-good">' + meta.icon + ' <b>' + meta.name + '</b><span class="tr-have">you hold ' + have + '</span></div>' +
      '<div class="tr-price" title="Current ' + meta.name + ' price, in Cash per unit">💵 ' + price + ' <span class="tr-chg ' + chgCls + '" title="Price change since the last refresh">' + (chg >= 0 ? '▲' : '▼') + ' ' + Math.abs(chgPct) + '%</span></div>' +
      _spark(hist, chg >= 0 ? '#57b45a' : '#f0705e') +
      '<div class="tr-actions">' +
        '<button class="shop-btn shop-btn-buy" onclick="tradeBuy(\'' + g + '\',1)" title="Buy 1 ' + meta.name + ' at today\'s market price">Buy 1</button>' +
        '<button class="shop-btn shop-btn-buy" onclick="tradeBuy(\'' + g + '\',5)" title="Buy 5 ' + meta.name + ' at today\'s market price">Buy 5</button>' +
        '<button class="shop-btn shop-btn-sell" onclick="tradeSell(\'' + g + '\',1)" title="Sell 1 ' + meta.name + ' at today\'s market price">Sell 1</button>' +
        '<button class="shop-btn shop-btn-sell" onclick="tradeSell(\'' + g + '\',5)" title="Sell 5 ' + meta.name + ' at today\'s market price">Sell 5</button>' +
      '</div></div>';
  }

  function renderTrading(){
    var tv = document.getElementById('tradingView');
    if (!tv) return;
    var reviewHtml;
    if (_trReview){
      var src = _trReview.arenaLabel ? '<div class="tr-review-src">from ' + _trReview.arenaLabel + '</div>' : '';
      var body;
      if (_trReview.mode === 'mcOnly'){
        body = '<div class="tr-review-choices">' + _trReview.choices.map(function(c, i){
          return '<button class="mc-btn tr-review-choice" onclick="tradeReviewPick(' + i + ')">' + c + '</button>';
        }).join('') + '</div>';
      } else {
        body = '<div class="tr-review-answer">' +
          '<input type="text" inputmode="numeric" id="trReviewInput" class="number-input" placeholder="?" autocomplete="off" title="Type your numeric answer" onkeydown="if(event.key===\'Enter\')tradeSubmitReview()" />' +
          '<button class="btn btn-primary" onclick="tradeSubmitReview()" title="Submit your answer — correct shifts Gold & Silver prices, wrong leaves them unchanged">Submit &amp; Refresh</button></div>';
      }
      reviewHtml = '<div class="tr-review"><p class="tr-review-q">📈 Solve to move the market:</p>' + src +
        '<div class="tr-review-prompt">' + _trReview.prompt + '</div>' + body + '</div>';
    } else {
      reviewHtml = '<div class="tr-review"><button class="btn btn-primary" onclick="tradeAskReview()" title="Answer a review question correctly to shift Gold & Silver prices">📈 Refresh Prices (solve a problem)</button></div>';
    }
    var txHtml = _trTx.length
      ? _trTx.slice(-6).reverse().map(function(t){ return '<div class="tr-tx">' + t + '</div>'; }).join('')
      : '<div class="tr-tx tr-tx-empty">No trades yet.</div>';
    tv.innerHTML =
      '<div class="rpg-header"><h2 class="rpg-title">🔄 Trading Room</h2>' +
      '<button class="btn btn-ghost" onclick="closeTrading()" title="Back to Earth Hub — leave the Trading Room and return to the map">← Back to Earth</button></div>' +
      '<div class="currency-bar" id="trCurBar"></div>' +
      '<p class="tr-intro">Gold & Silver prices drift with the market. Buy low, sell high — for Cash 💵.</p>' +
      _tradeRow('gold') + _tradeRow('silver') +
      reviewHtml +
      '<h4 class="tr-h">Transaction history</h4><div class="tr-log">' + txHtml + '</div>';
    // reuse the shared currency chip row inside trading too
    var bar = document.getElementById('trCurBar');
    if (bar && typeof renderMaterialsBar === 'function'){ var save = el.materialsBar; el.materialsBar = bar; renderMaterialsBar(); el.materialsBar = save; }
  }

  function tradeBuy(g, qty){
    _trInit();
    var cost = _trPrices[g] * qty;
    if (state.coins < cost){ showToast('Not enough Cash for ' + qty + ' ' + CURRENCIES[g].name + '.'); return; }
    state.coins -= cost;
    state.currencies[g] = (state.currencies[g] || 0) + qty;
    _trTx.push('Bought ' + qty + ' ' + CURRENCIES[g].icon + ' for 💵' + cost);
    if (typeof playSfx === 'function') playSfx('buy');
    if (typeof updateStats === 'function') updateStats();
    renderTrading();
  }
  function tradeSell(g, qty){
    _trInit();
    var have = (state.currencies && state.currencies[g]) || 0;
    if (have < qty){ showToast('You only hold ' + have + ' ' + CURRENCIES[g].name + '.'); return; }
    var gain = _trPrices[g] * qty;
    state.currencies[g] -= qty;
    state.coins += gain;
    _trTx.push('Sold ' + qty + ' ' + CURRENCIES[g].icon + ' for 💵' + gain);
    if (typeof playSfx === 'function') playSfx('buy');
    if (typeof updateStats === 'function') updateStats();
    renderTrading();
  }

  // A quick, single-answer arithmetic fallback when no recent arena yields a
  // tap/compute question (e.g. the player has only played balance-scale arenas).
  function _trFallbackReview(){
    var lvl = Math.max(1, state.level || 1);
    var a, b;
    if (lvl <= 3){ a = rand(2, 9); b = rand(2, 9); }
    else if (lvl <= 6){ a = rand(6, 12); b = rand(6, 12); }
    else { a = rand(11, 20); b = rand(3, 12); }
    return { mode: 'directInput', prompt: a + ' × ' + b + ' = ?', answer: a * b, arenaLabel: 'a quick warm-up' };
  }

  // Draw the review from the last few arenas the player actually played. We reuse
  // the arena's own question generator, but only the single-answer styles (tap-one
  // Identify / type-a-number Compute) fit a side panel — multi-step balance/rearrange
  // arenas are skipped, falling back to a quick arithmetic question.
  function tradeAskReview(){
    var pool = (state.recentLevels && state.recentLevels.length)
      ? state.recentLevels.slice() : [Math.max(1, state.level || 1)];
    var chosen = null;
    for (var attempt = 0; attempt < 16 && !chosen; attempt++){
      var lvl = pool[rand(0, pool.length - 1)];
      var p;
      try { p = (typeof generateProblem === 'function') ? generateProblem(lvl) : null; }
      catch (e) { p = null; }
      if (!p) continue;
      if (p.mode === 'mcOnly' || p.mode === 'directInput'){
        var ar = (typeof getArena === 'function') ? getArena(lvl) : null;
        chosen = {
          mode: p.mode, prompt: p.prompt,
          choices: p.choices, correctIndex: p.correctIndex, answer: p.answer,
          arenaLabel: ar ? ('Arena ' + lvl + ' · ' + ar.topic) : ('Arena ' + lvl)
        };
      }
    }
    _trReview = chosen || _trFallbackReview();
    renderTrading();
    var inp = document.getElementById('trReviewInput'); if (inp) inp.focus();
  }

  function _trReviewWin(){
    _trDrift();
    _trReview = null;
    showToast('✅ Correct — the market shifts!');
    if (typeof playSfx === 'function') playSfx('solve-correct');
    renderTrading();
  }
  function _trReviewMiss(){
    showToast('❌ Not quite — prices hold. Try again!');
    if (typeof playSfx === 'function') playSfx('wrong');
  }

  // Identify-style review: tap one of four.
  function tradeReviewPick(i){
    if (!_trReview || _trReview.mode !== 'mcOnly') return;
    if (i === _trReview.correctIndex) _trReviewWin();
    else _trReviewMiss();
  }
  // Compute-style / fallback review: type an integer.
  function tradeSubmitReview(){
    var inp = document.getElementById('trReviewInput');
    if (!inp || !_trReview) return;
    if (parseInt(inp.value, 10) === _trReview.answer){
      _trReviewWin();
    } else {
      _trReviewMiss();
      inp.value = ''; inp.focus();
    }
  }
