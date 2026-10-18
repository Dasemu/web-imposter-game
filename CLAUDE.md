# CLAUDE.md

## Overview
Role-based impostor-style party game. 100% static (vanilla HTML/CSS/JS, no backend, no build step, no framework) served from `www/`, packaged as an Android app via Capacitor for distribution.

## Commands
- Dev: `python -m http.server 8000` from the repo root, then open `http://localhost:8000/www/` (a static server is required so `fetch` can load the `.txt` word-pool files).
- Test: none configured.
- Lint: none configured.
- Build (Android): `npx cap sync android` then `cd android && ./gradlew assembleDebug` (or `assembleRelease` with a keystore; see `docs/release.md`).

## Architecture
Plain JS game logic in `www/script.js`, markup in `www/index.html`, styles in `www/styles.css`. Word pools live as `.txt` files in `www/word-pools/`, indexed by `manifest.json`; two pools are embedded in `script.js` for full offline play, the rest are fetched at runtime. Game state persists in `localStorage`. See `docs/game-rules.md` for full rules and the word-pool format, and `docs/release.md` for the CI/CD pipeline.

## Conventions
- No build tooling: edit `www/*.js|css|html` directly; there is no transpilation or bundling step.
- `version-assets.sh` content-hashes `www/script.js`, `www/styles.css`, `www/logo.png` and rewrites references in `www/index.html`; it runs in CI (`.gitea/workflows/1-version-assets.yml`), not locally.
- Game copy and word pools are in Spanish; code and comments are in English.

## Workflow quirks
- There is no `development` branch; `main` is the only long-lived branch. Work on a feature branch and push it; ask before merging to `main`.
- No automated semver bump workflow exists for this repo (unlike the global CLAUDE.md default). `package.json`'s `version` and `CHANGELOG.md` are updated by hand.

## Deployment
Not a deployed web service: ships as an Android APK attached to a rolling `latest` release. See `docs/release.md` for the full pipeline (asset versioning + Gradle build + release upload, via Gitea Actions and a mirrored GitHub Actions workflow).

## Gotchas
- Opening `www/index.html` directly via `file://` breaks the remote word pools (`fetch` needs `http(s)://`); always serve it.
- `android/`, `*.keystore` and `keystore.properties` are gitignored; the Android release build needs `KEYSTORE_BASE64`/`KEYSTORE_PASSWORD`/`KEY_ALIAS`/`KEY_PASSWORD` CI secrets or it silently falls back to a debug build.
