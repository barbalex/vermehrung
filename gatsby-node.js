exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: { fallback: { fs: false } },
  })
  if (stage === 'build-html') {
    /*
     * During the build step, `firebase` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `firebase`
     * during the build
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@firebase/,
            use: loaders.null(),
          },
          {
            test: /firebase/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
