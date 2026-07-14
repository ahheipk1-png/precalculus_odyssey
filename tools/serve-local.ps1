<#
  Precalculus Odyssey — local test server.
  Serves the game/ folder as the site root (same layout Cloudflare Pages uses),
  so you can play/test locally at http://localhost:8080/ .

  Run it:
      powershell -ExecutionPolicy Bypass -File .\tools\serve-local.ps1

  Note: this serves only the static game. The CLOUD save API (/api/cloud/*) is a
  Cloudflare Pages Function and is NOT served here — test cloud save on the deployed
  pages.dev site (or with `wrangler pages dev` if you install Node). The game itself,
  math, atlas, audio, graphs, etc. all work here.
#>

$Port = 8080
$Root = Join-Path (Split-Path $PSScriptRoot -Parent) 'game'   # …/AlgebraGame/game
if (-not (Test-Path $Root)) { Write-Error "game/ folder not found next to tools/"; exit 1 }

$mime = @{
  '.html'='text/html; charset=utf-8'; '.js'='application/javascript; charset=utf-8'; '.css'='text/css; charset=utf-8';
  '.json'='application/json'; '.png'='image/png'; '.jpg'='image/jpeg'; '.svg'='image/svg+xml';
  '.wav'='audio/wav'; '.mp3'='audio/mpeg'; '.ogg'='audio/ogg'; '.ico'='image/x-icon'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host ""
Write-Host "  Precalculus Odyssey — local test server" -ForegroundColor Cyan
Write-Host "  Serving: $Root" -ForegroundColor Green
Write-Host "  Open:    http://localhost:$Port/" -ForegroundColor Yellow
Write-Host "  (Ctrl+C to stop)" -ForegroundColor DarkGray
Write-Host ""
try { Start-Process "http://localhost:$Port/" } catch {}

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext(); $req = $ctx.Request; $res = $ctx.Response
    $rel = [Uri]::UnescapeDataString($req.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrEmpty($rel)) { $rel = 'index.html' }
    $path = Join-Path $Root $rel
    # keep requests inside game/
    $full = [IO.Path]::GetFullPath($path)
    if (-not $full.StartsWith([IO.Path]::GetFullPath($Root), [StringComparison]::OrdinalIgnoreCase)) { $res.StatusCode = 403; $res.Close(); continue }
    if (Test-Path -LiteralPath $full -PathType Leaf) {
      $ext = [IO.Path]::GetExtension($full).ToLower()
      if ($mime.ContainsKey($ext)) { $res.ContentType = $mime[$ext] }
      $bytes = [IO.File]::ReadAllBytes($full)
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else { $res.StatusCode = 404 }
    $res.Close()
  }
} finally { $listener.Stop() }
