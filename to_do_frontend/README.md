# Angular (Host + Micro-Frontend)

This workspace includes:
- Host app (shell): `angular` (port 3000)
- Remote app: `mf-login` exposing `./LoginModule` (port 4201)

Quick start:
- Install: `npm install`
- Start remote: `npm run start:remote:login` (http://localhost:4201)
- Start host: `npm run start:host` (http://localhost:3000)
- Navigate to `http://localhost:3000/login` to render the remote login page.

Login functionality:
- The login screen is implemented with Angular Material and follows assets/login_page_design_notes.md and assets/style_guide.md.
- Validation: required email (email format) and required password; submit disabled until valid.
- Includes remember me, loading spinner, and an error message area with aria-live for accessibility.
- Service: `LoginApiService` uses a DI token `LOGIN_API_BASE` and reads `window.NG_APP_API_BASE` by default.
  - Step 2.2 uses a simulated API response (emails containing "ok" succeed).
  - Step 2.3 will wire a real backend endpoint (e.g., `${NG_APP_BACKEND_URL}/auth/login`).

Module Federation:
- Host maps `mf-login` to `http://localhost:4201/remoteEntry.js` in `module-federation.config.js`.
- Host route `/login` uses `src/app/remote-entry.routes.ts` which lazy-loads `mf-login/LoginModule`.

Theming:
- Angular Material tokens/styles are defined in `src/styles/theme.scss` and included globally from `angular.json` for the host and remote.
- Login page layout follows `assets/login_page_design_notes.md`.

Runtime configuration:
- To point the login remote to a backend base URL during development:
  ```
  // in browser devtools or injected script
  window.NG_APP_API_BASE = 'http://localhost:3001';
  ```
