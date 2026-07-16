// GET /api/cloud/leaderboard — global rankings across EVERY player's cloud profile: highest
// level reached, plus the best score on each Wonderland minigame that tracks one. Read-only;
// requires being signed in (same auth model as the rest of /api/cloud/*) but is not scoped to
// the caller's own account — it reads every non-deleted profile. No new D1 table: save_json
// already carries state.level and state.miniGames[id].highScore for every profile.
import { json, bad, nowIso, authAccount } from './_shared.js';

var GAMES = [
  { id: 'blockForge', label: '🧩 Quantum Block Forge' },
  { id: 'rhythm',     label: '🎵 Cosmic Rhythm' },
  { id: 'fishin',     label: "🎣 Gone Fishin'" },
  { id: 'memory',     label: '🃏 Star Match' },
  { id: 'sudoku',     label: '🔢 Mini Sudoku' }
];
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
    var byGame = {}; GAMES.forEach(function (g) { byGame[g.id] = null; });

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
        if (score > 0 && (!byGame[g.id] || score > byGame[g.id].score)) {
          byGame[g.id] = { playerName: name, score: score };
        }
      });
    });

    byLevel.sort(function (a, b) { return b.level - a.level; });
    byLevel = byLevel.slice(0, 20);

    return json(200, { ok: true, byLevel: byLevel, byGame: byGame, games: GAMES, generatedAt: nowIso() });
  } catch (e) {
    return bad('SERVER_ERROR', 'Could not load leaderboard.', 500);
  }
}

export const onRequest = (ctx) => (ctx.request.method === 'GET' ? onRequestGet(ctx) : bad('METHOD_NOT_ALLOWED', 'Use GET.', 405));
