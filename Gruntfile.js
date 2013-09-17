module.exports = function(grunt) {
	'use strict';
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
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
		mocha: {
			all: {
				src: ['test/*.html'],
				options: {
					run: true,
					reporter: 'Spec',
					log:true,
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
		}
	});
	// test js files
	grunt.registerTask('test', ['jshint', 'mocha']);
	// Default task.
	grunt.registerTask('default', ['jshint', 'mocha', 'uglify']);

};