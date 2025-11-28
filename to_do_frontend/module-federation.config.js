const withModuleFederationPlugin = require('@angular-architects/module-federation/webpack').withModuleFederationPlugin;

/**
 * PUBLIC_INTERFACE
 * Host (app-shell) Module Federation config. Maps 'mf-login' to its remoteEntry for local dev.
 */
module.exports = withModuleFederationPlugin({
  name: 'app-shell',
  remotes: {
    'mf-login': 'mf-login@http://localhost:4201/remoteEntry.js',
  },
  shared: {
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  },
});
