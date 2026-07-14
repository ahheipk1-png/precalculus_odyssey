<#
  Precalculus Odyssey — OPTIONAL local file-backup companion.
  Writes JSON profile backups to C:\temp\PrecalculusOdyssey\ so an advanced Windows
  user can keep local copies. This is NOT required for cloud play — the hosted game
  works fine without it. Start it yourself when you want local backups:

      powershell -ExecutionPolicy Bypass -File .\tools\local-save-server.ps1

  Security: binds ONLY to 127.0.0.1, validates profile ids, blocks path traversal,
  writes atomically, and allows CORS only for the game's own origins.
#>

$ErrorActionPreference = 'Stop'
$Port     = 8765
$SaveDir  = 'C:\temp\PrecalculusOdyssey'
$AllowedOriginPatterns = @('^https://([a-z0-9-]+\.)*pages\.dev$', '^http://localhost(:\d+)?$', '^http://127\.0\.0\.1(:\d+)?$', '^null$')

New-Item -ItemType Directory -Force -Path $SaveDir | Out-Null

function Test-OriginAllowed([string]$origin) {
  if ([string]::IsNullOrEmpty($origin)) { return $false }
  foreach ($p in $AllowedOriginPatterns) { if ($origin -match $p) { return $true } }
  return $false
}
function Set-Cors($resp, [string]$origin) {
  if (Test-OriginAllowed $origin) { $resp.Headers['Access-Control-Allow-Origin'] = $origin }
  $resp.Headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
  $resp.Headers['Access-Control-Allow-Headers'] = 'Content-Type'
  $resp.Headers['Vary'] = 'Origin'
}
function Write-Json($resp, [int]$status, $obj) {
  $resp.StatusCode = $status
  $resp.ContentType = 'application/json; charset=utf-8'
  $bytes = [Text.Encoding]::UTF8.GetBytes((($obj | ConvertTo-Json -Depth 60 -Compress)))
  $resp.OutputStream.Write($bytes, 0, $bytes.Length)
  $resp.Close()
}
function Test-ProfileId([string]$id) { return ($id -and $id.Length -le 128 -and $id -match '^[A-Za-z0-9_-]+$') }

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()
Write-Host ""
Write-Host "  Precalculus Odyssey local-save companion" -ForegroundColor Cyan
Write-Host "  Listening on http://127.0.0.1:$Port  (localhost only)" -ForegroundColor Green
Write-Host "  Writing backups to: $SaveDir" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request; $res = $ctx.Response
    $origin = $req.Headers['Origin']
    Set-Cors $res $origin
    $path = $req.Url.AbsolutePath.TrimEnd('/')
    try {
      if ($req.HttpMethod -eq 'OPTIONS') { $res.StatusCode = 204; $res.Close(); continue }

      if ($req.HttpMethod -eq 'GET' -and $path -eq '/health') {
        Write-Json $res 200 @{ ok = $true; service = 'precalculus-odyssey-local'; dir = $SaveDir }
      }
      elseif ($req.HttpMethod -eq 'POST' -and $path -eq '/save') {
        if ($req.ContentLength64 -gt 2MB) { Write-Json $res 413 @{ ok = $false; error = 'too large' }; continue }
        $body = (New-Object IO.StreamReader($req.InputStream, [Text.Encoding]::UTF8)).ReadToEnd()
        $snap = $body | ConvertFrom-Json
        $pid = "$($snap.profileId)"
        if (-not (Test-ProfileId $pid)) { Write-Json $res 400 @{ ok = $false; error = 'bad profileId' }; continue }
        $dest = Join-Path $SaveDir ($pid + '.json')
        # Confirm the resolved path really is inside $SaveDir (belt-and-braces vs traversal).
        $full = [IO.Path]::GetFullPath($dest)
        if (-not $full.StartsWith([IO.Path]::GetFullPath($SaveDir), [StringComparison]::OrdinalIgnoreCase)) { Write-Json $res 400 @{ ok = $false; error = 'path' }; continue }
        $tmp = $dest + '.tmp'
        [IO.File]::WriteAllText($tmp, $body, (New-Object Text.UTF8Encoding($false)))
        Move-Item -Force -LiteralPath $tmp -Destination $dest
        Write-Host ("  saved  " + $pid + ".json  (" + $body.Length + " bytes)") -ForegroundColor DarkGray
        Write-Json $res 200 @{ ok = $true; savedAs = ($pid + '.json') }
      }
      elseif ($req.HttpMethod -eq 'GET' -and $path -eq '/profiles') {
        $files = Get-ChildItem -Path $SaveDir -Filter '*.json' -File -ErrorAction SilentlyContinue |
                 ForEach-Object { @{ profileId = $_.BaseName; updatedAt = $_.LastWriteTimeUtc.ToString('o'); bytes = $_.Length } }
        Write-Json $res 200 @{ ok = $true; profiles = @($files) }
      }
      elseif ($req.HttpMethod -eq 'GET' -and $path -like '/profiles/*') {
        $pid = $path.Substring('/profiles/'.Length)
        if (-not (Test-ProfileId $pid)) { Write-Json $res 400 @{ ok = $false; error = 'bad profileId' }; continue }
        $dest = Join-Path $SaveDir ($pid + '.json')
        if (-not (Test-Path -LiteralPath $dest)) { Write-Json $res 404 @{ ok = $false; error = 'not found' }; continue }
        $res.StatusCode = 200; $res.ContentType = 'application/json; charset=utf-8'
        $bytes = [IO.File]::ReadAllBytes($dest)
        $res.OutputStream.Write($bytes, 0, $bytes.Length); $res.Close()
      }
      else { Write-Json $res 404 @{ ok = $false; error = 'not found' } }
    }
    catch { try { Write-Json $res 500 @{ ok = $false; error = 'server error' } } catch {} }
  }
}
finally { $listener.Stop() }
