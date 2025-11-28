const withModuleFederationPlugin = require('@angular-architects/module-federation/webpack').withModuleFederationPlugin;

/**
 * PUBLIC_INTERFACE
 * Host (app-shell) Module Federation config. Only maps 'mf-login' remote.
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
