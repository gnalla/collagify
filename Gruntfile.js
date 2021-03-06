module.exports = function(grunt) {

    var publicDir = 'public';

    var globalConfig = {
        src: publicDir + '',
        dist: publicDir + '/dist',
        vendor: publicDir + '/vendor',
        test: 'test'
    };

    grunt.initConfig({

        globalConfig: globalConfig,

        bower: grunt.file.readJSON('./.bowerrc'),

        copy: {
            foo: {
                files: [{
                    expand: true,
                    dest: '<%= globalConfig.dist %>',
                    cwd: '<%= bower.directory %>/font-awesome',
                    src: [
                        'fonts/*'
                    ]
                }]
            }
        },

        bower_concat: {
            all: {
                dest: '<%= globalConfig.vendor %>/_bower.js',
                cssDest: '<%= globalConfig.vendor %>/_bower.css',
            }
        },

        jasmine: {
            src: "<%= globalConfig.src %>/scripts/*.js",
            options: {
                vendor: "<%= bower.directory %>/jquery/dist/jquery.min.js",
                specs: "<%= globalConfig.test %>/unit/*.spec.js"
            }
        },

        jasmine_node: {
            projectRoot: "<%= globalConfig.test %>/integration"
        },

        strip_code: {
            options: {
                start_comment: "test-code",
                end_comment: "end-test-code",
            },
            target: {
                src: "<%= globalConfig.src %>/scripts/*.js"
            }
        },

        concat: {
            main: {
                src: [
                    '<%= globalConfig.vendor %>/_bower.js',
                    '<%= globalConfig.src %>/scripts/*.js'
                ],
                dest: '<%= globalConfig.dist %>/js/production.js'
            }
        },

        uglify: {
            build: {
                src: '<%= globalConfig.dist %>/js/production.js',
                dest: '<%= globalConfig.dist %>/js/production.min.js'
            }
        },

        cssmin: {
            minify: {
                src: ['<%= globalConfig.vendor %>/_bower.css', 'public/css/*.css'],
                dest: '<%= globalConfig.dist %>/css/production.min.css'
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-strip-code');

    grunt.loadNpmTasks('grunt-jasmine-node');


    grunt.registerTask('setup', [
        'copy',
        'bower_concat',
        'jasmine',
        'jasmine_node',
        'strip_code',
        'concat',
        'uglify',
        'cssmin'
    ]);
};
