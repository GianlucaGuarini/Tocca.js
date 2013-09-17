Automatically run *client-side* mocha specs via grunt/mocha/PhantomJS

For a grunt task for server-side mocha tests, see [grunt-mocha-test](https://github.com/pghalliday/grunt-mocha-test) or [grunt-simple-mocha](https://github.com/yaymukund/grunt-simple-mocha)

# Grunt Compatibility

* Grunt 0.4 use grunt-mocha 0.2+
* Grunt 0.3 use grunt-mocha 0.1

**Grunt 0.4.0 migration details in [HISTORY.md](HISTORY.md#020)**

# grunt-mocha

(package/README format heavily borrowed from [grunt-jasmine-task](https://github.com/creynders/grunt-jasmine-task) and builtin QUnit task)

[Grunt](https://github.com/cowboy/grunt) plugin for running Mocha browser specs in a headless browser (PhantomJS)

## Getting Started

### Task config

```js
mocha: {
  // runs all html files (except test2.html) in the test dir
  // In this example, there's only one, but you can add as many as
  // you want. You can split them up into different groups here
  // ex: admin: [ 'test/admin.html' ]
  all: [ 'test/**/!(test2).html' ],

  // Runs 'test/test2.html' with specified mocha options.
  // This variant auto-includes 'bridge.js' so you do not have
  // to include it in your HTML spec file. Instead, you must add an
  // environment check before you run `mocha.run` in your HTML.
  test2: {
    // Test files
    src: [ 'example/test/test2.html' ],
    options: {
      // Bail means if a test fails, grunt will abort. False by default.
      bail: true,

      // Pipe output console.log from your JS to grunt. False by default.
      log: true,

      // mocha options
      mocha: {
        ignoreLeaks: false,
        grep: 'food'
      },

      // Select a Mocha reporter
      // http://visionmedia.github.com/mocha/#reporters
      reporter: 'Nyan',

      // Indicates whether 'mocha.run()' should be executed in
      // 'bridge.js'. If you include `mocha.run()` in your html spec,
      // check if environment is PhantomJS. See example/test/test2.html
      run: true,

      // Override the timeout of the test (default is 5000)
      timeout: 10000
    }
  },

  // Runs the same as test2 but with URL's
  test3: {
    // Task options
    options: {
      // mocha options
      mocha: {
        ignoreLeaks: false,
        grep: 'food'
      },

      // URLs passed through as options
      urls: [ 'http://localhost:' + port + '/example/test/test2.html' ],

      // Indicates whether 'mocha.run()' should be executed in 'bridge.js'
      run: true
    }
  }
}
```

### Vanilla JS

#### Option 1 (recommended)

- Write mocha task description in grunt config using and specify `run: true` option (see [this tasks Gruntfile.js](Gruntfile.js) for details);
- Check for PhantomJS `userAgent` in a test html file and run tests only in a real browser (see [test2.html](example/test/test2.html) for details).

In this case you shouldn't include [bridge.js](phantomjs/bridge.js) (it will be included automatically) and tests will be run from [bridge.js](phantomjs/bridge.js).

#### Option 2

Alternatively, include `bridge.js` from `tasks/phantomjs` after you include `mocha.js` and run `mocha.setup` in your HTML file. The helper will override `mocha.setup` if it detects PhantomJS. See [test.html](example/test/test.html).

### AMD

Mocha **must** be included via script tag in the header. There is no need to load Mocha via AMD. You may load other testing libs via AMD if that gives you a fuzzy feeling.

Example setup with AMD (advanced): https://gist.github.com/2655876

### Grunt and this plugin

First, make sure you have grunt installed globally, `npm install grunt -g`

Install this grunt plugin next to your project's [Gruntfile.js](http://gruntjs.com/getting-started) with: `npm install grunt-mocha`

Then add this line to your project's `Gruntfile.js` gruntfile at the bottom:

```javascript
grunt.loadNpmTasks('grunt-mocha');
```

Also add this to the `grunt.initConfig` object in the same file:

```javascript
mocha: {
  index: ['specs/index.html']
},
```

Replace `specs/index.html` with the location of your mocha spec running html file.

Now you can run the mocha task with `grunt mocha`, but it won't work. That's because you need...

### PhantomJS

This task is for running Mocha tests in a headless browser, PhantomJS, which is installed via [grunt-lib-phantomjs](https://github.com/gruntjs/grunt-lib-phantomjs) as a dependency of this task.

### Mocha

Use [Mocha](http://visionmedia.github.com/mocha/)

### Hacks

The PhantomJS -> Grunt superdimensional conduit uses `alert`. If you have disabled or aliased alert in your app, this won't work. I have conveniently set a global `PHANTOMJS` on `window` so you can conditionally override alert in your app.

## License
Copyright (c) 2013 Kelly Miyashiro
Licensed under the MIT license.
