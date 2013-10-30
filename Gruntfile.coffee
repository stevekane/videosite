'use strict'
path = require('path')

module.exports = (grunt) ->
  
  grunt.initConfig

    #SERVER SIDE STUFF
    emailTemplatesCompiled: "compiledEmails.js"
    emailDir: "templates/email/"

    #vendor directory and specific dependencies
    vendor: "public/vendor"
    emberVersion: "ember.js"
    jqueryVersion: "jquery.js"
    handlebarsVersion: "handlebars.js"

    #connect server settings
    port: 3000
    host: '0.0.0.0'

    #js files
    jsDir: "public/javascripts"
    srcJs: "app.js"

    #handlebars files
    hbDir: "public/handlebars"
    hbCompiled: "apptemplates.js"

    #sass files
    sassDir: "public/sass"
    mainSassFile: "app.sass"
    sassCompiled: "appsass.css"

    #output files
    distDir: "public/dist"

    minispade:
      options:
        renameRequire: true
        useStrict: false
        prefixToRemove: '<%= jsDir %>'+'/'
      files:
        src: ['<%= jsDir %>/**/*.js']
        dest: '<%= distDir %>/<%= srcJs %>'

    sass:
      dist:
        options:
          trace: true
          style: 'expanded'
        files:
          '<%= distDir %>/<%= sassCompiled %>': '<%= sassDir %>/<%= mainSassFile %>'

    emberTemplates:
      compile:
        options:
          templateName: (sourceFile) ->
            #TODO: THIS IS HARDCODED...SHOULD CHANGE TO REF GLOBAL
            return sourceFile.replace("public/handlebars/", "")
        files:
          "<%= distDir%>/<%= hbCompiled %>": "<%= hbDir %>/**/*.handlebars"

    handlebars:
      compile:
        options:
          commonjs: true
          processName: (filePath) ->
            return path.basename filePath, ".handlebars"
        files:
          "compiledEmails.js": "<%= emailDir %>/**/*.handlebars"


    #FILE WATCHING
    watch:
      js:
        files: ['<%= jsDir %>/**/*.js']
        tasks: ['minispade']
        options:
          livereload: true

      sass:
        files: ['<%= sassDir %>/**/*.sass']
        tasks: ['sass']
        options:
          livereload: true

      emberTemplates:
        files: ['<%= hbDir %>/**/*.handlebars']
        tasks: ['emberTemplates']
        options:
          livereload: true

      emailTemplates:
        files: ['<%= emailDir %>/**/*.handlebars']
        tasks: ['handlebars']

      indexhtml:
        files: ['index.html']
        tasks: []
        options:
          livereload: true

  grunt.loadNpmTasks('grunt-minispade')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-ember-templates')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-handlebars')

  grunt.registerTask('default',
    [
      'emberTemplates',
      'handlebars',
      'sass',
      'minispade',
      'watch'
    ]
  )
  grunt.registerTask('simple',
    [
      'handlebars',
      'watch'
    ]
  )
