# Micro-Frontend Setup (Angular Host + Login Remote)

This workspace contains:
- Host (shell): main app in root (project name: angular)
- Remote: `mf-login` (projects/mf-login) exposing `LoginModule` via Module Federation.

Note: The `mf-dashboard` remote and all dashboard/task-related code have been removed. Only the login remote is available.

## Theming
- Angular Material is installed and themed using tokens from assets/style_guide.md.
- Theme file: `src/styles/theme.scss` (included in angular.json for both host and remote).
- CSS variables declared in theme.scss implement color tokens and are used in the login screen styles.

## Routing
- Host route `/login` lazy-loads the remote's `LoginModule` using Module Federation.
  - Host route config: `src/app/app.routes.ts`
  - MF routes mapping: `src/app/remote-entry.routes.ts`

## API base configuration (temporary)
- The `mf-login` remote reads `window.NG_APP_API_BASE` to configure its `LoginApiService`.
- To override at runtime, set in the browser console or include before the host script:
  ```html
  <script>window.NG_APP_API_BASE = 'http://localhost:3001';</script>
  ```

## Run locally
1. Install deps:
   npm install

2. Start remote (mf-login):
   npm run start:remote:login
   - Serves at http://localhost:4201 with remoteEntry.js

3. Start host:
   npm run start:host
   - Open http://localhost:3000
   - Navigate to /login to load the remote

Notes:
- Module Federation config files:
  - Host: `module-federation.config.js`
  - Remote: `projects/mf-login/module-federation.config.js`
- Adjust remote URL in host MF config if needed (env or window var).
- To change the remote URL at runtime, set `window.MF_LOGIN_URL = 'http://localhost:4201/remoteEntry.js'` before app bootstraps.
