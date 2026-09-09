#requires -Version 5.1
<#
.SYNOPSIS
  Baixa e prepara o GymFlow em Windows.
.EXAMPLE
  .\install-local.ps1 -RepositoryUrl "https://github.com/empresa/gymflow.git" -Destination "$HOME\GymFlow" -Branch "main"
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^(https://|git@)')]
  [string]$RepositoryUrl,

  [string]$Destination = (Join-Path $HOME 'GymFlow'),
  [string]$Branch = 'main',
  [switch]$SkipChecks,
  [switch]$StartDevelopmentServer
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Write-Step([string]$Message) {
  Write-Host "`n==> $Message" -ForegroundColor Cyan
}

function Require-Command([string]$Name, [string]$InstallHint) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "O comando '$Name' nao foi encontrado. $InstallHint"
  }
}

Write-Step 'Validando programas necessarios'
Require-Command 'git' 'Instale com: winget install --id Git.Git -e'
Require-Command 'node' 'Instale com: winget install --id OpenJS.NodeJS.LTS -e'
Require-Command 'npm' 'O npm acompanha o Node.js LTS.'

$nodeText = (& node --version).TrimStart('v')
$nodeVersion = [version]$nodeText
if ($nodeVersion -lt [version]'20.9.0') {
  throw "Node.js $nodeVersion detectado. Instale Node.js 20.9 ou superior."
}
Write-Host "Git: $(& git --version)"
Write-Host "Node.js: $(& node --version)"
Write-Host "npm: $(& npm --version)"

if (Test-Path $Destination) {
  $existing = Get-ChildItem -Force $Destination -ErrorAction SilentlyContinue
  if ($existing) {
    throw "A pasta '$Destination' ja existe e nao esta vazia. Escolha outro -Destination ou mova os arquivos existentes."
  }
}

Write-Step "Baixando o repositorio em $Destination"
& git clone --branch $Branch --single-branch $RepositoryUrl $Destination
if ($LASTEXITCODE -ne 0) {
  throw "Falha ao clonar a branch '$Branch'. Confirme a URL e o nome da branch."
}
Set-Location $Destination

Write-Step 'Criando o arquivo local de configuracao'
if (-not (Test-Path '.env')) {
  Copy-Item '.env.example' '.env'
  Write-Host 'Arquivo .env criado. Preencha as credenciais antes de usar o backend.' -ForegroundColor Yellow
} else {
  Write-Host 'O arquivo .env ja existe; ele nao foi alterado.'
}

Write-Step 'Instalando dependencias Node.js'
if (Test-Path 'package-lock.json') {
  & npm ci
} else {
  Write-Host 'package-lock.json ausente; executando npm install.' -ForegroundColor Yellow
  & npm install
}
if ($LASTEXITCODE -ne 0) { throw 'Falha ao instalar as dependencias.' }

if (-not $SkipChecks) {
  Write-Step 'Executando verificacao de tipos'
  & npm run typecheck
  if ($LASTEXITCODE -ne 0) { throw 'O typecheck falhou.' }

  Write-Step 'Executando lint'
  & npm run lint
  if ($LASTEXITCODE -ne 0) { throw 'O lint falhou.' }

  Write-Step 'Executando build de producao'
  & npm run build
  if ($LASTEXITCODE -ne 0) { throw 'O build falhou.' }
}

Write-Host "`nGymFlow preparado em: $Destination" -ForegroundColor Green
Write-Host 'Proximos passos:' -ForegroundColor Green
Write-Host '  1. Abra e preencha o arquivo .env'
Write-Host '  2. Execute database/migrations/001_initial.sql no Supabase'
Write-Host '  3. Execute npm run db:seed'
Write-Host '  4. Configure o webhook Stripe'
Write-Host '  5. Execute npm run dev'

if ($StartDevelopmentServer) {
  Write-Step 'Iniciando o servidor de desenvolvimento'
  & npm run dev
}
