#!/usr/bin/env bash

if ! [ -x "$(command -v pnpm)" ]; then
	npm install
else
	echo >&2 "pnpm is installed"
	pnpm install
fi

scripts/init_db.sh

if ! [ -x "$(command -v pnpm)" ]; then
	npm run dev
else
	pnpm run dev
fi
