  // ============================================================================
  // Combat module 3/5: the monster-select screen — openBattle, gauntlet/easy/
  // arena cards, renderMonsterChoices, the combat nav-lock.
  // Split 2026-07-18 from 06-rpg-battle.js — see 06-gear-shop.js for the split note.
  // ============================================================================

  function openBattle() {
    // Stepping into the Boss Room. If the player now leaves without beating the arena's boss,
    // the Boss Gate closes and the ARENA_GOAL requirement must be earned again (section 9).
    state.bossRoomEntered = true;
    el.equationView.classList.remove('active');
    el.shopView.classList.remove('active');
    el.battleView.classList.add('active');
    // The gate button now lives in the persistent header (visible across every view), so it's set to
    // its closed/grey state explicitly on entry — the player is already inside the boss room, so
    // there's nothing to re-enter. It reappears open via updatePanelVisibility if the player leaves
    // undefeated (gate re-earns) or on the next arena's own gate.
    if (typeof setGateButton === 'function') setGateButton(false);

    el.monsterSelectScreen.style.display = 'block';
    el.combatArenaScreen.style.display = 'none';
    el.battleFleeBtn.hidden = false;
    if (el.battleShopBtn) el.battleShopBtn.hidden = false;
    renderMonsterChoices();
    if (typeof playMusic === 'function') playMusic('arena');
  }

  // Lock reason for a gauntlet card: the only remaining gate is reaching the arena the chain's
  // first member lives in. The hero-level gate (player: "remove the level restriction for
  // arenas") is gone — clearing a gauntlet's arena-boss requirement is enough to start it.
  function cardLockReason(members) {
    if (!members.length) return '';
    if (state.testMode) return '';
    if (members[0].room > state.level) return 'Reach Arena ' + members[0].room;
    return '';
  }
  function gauntletMembersHtml(members) {
    return members.map(function(m, i){
      var dead = isMonsterDefeated(monsterKey(m));
      return '<div class="gauntlet-member' + (dead ? ' defeated' : '') + '">' +
          '<div class="gauntlet-member-art">' + getMonsterArtMarkup(m) + '</div>' +
          '<div class="gauntlet-member-name">' + m.name + (dead ? ' 💀' : '') + '</div>' +
          '<div class="gauntlet-member-el">' + elementBadgeHtml(m.element) + '</div>' +
          '<div class="gauntlet-member-stat">HP ' + m.maxHp + ' · ATK ' + m.attack + ' · DEF ' + m.defense + '</div>' +
        '</div>' +
        (i < members.length - 1 ? '<div class="gauntlet-arrow">→</div>' : '');
    }).join('');
  }
  function buildGauntletCard(members, label, icon) {
    var lockReason = cardLockReason(members);
    var isLocked = !!lockReason;
    var deadCount = members.filter(function(m){ return isMonsterDefeated(monsterKey(m)); }).length;
    var fullyCleared = deadCount === members.length;
    var card = document.createElement('div');
    card.className = 'monster-card-select gauntlet-card' + (fullyCleared ? ' defeated' : '') + (isLocked ? ' locked' : '');
    if (fullyCleared) {
      card.style.opacity = '0.45'; card.style.pointerEvents = 'none'; card.style.borderStyle = 'dotted'; card.style.filter = 'grayscale(0.6)';
    }
    card.innerHTML =
      '<div class="gauntlet-card-title">' + icon + ' ' + label + (fullyCleared ? ' ✅' : '') + '</div>' +
      (fullyCleared ? '<div class="gauntlet-cleared-banner">☑️ CLEARED</div>' : '') +
      '<div class="gauntlet-row">' + gauntletMembersHtml(members) + '</div>' +
      (deadCount > 0 && !fullyCleared ? '<div class="monster-select-stat gauntlet-progress">⏳ ' + deadCount + '/' + members.length + ' defeated — resume from here</div>' : '') +
      (isLocked ? ('<div class="monster-lock-note">🔒 Locked: ' + lockReason + '</div>') : '');
    if (!fullyCleared && !isLocked) {
      card.addEventListener('click', function(){ startGauntletCard(members); });
    }
    return card;
  }
  // Entry point for the 2-Boss / 3-Boss cards: resume from the first not-yet-defeated member
  // (a prior mid-chain death already marked earlier members defeated via the normal kill flow).
  function startGauntletCard(members) {
    var remaining = members.filter(function(m){ return !isMonsterDefeated(monsterKey(m)); });
    if (!remaining.length) return;
    startCombat(remaining[0], remaining.slice(1), true);
  }

  // Builds the solo Easy-fight card for a given monster (unchanged behavior/markup either way).
  function buildEasyCard(easy) {
    var lockReason = getMonsterLockReason(easy);
    var isLocked = !!lockReason;
    var isDefeated = isMonsterDefeated(monsterKey(easy));
    var card = document.createElement('div');
    card.className = 'monster-card-select' + (isDefeated ? ' defeated' : '') + (isLocked ? ' locked' : '');
    if (isDefeated) {
      card.style.opacity = '0.45';
      card.style.pointerEvents = 'none';
      card.style.borderStyle = 'dotted';
      card.style.filter = 'grayscale(0.6)';
    }
    card.innerHTML = `
      <div class="monster-card-art">${getMonsterArtMarkup(easy)}</div>
      <div class="monster-select-name">${easy.name} ${isDefeated ? '✅' : ''}</div>
      <div class="monster-select-el">${elementBadgeHtml(easy.element)}</div>
      ${isDefeated ? `<div class="gauntlet-cleared-banner">☑️ CLEARED</div>` : ''}
      ${isLocked ? `<div class="monster-lock-note">🔒 Locked: ${lockReason}</div>` : ''}
    `;
    if (!isDefeated && !isLocked) {
      card.addEventListener('click', function(){ startCombat(easy); });
    }
    return card;
  }

  // One arena's full row: an "Arena N" header + its 3 cards (Easy / 2-Boss / 3-Boss). Reusable so
  // every past arena can show its own live, clickable cards — not just the current one.
  function buildArenaCardRow(ar) {
    var roomMonsters = getRoomMonsters(ar);
    var easy = roomMonsters.find(function(m){ return m.rank === 1; });
    var chain2 = getGauntletChain(ar, 2);
    var chain3 = getGauntletChain(ar, 3);

    var wrap = document.createElement('div');
    wrap.className = 'arena-card-row';

    var header = document.createElement('div');
    header.className = 'arena-row-header';
    var topic = (typeof getArena === 'function') ? getArena(ar) : null;
    header.textContent = 'Arena ' + ar + (topic && topic.topic ? ' · ' + topic.topic : '');
    wrap.appendChild(header);

    var grid = document.createElement('div');
    grid.className = 'monster-choices-grid';
    if (easy) grid.appendChild(buildEasyCard(easy));
    grid.appendChild(buildGauntletCard(chain2, '2-Boss Gauntlet', '⚔️⚔️'));
    grid.appendChild(buildGauntletCard(chain3, '3-Boss Gauntlet', '⚔️⚔️⚔️'));
    wrap.appendChild(grid);

    return wrap;
  }

  function renderMonsterChoices() {
    setNavLockForCombat(false);   // back on the select screen — nav is available again
    el.monsterChoices.innerHTML = '';
    // The old checklist just listed monster names as read-only text — not actionable, and
    // superseded now that every past arena renders its own live, clickable cards below.
    var bountyBox = document.getElementById('bountyListContainer');
    if (bountyBox) bountyBox.style.display = 'none';

    // Giant Black Hole (arena 66): a single 10-monster gauntlet, no per-arena rows.
    if (isBlackHoleArena(state.level)) {
      var chain = getBlackHoleChain();
      var wrap = document.createElement('div');
      wrap.className = 'arena-card-row';
      wrap.innerHTML = '<div class="arena-row-header">⚫ Giant Black Hole — 10-monster gauntlet, each harder than the last. No retreat is easy here.</div>';
      var grid = document.createElement('div');
      grid.className = 'monster-choices-grid';
      grid.style.gridTemplateColumns = '1fr';   // one wide card for the 10-chain
      grid.appendChild(buildGauntletCard(chain, '☠️ THE SINGULARITY — 10-Boss Gauntlet', '⚫'));
      wrap.appendChild(grid);
      el.monsterChoices.appendChild(wrap);
      if (el.arenaAdvanceRow) el.arenaAdvanceRow.style.display = 'none';
      return;
    }

    // Every arena from the current one down to Arena 1 gets its own row of 3 real, clickable
    // cards — not just a summary. Most recent first so the arena you're actually in isn't buried
    // under 64 rows of history.
    for (var ar = state.level; ar >= 1; ar--) {
      el.monsterChoices.appendChild(buildArenaCardRow(ar));
    }

    var boss = getRoomBoss(state.level);
    var isLevelClear = boss && state.defeatedMonsters[monsterKey(boss)];
    if (isLevelClear && state.level < state.maxLevel) {
      if (el.arenaAdvanceRow) el.arenaAdvanceRow.style.display = 'block';
      if (el.advanceLvlText) el.advanceLvlText.textContent = state.level + 1;
    } else {
      if (el.arenaAdvanceRow) el.arenaAdvanceRow.style.display = 'none';
    }
  }

  var activeCombat = null;

  // During an ACTIVE fight the top nav (Practice / Earth Hub / Space Travel / Boss Gate / …) is
  // hidden, so the only way out of a battle is the speed-gated Escape button — otherwise "escape"
  // would be pointless when you could just tap Earth Hub. Restored the moment you're back on the
  // monster-select screen or leave the boss room (renderMonsterChoices / advance / return paths).
  function setNavLockForCombat(locked){
    var hdr = document.querySelector('.header-actions');
    if (hdr) hdr.style.display = locked ? 'none' : '';
  }

  // queue = remaining monsters to fight after this one (2-Boss/3-Boss gauntlets); locked = true
  // disables Escape for the whole chain (not just while queue is non-empty — the LAST fight in a
  // gauntlet has an empty queue but must stay locked, or fleeing it would still buy a free heal).
