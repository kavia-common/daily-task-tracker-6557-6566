module.exports = {
  overrides: [
    {
      files: ['src/**/*.ts'],
      globals: {
        window: 'readonly',
        document: 'readonly',
        __webpack_init_sharing__: 'readonly',
        __webpack_share_scopes__: 'readonly',
      },
    },
  ],
};
