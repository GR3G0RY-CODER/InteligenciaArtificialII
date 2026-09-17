#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")/.."
command -v docker >/dev/null || { echo "Docker não encontrado." >&2; exit 1; }
if [ "${1:-}" = "--reset" ]; then docker compose down -v; fi
docker compose up -d
i=0; until curl -fsS http://localhost:3001/ >/dev/null; do i=$((i+1)); [ "$i" -ge 60 ] && { docker compose logs; exit 1; }; sleep 2; done
cp .env.local-postgres.example .env
npm run db:seed
echo "Banco funcional. Execute npm run dev e use tenant academia-performance."
