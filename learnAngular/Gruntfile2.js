module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            buildall: {
                options: {
                    mangle:true,
                    compress:{
                        drop_console:true
                    },
                    report:"min"
                },
                files:[{
                    expand:true,
                    cwd:'src',
                    src:'**/*.js',
                    dest:'dist'
                }]
            }
        },
        watch: {
            scripts:{
                files:['src/**/*/js'],
                tasks:['minall'],
                options:{
                    spawn:true,
                    interrupt:true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // grunt.registerTask('test', ['jshint', 'qunit']);
    // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
    grunt.registerTask('minall', ['uglify:buildall']);
    grunt.registerTask('default', ['concat', 'uglify']);
};