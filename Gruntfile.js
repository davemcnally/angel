module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/stylesheets/tmp/sanitize.css':'source/sass/sanitize.scss',
                    'public/stylesheets/tmp/main.css':'source/sass/main.scss'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'public/stylesheets/styles.css': ['public/stylesheets/tmp/sanitize.css', 'public/stylesheets/tmp/main.css']
                }
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']
                },
                src: 'public/stylesheets/styles.css',
                dest: 'public/stylesheets/styles.css',
            }
        },
        clean: {
            tmp: ['public/stylesheets/tmp/']
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'public/scripts/custom.js': ['source/scripts/custom.js']
                },
            },
        },
        imageoptim: {
            main: {
                options: {
                    imageAlpha: true,
                    quitAfter: true
                },
                src: ['public/images/*']
            }
        },
        watch: {
            dev: {
                files: ['source/**/*', 'views/**/*', 'routes/**/*', 'Gruntfile.js', 'public/images/*'],
                tasks: ['build']
            },
            livereload: {
                files: ['views/**/*', 'source/**/*', 'routes/**/*', 'public/images/*', 'Gruntfile.js'],
                options: {
                    livereload: true
                },
            },
        }
    });
    grunt.registerTask('build', ['sass', 'cssmin', 'autoprefixer', 'clean:tmp', 'uglify']);
    grunt.registerTask('default', ['imageoptim', 'svgmin']);
};
