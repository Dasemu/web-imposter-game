# Release pipeline

This repo has its own CI/CD, independent of the global CLAUDE.md `version.yml` convention (there is no `development` branch; everything ships from `main`):

1. **Asset versioning** (`.gitea/workflows/1-version-assets.yml`, mirrored by nothing on GitHub): on push to `main` touching `www/script.js`, `www/styles.css`, `www/logo.png` or `www/index.html`, runs `version-assets.sh` to content-hash those files (e.g. `script.0bc8c210.js`), rewrites the references in `www/index.html`, and commits the result with `[skip ci]`.
2. **Android build** (`.gitea/workflows/2-build-apk.yml` and the equivalent `.github/workflows/build-apk.yml`): on push to `main` (or after step 1 finishes, on Gitea), builds the Capacitor Android app with Gradle (release build if a keystore secret is configured, debug otherwise) and publishes/updates a `latest` release asset (`impostor-game.apk`) via the Gitea/GitHub API.

`package.json`'s `version` field and `CHANGELOG.md` are maintained by hand; there is no automated semver bump workflow for this repo.
