// GET /api/cloud/leaderboard — global rankings across EVERY player's cloud profile: highest
// level reached, plus a top-10 leaderboard for each Wonderland minigame (shown on that game's
// own welcome screen — see gameWelcome() in js/17-wonderland.js). Read-only; requires being
// signed in (same auth model as the rest of /api/cloud/*) but is not scoped to the caller's own
// account — it reads every non-deleted profile. No new D1 table: save_json already carries
// state.level and state.miniGames[id].{highScore,bestLevel} for every profile.
import { json, bad, nowIso, authAccount } from './_shared.js';

var GAMES = [
  { id: 'blockForge', label: '🧩 Quantum Block Forge' },
  { id: 'rhythm',     label: '🎵 Cosmic Rhythm' },
  { id: 'fishin',     label: "🎣 Gone Fishin'" },
  { id: 'memory',     label: '🃏 Star Match' },
  { id: 'sudoku',     label: '🔢 Mini Sudoku' },
  { id: 'tileBall',   label: '🧱 Tile Ball' },
  { id: 'skyStacker', label: '🗼 Sky Stacker' },
  { id: 'astroDrop',  label: '🟦 Astro Drop' },
  { id: 'snake',      label: '🐍 Snake' },
  { id: 'crystal',    label: '💎 Crystal Cascade' },
  { id: 'cargo',      label: '📦 Cargo Bay' },
  { id: 'glacier',    label: '❄️ Glacier Push' },
  { id: 'shikinjou',  label: '🏯 Forbidden City' },
  { id: 'virusLab',   label: '💊 Virus Lab' },
  { id: 'circuit',    label: '🔗 Circuit Loop' },
  { id: 'comet',      label: '👾 Comet Muncher' },
  { id: 'blastBot',   label: '💣 Blast Bot' },
  { id: 'bubble',     label: '🫧 Bubble Blast' },
  { id: 'bowling',    label: '🎳 Star Lanes Bowling' }
];
var TOP_N = 10;
var MAX_PROFILES_SCANNED = 2000;   // defensive cap — this is a small personal-scale game, not a bottleneck today

export async function onRequestGet(context) {
  const acc = await authAccount(context);
  if (!acc) return bad('UNAUTHORIZED', 'Sign in to view the leaderboard.', 401);
  try {
    const { results } = await context.env.DB
      .prepare(`SELECT player_name, save_json, updated_at FROM player_profiles
                 WHERE deleted_at IS NULL ORDER BY updated_at DESC LIMIT ?1`)
      .bind(MAX_PROFILES_SCANNED).all();

    var byLevel = [];
    var byGameAll = {}; GAMES.forEach(function (g) { byGameAll[g.id] = []; });

    (results || []).forEach(function (row) {
      var save;
      try { save = JSON.parse(row.save_json); } catch (e) { return; }
      if (!save || typeof save !== 'object') return;
      var name = String(row.player_name || 'Player').slice(0, 40);
      var level = Number.isFinite(save.level) ? save.level : 1;
      byLevel.push({ playerName: name, level: level });

      var mg = save.miniGames || {};
      GAMES.forEach(function (g) {
        var m = mg[g.id];
        var score = m && Number.isFinite(m.highScore) ? m.highScore : 0;
        if (score > 0) {
          var lv = m && Number.isFinite(m.bestLevel) ? m.bestLevel : 1;
          byGameAll[g.id].push({ playerName: name, score: score, level: lv });
        }
      });
    });

    byLevel.sort(function (a, b) { return b.level - a.level; });
    byLevel = byLevel.slice(0, 20);

    var byGameTop10 = {};
    GAMES.forEach(function (g) {
      var arr = byGameAll[g.id].slice().sort(function (a, b) { return b.score - a.score; });
      byGameTop10[g.id] = arr.slice(0, TOP_N);
    });

    return json(200, { ok: true, byLevel: byLevel, byGameTop10: byGameTop10, games: GAMES, generatedAt: nowIso() });
  } catch (e) {
    return bad('SERVER_ERROR', 'Could not load leaderboard.', 500);
  }
}

export const onRequest = (ctx) => (ctx.request.method === 'GET' ? onRequestGet(ctx) : bad('METHOD_NOT_ALLOWED', 'Use GET.', 405));
