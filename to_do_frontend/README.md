# Angular (Host + Micro-Frontend)

This workspace includes:
- Host app (shell): `angular` (port 3000)
- Remote app: `mf-login` exposing `./LoginModule` (port 4201)

Quick start:
- Install: `npm install`
- Start remote: `npm run start:remote:login` (http://localhost:4201)
- Start host: `npm run start:host` (http://localhost:3000)
- Navigate to `http://localhost:3000/login` to render the remote login page.

Module Federation:
- Host maps `mf-login` to `http://localhost:4201/remoteEntry.js` in `module-federation.config.js`.
- Host route `/login` uses `src/app/remote-entry.routes.ts` which lazy-loads `mf-login/LoginModule`.

Theming:
- Angular Material tokens/styles are defined in `src/styles/theme.scss` and included globally from `angular.json` for the host and remote.
- Login page layout follows `assets/login_page_design_notes.md`.
