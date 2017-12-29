const isTravis = !!process.env.TRAVIS_BUILD_NUMBER

module.exports = function(conf) {
  conf.set({
    basePath: '',
    autoWatch: true,
    frameworks: ['mocha'],
    files: [
      '../node_modules/chai/chai.js',
      '../node_modules/simulant/dist/simulant.umd.js',
      '../Tocca.js',
      './index.js'
    ],
    captureTimeout: 300000,
    browserNoActivityTimeout: 300000,
    browserDisconnectTolerance: 2,
    customLaunchers: Object.assign(
      {
        ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox']
        }
      }
    ),
    browsers: ['ChromeHeadlessNoSandbox'],
    reporters: isTravis ? [] : ['progress'],
    client: {
      mocha: {
        timeout: 3000,
        reporter: 'html'
      }
    },
    singleRun: true
  })
}
