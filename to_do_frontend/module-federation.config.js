const withModuleFederationPlugin = require('@angular-architects/module-federation/webpack').withModuleFederationPlugin;

/**
 * PUBLIC_INTERFACE
 * This Module Federation configuration sets up the host (shell) application
 * to load remote micro-frontends. The 'mf-login' remote will be loaded at
 * runtime using a dynamic URL.
 */
module.exports = withModuleFederationPlugin({
  name: 'app-shell',
  remotes: {
    // The URL will be provided at runtime via window environment variable fallback
    // Example: window['MF_LOGIN_URL'] = 'http://localhost:4201/remoteEntry.js'
    'mf-login': 'mf-login@http://localhost:4201/remoteEntry.js',
  },
  shared: {
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  },
});
