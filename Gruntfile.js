module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist: {
				// the files to concatenate
				src: ['app/js/**/*.js'],
				// the location of the resulting JS file
				dest: 'static/js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				// If not false, application crashing because angular dependency resolving
				mangle: false
			},
			dist: {
				files: {
					'static/js/<%= pkg.name %>.min.js': ['<%= bower_concat.all.dest.js %>', '<%= concat.dist.dest %>']
				}
			}
		},
		less: {
			development: {
				files: {
					'static/css/<%= pkg.name %>.css': 'app/less/board.less'
				}
			}
		},
		pug: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: [
					{
						cwd: 'app/templates',
						src: ['**/*.pug', '!index.pug'],
						dest: 'static/templates',
						expand: true,
						ext: '.html'
					},
					{
						cwd: 'app/templates',
						src: ['index.pug'],
						dest: 'static',
						expand: true,
						ext: '.html'
					}
				]
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'static/css',
					src: ['*.css', '!*.min.css'],
					dest: 'static/css',
					ext: '.min.css'
				}]
			}
		},
		clean: ['static'],
		bower_concat: {
			all: {
				dest: {
					'js': 'static/js/libs.js',
					'css': 'static/css/libs.css'
				},
				exclude: [],
				dependencies: {},
				bowerOptions: {
					relative: false
				}
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'bower_components/angular-ui-grid/',
						src: [
							'*.ttf',
							'*.woff',
							'*.eot',
							'*.svg'
						],
						dest: 'static/css/',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'app/data/',
						src: [
							'*.json'
						],
						dest: 'static/data/',
						filter: 'isFile'
					}
				]
			}
		},
		watch: {
			scripts: {
				files: ['app/**/*.*'],
				tasks: ['default'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['clean', 'less', 'pug', 'concat', 'bower_concat', 'uglify', 'cssmin','copy']);
};
