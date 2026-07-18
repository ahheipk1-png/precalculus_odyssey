  // ============================================================================
  // Cloudberry Squadron — Homing Missile Mayhem (module 53): a 10-stage side-
  // scrolling shooter with an escalating 3-phase final boss. User-supplied game
  // (added 2026-07-18) — kept almost entirely verbatim (every stage config,
  // enemy type, bullet pattern, the Giant Piko special move, and all canvas
  // rendering are unchanged). Only the SHELL was adapted to fit this project's
  // shared-global-scope Wonderland conventions:
  //   - openCloudberry() uses gameWelcome() for the free leaderboard/Play
  //     screen (matches every other Arcade game — Play charges 1 Wonderland
  //     Pass via wonderPlay, browsing the leaderboard doesn't).
  //   - _cbStartRun() uses a2Shell() for the in-game topbar+canvas+touch-pad
  //     chrome, reusing the shared .wond-canvas-wrap/.a2-canvas/.a2-pad CSS —
  //     no new CSS file needed, since the HUD/score/pause screen are already
  //     drawn ON the canvas by the original drawHUD()/draw() code.
  //   - Input goes through a2Keys()/A2.raf instead of raw
  //     window.addEventListener + a private rAF handle, so leaving mid-run (or
  //     starting any other Wonderland game) can't leak this game's keydown/
  //     keyup listeners — the exact key-leak class of bug documented in
  //     docs/world-and-hubs.md for the other A2 games.
  //   - gameOver() reports to a2Result()/wgRecordScore() instead of the
  //     original page's own #overlay/#card restart UI, so score, high-score
  //     tracking, and the Cash/materials reward all match every other game.
  // Everything else below (STAGES, enemy spawn/update/draw, boss patterns,
  // particles, the Giant Piko special) is the pasted game logic, untouched.
  // ============================================================================
  (function(){
    "use strict";

    var CB_ID = "cloudberry";
    var W = 960, H = 540;
    var canvas, ctx;

    var keys = Object.create(null);
    var bullets = [];
    var enemyBullets = [];
    var enemies = [];
    var particles = [];
    var pickups = [];
    var clouds = [];
    var stars = [];

    var running = false;
    var paused = false;
    var last = 0;
    var time = 0;
    var spawnTimer = 0;
    var stageTimer = 0;
    var bossSpawned = false;
    var screenShake = 0;
    var message = "";
    var messageTimer = 0;

    var specialAttack = {
      active:false,
      t:0,
      duration:1.28,
      x:-420,
      bossHit:false
    };

    var currentStage = 0;
    var stageCleared = false;
    var stageClearTimer = 0;

    var STAGES = [
      {name:"Candy Sky",duration:20,spawnBase:1.48,spawnMin:.78,mix:[.56,.83],speed:.84,bossHp:72,bossName:"Cupcake Kettle",bossKind:"cupcake",bossBody:"#f4ecff",bossTrim:"#ffcc64",bossShots:3,bossSpeed:108,bossFire:1.75,sky:["#4a78cf","#79c8ec","#f4b9ce"],hill1:"#8fd37e",hill2:"#64b77f",tree:"#ff9bc6"},
      {name:"Bubble Bay",duration:21,spawnBase:1.43,spawnMin:.74,mix:[.48,.80],speed:.88,bossHp:82,bossName:"Bubble Whale",bossKind:"whale",bossBody:"#dffcff",bossTrim:"#75d9e8",bossShots:3,bossSpeed:112,bossFire:1.68,sky:["#367dc5","#6dd8e8","#d8fbff"],hill1:"#73d7c5",hill2:"#3dadac",tree:"#b4f4ff"},
      {name:"Cookie Canyon",duration:22,spawnBase:1.38,spawnMin:.70,mix:[.40,.68],speed:.92,bossHp:92,bossName:"Cookie Castle",bossKind:"castle",bossBody:"#f0c895",bossTrim:"#9b5d3f",bossShots:3,bossSpeed:116,bossFire:1.62,sky:["#8d6aa8","#d599ae","#ffd7ad"],hill1:"#c99c67",hill2:"#9c704a",tree:"#f0c17d"},
      {name:"Lemon Garden",duration:23,spawnBase:1.34,spawnMin:.67,mix:[.50,.75],speed:.96,bossHp:104,bossName:"Lemon Dragon",bossKind:"dragon",bossBody:"#fff5a5",bossTrim:"#f0b72d",bossShots:4,bossSpeed:120,bossFire:1.58,sky:["#5aa4d9","#b7e79b","#fff1a8"],hill1:"#9dd26a",hill2:"#65a956",tree:"#ffe25d"},
      {name:"Marshmallow Moon",duration:24,spawnBase:1.30,spawnMin:.64,mix:[.43,.78],speed:1.00,bossHp:116,bossName:"Moon Rabbit Rocket",bossKind:"rabbit",bossBody:"#e3dcff",bossTrim:"#9b83d8",bossShots:4,bossSpeed:124,bossFire:1.52,sky:["#263671","#665da7","#e9a9cc"],hill1:"#8b80bd",hill2:"#63548e",tree:"#f2d7ff"},
      {name:"Jelly Jungle",duration:25,spawnBase:1.26,spawnMin:.61,mix:[.35,.76],speed:1.04,bossHp:128,bossName:"Jelly King",bossKind:"jellyking",bossBody:"#9df0df",bossTrim:"#38a88d",bossShots:4,bossSpeed:128,bossFire:1.48,sky:["#257f8b","#58c4a4","#d7f29d"],hill1:"#64bd70",hill2:"#35885d",tree:"#82f1b0"},
      {name:"Biscuit Blizzard",duration:26,spawnBase:1.22,spawnMin:.58,mix:[.33,.61],speed:1.08,bossHp:188,bossName:"Biscuit Blimp",bossKind:"blimp",bossBody:"#f4d7ae",bossTrim:"#b77c43",bossShots:4,bossSpeed:132,bossFire:1.44,sky:["#567bb2","#a8c5df","#f5efe2"],hill1:"#cfdddf",hill2:"#9fb7bc",tree:"#fff2cf"},
      {name:"Sundae Sunset",duration:27,spawnBase:1.19,spawnMin:.56,mix:[.40,.69],speed:1.11,bossHp:154,bossName:"Sundae Queen",bossKind:"sundae",bossBody:"#ffd6e7",bossTrim:"#ef7fba",bossShots:5,bossSpeed:136,bossFire:1.40,sky:["#6451a0","#ef799e","#ffd37c"],hill1:"#e08f7c",hill2:"#bd6277",tree:"#ffcae4"},
      {name:"Rainbow Rapids",duration:28,spawnBase:1.16,spawnMin:.54,mix:[.37,.71],speed:1.14,bossHp:168,bossName:"Rainbow Serpent",bossKind:"serpent",bossBody:"#caefff",bossTrim:"#ff83b3",bossShots:5,bossSpeed:140,bossFire:1.36,sky:["#426fd2","#72cce7","#f4a7cf"],hill1:"#84cf8b",hill2:"#4cac82",tree:"#ffd36b"},
      {name:"Royal Tea Palace",duration:29,spawnBase:1.13,spawnMin:.52,mix:[.35,.67],speed:1.17,bossHp:188,bossName:"Royal Teapot",bossKind:"teapot",bossBody:"#f4ecff",bossTrim:"#ffd35a",bossShots:5,bossSpeed:145,bossFire:1.30,sky:["#222c6e","#7352a4","#f09eb8"],hill1:"#8172b8",hill2:"#554785",tree:"#ffe283"}
    ];

    function stageConfig() { return STAGES[currentStage]; }

    var player = {
      x: 140, y: 270, vx: 0, vy: 0,
      r: 22, hp: 6, maxHp: 6,
      fireCd: 0, power: 2, inv: 0,
      score: 0, specials: 3
    };

    for (var _si = 0; _si < 100; _si++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        s: Math.random() * 2 + .5,
        v: Math.random() * 22 + 12
      });
    }

    for (var _ci = 0; _ci < 12; _ci++) {
      clouds.push({
        x: Math.random() * W,
        y: 80 + Math.random() * 380,
        s: .5 + Math.random() * 1.1,
        v: 8 + Math.random() * 14
      });
    }

    function beginStage(index, firstStage) {
      currentStage = index;
      stageTimer = 0;
      spawnTimer = 1.25;
      bossSpawned = false;
      stageCleared = false;
      stageClearTimer = 0;
      bullets.length = 0;
      enemyBullets.length = 0;
      enemies.length = 0;
      pickups.length = 0;
      if (!firstStage) {
        player.hp = Math.min(player.maxHp, player.hp + 1);
        if (index % 2 === 1) player.specials = Math.min(5, player.specials + 1);
        player.power = Math.max(2, player.power);
      }
      message = "LEVEL " + (currentStage + 1) + " / 10 · " + stageConfig().name.toUpperCase();
      messageTimer = 3.1;
    }

    function reset() {
      bullets.length = 0;
      enemyBullets.length = 0;
      enemies.length = 0;
      particles.length = 0;
      pickups.length = 0;
      player.x = 140;
      player.y = H / 2;
      player.hp = 6;
      player.maxHp = 6;
      player.power = 2;
      player.score = 0;
      player.specials = 3;
      player.inv = 0;
      player.fireCd = 0;
      specialAttack.active = false;
      specialAttack.t = 0;
      specialAttack.x = -420;
      specialAttack.bossHit = false;
      time = 0;
      screenShake = 0;
      currentStage = 0;
      beginStage(0, true);
    }

    function startGame() {
      reset();
      running = true;
      paused = false;
      last = performance.now();
      A2.raf = requestAnimationFrame(loop);
    }

    function gameOver(victory) {
      running = false;
      var frac = victory ? 1 : Math.max(.05, Math.min(.95, currentStage / STAGES.length));
      var newHigh = (typeof wgRecordScore === "function") ? wgRecordScore(CB_ID, player.score, currentStage + 1) : false;
      a2Result(
        "☁️ Cloudberry Squadron",
        (victory ? "Sky Saved!" : "Piko Is Taking a Snack Break") + (newHigh ? " 🏆" : ""),
        "Score <b>" + player.score.toLocaleString() + "</b> · reached level <b>" + (currentStage + 1) + " / " + STAGES.length + "</b>" +
          (victory
            ? "<br>You cleared all ten levels and restored peace to Candy Sky!"
            : "<br>Red smart missiles steer toward Piko — your normal shots can intercept and destroy them before they connect."),
        frac, "openCloudberry"
      );
    }

    function rnd(a,b){ return a + Math.random()*(b-a); }
    function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

    function roundedRect(x,y,w,h,r,fill,stroke) {
      ctx.beginPath();
      ctx.roundRect(x,y,w,h,r);
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
    }

    function spawnParticle(x,y,color,count,speed) {
      count = count || 8; speed = speed || 90;
      for (var i=0;i<count;i++) {
        var a = Math.random()*Math.PI*2;
        var sp = Math.random()*speed;
        particles.push({
          x:x,y:y, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp,
          life:rnd(.25,.7), max:rnd(.25,.7),
          size:rnd(2,6), color:color
        });
      }
    }

    function useSpecial() {
      if (player.specials <= 0 || specialAttack.active) return;

      player.specials--;
      specialAttack.active = true;
      specialAttack.t = 0;
      specialAttack.x = -420;
      specialAttack.bossHit = false;

      player.inv = Math.max(player.inv, specialAttack.duration + .45);
      screenShake = 13;
      message = "GIANT PIKO RUSH!";
      messageTimer = 1.4;
    }

    function updateSpecial(dt) {
      if (!specialAttack.active) return;

      specialAttack.t += dt;
      var p = clamp(specialAttack.t / specialAttack.duration, 0, 1);
      var eased = p < .5
        ? 2*p*p
        : 1 - Math.pow(-2*p+2,2)/2;

      specialAttack.x = -430 + eased*(W+900);
      player.inv = Math.max(player.inv, .25);

      for (var i=enemyBullets.length-1;i>=0;i--) {
        var b=enemyBullets[i];
        if (b.x < specialAttack.x + 290) {
          spawnParticle(b.x,b.y,"#9df7ff",2,45);
          enemyBullets.splice(i,1);
          player.score += 5;
        }
      }

      for (var j=enemies.length-1;j>=0;j--) {
        var e=enemies[j];

        if (e.boss) {
          if (!specialAttack.bossHit && specialAttack.x > e.x-180) {
            specialAttack.bossHit = true;
            var damage = e.finalBoss ? 112 : 88;
            damageBoss(e,damage,e.x,e.y);
            spawnParticle(e.x,e.y,"#bdf9ff",72,280);
            spawnParticle(e.x,e.y,"#fff59a",48,220);
            screenShake = 28;
            message = "GIANT HIT · " + damage + " DAMAGE!";
            messageTimer = 1.1;
          }
          continue;
        }

        if (e.x < specialAttack.x + 220) {
          player.score += e.score;
          spawnParticle(e.x,e.y,"#bdf9ff",18,190);
          spawnParticle(e.x,e.y,"#ff91c7",10,130);
          enemies.splice(j,1);
        }
      }

      if (specialAttack.t >= specialAttack.duration) {
        specialAttack.active = false;
        enemyBullets.length = 0;
        specialAttack.x = W + 500;
      }
    }

    function shootPlayer() {
      if (player.fireCd > 0) return;
      player.fireCd = Math.max(.065, .145 - player.power*.014);

      var patterns = {
        1: [[0,0]],
        2: [[0,-6],[0,6]],
        3: [[0,0],[-.13,-9],[.13,9]],
        4: [[0,-9],[0,9],[-.18,-14],[.18,14]],
        5: [[0,0],[-.13,-9],[.13,9],[-.28,-14],[.28,14]]
      };
      var p = patterns[Math.min(5,player.power)];
      p.forEach(function(pair){
        var ang=pair[0], off=pair[1];
        bullets.push({
          x:player.x+28, y:player.y+off,
          vx:560*Math.cos(ang), vy:560*Math.sin(ang),
          r:5, dmg:1
        });
      });
    }

    function stageEnemyPool() {
      var pools = [
        ["cup","cookie"],
        ["cup","jelly","fish","spinner"],
        ["cookie","bee","cup","knight"],
        ["bee","bat","jelly","squid"],
        ["bat","cloudcat","fish","rocketpig"],
        ["jelly","fish","cloudcat","cup","squid"],
        ["cookie","bee","bat","knight","rocketpig"],
        ["cloudcat","fish","jelly","bee","spinner","squid"],
        ["bat","bee","cloudcat","fish","rocketpig","knight"],
        ["cup","jelly","cookie","fish","bee","bat","cloudcat","rocketpig","squid","knight","spinner"]
      ];
      return pools[currentStage];
    }

    function spawnEnemy(type) {
      var cfg = stageConfig();
      var speed = cfg.speed;

      if (type === "cup") {
        enemies.push({
          type:type,x:W+50,y:rnd(80,H-80),vx:rnd(-112,-78)*speed,vy:rnd(-20,20),
          r:22,hp:currentStage<3?2:3,maxHp:currentStage<3?2:3,t:0,
          fire:rnd(1.2,2.0),pattern:Math.floor(Math.random()*3),score:180
        });
      } else if (type === "jelly") {
        enemies.push({
          type:type,x:W+50,y:rnd(90,H-90),vx:-94*speed,vy:0,
          r:27,hp:currentStage<4?4:5,maxHp:currentStage<4?4:5,t:rnd(0,6),
          fire:rnd(1.5,2.3),pattern:Math.floor(Math.random()*3),score:320
        });
      } else if (type === "cookie") {
        var baseY = rnd(90,H-90);
        var count = currentStage < 3 ? 4 : 5;
        for (var i=0;i<count;i++) {
          enemies.push({
            type:type,x:W+40+i*46,y:baseY+(i-(count-1)/2)*24,
            vx:-142*speed,vy:0,r:17,hp:1,maxHp:1,t:rnd(0,2),
            fire:rnd(1.1,2.2)+i*.18,pattern:i%2,score:120
          });
        }
      } else if (type === "fish") {
        enemies.push({
          type:type,x:W+60,y:rnd(90,H-90),baseY:rnd(90,H-90),
          vx:-118*speed,vy:0,r:23,hp:3,maxHp:3,t:rnd(0,5),
          fire:rnd(1.4,2.2),pattern:Math.floor(Math.random()*2),score:240
        });
      } else if (type === "bee") {
        enemies.push({
          type:type,x:W+55,y:rnd(80,H-80),baseY:rnd(80,H-80),
          vx:-155*speed,vy:0,r:18,hp:2,maxHp:2,t:rnd(0,4),
          fire:rnd(.9,1.6),pattern:Math.floor(Math.random()*2),score:210
        });
      } else if (type === "bat") {
        enemies.push({
          type:type,x:W+60,y:rnd(95,H-95),baseY:rnd(95,H-95),
          vx:-102*speed,vy:0,r:25,hp:4,maxHp:4,t:rnd(0,5),
          fire:rnd(1.3,2.0),pattern:Math.floor(Math.random()*2),score:290
        });
      } else if (type === "cloudcat") {
        enemies.push({
          type:type,x:W+75,y:rnd(100,H-100),baseY:rnd(100,H-100),
          vx:-72*speed,vy:0,r:32,hp:7,maxHp:7,t:rnd(0,5),
          fire:rnd(1.4,2.1),pattern:Math.floor(Math.random()*3),score:460
        });
      } else if (type === "rocketpig") {
        enemies.push({
          type:type,x:W+80,y:rnd(105,H-105),baseY:rnd(105,H-105),
          vx:-76*speed,vy:0,r:30,hp:7,maxHp:7,t:rnd(0,4),
          fire:rnd(.8,1.3),pattern:0,missiles:0,score:520
        });
      } else if (type === "squid") {
        enemies.push({
          type:type,x:W+70,y:rnd(95,H-95),baseY:rnd(95,H-95),
          vx:-91*speed,vy:0,r:29,hp:5,maxHp:5,t:rnd(0,5),
          fire:rnd(1.2,1.9),pattern:Math.floor(Math.random()*3),score:390
        });
      } else if (type === "knight") {
        enemies.push({
          type:type,x:W+65,y:rnd(90,H-90),baseY:rnd(90,H-90),
          vx:-108*speed,vy:0,r:25,hp:6,maxHp:6,t:rnd(0,4),
          fire:rnd(1.0,1.7),pattern:Math.floor(Math.random()*2),
          charge:false,chargeTimer:rnd(1.4,2.4),score:430
        });
      } else if (type === "spinner") {
        enemies.push({
          type:type,x:W+65,y:rnd(95,H-95),baseY:rnd(95,H-95),
          vx:-86*speed,vy:0,r:25,hp:4,maxHp:4,t:rnd(0,5),
          fire:rnd(1.1,1.8),pattern:Math.random()*Math.PI*2,score:350
        });
      }
    }

    function spawnHomingMissile(x,y,opts) {
      opts = opts || {};
      var activeMissiles=enemies.filter(function(e){ return e.type==="missile"; }).length;
      var cap=currentStage>=8?6:4;
      if(activeMissiles>=cap) return;

      var targetAngle=Math.atan2(player.y-y,player.x-x);
      var launchAngle=Math.PI + rnd(-.22,.22);
      var speed=opts.speed!=null ? opts.speed : (118+currentStage*3);

      enemies.push({
        type:"missile", smartMissile:true,
        x:x,y:y,
        vx:Math.cos(launchAngle)*speed,
        vy:Math.sin(launchAngle)*speed,
        r:13,hp:2,maxHp:2,t:0,life:0,
        speed:speed,maxSpeed:speed+55,
        turnRate:opts.turnRate!=null ? opts.turnRate : (1.85+currentStage*.055),
        armTime:opts.armTime!=null ? opts.armTime : .42,
        targetAngle:targetAngle,
        score:95,
        noDrop:true
      });

      message="SMART MISSILE!";
      messageTimer=Math.max(messageTimer,.55);
    }

    function spawnBoss() {
      var cfg = stageConfig();
      var finalBoss = currentStage === STAGES.length - 1;
      var coreHp = finalBoss ? 260 : cfg.bossHp;
      var armorHp = finalBoss ? 220 : 0;
      var shieldHp = finalBoss ? 180 : 0;

      enemies.push({
        type:"boss", boss:true, finalBoss:finalBoss,
        name:cfg.bossName, kind:cfg.bossKind, body:cfg.bossBody, trim:cfg.bossTrim,
        x:W+180, y:H/2, vx:finalBoss ? -112 : -52, vy:0, r:78,
        hp:coreHp, maxHp:coreHp,
        armor:armorHp, maxArmor:armorHp,
        shield:shieldHp, maxShield:shieldHp,
        t:0, fire:finalBoss ? .65 : cfg.bossFire,
        fireRate:cfg.bossFire, shotCount:cfg.bossShots,
        shotSpeed:finalBoss ? 158 : cfg.bossSpeed,
        score:2600+currentStage*700,
        phase:0, pattern:0, volley:0
      });

      message = finalBoss
        ? "FINAL BOSS · 3 ENERGY BARS"
        : "BOSS · " + cfg.bossName.toUpperCase();
      messageTimer = finalBoss ? 3.3 : 2.8;
    }

    function addEnemyBullet(x,y,angle,speed,opts) {
      opts = opts || {};
      var activeBoss = enemies.find(function(enemy){ return enemy.boss; });
      var bulletCap = (activeBoss && activeBoss.finalBoss) ? 175 : 110;
      if (enemyBullets.length > bulletCap) return;
      enemyBullets.push({
        x:x, y:y,
        vx:Math.cos(angle)*speed,
        vy:Math.sin(angle)*speed,
        r:opts.r!=null ? opts.r : 5,
        age:0,
        wave:opts.wave!=null ? opts.wave : 0,
        waveFreq:opts.waveFreq!=null ? opts.waveFreq : 0,
        phase:opts.phase!=null ? opts.phase : 0,
        curve:opts.curve!=null ? opts.curve : 0,
        accel:opts.accel!=null ? opts.accel : 0,
        color:opts.color!=null ? opts.color : "#ff75c5"
      });
    }

    function fireAimed(e, count, spread, speed, opts) {
      count = count||1; spread = spread!=null?spread:.18; speed = speed!=null?speed:145; opts = opts||{};
      var base = Math.atan2(player.y-e.y, player.x-e.x);
      for (var i=0;i<count;i++) {
        var a = base + (i-(count-1)/2)*spread;
        var o = {}; for (var k in opts) o[k]=opts[k];
        o.phase = i*Math.PI;
        addEnemyBullet(e.x-20,e.y,a,speed,o);
      }
    }

    function fireFixedFan(e, count, spread, speed, centerAngle) {
      count = count!=null?count:5; spread = spread!=null?spread:.20; speed = speed!=null?speed:140; centerAngle = centerAngle!=null?centerAngle:Math.PI;
      for (var i=0;i<count;i++) {
        var a = centerAngle + (i-(count-1)/2)*spread;
        addEnemyBullet(e.x-20,e.y,a,speed,{
          color:"#ff9fd0",
          phase:i*.8
        });
      }
    }

    function fireWavePair(e, speed) {
      speed = speed!=null?speed:145;
      var base = Math.atan2(player.y-e.y, player.x-e.x);
      addEnemyBullet(e.x-18,e.y-8,base-.03,speed,{
        wave:34,waveFreq:4.1,phase:0,color:"#a987ff"
      });
      addEnemyBullet(e.x-18,e.y+8,base+.03,speed,{
        wave:34,waveFreq:4.1,phase:Math.PI,color:"#a987ff"
      });
    }

    function fireCurvingPair(e, speed) {
      speed = speed!=null?speed:150;
      var base = Math.atan2(player.y-e.y, player.x-e.x);
      addEnemyBullet(e.x-18,e.y-7,base-.09,speed,{
        curve:-.48,color:"#ffb15c"
      });
      addEnemyBullet(e.x-18,e.y+7,base+.09,speed,{
        curve:.48,color:"#ffb15c"
      });
    }

    function fireLaneCurtain(e, gapY, speed) {
      speed = speed!=null?speed:135;
      var lanes = 7;
      for (var i=0;i<lanes;i++) {
        var y = 72 + i*((H-144)/(lanes-1));
        if (Math.abs(y-gapY) < 62) continue;
        addEnemyBullet(e.x-25,y,Math.PI,speed,{
          r:6,color:"#78dff2",wave:8,waveFreq:3.2,phase:i
        });
      }
    }

    function fireBossPattern(e) {
      var kindOffsets = {
        cupcake:0, whale:1, castle:2, dragon:3, rabbit:1,
        jellyking:2, blimp:3, sundae:0, serpent:1, teapot:2
      };
      var kindOffset = kindOffsets[e.kind] != null ? kindOffsets[e.kind] : 0;
      var phase = (e.pattern + kindOffset) % 4;
      var rage = e.hp < e.maxHp*.38;
      var levelBoost = currentStage * 2;

      if (phase === 0) {
        fireAimed(e, rage ? 6 : 5, .16, e.shotSpeed + levelBoost, {
          color:"#ff75c5"
        });
      } else if (phase === 1) {
        for (var i=0;i<(rage?4:3);i++) {
          var a = Math.PI + (i-(rage?1.5:1))*.11;
          addEnemyBullet(e.x-35,e.y,a,e.shotSpeed-4,{
            wave:rage?46:38,
            waveFreq:3.5,
            phase:i*Math.PI/2,
            color:"#a987ff"
          });
        }
      } else if (phase === 2) {
        var count = rage ? 7 : 5;
        for (var j=0;j<count;j++) {
          var off=(j-(count-1)/2)*.105;
          addEnemyBullet(e.x-30,e.y,Math.PI+off,e.shotSpeed+2,{
            curve:(j-(count-1)/2)*.11,
            color:"#ffb15c"
          });
        }
      } else {
        var offset = e.volley%2===0 ? 74 : -74;
        fireLaneCurtain(e,clamp(player.y+offset,95,H-95),e.shotSpeed-8);
      }

      if((e.kind==="rabbit" || e.kind==="teapot") && e.volley%3===0 && currentStage>=4) {
        spawnHomingMissile(e.x-55,e.y-28,{speed:132+currentStage*3,turnRate:1.95+currentStage*.05});
        if(currentStage>=8) spawnHomingMissile(e.x-55,e.y+28,{speed:126+currentStage*3,turnRate:1.8+currentStage*.05});
      }

      if(e.kind==="whale" && e.volley%2===0) {
        fireWavePair(e,e.shotSpeed+6);
      } else if(e.kind==="dragon" && e.volley%2===0) {
        fireCurvingPair(e,e.shotSpeed+16);
      } else if(e.kind==="blimp" && e.volley%3===0) {
        fireLaneCurtain(e,clamp(player.y+(e.volley%2?70:-70),95,H-95),e.shotSpeed-4);
      } else if(e.kind==="serpent" && e.volley%2===0) {
        fireAimed(e,3,.28,e.shotSpeed+8,{color:"#7df0d0"});
      }

      e.pattern++;
      e.volley++;
    }

    function fireFinalBossPattern(e) {
      var greenShield = e.shield > 0;
      var amberArmor = e.shield <= 0 && e.armor > 0;
      var redCore = e.shield <= 0 && e.armor <= 0;
      var phaseCount = redCore ? 6 : amberArmor ? 5 : 5;
      var phase = e.pattern % phaseCount;
      var speed = redCore ? 182 : amberArmor ? 170 : 158;

      if (greenShield) {
        if (phase === 0) {
          fireAimed(e,7,.135,speed,{color:"#6cf29a"});
        } else if (phase === 1) {
          for (var i=0;i<6;i++) {
            var a=Math.PI+(i-2.5)*.105;
            addEnemyBullet(e.x-40,e.y,a,speed-8,{
              wave:36,waveFreq:3.8,phase:i*Math.PI/3,color:"#70f0ad"
            });
          }
        } else if (phase === 2) {
          var count=8;
          for(var j=0;j<count;j++){
            var off=(j-(count-1)/2)*.105;
            addEnemyBullet(e.x-35,e.y,Math.PI+off,speed,{
              curve:(j-(count-1)/2)*.075,color:"#b8ff70"
            });
          }
        } else if (phase === 3) {
          var gapOffset=e.volley%2===0?82:-82;
          fireLaneCurtain(e,clamp(player.y+gapOffset,100,H-100),146);
        } else {
          fireWavePair(e,166);
          fireAimed(e,3,.24,150,{color:"#d9ff7a"});
        }
      } else if (amberArmor) {
        if (phase === 0) {
          fireAimed(e,8,.125,speed,{color:"#ffbf47"});
        } else if (phase === 1) {
          for(var k=0;k<8;k++){
            var off2=(k-3.5)*.09;
            addEnemyBullet(e.x-38,e.y,Math.PI+off2,speed-6,{
              curve:(k-3.5)*.06,color:"#ff9f43"
            });
          }
        } else if (phase === 2) {
          for(var m=0;m<7;m++){
            var a2=Math.PI+(m-3)*.09;
            addEnemyBullet(e.x-40,e.y,a2,speed-10,{
              wave:42,waveFreq:4.0,phase:m*Math.PI/3.5,color:"#ffc766"
            });
          }
        } else if (phase === 3) {
          var gapOffset2=e.volley%2===0?72:-72;
          fireLaneCurtain(e,clamp(player.y+gapOffset2,95,H-95),152);
          fireAimed(e,3,.18,160,{color:"#ffb347"});
        } else {
          fireCurvingPair(e,174);
          fireAimed(e,5,.16,164,{color:"#ffd166"});
        }
      } else {
        if (phase === 0) {
          fireAimed(e,9,.115,speed,{color:"#ff4d6d"});
        } else if (phase === 1) {
          for(var n=0;n<10;n++){
            var off3=(n-4.5)*.095;
            addEnemyBullet(e.x-38,e.y,Math.PI+off3,speed-4,{
              curve:(n-4.5)*.065,color:"#ff695e"
            });
          }
        } else if (phase === 2) {
          for(var p2=0;p2<8;p2++){
            var a3=Math.PI+(p2-3.5)*.08;
            addEnemyBullet(e.x-42,e.y,a3,speed-12,{
              wave:48,waveFreq:4.4,phase:p2*Math.PI/4,color:"#ff426f"
            });
          }
        } else if (phase === 3) {
          var gapOffset3=e.volley%2===0?68:-68;
          fireLaneCurtain(e,clamp(player.y+gapOffset3,95,H-95),160);
          fireAimed(e,3,.20,172,{color:"#ff8a55"});
        } else if (phase === 4) {
          spawnHomingMissile(e.x-52,e.y-34,{speed:154,turnRate:2.2,armTime:.28});
          spawnHomingMissile(e.x-52,e.y+34,{speed:146,turnRate:2.05,armTime:.28});
          for(var q=0;q<12;q++){
            if(q===5 || q===6) continue;
            var off4=(q-5.5)*.09;
            addEnemyBullet(e.x-34,e.y,Math.PI+off4,170,{
              color:"#ff395f",accel:16
            });
          }
        } else {
          fireCurvingPair(e,186);
          fireCurvingPair({x:e.x,y:e.y-42},174);
          fireCurvingPair({x:e.x,y:e.y+42},174);
          fireAimed(e,5,.14,166,{color:"#ffbd59"});
        }
      }

      e.pattern++;
      e.volley++;
    }

    function damageBoss(e, amount, hitX, hitY) {
      hitX = hitX!=null?hitX:e.x; hitY = hitY!=null?hitY:e.y;
      if (!e.finalBoss) {
        e.hp -= amount;
        spawnParticle(hitX,hitY,"#fff59a",4,55);
        return;
      }

      var remaining = amount;

      if (e.shield > 0 && remaining > 0) {
        var absorbed = Math.min(e.shield, remaining);
        e.shield -= absorbed;
        remaining -= absorbed;
        spawnParticle(hitX,hitY,"#65f29a",5,65);

        if (e.shield <= 0) {
          e.shield = 0;
          e.pattern = 0;
          e.volley = 0;
          e.fire = .22;
          enemyBullets.length = 0;
          screenShake = 18;
          message = "BOSS ENERGY BAR 1 BROKEN!";
          messageTimer = 2.5;
          spawnParticle(e.x,e.y,"#63f59a",58,230);
        }
      }

      if (e.shield <= 0 && e.armor > 0 && remaining > 0) {
        var absorbed2 = Math.min(e.armor, remaining);
        e.armor -= absorbed2;
        remaining -= absorbed2;
        spawnParticle(hitX,hitY,"#ffbf47",5,65);

        if (e.armor <= 0) {
          e.armor = 0;
          e.pattern = 0;
          e.volley = 0;
          e.fire = .18;
          enemyBullets.length = 0;
          screenShake = 22;
          message = "BOSS ENERGY BAR 2 BROKEN!";
          messageTimer = 2.5;
          spawnParticle(e.x,e.y,"#ffb52f",72,250);
        }
      }

      if (e.shield <= 0 && e.armor <= 0 && remaining > 0) {
        e.hp -= remaining;
        spawnParticle(hitX,hitY,"#ff536b",5,65);
      }
    }

    function dropPickup(x,y) {
      var roll = Math.random();
      if (roll < .62) {
        pickups.push({type:"power",x:x,y:y,vx:-55,vy:rnd(-25,25),r:15,t:0});
      } else if (roll < .79) {
        pickups.push({type:"heart",x:x,y:y,vx:-50,vy:0,r:14,t:0});
      } else if (roll < .89) {
        pickups.push({type:"special",x:x,y:y,vx:-50,vy:0,r:14,t:0});
      }
    }

    function update(dt) {
      time += dt;
      if (!stageCleared) stageTimer += dt;
      spawnTimer -= dt;
      messageTimer -= dt;
      screenShake = Math.max(0, screenShake - 60*dt);
      updateSpecial(dt);

      if (stageCleared) {
        stageClearTimer -= dt;
        if (stageClearTimer <= 0) {
          if (currentStage >= STAGES.length - 1) {
            gameOver(true);
            return;
          }
          beginStage(currentStage + 1);
        }
      }

      stars.forEach(function(s){
        s.x -= s.v*dt;
        if (s.x < -5) { s.x = W+5; s.y = Math.random()*H; }
      });
      clouds.forEach(function(c){
        c.x -= c.v*dt;
        if (c.x < -160*c.s) { c.x = W+rnd(20,200); c.y = rnd(60,H-80); }
      });

      if (keys["ArrowUp"] || keys["KeyW"]) player.vy -= 1050*dt;
      if (keys["ArrowDown"] || keys["KeyS"]) player.vy += 1050*dt;
      if (keys["ArrowLeft"] || keys["KeyA"]) player.vx -= 1050*dt;
      if (keys["ArrowRight"] || keys["KeyD"]) player.vx += 1050*dt;

      player.vx *= Math.pow(.0009,dt);
      player.vy *= Math.pow(.0009,dt);
      player.x = clamp(player.x + player.vx*dt, 38, W-45);
      player.y = clamp(player.y + player.vy*dt, 42, H-42);
      player.fireCd -= dt;
      player.inv -= dt;

      if (!specialAttack.active && (keys["Space"] || keys["KeyJ"])) shootPlayer();

      if (!bossSpawned && !stageCleared) {
        var cfg = stageConfig();
        if (spawnTimer <= 0) {
          var pool = stageEnemyPool();
          var type = pool[Math.floor(Math.random()*pool.length)];
          spawnEnemy(type);
          spawnTimer = Math.max(cfg.spawnMin, cfg.spawnBase - stageTimer*.004);
        }
        var regularEnemies = enemies.filter(function(e){ return !e.boss; }).length;
        if (stageTimer > cfg.duration && regularEnemies <= 3) {
          bossSpawned = true;
          spawnBoss();
        }
      }

      bullets.forEach(function(b){ b.x+=b.vx*dt; b.y+=b.vy*dt; });
      enemyBullets.forEach(function(b){
        b.age += dt;
        if (b.curve) {
          var angle = Math.atan2(b.vy,b.vx) + b.curve*dt;
          var speed = Math.hypot(b.vx,b.vy) + b.accel*dt;
          b.vx = Math.cos(angle)*speed;
          b.vy = Math.sin(angle)*speed;
        }
        b.x += b.vx*dt;
        b.y += b.vy*dt;
        if (b.wave) b.y += Math.cos(b.age*b.waveFreq+b.phase)*b.wave*b.waveFreq*dt;
      });

      enemies.forEach(function(e){
        e.t += dt;
        e.fire -= dt;

        if (e.type === "cup") {
          e.x += e.vx*dt;
          e.y += (e.vy + Math.sin(e.t*4)*35)*dt;
          if (e.fire <= 0 && e.x < W-70) {
            if (e.pattern === 0) fireAimed(e,1,0,148+currentStage*2,{color:"#ff75c5"});
            else if (e.pattern === 1) fireWavePair(e,138+currentStage*2);
            else fireCurvingPair(e,142+currentStage*2);
            e.pattern=(e.pattern+1)%3;
            e.fire=rnd(1.75,2.55);
          }
        } else if (e.type === "jelly") {
          e.x += e.vx*dt;
          e.y += Math.sin(e.t*2.8)*70*dt;
          if (e.fire <= 0 && e.x < W-80) {
            if (e.pattern === 0) fireAimed(e,3,.19,132+currentStage*2,{color:"#ff9fd0"});
            else if (e.pattern === 1) fireFixedFan(e,4,.18,128+currentStage*2,Math.PI+(Math.sin(e.t)*.12));
            else fireWavePair(e,132+currentStage*2);
            e.pattern=(e.pattern+1)%3;
            e.fire=rnd(2.05,2.85);
          }
        } else if (e.type === "cookie") {
          e.x += e.vx*dt;
          e.y += Math.sin((e.t+e.x*.01)*3)*15*dt;
          if (e.fire <= 0 && e.x < W-110 && e.x > W*.43) {
            var angle = Math.PI + (e.pattern===0 ? -.28 : .28);
            addEnemyBullet(e.x-10,e.y,angle,126+currentStage*2,{
              curve:e.pattern===0 ? .20 : -.20,
              color:"#ffb15c"
            });
            e.fire=99;
          }
        } else if (e.type === "fish") {
          e.x += e.vx*dt;
          e.y = e.baseY + Math.sin(e.t*2.7)*58;
          if(e.fire<=0 && e.x<W-80){
            if(e.pattern===0) fireFixedFan(e,3,.22,128+currentStage*2,Math.PI);
            else fireWavePair(e,132+currentStage*2);
            e.pattern=(e.pattern+1)%2;
            e.fire=rnd(1.8,2.6);
          }
        } else if (e.type === "bee") {
          e.x += e.vx*dt;
          e.y = e.baseY + Math.sin(e.t*5.1)*34;
          if(e.fire<=0 && e.x<W-90){
            var angleB=Math.atan2(player.y-e.y,player.x-e.x);
            addEnemyBullet(e.x-12,e.y-7,angleB-.18,150+currentStage*2,{color:"#ffe45d"});
            addEnemyBullet(e.x-12,e.y+7,angleB+.18,150+currentStage*2,{color:"#ffe45d"});
            e.fire=rnd(1.55,2.25);
          }
        } else if (e.type === "bat") {
          e.x += e.vx*dt;
          e.y = e.baseY + Math.sin(e.t*2.1)*78;
          if(e.fire<=0 && e.x<W-80){
            if(e.pattern===0) fireAimed(e,3,.16,142+currentStage*2,{color:"#c084ff"});
            else fireCurvingPair(e,148+currentStage*2);
            e.pattern=(e.pattern+1)%2;
            e.fire=rnd(1.8,2.5);
          }
        } else if (e.type === "cloudcat") {
          e.x += e.vx*dt;
          e.y = e.baseY + Math.sin(e.t*1.6)*42;
          if(e.fire<=0 && e.x<W-100){
            if(e.pattern===0) fireAimed(e,5,.14,135+currentStage*2,{color:"#8de7ff"});
            else if(e.pattern===1) fireFixedFan(e,6,.15,128+currentStage*2,Math.PI+Math.sin(e.t)*.10);
            else fireWavePair(e,140+currentStage*2);
            e.pattern=(e.pattern+1)%3;
            e.fire=rnd(2.0,2.8);
          }
        } else if (e.type === "rocketpig") {
          e.x += e.vx*dt;
          e.y = e.baseY + Math.sin(e.t*1.75)*44;
          if(e.fire<=0 && e.x<W-100 && e.x>W*.48){
            spawnHomingMissile(e.x-31,e.y+8,{
              speed:120+currentStage*3,
              turnRate:1.75+currentStage*.06
            });
            e.missiles++;
            if(e.missiles%3===0) fireAimed(e,3,.18,130+currentStage*2,{color:"#ff8a65"});
            e.fire=rnd(2.25,3.05);
          }
        } else if (e.type === "squid") {
          e.x += e.vx*dt;
          e.y = e.baseY + Math.sin(e.t*2.25)*62;
          if(e.fire<=0 && e.x<W-90){
            if(e.pattern===0){
              fireFixedFan(e,5,.17,130+currentStage*2,Math.PI);
            } else if(e.pattern===1){
              for(var si=0;si<4;si++){
                var angleS=Math.PI+(si-1.5)*.18;
                addEnemyBullet(e.x-15,e.y,angleS,122+currentStage*2,{
                  wave:26,waveFreq:3.5,phase:si*Math.PI/2,color:"#5078e9",r:6
                });
              }
            } else {
              fireCurvingPair(e,146+currentStage*2);
            }
            e.pattern=(e.pattern+1)%3;
            e.fire=rnd(1.8,2.55);
          }
        } else if (e.type === "knight") {
          e.chargeTimer-=dt;
          if(!e.charge && e.chargeTimer<=0 && e.x<W-130){
            e.charge=true;
            e.vx=-265-stageConfig().speed*32;
            fireFixedFan(e,3,.18,130+currentStage*2,Math.PI);
          }
          e.x+=e.vx*dt;
          e.y=e.baseY+Math.sin(e.t*3.0)*24;
          if(!e.charge && e.fire<=0 && e.x<W-90){
            fireAimed(e,2,.18,146+currentStage*2,{color:"#b9d7ff"});
            e.fire=rnd(1.8,2.5);
          }
        } else if (e.type === "spinner") {
          e.x+=e.vx*dt;
          e.y=e.baseY+Math.sin(e.t*2.2)*48;
          if(e.fire<=0 && e.x<W-95){
            for(var pi=0;pi<4;pi++){
              var angleP=e.pattern+pi*Math.PI/2;
              addEnemyBullet(e.x,e.y,angleP,118+currentStage*2,{
                curve:(pi%2===0?.22:-.22),color:"#ff85bd"
              });
            }
            e.pattern+=.62;
            e.fire=rnd(1.55,2.15);
          }
        } else if (e.type === "missile") {
          e.life+=dt;

          var desired=Math.atan2(player.y-e.y,player.x-e.x);
          var current=Math.atan2(e.vy,e.vx);
          var diff=((desired-current+Math.PI*3)%(Math.PI*2))-Math.PI;

          var turn=e.life<e.armTime?e.turnRate*.30:e.turnRate;
          current+=clamp(diff,-turn*dt,turn*dt);

          e.speed=Math.min(e.maxSpeed,e.speed+(e.life>e.armTime?17:5)*dt);
          e.vx=Math.cos(current)*e.speed;
          e.vy=Math.sin(current)*e.speed;
          e.x+=e.vx*dt;
          e.y+=e.vy*dt;

          if(Math.floor(e.life*18)!==Math.floor((e.life-dt)*18)){
            particles.push({
              x:e.x-Math.cos(current)*14,
              y:e.y-Math.sin(current)*14,
              vx:-e.vx*.10+rnd(-18,18),
              vy:-e.vy*.10+rnd(-18,18),
              life:.35,max:.35,size:rnd(3,6),
              color:e.life<e.armTime?"#ffe976":"#cfe9ff"
            });
          }
        } else if (e.type === "boss") {
          if (e.x > W-150) {
            e.x += e.vx*dt;
            e.phase += dt;

            if(e.finalBoss && e.x < W+24 && e.fire<=0){
              fireFinalBossPattern(e);
              e.fire=e.shield>0?.80:(e.armor>0?.66:.50);
            }
          } else {
            e.x = W-150;
            e.phase += dt;
            var redCore=e.finalBoss && e.shield<=0 && e.armor<=0;
            var amberArmor=e.finalBoss && e.shield<=0 && e.armor>0;
            var verticalSpeed=redCore?1.42:amberArmor?1.16:.9;
            var verticalRange=redCore?170:amberArmor?155:145;
            e.y = H/2 + Math.sin(e.phase*verticalSpeed)*verticalRange;

            if (e.fire <= 0) {
              if(e.finalBoss){
                fireFinalBossPattern(e);
                e.fire=e.shield>0?.72:(e.armor>0?.58:.42);
              } else {
                fireBossPattern(e);
                e.fire = e.hp < e.maxHp*.38 ? Math.max(.78,e.fireRate*.72) : Math.max(1.02,e.fireRate*.88);
              }
            }
          }
        }
      });

      pickups.forEach(function(p){
        p.t += dt;
        p.x += p.vx*dt;
        p.y += (p.vy + Math.sin(p.t*5)*22)*dt;
      });

      particles.forEach(function(p){
        p.life -= dt;
        p.x += p.vx*dt;
        p.y += p.vy*dt;
        p.vx *= Math.pow(.05,dt);
        p.vy *= Math.pow(.05,dt);
      });

      for (var i=bullets.length-1;i>=0;i--) {
        var b=bullets[i];
        var hit=false;
        for (var j=enemies.length-1;j>=0;j--) {
          var e=enemies[j];
          var rr=(b.r+e.r)*.88;
          if ((b.x-e.x)*(b.x-e.x)+(b.y-e.y)*(b.y-e.y) < rr*rr) {
            if(e.boss) damageBoss(e,b.dmg,b.x,b.y);
            else {
              e.hp-=b.dmg;
              spawnParticle(b.x,b.y,"#fff59a",3,45);
            }
            hit=true;
            if (e.hp<=0) {
              player.score += e.score;
              var deathColor=e.type==="missile"?"#b9ecff":(e.boss?(e.finalBoss?"#ff4f68":"#fff59a"):"#ff91c7");
              var deathCount=e.type==="missile"?14:(e.boss?(e.finalBoss?145:90):18);
              var deathSpeed=e.type==="missile"?175:(e.boss?(e.finalBoss?330:260):140);
              spawnParticle(e.x,e.y,deathColor,deathCount,deathSpeed);
              screenShake = e.boss?24:(e.type==="missile"?7:5);
              if (!e.boss && !e.noDrop && Math.random()<.32) dropPickup(e.x,e.y);
              if (e.boss) {
                enemies.splice(j,1);
                enemyBullets.length = 0;
                stageCleared = true;
                stageClearTimer = 2.8;
                message = currentStage === STAGES.length - 1 ? "ALL 10 LEVELS CLEAR!" : "LEVEL " + (currentStage + 1) + " CLEAR!";
                messageTimer = 2.7;
                return;
              }
              enemies.splice(j,1);
            }
            break;
          }
        }
        if (hit || b.x>W+30 || b.y<0 || b.y>H) bullets.splice(i,1);
      }

      if (player.inv <= 0) {
        for (var bi=enemyBullets.length-1;bi>=0;bi--) {
          var eb=enemyBullets[bi];
          if ((eb.x-player.x)*(eb.x-player.x)+(eb.y-player.y)*(eb.y-player.y) < (eb.r+player.r*.54)*(eb.r+player.r*.54)) {
            enemyBullets.splice(bi,1);
            hurtPlayer();
            break;
          }
        }
        for (var ei=enemies.length-1;ei>=0;ei--) {
          var en=enemies[ei];
          if ((en.x-player.x)*(en.x-player.x)+(en.y-player.y)*(en.y-player.y) < (en.r+player.r*.60)*(en.r+player.r*.60)) {
            if (!en.boss) enemies.splice(ei,1);
            hurtPlayer();
            break;
          }
        }
      }

      for (var pi2=pickups.length-1;pi2>=0;pi2--) {
        var pk=pickups[pi2];
        if ((pk.x-player.x)*(pk.x-player.x)+(pk.y-player.y)*(pk.y-player.y) < (pk.r+player.r)*(pk.r+player.r)) {
          if (pk.type==="power") {
            player.power=Math.min(5,player.power+1);
            player.score+=250;
            message="POWER ORB!";
          } else if (pk.type==="heart") {
            player.hp=Math.min(player.maxHp,player.hp+1);
            message="HEART!";
          } else {
            player.specials=Math.min(5,player.specials+1);
            message="SPECIAL +1";
          }
          messageTimer=1;
          spawnParticle(pk.x,pk.y,"#fff59a",16,120);
          pickups.splice(pi2,1);
        }
      }

      for (var bi2=bullets.length-1;bi2>=0;bi2--) if (bullets[bi2].x>W+40) bullets.splice(bi2,1);
      for (var ebi=enemyBullets.length-1;ebi>=0;ebi--) {
        var ebb=enemyBullets[ebi];
        if (ebb.x<-30||ebb.x>W+30||ebb.y<-30||ebb.y>H+30) enemyBullets.splice(ebi,1);
      }
      for (var eni=enemies.length-1;eni>=0;eni--) {
        var ee=enemies[eni];
        if(ee.type==="missile"){
          if(ee.life>8.5 || ee.x<-190 || ee.x>W+190 || ee.y<-190 || ee.y>H+190) enemies.splice(eni,1);
        } else if(ee.x<-140) {
          enemies.splice(eni,1);
        }
      }
      for (var pki=pickups.length-1;pki>=0;pki--) if (pickups[pki].x<-30) pickups.splice(pki,1);
      for (var pai=particles.length-1;pai>=0;pai--) if (particles[pai].life<=0) particles.splice(pai,1);
    }

    function hurtPlayer() {
      player.hp--;
      player.inv=2.05;
      player.power=Math.max(1,player.power-1);
      screenShake=13;
      spawnParticle(player.x,player.y,"#ffffff",28,180);
      if (player.hp<=0) gameOver(false);
    }

    function drawCloud(x,y,s,alpha) {
      alpha = alpha!=null?alpha:.75;
      ctx.save();
      ctx.globalAlpha=alpha;
      ctx.fillStyle="#ffffff";
      ctx.beginPath();
      ctx.arc(x,y,22*s,0,Math.PI*2);
      ctx.arc(x+25*s,y-10*s,29*s,0,Math.PI*2);
      ctx.arc(x+57*s,y,24*s,0,Math.PI*2);
      ctx.arc(x+28*s,y+9*s,29*s,0,Math.PI*2);
      ctx.fill();
      ctx.restore();
    }

    function drawBackground() {
      var cfg = stageConfig();
      var g=ctx.createLinearGradient(0,0,0,H);
      g.addColorStop(0,cfg.sky[0]);
      g.addColorStop(.55,cfg.sky[1]);
      g.addColorStop(1,cfg.sky[2]);
      ctx.fillStyle=g;
      ctx.fillRect(0,0,W,H);
      ctx.fillStyle=currentStage >= 4 ? "rgba(255,248,220,.82)" : "rgba(255,250,190,.85)";
      ctx.beginPath();ctx.arc(760,100,52,0,Math.PI*2);ctx.fill();
      stars.forEach(function(s){ctx.globalAlpha=.25+s.s*.18;ctx.fillStyle="#fff";ctx.fillRect(s.x,s.y,s.s,s.s);});
      ctx.globalAlpha=1;
      clouds.forEach(function(c){drawCloud(c.x,c.y,c.s,.38);});
      ctx.fillStyle=cfg.hill1;
      ctx.beginPath();ctx.moveTo(0,H);
      for(var x=0;x<=W;x+=40) ctx.lineTo(x,430+Math.sin((x+time*18)*.012)*28);
      ctx.lineTo(W,H);ctx.closePath();ctx.fill();
      ctx.fillStyle=cfg.hill2;
      ctx.beginPath();ctx.moveTo(0,H);
      for(var x2=0;x2<=W;x2+=40) ctx.lineTo(x2,470+Math.sin((x2+time*30)*.016+2)*22);
      ctx.lineTo(W,H);ctx.closePath();ctx.fill();
      for(var i=0;i<10;i++){
        var xi=((i*130-time*55)%1300+1300)%1300-80;
        ctx.fillStyle="#76505b";ctx.fillRect(xi,430,9,60);
        ctx.fillStyle=i%2?cfg.tree:cfg.bossTrim;
        ctx.beginPath();ctx.arc(xi+4,423,23,0,Math.PI*2);ctx.fill();
      }
    }

    function drawPuffin(x,y) {
      ctx.save();
      ctx.translate(x,y);
      var flap=Math.sin(time*13)*6;

      ctx.fillStyle="#31415d";
      ctx.beginPath();
      ctx.ellipse(-5,18+flap*.25,19,8,-.2,0,Math.PI*2);
      ctx.fill();

      ctx.fillStyle="#f8fbff";
      ctx.beginPath();
      ctx.ellipse(0,3,25,22,0,0,Math.PI*2);
      ctx.fill();

      ctx.fillStyle="#26344d";
      ctx.beginPath();
      ctx.arc(-4,-12,18,0,Math.PI*2);
      ctx.fill();

      ctx.fillStyle="#fff";
      ctx.beginPath();
      ctx.ellipse(3,-10,11,9,0,0,Math.PI*2);
      ctx.fill();

      ctx.fillStyle="#20263a";
      ctx.beginPath(); ctx.arc(6,-12,3,0,Math.PI*2); ctx.fill();

      ctx.fillStyle="#ff9b55";
      ctx.beginPath();
      ctx.moveTo(13,-7); ctx.lineTo(31,-1); ctx.lineTo(13,3); ctx.closePath(); ctx.fill();

      ctx.strokeStyle="#ff547d";
      ctx.lineWidth=5;
      ctx.beginPath(); ctx.moveTo(-15,3); ctx.lineTo(-29,8+flap); ctx.lineTo(-42,2-flap*.2); ctx.stroke();

      ctx.fillStyle="#6f82b7";
      ctx.beginPath(); ctx.ellipse(-24,8,9,12,0,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle="#dffcff"; ctx.lineWidth=3;
      ctx.beginPath(); ctx.moveTo(-35,-5-flap); ctx.lineTo(-35,21+flap); ctx.stroke();

      ctx.fillStyle="rgba(255,120,150,.55)";
      ctx.beginPath(); ctx.arc(7,-3,4,0,Math.PI*2); ctx.fill();

      ctx.restore();
    }

    function drawCup(e) {
      ctx.save(); ctx.translate(e.x,e.y);
      ctx.rotate(Math.sin(e.t*3)*.14);
      ctx.fillStyle="#fff7f0";
      roundedRect(-20,-17,36,30,9,"#fff7f0","#703b67");
      ctx.lineWidth=3; ctx.strokeStyle="#703b67";
      ctx.beginPath(); ctx.arc(15,-1,10,-Math.PI/2,Math.PI/2); ctx.stroke();
      ctx.fillStyle="#8a5a83";
      ctx.beginPath(); ctx.arc(-8,-4,2.5,0,Math.PI*2); ctx.arc(5,-4,2.5,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle="#8a5a83"; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(-1,2,7,.2,Math.PI-.2); ctx.stroke();
      ctx.fillStyle="#ff89b5";
      ctx.beginPath(); ctx.ellipse(-19,-22,7,12,-.5,0,Math.PI*2); ctx.ellipse(5,-25,7,12,.5,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }

    function drawJelly(e) {
      ctx.save(); ctx.translate(e.x,e.y);
      ctx.fillStyle="#8bf4ef";
      ctx.strokeStyle="#236985"; ctx.lineWidth=3;
      ctx.beginPath();
      ctx.arc(0,-2,25,Math.PI,0);
      ctx.quadraticCurveTo(25,18,12,16);
      ctx.quadraticCurveTo(4,27,-3,16);
      ctx.quadraticCurveTo(-13,27,-22,14);
      ctx.quadraticCurveTo(-25,8,-25,-2);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle="#27405d";
      ctx.beginPath();ctx.arc(-8,-3,3,0,Math.PI*2);ctx.arc(8,-3,3,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle="#27405d";ctx.lineWidth=2;
      ctx.beginPath();ctx.arc(0,5,6,0,Math.PI);ctx.stroke();
      ctx.restore();
    }

    function drawCookie(e) {
      ctx.save();ctx.translate(e.x,e.y);ctx.rotate(Math.sin(e.t*4)*.08);
      ctx.fillStyle="#ad6b45";
      ctx.beginPath();ctx.ellipse(-19,2,8,13,-.65,0,Math.PI*2);ctx.ellipse(19,2,8,13,.65,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="#e8ad62";ctx.strokeStyle="#754226";ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(0,0,17,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle="#7b4d3a";
      ctx.beginPath();ctx.arc(-7,-7,2.2,0,Math.PI*2);ctx.arc(7,7,2.2,0,Math.PI*2);ctx.arc(8,-6,1.8,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle="#5a2830";ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(-10,-5);ctx.lineTo(-3,-2);ctx.moveTo(10,-5);ctx.lineTo(3,-2);ctx.stroke();
      ctx.fillStyle="#5a2830";ctx.beginPath();ctx.arc(-6,0,2.2,0,Math.PI*2);ctx.arc(6,0,2.2,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(0,9,5,Math.PI+.2,Math.PI*2-.2);ctx.stroke();
      ctx.restore();
    }

    function drawFish(e) {
      ctx.save();ctx.translate(e.x,e.y);
      var flap=Math.sin(e.t*8)*5;
      ctx.fillStyle="#73dffc";ctx.strokeStyle="#285b85";ctx.lineWidth=3;
      ctx.beginPath();ctx.ellipse(0,0,25,16,0,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle="#ff9ec4";
      ctx.beginPath();ctx.moveTo(20,0);ctx.lineTo(38,-14-flap);ctx.lineTo(36,14+flap);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(-10,-4,6,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="#24415e";ctx.beginPath();ctx.arc(-11,-4,2.5,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle="#24415e";ctx.lineWidth=2;ctx.beginPath();ctx.arc(-7,6,7,.15,Math.PI-.15);ctx.stroke();
      ctx.restore();
    }

    function drawBee(e) {
      ctx.save();ctx.translate(e.x,e.y);
      ctx.fillStyle="rgba(225,250,255,.78)";
      ctx.beginPath();ctx.ellipse(-5,-13,12,7,-.5,0,Math.PI*2);ctx.ellipse(-5,13,12,7,.5,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="#ffd94f";ctx.strokeStyle="#6d4a25";ctx.lineWidth=3;
      ctx.beginPath();ctx.ellipse(0,0,20,14,0,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.strokeStyle="#6d4a25";ctx.lineWidth=5;
      ctx.beginPath();ctx.moveTo(-5,-12);ctx.lineTo(-5,12);ctx.moveTo(6,-12);ctx.lineTo(6,12);ctx.stroke();
      ctx.fillStyle="#242d45";ctx.beginPath();ctx.arc(-12,-3,2.5,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }

    function drawBat(e) {
      ctx.save();ctx.translate(e.x,e.y);
      var flap=Math.sin(e.t*9)*7;
      ctx.fillStyle="#9c78e5";ctx.strokeStyle="#49366f";ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(-5,0);ctx.quadraticCurveTo(-26,-20-flap,-36,-5);ctx.quadraticCurveTo(-23,2,-16,16+flap);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(5,0);ctx.quadraticCurveTo(26,-20-flap,36,-5);ctx.quadraticCurveTo(23,2,16,16+flap);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.fillStyle="#674d9a";ctx.beginPath();ctx.ellipse(0,3,15,19,0,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(-5,-2,4,0,Math.PI*2);ctx.arc(5,-2,4,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="#25213c";ctx.beginPath();ctx.arc(-5,-2,2,0,Math.PI*2);ctx.arc(5,-2,2,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }

    function drawCloudCat(e) {
      ctx.save();ctx.translate(e.x,e.y);
      ctx.fillStyle="#f9fbff";ctx.strokeStyle="#6479a4";ctx.lineWidth=3;
      ctx.beginPath();
      ctx.arc(-15,4,15,0,Math.PI*2);ctx.arc(0,-5,21,0,Math.PI*2);
      ctx.arc(19,4,16,0,Math.PI*2);ctx.arc(2,10,22,0,Math.PI*2);
      ctx.fill();ctx.stroke();
      ctx.fillStyle="#f9fbff";
      ctx.beginPath();ctx.moveTo(-14,-17);ctx.lineTo(-6,-34);ctx.lineTo(1,-15);ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(8,-16);ctx.lineTo(18,-32);ctx.lineTo(23,-12);ctx.fill();ctx.stroke();
      ctx.fillStyle="#33405e";ctx.beginPath();ctx.arc(-7,-4,3,0,Math.PI*2);ctx.arc(10,-4,3,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle="#33405e";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(1,2);ctx.lineTo(1,7);ctx.arc(1,7,7,0,Math.PI);ctx.stroke();
      ctx.restore();
    }

    function drawRocketPig(e) {
      ctx.save();ctx.translate(e.x,e.y);
      var bob=Math.sin(e.t*5)*3;

      ctx.fillStyle="#ff9cb3";ctx.strokeStyle="#70405a";ctx.lineWidth=3;
      ctx.beginPath();ctx.ellipse(0,bob,25,21,0,0,Math.PI*2);ctx.fill();ctx.stroke();

      ctx.beginPath();ctx.moveTo(-14,-15+bob);ctx.lineTo(-23,-29+bob);ctx.lineTo(-5,-20+bob);ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(10,-17+bob);ctx.lineTo(22,-30+bob);ctx.lineTo(23,-10+bob);ctx.fill();ctx.stroke();

      ctx.fillStyle="#f06d91";
      ctx.beginPath();ctx.ellipse(-12,4+bob,9,7,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="#63364c";
      ctx.beginPath();ctx.arc(-15,4+bob,1.8,0,Math.PI*2);ctx.arc(-9,4+bob,1.8,0,Math.PI*2);ctx.fill();

      ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(-7,-5+bob,4,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="#26334b";ctx.beginPath();ctx.arc(-8,-5+bob,2,0,Math.PI*2);ctx.fill();

      ctx.fillStyle="#6985a9";ctx.strokeStyle="#354a68";
      roundedRect(13,-10+bob,26,18,5,"#6985a9","#354a68");
      ctx.fillStyle="#ff5d69";
      ctx.beginPath();ctx.moveTo(38,-8+bob);ctx.lineTo(53,-1+bob);ctx.lineTo(38,6+bob);ctx.closePath();ctx.fill();ctx.stroke();

      ctx.restore();
    }

    function drawSquid(e) {
      ctx.save();ctx.translate(e.x,e.y);
      var wave=Math.sin(e.t*5)*5;
      ctx.fillStyle="#6d8df4";ctx.strokeStyle="#354078";ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(0,-4,24,Math.PI,0);ctx.lineTo(24,12);
      ctx.quadraticCurveTo(18,24+wave,10,13);
      ctx.quadraticCurveTo(3,27-wave,-4,13);
      ctx.quadraticCurveTo(-12,27+wave,-18,12);
      ctx.quadraticCurveTo(-27,23-wave,-24,8);
      ctx.closePath();ctx.fill();ctx.stroke();

      ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(-8,-5,6,0,Math.PI*2);ctx.arc(8,-5,6,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="#26324e";ctx.beginPath();ctx.arc(-7,-5,2.5,0,Math.PI*2);ctx.arc(7,-5,2.5,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }

    function drawKnight(e) {
      ctx.save();ctx.translate(e.x,e.y);
      var tilt=e.charge?-.18:Math.sin(e.t*3)*.05;
      ctx.rotate(tilt);

      ctx.fillStyle="#c8d9ef";ctx.strokeStyle="#536783";ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(0,-4,20,0,Math.PI*2);ctx.fill();ctx.stroke();

      ctx.fillStyle="#7e93ae";
      ctx.beginPath();ctx.moveTo(-18,-12);ctx.lineTo(20,-12);ctx.lineTo(17,-2);ctx.lineTo(-20,-2);ctx.closePath();ctx.fill();ctx.stroke();

      ctx.fillStyle="#24344a";ctx.fillRect(-11,-7,5,3);ctx.fillRect(4,-7,5,3);

      ctx.fillStyle="#7cb4dd";
      ctx.beginPath();ctx.moveTo(-17,9);ctx.lineTo(0,30);ctx.lineTo(17,9);ctx.closePath();ctx.fill();ctx.stroke();

      ctx.strokeStyle="#f3d36a";ctx.lineWidth=5;
      ctx.beginPath();ctx.moveTo(-15,8);ctx.lineTo(-39,1);ctx.stroke();
      ctx.strokeStyle="#fff2b0";ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(-37,1);ctx.lineTo(-56,-4);ctx.stroke();

      ctx.restore();
    }

    function drawSpinner(e) {
      ctx.save();ctx.translate(e.x,e.y);ctx.rotate(e.t*2.8);
      ctx.fillStyle="#ff83b7";ctx.strokeStyle="#743b65";ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(0,0,25,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle="#6fdbea";
      ctx.beginPath();ctx.arc(0,0,11,0,Math.PI*2);ctx.fill();ctx.stroke();

      for(var i=0;i<6;i++){
        var a=i*Math.PI/3;
        ctx.fillStyle=i%2?"#ffe269":"#a98bff";
        ctx.beginPath();ctx.arc(Math.cos(a)*18,Math.sin(a)*18,4,0,Math.PI*2);ctx.fill();
      }

      ctx.restore();
    }

    function drawMissile(e) {
      ctx.save();ctx.translate(e.x,e.y);
      var a=Math.atan2(e.vy,e.vx);
      ctx.rotate(a);

      var armed=e.life>=e.armTime;
      ctx.shadowColor=armed?"#ff4d62":"#ffe55c";
      ctx.shadowBlur=16;

      ctx.fillStyle=armed?"#ff5367":"#ffd951";
      ctx.strokeStyle="#6f3144";ctx.lineWidth=2.5;
      ctx.beginPath();
      ctx.moveTo(18,0);ctx.lineTo(7,-8);ctx.lineTo(-14,-8);
      ctx.lineTo(-22,0);ctx.lineTo(-14,8);ctx.lineTo(7,8);
      ctx.closePath();ctx.fill();ctx.stroke();

      ctx.fillStyle="#e9f8ff";
      ctx.beginPath();ctx.arc(5,-2,3,0,Math.PI*2);ctx.fill();

      ctx.fillStyle="#70d8ff";
      ctx.beginPath();ctx.moveTo(-16,-5);ctx.lineTo(-31,-11);ctx.lineTo(-24,0);ctx.lineTo(-31,11);ctx.lineTo(-16,5);ctx.closePath();ctx.fill();

      ctx.fillStyle="#fff";
      ctx.font="900 8px system-ui";
      ctx.textAlign="center";ctx.textBaseline="middle";
      ctx.fillText("!",-5,0);

      ctx.restore();
    }

    function drawBossFace(eyeY,mouthY) {
      eyeY = eyeY!=null?eyeY:0; mouthY = mouthY!=null?mouthY:17;
      ctx.fillStyle="#3f315a";
      ctx.beginPath();ctx.arc(-20,eyeY,7,0,Math.PI*2);ctx.arc(20,eyeY,7,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle="#3f315a";ctx.lineWidth=5;
      ctx.beginPath();ctx.arc(0,mouthY,21,.25,Math.PI-.25);ctx.stroke();
      ctx.fillStyle="rgba(255,100,160,.52)";
      ctx.beginPath();ctx.ellipse(-39,mouthY,10,6,0,0,Math.PI*2);ctx.ellipse(39,mouthY,10,6,0,0,Math.PI*2);ctx.fill();
    }

    function drawBoss(e) {
      ctx.save();
      ctx.translate(e.x,e.y);
      var bob=Math.sin(e.phase*3)*4;
      ctx.strokeStyle="#583c7c";
      ctx.lineWidth=6;
      ctx.lineJoin="round";
      ctx.lineCap="round";

      if(e.kind==="whale"){
        ctx.fillStyle=e.body;
        ctx.beginPath();ctx.ellipse(0,5,83,54,0,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.beginPath();ctx.moveTo(70,0);ctx.lineTo(118,-38);ctx.lineTo(108,5);ctx.lineTo(120,42);ctx.closePath();ctx.fill();ctx.stroke();
        ctx.fillStyle=e.trim;
        ctx.beginPath();ctx.ellipse(-10,49,37,12,0,0,Math.PI*2);ctx.fill();
        for(var i=0;i<3;i++){ctx.beginPath();ctx.arc(-45+i*20,-58-bob-i*5,8+i*2,0,Math.PI*2);ctx.stroke();}
        drawBossFace(-4,18);
      } else if(e.kind==="castle"){
        ctx.fillStyle=e.body;
        roundedRect(-70,-45,140,100,18,e.body,"#583c7c");
        for(var i2=-1;i2<=1;i2++){
          roundedRect(i2*43-16,-78,32,45,7,e.trim,"#583c7c");
          ctx.beginPath();ctx.moveTo(i2*43-18,-78);ctx.lineTo(i2*43,-101);ctx.lineTo(i2*43+18,-78);ctx.closePath();ctx.fill();ctx.stroke();
        }
        ctx.fillStyle="#70472c";
        roundedRect(-18,14,36,42,16,"#70472c","#583c7c");
        drawBossFace(-10,4);
      } else if(e.kind==="dragon"){
        ctx.fillStyle=e.body;
        ctx.beginPath();ctx.ellipse(5,7,72,52,-.08,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.beginPath();ctx.moveTo(-58,-11);ctx.quadraticCurveTo(-107,-44,-124,-7);ctx.quadraticCurveTo(-104,20,-58,18);ctx.fill();ctx.stroke();
        ctx.fillStyle=e.trim;
        for(var i3=0;i3<5;i3++){ctx.beginPath();ctx.moveTo(-35+i3*22,-42);ctx.lineTo(-22+i3*22,-72);ctx.lineTo(-10+i3*22,-39);ctx.closePath();ctx.fill();ctx.stroke();}
        ctx.fillStyle="#3f315a";ctx.beginPath();ctx.arc(-73,-13,7,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle="#3f315a";ctx.beginPath();ctx.arc(-89,5,18,.15,Math.PI-.15);ctx.stroke();
      } else if(e.kind==="rabbit"){
        ctx.fillStyle=e.body;
        ctx.beginPath();ctx.ellipse(0,7,60,58,0,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.beginPath();ctx.ellipse(-23,-65+bob,17,48,-.12,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.beginPath();ctx.ellipse(23,-65-bob,17,48,.12,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.fillStyle=e.trim;
        ctx.beginPath();ctx.moveTo(48,8);ctx.lineTo(94,-20);ctx.lineTo(88,28);ctx.closePath();ctx.fill();ctx.stroke();
        drawBossFace(-2,20);
      } else if(e.kind==="jellyking"){
        ctx.fillStyle=e.body;
        ctx.beginPath();ctx.arc(0,-6,72,Math.PI,0);ctx.lineTo(72,35);
        ctx.quadraticCurveTo(52,62,35,40);ctx.quadraticCurveTo(14,69,0,40);
        ctx.quadraticCurveTo(-19,69,-35,40);ctx.quadraticCurveTo(-55,63,-72,35);ctx.closePath();ctx.fill();ctx.stroke();
        ctx.fillStyle=e.trim;
        ctx.beginPath();ctx.moveTo(-42,-56);ctx.lineTo(-25,-88);ctx.lineTo(0,-60);ctx.lineTo(24,-89);ctx.lineTo(44,-55);ctx.closePath();ctx.fill();ctx.stroke();
        drawBossFace(-5,14);
      } else if(e.kind==="blimp"){
        ctx.fillStyle=e.body;
        ctx.beginPath();ctx.ellipse(0,-5,93,45,0,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.fillStyle=e.trim;
        roundedRect(-34,27,68,32,10,e.trim,"#583c7c");
        ctx.beginPath();ctx.moveTo(77,-9);ctx.lineTo(118,-39);ctx.lineTo(108,-2);ctx.lineTo(121,32);ctx.closePath();ctx.fill();ctx.stroke();
        drawBossFace(-8,8);
      } else if(e.kind==="sundae"){
        ctx.fillStyle=e.body;
        ctx.beginPath();ctx.arc(0,-18,62,Math.PI,0);ctx.lineTo(48,48);ctx.lineTo(-48,48);ctx.closePath();ctx.fill();ctx.stroke();
        ctx.fillStyle="#fff5f0";
        ctx.beginPath();ctx.arc(-25,-41,27,0,Math.PI*2);ctx.arc(7,-55,31,0,Math.PI*2);ctx.arc(35,-34,25,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.fillStyle=e.trim;ctx.beginPath();ctx.arc(5,-89,15,0,Math.PI*2);ctx.fill();ctx.stroke();
        drawBossFace(-18,10);
      } else if(e.kind==="serpent"){
        ctx.fillStyle=e.body;
        for(var i4=4;i4>=0;i4--){ctx.beginPath();ctx.arc(24+i4*28,Math.sin(e.phase*2+i4)*20,28-i4*2,0,Math.PI*2);ctx.fill();ctx.stroke();}
        ctx.beginPath();ctx.ellipse(-25,0,55,43,0,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.fillStyle=e.trim;
        ctx.beginPath();ctx.moveTo(-51,-28);ctx.lineTo(-36,-62);ctx.lineTo(-20,-29);ctx.fill();ctx.stroke();
        drawBossFace(-6,14);
      } else {
        ctx.strokeStyle="rgba(255,255,255,.7)";
        ctx.lineWidth=8;
        for(var i5=0;i5<3;i5++){
          ctx.beginPath();ctx.moveTo(-25+i5*25,-74+bob);
          ctx.bezierCurveTo(-37+i5*25,-96,-12+i5*25,-105,-24+i5*25,-128);ctx.stroke();
        }
        ctx.strokeStyle="#583c7c";ctx.lineWidth=6;
        ctx.fillStyle=e.body;
        ctx.beginPath();ctx.ellipse(0,8,72,58,0,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.beginPath();ctx.moveTo(-60,-4);ctx.quadraticCurveTo(-118,-38,-125,-1);ctx.quadraticCurveTo(-113,25,-62,22);ctx.fill();ctx.stroke();
        ctx.beginPath();ctx.arc(64,0,39,-Math.PI/2,Math.PI/2);ctx.stroke();
        ctx.fillStyle=e.trim;
        roundedRect(-36,-58,72,20,10,e.trim,"#583c7c");
        ctx.beginPath();ctx.arc(0,-64,12,0,Math.PI*2);ctx.fill();ctx.stroke();
        drawBossFace(0,16);
      }

      ctx.restore();
    }

    function drawEnemy(e) {
      if(e.type==="cup") drawCup(e);
      else if(e.type==="jelly") drawJelly(e);
      else if(e.type==="cookie") drawCookie(e);
      else if(e.type==="fish") drawFish(e);
      else if(e.type==="bee") drawBee(e);
      else if(e.type==="bat") drawBat(e);
      else if(e.type==="cloudcat") drawCloudCat(e);
      else if(e.type==="rocketpig") drawRocketPig(e);
      else if(e.type==="squid") drawSquid(e);
      else if(e.type==="knight") drawKnight(e);
      else if(e.type==="spinner") drawSpinner(e);
      else if(e.type==="missile") drawMissile(e);
      else drawBoss(e);
    }

    function drawPickup(p) {
      ctx.save();ctx.translate(p.x,p.y);
      ctx.rotate(Math.sin(p.t*4)*.25);
      ctx.shadowColor="#fff6a4";ctx.shadowBlur=16;
      if(p.type==="power"){
        ctx.shadowColor="#7be8ff";ctx.shadowBlur=20;
        ctx.strokeStyle="#e9fdff";ctx.lineWidth=3;ctx.fillStyle="#45bfe5";
        ctx.beginPath();ctx.arc(0,0,15,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.strokeStyle="rgba(255,255,255,.75)";ctx.lineWidth=2;
        ctx.beginPath();ctx.arc(0,0,20+Math.sin(p.t*6)*2,0,Math.PI*2);ctx.stroke();
        ctx.fillStyle="#fff";ctx.font="900 16px system-ui";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("P",0,1);
      } else if(p.type==="heart"){
        ctx.fillStyle="#ff5f8f";ctx.strokeStyle="#8b3156";ctx.lineWidth=3;
        ctx.beginPath();
        ctx.moveTo(0,13);ctx.bezierCurveTo(-22,-2,-15,-16,-6,-16);
        ctx.bezierCurveTo(0,-16,4,-11,5,-8);
        ctx.bezierCurveTo(7,-14,13,-17,18,-12);
        ctx.bezierCurveTo(29,0,13,12,0,13);ctx.fill();ctx.stroke();
      } else {
        ctx.fillStyle="#9a83ff";ctx.strokeStyle="#4e408c";ctx.lineWidth=3;
        ctx.beginPath();ctx.arc(0,0,13,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.fillStyle="#fff";ctx.font="bold 14px sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("S",0,1);
      }
      ctx.restore();
    }

    function drawGiantPiko() {
      if(!specialAttack.active) return;

      var p=clamp(specialAttack.t/specialAttack.duration,0,1);
      ctx.save();

      var grad=ctx.createLinearGradient(specialAttack.x-500,0,specialAttack.x+220,0);
      grad.addColorStop(0,"rgba(130,245,255,0)");
      grad.addColorStop(.75,"rgba(130,245,255,.22)");
      grad.addColorStop(1,"rgba(255,255,255,.42)");
      ctx.fillStyle=grad;
      ctx.fillRect(specialAttack.x-520,0,760,H);

      for(var i=3;i>=1;i--){
        ctx.save();
        ctx.globalAlpha=.08+(3-i)*.035;
        ctx.translate(specialAttack.x-i*95,H/2);
        ctx.scale(7.8,7.8);
        drawPuffin(0,0);
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha=.94;
      ctx.translate(specialAttack.x,H/2);
      ctx.scale(8.7,8.7);
      drawPuffin(0,0);
      ctx.restore();

      ctx.globalAlpha=.55*(1-p*.45);
      ctx.fillStyle="#ffffff";
      ctx.fillRect(specialAttack.x+215,0,18,H);
      ctx.restore();
    }

    function drawHUD() {
      ctx.save();
      ctx.fillStyle="rgba(21,31,73,.75)";
      roundedRect(18,16,390,48,16,"rgba(21,31,73,.78)","rgba(255,255,255,.22)");

      for(var i=0;i<player.maxHp;i++){
        ctx.fillStyle=i<player.hp?"#ff668f":"rgba(255,255,255,.18)";
        ctx.beginPath();
        var hx=34+i*22,hy=40;
        ctx.moveTo(hx,hy+7);
        ctx.bezierCurveTo(hx-14,hy-1,hx-9,hy-13,hx,hy-7);
        ctx.bezierCurveTo(hx+9,hy-13,hx+14,hy-1,hx,hy+7);
        ctx.fill();
      }
      ctx.fillStyle="#fff";ctx.font="700 16px system-ui";ctx.textBaseline="middle";
      ctx.fillText("POWER " + player.power,222,40);
      ctx.fillText("GIANT " + player.specials,315,40);

      ctx.textAlign="right";ctx.font="800 20px system-ui";
      ctx.fillText(player.score.toString().padStart(7,"0"),W-24,31);
      ctx.font="700 13px system-ui";
      ctx.fillText("LEVEL " + (currentStage+1) + "/10 · " + stageConfig().name.toUpperCase(),W-24,52);

      var boss=enemies.find(function(e){ return e.boss; });
      if(!boss && !stageCleared){
        var bw=360,bh=10,bx=(W-bw)/2,by=78;
        roundedRect(bx,by,bw,bh,5,"rgba(38,28,70,.45)");
        var ratio=clamp(stageTimer/stageConfig().duration,0,1);
        roundedRect(bx+2,by+2,(bw-4)*ratio,bh-4,4,"rgba(255,255,255,.82)");
      }
      if(boss){
        var bw2=420,bh2=16,bx2=(W-bw2)/2,by2=78;
        roundedRect(bx2,by2,bw2,bh2,8,"rgba(38,28,70,.70)");

        var ratio2=clamp(boss.hp/boss.maxHp,0,1);
        var barColor="#ff709f";
        var phaseLabel=boss.name.toUpperCase();

        if(boss.finalBoss){
          roundedRect(bx2+2,by2+2,bw2-4,bh2-4,6,"#ff3f5f");

          if(boss.armor>0){
            var armorRatio=clamp(boss.armor/boss.maxArmor,0,1);
            roundedRect(bx2+2,by2+2,(bw2-4)*armorRatio,bh2-4,6,"#ffb52f");
          }

          if(boss.shield>0){
            var shieldRatio=clamp(boss.shield/boss.maxShield,0,1);
            roundedRect(bx2+2,by2+2,(bw2-4)*shieldRatio,bh2-4,6,"#55e987");
          }

          var barsLeft = boss.shield>0 ? 3 : (boss.armor>0 ? 2 : 1);
          phaseLabel="ROYAL TEAPOT · ENERGY ×" + barsLeft;
        } else {
          roundedRect(bx2+2,by2+2,(bw2-4)*ratio2,bh2-4,6,barColor);
        }

        ctx.fillStyle="#fff";ctx.textAlign="center";ctx.font="800 13px system-ui";
        ctx.fillText(phaseLabel,W/2,by2-8);

        if(boss.finalBoss){
          ctx.font="700 11px system-ui";
          ctx.fillText("GREEN → AMBER → RED · SAME BAR POSITION",W/2,by2+31);
        }
      }

      var missileCount=enemies.filter(function(e){ return e.type==="missile"; }).length;
      if(missileCount>0){
        ctx.save();
        ctx.fillStyle="rgba(94,25,47,.78)";
        roundedRect(18,75,150,31,11,"rgba(94,25,47,.78)","rgba(255,255,255,.24)");
        ctx.fillStyle="#fff";
        ctx.textAlign="left";ctx.font="800 13px system-ui";
        ctx.fillText("MISSILE ×" + missileCount + " · SHOOT IT!",29,91);
        ctx.restore();
      }

      if(messageTimer>0){
        ctx.globalAlpha=Math.min(1,messageTimer*2);
        ctx.fillStyle="rgba(20,27,67,.76)";
        roundedRect(W/2-175,H*.16,350,48,16,"rgba(20,27,67,.76)","rgba(255,255,255,.25)");
        ctx.fillStyle="#fff";ctx.textAlign="center";ctx.font="900 22px system-ui";
        ctx.fillText(message,W/2,H*.16+25);
      }

      if(paused){
        ctx.fillStyle="rgba(8,13,35,.55)";ctx.fillRect(0,0,W,H);
        ctx.fillStyle="#fff";ctx.textAlign="center";ctx.font="900 46px system-ui";
        ctx.fillText("PAUSED",W/2,H/2);
      }
      ctx.restore();
    }

    function draw() {
      ctx.save();
      var sx=screenShake?rnd(-screenShake,screenShake):0;
      var sy=screenShake?rnd(-screenShake,screenShake):0;
      ctx.translate(sx,sy);

      drawBackground();

      bullets.forEach(function(b){
        ctx.save();
        ctx.translate(b.x,b.y);
        ctx.shadowColor="#fff577";ctx.shadowBlur=16;
        ctx.fillStyle="#fff8a5";
        ctx.beginPath();ctx.ellipse(0,0,13,4,0,0,Math.PI*2);ctx.fill();
        ctx.fillStyle="#ff9d3d";
        ctx.beginPath();ctx.ellipse(-7,0,7,2.5,0,0,Math.PI*2);ctx.fill();
        ctx.restore();
      });

      enemyBullets.forEach(function(b){
        ctx.save();
        ctx.translate(b.x,b.y);
        var angle=Math.atan2(b.vy,b.vx);
        ctx.rotate(angle);
        ctx.shadowColor=b.color;ctx.shadowBlur=12;
        ctx.fillStyle=b.color;
        if (b.curve) {
          ctx.beginPath();
          ctx.ellipse(0,0,b.r+3,b.r-1,0,0,Math.PI*2);
          ctx.fill();
          ctx.fillStyle="#fff3d7";
          ctx.beginPath();ctx.ellipse(-2,-2,b.r*.34,b.r*.25,0,0,Math.PI*2);ctx.fill();
        } else if (b.wave) {
          ctx.beginPath();
          ctx.moveTo(b.r+3,0);
          ctx.lineTo(0,b.r);
          ctx.lineTo(-b.r-3,0);
          ctx.lineTo(0,-b.r);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle="#fff";
          ctx.beginPath();ctx.arc(-1,-1,b.r*.28,0,Math.PI*2);ctx.fill();
        } else {
          ctx.beginPath();ctx.arc(0,0,b.r,0,Math.PI*2);ctx.fill();
          ctx.fillStyle="#fff";
          ctx.beginPath();ctx.arc(-2,-2,b.r*.34,0,Math.PI*2);ctx.fill();
        }
        ctx.restore();
      });

      enemies.forEach(drawEnemy);
      pickups.forEach(drawPickup);

      if(!specialAttack.active && (player.inv<=0 || Math.floor(player.inv*12)%2===0)) drawPuffin(player.x,player.y);

      drawGiantPiko();

      particles.forEach(function(p){
        ctx.globalAlpha=clamp(p.life/p.max,0,1);
        ctx.fillStyle=p.color;
        ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();
      });
      ctx.globalAlpha=1;

      drawHUD();
      ctx.restore();
    }

    function loop(now) {
      if (!a2Active()){ a2StopAll(); return; }
      if (!running) return;
      A2.raf = requestAnimationFrame(loop);
      var dt = Math.min(.033,(now-last)/1000||0);
      last = now;
      if (!paused) update(dt);
      draw();
    }

    function _cbKeyDown(e){
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].indexOf(e.code) !== -1) e.preventDefault();
      keys[e.code] = true;
      if (e.code === "KeyP" && running) paused = !paused;
      if (e.code === "KeyX" && running && !paused) useSpecial();
    }
    function _cbKeyUp(e){ keys[e.code] = false; }

    function _cbBodyHtml(){
      return (
        '<div class="wond-hud" id="cbHud"><span class="wond-chip">☁️ Homing missiles track Piko — shoot them down before they connect!</span></div>' +
        a2KeyLegend('Move: WASD/Arrows · Missiles: Space · Giant Piko: X · Pause: P') +
        '<div class="wond-canvas-wrap"><canvas id="cbCanvas" class="a2-canvas" style="--cw:' + W + ';--ch:' + H + '" width="' + W + '" height="' + H + '" aria-label="Cloudberry Squadron"></canvas></div>' +
        '<div class="a2-pad"><div>' +
          '<button type="button" class="btn btn-secondary" onpointerdown="_cbTouchKey(\'ArrowLeft\',1)" onpointerup="_cbTouchKey(\'ArrowLeft\',0)" onpointercancel="_cbTouchKey(\'ArrowLeft\',0)" onpointerleave="_cbTouchKey(\'ArrowLeft\',0)">◀</button>' +
          '<button type="button" class="btn btn-secondary" onpointerdown="_cbTouchKey(\'ArrowUp\',1)" onpointerup="_cbTouchKey(\'ArrowUp\',0)" onpointercancel="_cbTouchKey(\'ArrowUp\',0)" onpointerleave="_cbTouchKey(\'ArrowUp\',0)">▲</button>' +
          '<button type="button" class="btn btn-secondary" onpointerdown="_cbTouchKey(\'ArrowDown\',1)" onpointerup="_cbTouchKey(\'ArrowDown\',0)" onpointercancel="_cbTouchKey(\'ArrowDown\',0)" onpointerleave="_cbTouchKey(\'ArrowDown\',0)">▼</button>' +
          '<button type="button" class="btn btn-secondary" onpointerdown="_cbTouchKey(\'ArrowRight\',1)" onpointerup="_cbTouchKey(\'ArrowRight\',0)" onpointercancel="_cbTouchKey(\'ArrowRight\',0)" onpointerleave="_cbTouchKey(\'ArrowRight\',0)">▶</button>' +
        '</div><div>' +
          '<button type="button" class="btn btn-primary" onpointerdown="_cbTouchKey(\'Space\',1)" onpointerup="_cbTouchKey(\'Space\',0)" onpointercancel="_cbTouchKey(\'Space\',0)" onpointerleave="_cbTouchKey(\'Space\',0)">🚀 Fire</button>' +
          '<button type="button" class="btn btn-secondary" onclick="_cbUseSpecial()" data-tooltip="Giant Piko Rush — clears bullets and smashes through enemies.">🐧 Giant</button>' +
        '</div></div>'
      );
    }

    function _cbStartRun(){
      a2Shell('☁️ Cloudberry Squadron', 'openWonderland()', _cbBodyHtml(),
        'A 10-stage homing-missile shooter — dodge, shoot, and unleash the Giant Piko Rush against an escalating final boss.');
      canvas = document.getElementById('cbCanvas');
      ctx = canvas.getContext('2d');
      a2Keys(_cbKeyDown, _cbKeyUp);
      startGame();
    }

    function openCloudberry(){
      gameWelcome('cloudberry', '☁️', 'Cloudberry Squadron',
        'Ten stages of homing-missile mayhem! Red smart missiles track Piko relentlessly, but your own shots can intercept and destroy them before impact. Collect Power/Heart/Giant orbs and unleash the Giant Piko Rush to clear the screen — face an escalating 3-phase final boss at the end.',
        '_cbStartRun');
    }

    window.openCloudberry = openCloudberry;
    window._cbStartRun = _cbStartRun;
    window._cbTouchKey = function(code, down){ keys[code] = !!down; };
    window._cbUseSpecial = function(){ if (running && !paused) useSpecial(); };
  })();
