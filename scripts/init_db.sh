#!/usr/bin/env bash

set -x
set -eo pipefail
if ! [ -x "$(command -v psql)" ]; then
	echo >&2 "Error: psql is not installed."
	exit 1
fi

DB_USER=${POSTGRES_USER:=postgres}
DB_PASSWORD="${POSTGRES_PASSWORD:=password}"
DB_NAME="${POSTGRES_DB:=cart}"
DB_PORT="${POSTGRES_PORT:=5432}"

if [[ -z "${SKIP_DOCKER}" ]]; then
	docker run \
		-e POSTGRES_USER="${DB_USER}" \
		-e POSTGRES_PASSWORD="${DB_PASSWORD}" \
		-e POSTGRES_DB="${DB_NAME}" \
		-p "${DB_PORT}":5432 \
		-d postgres \
		postgres -N 1000
fi

until psql -h "localhost" -U "${DB_USER}" -p "${DB_PORT}" -d "postgres" -c '\q'; do
	echo >&2 "Postgres is still unavailable - sleeping"
	sleep 1
done

echo >&2 "Postgres is up and running on port ${DB_PORT}!"

if ! [ -x "$(command -v pnpm)" ]; then
	npm prisma migrate dev
else
	pnpm prisma migrate dev
fi

echo >&2 "Postgress has been migrated, ready to go!"
