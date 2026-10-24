#!/usr/bin/env bash
set -euo pipefail

# Arranca Macollo (Astro) accesible desde el celular en la misma red Wi-Fi.
# Importante: el puerto 8000 queda reservado para la API de ML (BioCLIP 2.5),
# asi que este servidor usa 4321 por defecto.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"

PORT="${PORT:-4321}"

if [ "$PORT" = "8000" ]; then
  echo "❌ El puerto 8000 esta reservado para la API de Machine Learning (BioCLIP 2.5)."
  echo "   Usa otro puerto, por ejemplo: PORT=4321 ./scripts/run-lan.sh"
  exit 1
fi

if command -v ss >/dev/null 2>&1 && ss -ltn 2>/dev/null | grep -qE "[:.]${PORT}[[:space:]]"; then
  echo "⚠️  El puerto ${PORT} ya esta en uso. Prueba con otro:"
  echo "   PORT=4322 ./scripts/run-lan.sh"
  exit 1
fi

# IP de la interfaz por la que sale el trafico (la que usa el Wi-Fi)
LOCAL_IP="$(ip route get 1.1.1.1 2>/dev/null | awk '{for (i=1; i<=NF; i++) if ($i == "src") { print $(i+1); exit }}')"
if [ -z "${LOCAL_IP:-}" ]; then
  LOCAL_IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
fi
if [ -z "${LOCAL_IP:-}" ]; then
  LOCAL_IP="localhost"
fi

# Auth.js necesita confiar en el host cuando se entra por IP en vez de localhost
export AUTH_TRUST_HOST="${AUTH_TRUST_HOST:-true}"

# El servicio de ML vive en el mismo equipo, en el puerto 8000
export ML_API_URL="${ML_API_URL:-http://127.0.0.1:8000}"

echo "=========================================================="
echo "🌱 Macollo — Servidor de pruebas en red local"
echo "=========================================================="
echo "🖥️  Local:       http://localhost:${PORT}"
echo "📱 Celular:     http://${LOCAL_IP}:${PORT}   <-- usa esta URL"
echo "🤖 ML API:      ${ML_API_URL} (debe estar corriendo aparte)"
echo "📚 Docs ML:     http://${LOCAL_IP}:8000/docs"
echo "=========================================================="

# Aviso rapido sobre el estado del servidor de ML (no bloquea el arranque)
if command -v curl >/dev/null 2>&1; then
  if curl -fsS --max-time 2 "${ML_API_URL}/api/health" >/dev/null 2>&1; then
    echo "✅ ML API respondiendo."
  else
    echo "⚠️  ML API no responde en ${ML_API_URL}. Arrancala antes de probar el diagnostico."
  fi
fi

if command -v pnpm >/dev/null 2>&1; then
  exec pnpm exec astro dev --host 0.0.0.0 --port "$PORT"
else
  exec npx astro dev --host 0.0.0.0 --port "$PORT"
fi
