  // ---------- Socratic tutor ("Ask the tutor") ----------
  // A choose-your-response dialogue driven by SOCRATIC_REGISTRY (Bible Part IV). The tutor asks
  // one question at a time; the player taps a response chip and the conversation routes to the
  // matching authored branch, then walks Guided Discovery -> Reflection -> Transfer -> exit help.
  // We can't parse free-text answers, so the branch *types* are offered as buttons. Globals, no IIFE.
  var _socLog = [], _socCur = null, _socLevel = null, _socData = null;

  function _socClean(s){
    s = String(s == null ? '' : s).trim();
    s = s.replace(/^(Tutor|Player)\s*:\s*/i, '');          // drop a leading role label
    s = s.replace(/^"([\s\S]*)"$/, '$1');                  // strip one pair of wrapping quotes
    s = s.replace(/^Tutor sequence:\s*/i, '');
    return s;
  }
  function _socMd(s){ return (typeof _mdLite === 'function') ? _mdLite(_socClean(s)) : _socClean(s); }

  function _socNode(id){
    var d = _socData || {};
    switch (id){
      case 'open': return { tutor: d['Opening Diagnostic'] || 'Let’s look at this together. What is the variable, and what is being done to it?', choices: [
        { to: 'correct', label: 'I think I can 💪' },
        { to: 'unsure', label: 'I’m not sure 🤔' },
        { to: 'misconception', label: 'I have a different idea 🌀' } ] };
      case 'correct': return { tutor: d['Correct Branch'] || d['Partial Understanding Branch'] || 'Nice — let’s check your reasoning.', choices: [
        { to: 'guided', label: 'Walk me through it 👣' },
        { to: 'reflect', label: 'I’ve got it ✅' } ] };
      case 'unsure': return { tutor: d['Unsure Branch'] || 'No problem — let’s start smaller.', choices: [
        { to: 'guided', label: 'Okay, guide me 👣' } ] };
      case 'misconception': return { tutor: d['Misconception Branch'] || 'Let’s test that idea and see what happens.', choices: [
        { to: 'guided', label: 'Ah, let me rethink 👣' } ] };
      case 'guided': return { tutor: d['Guided Discovery'] || 'Identify the operation, then do the inverse to both sides.', choices: [
        { to: 'reflect', label: 'That makes sense ✨' } ] };
      case 'reflect': return { tutor: d['Reflection Question'] || 'What did you have to do to keep the equation balanced?', choices: [
        { to: 'transfer', label: 'Continue →' } ] };
      case 'transfer': return { tutor: d['Transfer Question'] || 'How would your strategy change if the sign were flipped?', choices: [
        { to: 'exit', label: 'Finish 🎓' } ] };
      case 'exit': return { tutor: 'Great thinking! You can keep going now — or grab more help:', exit: true };
    }
    return null;
  }

  function _socRender(){
    var ov = document.getElementById('socraticOverlay'); if (!ov) return;
    var a = (typeof getArena === 'function') ? getArena(_socLevel) : null;
    var log = _socLog.map(function(m){
      if (m.who === 'you') return '<div class="soc-row soc-you"><div class="soc-bubble">' + m.text + '</div></div>';
      return '<div class="soc-row soc-tutor"><div class="soc-avatar">🦉</div><div class="soc-bubble">' + m.html + '</div></div>';
    }).join('');
    var chips;
    if (_socCur && _socCur.exit){
      chips = '<div class="soc-chips">' +
        '<button class="btn btn-ghost" onclick="closeTutor();if(state.hintLevel<1)state.hintLevel=1;renderHintPanel()">💡 Show a hint</button>' +
        '<button class="btn btn-ghost" onclick="closeTutor();openTutorial(' + _socLevel + ')">📖 Full tutorial</button>' +
        '<button class="btn btn-primary" onclick="closeTutor()">← Back to the arena</button></div>';
    } else {
      chips = '<div class="soc-chips">' + (_socCur ? _socCur.choices : []).map(function(c){
        return '<button class="btn btn-secondary" onclick="socPick(\'' + c.to + '\')">' + c.label + '</button>';
      }).join('') + '</div>';
    }
    ov.innerHTML =
      '<div class="soc-backdrop" onclick="closeTutor()"></div>' +
      '<div class="soc-card">' +
        '<button class="tut-close" onclick="closeTutor()" title="Back to the arena">✕</button>' +
        '<div class="soc-kicker">🦉 Ask the tutor · Arena ' + _socLevel + (a && a.body ? ' · ' + a.body.name : '') + '</div>' +
        '<div class="soc-log" id="socLog">' + log + '</div>' +
        chips +
      '</div>';
    var lg = document.getElementById('socLog'); if (lg) lg.scrollTop = lg.scrollHeight;
  }

  function _socStep(id, playerLabel){
    if (playerLabel) _socLog.push({ who: 'you', text: playerLabel });
    var node = _socNode(id);
    if (!node) return;
    _socCur = node;
    _socLog.push({ who: 'tutor', html: _socMd(node.tutor) });
    _socRender();
  }

  function socPick(to){
    var label = null;
    if (_socCur && _socCur.choices){
      for (var i = 0; i < _socCur.choices.length; i++){ if (_socCur.choices[i].to === to){ label = _socCur.choices[i].label; break; } }
    }
    _socStep(to, label);
  }

  function askTutor(level){
    level = level || (typeof state !== 'undefined' ? state.level : 1);
    _socLevel = level;
    var a = (typeof getArena === 'function') ? getArena(level) : null;
    var reg = (typeof SOCRATIC_REGISTRY !== 'undefined') ? SOCRATIC_REGISTRY : null;
    _socData = (a && a.phaseId && reg) ? (reg['Soc-' + a.phaseId] || reg[a.phaseId]) : null;
    _socLog = []; _socCur = null;
    var ov = document.getElementById('socraticOverlay');
    if (!ov){ ov = document.createElement('div'); ov.id = 'socraticOverlay'; ov.className = 'soc-overlay'; document.body.appendChild(ov); }
    ov.classList.add('open');
    _socStep('open', null);
    if (typeof playSfx === 'function') playSfx('ui-click');
  }

  function closeTutor(){ var ov = document.getElementById('socraticOverlay'); if (ov) ov.classList.remove('open'); }
