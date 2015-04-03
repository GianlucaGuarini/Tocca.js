module.exports = function(grunt) {
	'use strict';
	var browsers = [{
		browserName: 'firefox',
		platform: 'Windows 7'
	}, {
		browserName: 'googlechrome',
		platform: 'Windows 7'
	}, {
		browserName: 'safari',
		platform: 'Windows 7'
	}, {
		browserName: 'internet explorer',
		version: '10',
		platform: 'Windows 8'
	}, {
		browserName: 'internet explorer',
		version: '11',
		platform: 'Windows 8.1'
	}, {
		platform: 'OS X 10.9',
		deviceName: 'iPhone',
		browserName: 'iphone',
		version: '8.1'
	}, {
		platform: 'OS X 10.9',
		deviceName: 'iPad',
		browserName: 'ipad',
		version: '8.1'
	}, {
		platform: 'Linux',
		deviceName: 'Android',
		browserName: 'android',
		version: '4.1'
	},{
		platform: 'Linux',
		deviceName: 'Android',
		browserName: 'android',
		version: '5.0'
	}];

	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-saucelabs');
	grunt.loadNpmTasks('grunt-chmod');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				eqeqeq: true,
				eqnull: true,
				browser: true,
				strict: true,
				unused: true,
				quotmark: 'single'
			},
			files: {
				src: ['Tocca.js', 'Gruntfile.js']
			}
		},
		connect: {
			server: {
				options: {
					base: '',
					port: 9999
				}
			}
		},
		'saucelabs-mocha': {
			all: {
				options: {
					urls: [
						'http://127.0.0.1:9999/test/tests.html'
					],
					username: 'Toccajs',
					key: '68b9e417-3aec-4f8e-9b02-b9417029eca8',
					browsers: browsers,
					build: process.env.TRAVIS_JOB_ID,
					testname: 'Tocca.js tests',
					throttled: 3,
					sauceConfig: {
						'video-upload-on-pass': false
					}
				}
			}
		},
		mocha: {
			all: {
				src: ['test/*.html'],
				options: {
					run: true,
					reporter: 'Spec',
					log: true,
					timeout: 10000,
					mocha: {
						ignoreLeaks: false
					}
				},

			},
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> || <%= pkg.author %> */\n'
			},
			build: {
				src: 'Tocca.js',
				dest: 'Tocca.min.js'
			}
		},
		chmod: {
			options: {
				mode: '644'
			},
			yourTarget1: {
				src: ['*.js']
			}
		}
	});
	// test js files
	grunt.registerTask('test', ['jshint', 'mocha']);
	grunt.registerTask('sauce', ['connect', 'saucelabs-mocha']);
	// Default task.
	grunt.registerTask('default', ['jshint', 'mocha', 'uglify', 'chmod']);

};