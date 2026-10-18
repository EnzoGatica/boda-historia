#!/usr/bin/env bash
# Build estática con el basePath del repo y la publica en la rama gh-pages.
set -euo pipefail
NEXT_PUBLIC_BASE_PATH=/boda-historia npm run build
touch out/.nojekyll
cd out
git init -q -b gh-pages
git add -A
git commit -qm "deploy $(date +%F)"
git push -f https://github.com/EnzoGatica/boda-historia.git gh-pages
rm -rf .git
