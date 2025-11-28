# Angular (Host + Micro-Frontend)

This workspace includes:
- Host app (shell): `angular`
- Remote app: `mf-login` exposing `LoginModule` for `/login`

Quick start:
- Install: `npm install`
- Start remote: `npm run start:remote:login` (http://localhost:4201)
- Start host: `npm run start:host` (http://localhost:3000)
- Navigate to `/login` to render the remote login page.

Theming:
- Angular Material is themed using `src/styles/theme.scss` with tokens from `assets/style_guide.md`.
- Login page layout follows `assets/login_page_design_notes.md`.
