#requires -Version 5.1
[CmdletBinding()] param([switch]$Reset)
$ErrorActionPreference='Stop';Set-Location (Split-Path $PSScriptRoot -Parent)
if(-not(Get-Command docker -ErrorAction SilentlyContinue)){throw 'Docker Desktop nao encontrado. Instale e inicie o Docker Desktop.'}
& docker compose version;if($LASTEXITCODE-ne 0){throw 'Docker Compose v2 nao esta disponivel.'}
if($Reset){Write-Host 'Removendo banco local anterior...' -ForegroundColor Yellow;& docker compose down -v}
& docker compose up -d;if($LASTEXITCODE-ne 0){throw 'Falha ao iniciar PostgreSQL/PostgREST.'}
Write-Host 'Aguardando PostgREST...' -ForegroundColor Cyan
$ready=$false;for($i=0;$i-lt 60;$i++){try{$r=Invoke-WebRequest -UseBasicParsing http://localhost:3001/ -TimeoutSec 2;if($r.StatusCode-eq 200){$ready=$true;break}}catch{};Start-Sleep -Seconds 2}
if(-not $ready){& docker compose logs;throw 'PostgREST nao ficou pronto no prazo.'}
Copy-Item .env.local-postgres.example .env -Force
& npm run db:seed;if($LASTEXITCODE-ne 0){throw 'Seed falhou.'}
Write-Host 'Banco funcional. Execute npm run dev e use tenant academia-performance.' -ForegroundColor Green
