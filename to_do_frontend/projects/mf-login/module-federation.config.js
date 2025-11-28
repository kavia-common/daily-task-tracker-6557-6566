const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

/**
 * PUBLIC_INTERFACE
 * Module Federation configuration for the 'mf-login' remote application.
 * Exposes the LoginModule for consumption by the host.
 */
module.exports = withModuleFederationPlugin({
  name: 'mf-login',
  filename: 'remoteEntry.js',
  exposes: {
    './LoginModule': './src/app/login/login.module.ts',
  },
  shared: {
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  },
});
