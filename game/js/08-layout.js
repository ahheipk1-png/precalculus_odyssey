(function setupWidescreenDashboard(){
  function make(tag, className, html){
    var node=document.createElement(tag);
    if(className) node.className=className;
    if(html) node.innerHTML=html;
    return node;
  }

  var board=document.querySelector('.board');
  var stats=document.querySelector('.stats-row');
  var hero=document.querySelector('.hero-stats-row');
  var trophies=document.getElementById('trophiesPanel');

  if(board && stats && hero && !document.querySelector('.hud-shell')){
    var hud=make('section','hud-shell');
    var heroStack=make('div','hero-hud-stack');
    board.insertBefore(hud,stats);
    hud.appendChild(stats);
    hud.appendChild(heroStack);
    heroStack.appendChild(hero);
    if(trophies) heroStack.appendChild(trophies);
  }

  var eq=document.getElementById('equationView');
  if(eq && !eq.querySelector('.quest-main-panel')){
    var main=make('section','quest-main-panel');
    var controls=make('aside','quest-control-panel');
    var status=make('div','equation-status-row');
    var heading=make('div','control-panel-heading',
      '<span class="control-kicker">Algebra Console</span>'+
      '<p id="controlHint">Use the same operation on both sides. Keep the balance steady until <strong>x</strong> stands alone.</p>'
    );

    // Progress dots + tries-left hearts sit in this panel's own top-left corner (position:absolute,
    // see .quest-progress-badge, styles.css) — appended first so it paints under anything else here.
    var progressBadge=document.getElementById('questProgressBadge');
    if(progressBadge) main.appendChild(progressBadge);
    // The planet-info card is a slim strip at the TOP of the main quest panel — not its
    // own grid column (that used to steal the wide column and hide the equation).
    var astro=document.getElementById('astroCard');
    if(astro) main.appendChild(astro);
    var mainIds=['formulaCaption','scaleWrap','questionPrompt','graphPanel'];
    mainIds.forEach(function(id){var n=document.getElementById(id);if(n)main.appendChild(n);});
    var feedback=document.getElementById('feedbackMsg');
    var moves=document.getElementById('movesInfo');
    if(feedback) status.appendChild(feedback);
    if(moves) status.appendChild(moves);
    main.appendChild(status);
    var scene=document.querySelector('#equationView .scene-panel');
    if(scene) main.appendChild(scene);

    controls.appendChild(heading);
    ['moveLabel','opRow','applyForm','expandPanel','directAnswerPanel','levelGateActions','eqActions','hintPanel'].forEach(function(id){
      var n=document.getElementById(id);if(n)controls.appendChild(n);
    });
    eq.appendChild(main);
    eq.appendChild(controls);
  }

  var actions=document.querySelector('.header-actions');
  if(actions && !document.getElementById('fullscreenBtn')){
    var btn=make('button','reset-btn fullscreen-btn','<span class="fs-icon">⛶</span> Full screen');
    btn.id='fullscreenBtn';
    btn.type='button';
    btn.title='Toggle full-screen mode';
    btn.addEventListener('click',function(){
      if(!document.fullscreenElement){
        document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
      }else{
        document.exitFullscreen && document.exitFullscreen();
      }
    });
    document.addEventListener('fullscreenchange',function(){
      btn.innerHTML=document.fullscreenElement?'<span class="fs-icon">⛶</span> Exit full screen':'<span class="fs-icon">⛶</span> Full screen';
    });
    actions.insertBefore(btn,actions.firstChild);
  }

  // Header "☰ Menu" toggle (phone/iPad, ≤1024px — see styles.css). The button row itself
  // (.header-actions) is untouched; this only shows/hides it as a dropdown on narrow screens.
  var menuToggle=document.getElementById('headerMenuToggle');
  if(menuToggle && actions && !menuToggle.dataset.wired){
    menuToggle.dataset.wired='1';
    function closeHeaderMenu(){
      actions.classList.remove('header-menu-open');
      menuToggle.setAttribute('aria-expanded','false');
    }
    menuToggle.addEventListener('click',function(e){
      e.stopPropagation();
      var open=actions.classList.toggle('header-menu-open');
      menuToggle.setAttribute('aria-expanded',open?'true':'false');
    });
    // Any action inside the menu navigates or opens something else — close it behind them.
    actions.addEventListener('click',function(e){
      if(e.target.closest('.reset-btn')) closeHeaderMenu();
    });
    document.addEventListener('click',function(e){
      if(!actions.classList.contains('header-menu-open')) return;
      if(actions.contains(e.target) || menuToggle.contains(e.target)) return;
      closeHeaderMenu();
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape') closeHeaderMenu();
    });
  }
})();
