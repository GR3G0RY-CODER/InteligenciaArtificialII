#requires -Version 5.1
<#
.SYNOPSIS
  Prepara uma copia do GymFlow que ja foi baixada no Windows.
.EXAMPLE
  Set-ExecutionPolicy -Scope Process Bypass
  .\setup-local.ps1
#>
[CmdletBinding()]
param(
  [switch]$SkipChecks,
  [switch]$DemoMode,
  [switch]$StartDevelopmentServer
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$ProjectRoot = $PSScriptRoot
Set-Location $ProjectRoot

function Require-Command([string]$Name, [string]$Hint) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "O comando '$Name' nao foi encontrado. $Hint"
  }
}

Write-Host "Preparando GymFlow em $ProjectRoot" -ForegroundColor Cyan

if (-not (Test-Path (Join-Path $ProjectRoot 'package.json'))) {
  throw "package.json nao encontrado em '$ProjectRoot'. Extraia o ZIP completo antes de executar este arquivo."
}

Require-Command 'node' 'Instale com: winget install --id OpenJS.NodeJS.LTS -e'
Require-Command 'npm' 'O npm acompanha o Node.js LTS.'

$nodeVersion = [version]((& node --version).TrimStart('v'))
if ($nodeVersion -lt [version]'20.9.0') {
  throw "Node.js $nodeVersion detectado. Instale Node.js 20.9 ou superior."
}

if (-not (Test-Path '.env')) {
  $template = if ($DemoMode) { '.env.demo.example' } else { '.env.example' }
  if (-not (Test-Path $template)) {
    throw "$template nao encontrado. Baixe novamente a versao mais recente do repositorio."
  }
  Copy-Item $template '.env'
  if ($DemoMode) {
    $bytes = New-Object byte[] 48
    [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    $secret = [Convert]::ToBase64String($bytes)
    (Get-Content '.env' -Raw).Replace('replace-with-at-least-32-random-characters', $secret) | Set-Content '.env'
    Write-Host 'Modo DEMO configurado com segredo aleatorio. Nenhum pagamento real sera processado.' -ForegroundColor Yellow
  } else {
    Write-Host 'Arquivo .env criado. Preencha suas credenciais de Supabase e Stripe.' -ForegroundColor Yellow
  }
}

Write-Host 'Instalando dependencias...' -ForegroundColor Cyan
if (Test-Path 'package-lock.json') { & npm ci } else { & npm install }
if ($LASTEXITCODE -ne 0) { throw 'Falha ao instalar dependencias.' }

if (-not $SkipChecks) {
  & npm run typecheck
  if ($LASTEXITCODE -ne 0) { throw 'Typecheck falhou.' }
  & npm run lint
  if ($LASTEXITCODE -ne 0) { throw 'Lint falhou.' }
  & npm run build
  if ($LASTEXITCODE -ne 0) { throw 'Build falhou.' }
}

Write-Host "`nInstalacao local concluida." -ForegroundColor Green
Write-Host 'Edite o .env, aplique database/migrations/001_initial.sql e execute npm run db:seed.'
Write-Host 'Para iniciar depois: npm run dev'

if ($StartDevelopmentServer) {
  & npm run dev
}
