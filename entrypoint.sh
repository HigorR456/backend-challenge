#!/bin/sh
set -e

echo "⌛ Aguardando banco de dados..."

# Aguarda o banco estar pronto
until pg_isready -h ${DB_HOST:-db} -p ${DB_PORT:-5432} -U ${DB_USER:-postgres} > /dev/null 2>&1; do
  echo "Banco não está pronto, aguardando..."
  sleep 2
done

echo "✅ Banco de dados conectado!"

# Executa as migrations
echo "📦 Executando migrations..."
yarn prisma migrate deploy

echo "🚀 Iniciando aplicação..."
exec node dist/main.js