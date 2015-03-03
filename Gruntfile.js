// usage:
// install node!!!
// npm install -g grunt-cli
// npm install
// grunt

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /********************
         * CONCAT FILES
         ********************/
        concat: {
            options: {
                separator: ';'
            },

            // --- concat WIDGETS (for FibOS) --- //
            widgets: {
                src: [
                    'src/widgets/UIBaseWidget.js',
                    'src/widgets/UIMarkerWidget.js',
                    'src/widgets/UIRulerWidget.js',
                    'src/widgets/UISliderWidget.js',
                    'src/widgets/UISpacerWidget.js',
                    'src/widgets/UISpriterWidget.js'
                ],
                dest: 'target/temp/UIWidgets.js'
            },

            // --- concat PANELS (for FibOS) --- //
            panels: {
                src: [
                    'src/app/panels/UIBasePanel.js',
                    'src/app/panels/UIExtraPanel.js',
                    'src/app/panels/UIGroupPanel.js',
                    'src/app/panels/UIInputPanel.js',
                    'src/app/panels/UIOffsetPanel.js',
                    'src/app/panels/UISpacerPanel.js',
                    'src/app/panels/UISpritePanel.js',
                    'src/app/panels/UIStoragePanel.js',

                    'src/app/panels/UISelectPanel.js',
                    'src/app/panels/UITogglesPanel.js'
                ],
                dest: 'target/temp/UIPanels.js'
            },

            // --- concat WIDGETS + PANELS + FIBOS --- //
            full: {
                src: [
                    'target/temp/UIWidgets.js',
                    'target/temp/UIPanels.js',
                    'src/app/FibOS.js'
                ],
                dest: 'target/temp/fibos_full.js'
            },

            // --- concat FINAL (with initialize) --- //
            fibos: {
                src: [
                    'target/temp/fibos_full.js',
                    'src/app/fibos_default.js'
                ],
                dest: 'target/<%= pkg.name %>-<%= pkg.version %>.js'
            },
            fibos_hotels: {
                src: [
                    'target/temp/fibos_full.js',
                    'src/app/fibos_hotels.js'
                ],
                dest: 'target/<%= pkg.name %>-hotels-<%= pkg.version %>.js'
            },
            fibos_venere: {
                src: [
                    'target/temp/fibos_full.js',
                    'src/app/fibos_venere.js'
                ],
                dest: 'target/<%= pkg.name %>-venere-<%= pkg.version %>.js'
            },

            // --- concat ONLY WIDGETS --- //
            marker: {
                src: ['src/widgets/UIBaseWidget.js','src/widgets/UIMarkerWidget.js'],
                dest: 'target/uiMarker-<%= pkg.version %>.js'
            },
            ruler: {
                src: ['src/widgets/UIBaseWidget.js','src/widgets/UIRulerWidget.js'],
                dest: 'target/uiRuler-<%= pkg.version %>.js'
            },
            slider: {
                src: ['src/widgets/UIBaseWidget.js','src/widgets/UISliderWidget.js'],
                dest: 'target/uiSlider-<%= pkg.version %>.js'
            },
            spacer: {
                src: ['src/widgets/UIBaseWidget.js','src/widgets/UISpacerWidget.js'],
                dest: 'target/uiSpacer-<%= pkg.version %>.js'
            },
            spriter: {
                src: ['src/widgets/UIBaseWidget.js','src/widgets/UISpriterWidget.js'],
                dest: 'target/uiSpriter-<%= pkg.version %>.js'
            }
        },

        /********************
         * MINIFY FILES
         ********************/
        uglify: {

            // --- minify FIBOS --- //
            fibos: {
                files: {'target/<%= pkg.name %>-<%= pkg.version %>.min.js': ['target/<%= pkg.name %>-<%= pkg.version %>.js']}
            },
            fibos_hotels: {
                files: {'target/<%= pkg.name %>-hotels-<%= pkg.version %>.min.js': ['target/<%= pkg.name %>-hotels-<%= pkg.version %>.js']}
            },
            fibos_venere: {
                files: {'target/<%= pkg.name %>-venere-<%= pkg.version %>.min.js': ['target/<%= pkg.name %>-venere-<%= pkg.version %>.js']}
            },

            // --- minify WIDGETS --- //
            marker: {
                files: {'target/uiMarker-<%= pkg.version %>.min.js': ['target/uiMarker-<%= pkg.version %>.js']}
            },
            ruler: {
                files: {'target/uiRuler-<%= pkg.version %>.min.js': ['target/uiRuler-<%= pkg.version %>.js']}
            },
            slider: {
                files: {'target/uiSlider-<%= pkg.version %>.min.js': ['target/uiSlider-<%= pkg.version %>.js']}
            },
            spacer: {
                files: {'target/uiSpacer-<%= pkg.version %>.min.js': ['target/uiSpacer-<%= pkg.version %>.js']}
            },
            spriter: {
                files: {'target/uiSpriter-<%= pkg.version %>.min.js': ['target/uiSpriter-<%= pkg.version %>.js']}
            }
        },

        /********************
         * CLEAN
         ********************/
        clean: {
            build: ["target"]
        },

        /********************
         * COPY
         ********************/
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['target/<%= pkg.name %>*'],
                        dest: 'build/<%= pkg.version %>/'
                    }
                ]
            },
            widget: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['target/ui*'],
                        dest: 'build/<%= pkg.version %>/'
                    }
                ]
            },
            deploy: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['build/<%= pkg.version %>/*'],
                        dest: 'public/<%= pkg.version %>/'
                    }
                ]
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task
    grunt.registerTask('default', ['build']);

    // Private tasks
    grunt.registerTask('_concat_fibos',   ['concat:widgets', 'concat:panels', 'concat:full']);

    // Widget tasks
    grunt.registerTask('build-marker', ['clean', 'concat:marker', 'uglify:marker', 'copy:widget']);
    grunt.registerTask('build-ruler',  ['clean', 'concat:ruler',  'uglify:ruler',  'copy:widget']);
    grunt.registerTask('build-slider', ['clean', 'concat:slider', 'uglify:slider', 'copy:widget']);
    grunt.registerTask('build-spacer', ['clean', 'concat:spacer', 'uglify:spacer', 'copy:widget']);
    grunt.registerTask('build-spriter',['clean', 'concat:spriter','uglify:spriter','copy:widget']);

    // Main tasks
    grunt.registerTask('build',        ['clean', '_concat_fibos', 'concat:fibos', 'uglify:fibos',  'copy:main']);
    grunt.registerTask('build-hotels', ['clean', '_concat_fibos', 'concat:fibos_hotels', 'uglify:fibos_hotels',  'copy:main']);
    grunt.registerTask('build-venere', ['clean', '_concat_fibos', 'concat:fibos_venere', 'uglify:fibos_venere',  'copy:main']);

    grunt.registerTask('deploy', ['build-all', 'copy:deploy']);

    grunt.registerTask('build-all', [
        'build',
        'build-hotels',
        'build-venere',
        'build-marker',
        'build-ruler',
        'build-slider',
        'build-spacer',
        'build-spriter'
    ]);

 };
