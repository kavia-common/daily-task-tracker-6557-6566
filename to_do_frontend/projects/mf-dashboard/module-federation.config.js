const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

/**
 * PUBLIC_INTERFACE
 * Module Federation configuration for the 'mf-dashboard' remote application.
 * Exposes the DashboardModule for consumption by the host.
 */
module.exports = withModuleFederationPlugin({
  name: 'mf-dashboard',
  filename: 'remoteEntry.js',
  exposes: {
    './DashboardModule': './src/app/dashboard/dashboard.module.ts',
  },
  shared: {
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  },
});
