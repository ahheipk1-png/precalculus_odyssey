<#
  One-command deploy for Precalculus Odyssey.
  Stages everything, commits, and pushes to main — Cloudflare Pages then
  AUTO-DEPLOYS to https://precalculus-odyssey.pages.dev in ~1 minute.

  Usage:
      powershell -ExecutionPolicy Bypass -File .\tools\deploy.ps1 "your message"
  (message is optional; defaults to a timestamped "Update")
#>
param([string]$Message)

Set-Location (Split-Path $PSScriptRoot -Parent)   # repo root (…/AlgebraGame)

git add -A
$staged = git diff --cached --name-only
if (-not $staged) { Write-Host "Nothing to commit — working tree is clean." -ForegroundColor Yellow; exit 0 }

if (-not $Message) { $Message = "Update " + (Get-Date -Format 'yyyy-MM-dd HH:mm') }
git commit -m $Message
git push

Write-Host ""
Write-Host "  Pushed to main. Cloudflare Pages is now auto-deploying…" -ForegroundColor Green
Write-Host "  Live in ~1 min: https://precalculus-odyssey.pages.dev" -ForegroundColor Cyan
Write-Host "  Watch progress: your Pages project -> Deployments tab." -ForegroundColor DarkGray
